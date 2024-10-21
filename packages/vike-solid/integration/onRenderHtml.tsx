// https://vike.dev/onRenderHtml
import { generateHydrationScript, renderToStream, renderToString, renderToStringAsync } from "solid-js/web";
import { dangerouslySkipEscape, escapeInject, stampPipe } from "vike/server";
import { getHeadSetting } from "./getHeadSetting.js";
import { getPageElement } from "./getPageElement.js";
import type { OnRenderHtmlAsync, PageContextServer } from "vike/types";
import { PageContextProvider } from "../hooks/usePageContext.js";
import { getTagAttributesString, type TagAttributes } from "../utils/getTagAttributesString.js";
import type { PageContextInternal } from "../types/PageContext.js";
import type { Head } from "../types/Config.js";
import type { JSX } from "solid-js/jsx-runtime";
import { isCallable } from "../utils/isCallable.js";
import isBot from "isbot-fast";

export { onRenderHtml };

type TPipe = Parameters<typeof stampPipe>[0];

const onRenderHtml: OnRenderHtmlAsync = async (
  pageContext: PageContextServer & PageContextInternal,
): ReturnType<OnRenderHtmlAsync> => {
  const pageHtml = await getPageHtml(pageContext);

  const headHtml = getHeadHtml(pageContext);

  const { htmlAttributesString, bodyAttributesString } = getTagAttributes(pageContext);

  // Not needed on the client-side, thus we remove it to save KBs sent to the client
  delete pageContext._configFromHook;

  return escapeInject`<!DOCTYPE html>
    <html${dangerouslySkipEscape(htmlAttributesString)}>
      <head>
        <meta charset="UTF-8" />
        ${headHtml}
        ${dangerouslySkipEscape(generateHydrationScript())}
      </head>
      <body${dangerouslySkipEscape(bodyAttributesString)}>
        <div id="root">${pageHtml}</div>
      </body>
    </html>`;
};

async function getPageHtml(pageContext: PageContextServer & PageContextInternal) {
  let pageHtml: string | ReturnType<typeof dangerouslySkipEscape> | TPipe = "";
  const userAgent: string | undefined =
    pageContext.headers?.["user-agent"] ||
    // TODO/eventually: remove old way of acccessing the User Agent header.
    // @ts-expect-error Property 'userAgent' does not exist on type
    pageContext.userAgent;

  if (pageContext.Page) {
    if (userAgent && isBot(userAgent)) {
      pageHtml = dangerouslySkipEscape(await renderToStringAsync(() => getPageElement(pageContext)));
    } else if (!pageContext.config.stream) {
      pageHtml = dangerouslySkipEscape(renderToString(() => getPageElement(pageContext)));
    } else if (pageContext.config.stream === "web") {
      pageHtml = renderToStream(() => getPageElement(pageContext), {
        onCompleteShell(info) {
          pageContext._stream ??= info;
        },
      }).pipeTo;
      stampPipe(pageHtml, "web-stream");
    } else {
      pageHtml = renderToStream(() => getPageElement(pageContext), {
        onCompleteShell(info) {
          pageContext._stream ??= info;
        },
      }).pipe;
      stampPipe(pageHtml, "node-stream");
    }
  }
  return pageHtml;
}

function getHeadHtml(pageContext: PageContextServer & PageContextInternal) {
  pageContext._headAlreadySet = true;

  const title = getHeadSetting<string | null>("title", pageContext);
  const favicon = getHeadSetting<string | null>("favicon", pageContext);
  const description = getHeadSetting<string | null>("description", pageContext);
  const image = getHeadSetting<string | null>("image", pageContext);

  const titleTags = !title ? "" : escapeInject`<title>${title}</title><meta property="og:title" content="${title}">`;
  const faviconTag = !favicon ? "" : escapeInject`<link rel="icon" href="${favicon}" />`;
  const descriptionTags = !description
    ? ""
    : escapeInject`<meta name="description" content="${description}"><meta property="og:description" content="${description}">`;
  const imageTags = !image
    ? ""
    : escapeInject`<meta property="og:image" content="${image}"><meta name="twitter:card" content="summary_large_image">`;
  const viewportTag = dangerouslySkipEscape(getViewportTag(getHeadSetting<Viewport>("viewport", pageContext)));

  const headElementsHtml = dangerouslySkipEscape(
    [
      // Added by +Head
      ...(pageContext.config.Head ?? []),
      // Added by useConfig()
      ...(pageContext._configFromHook?.Head ?? []),
    ]
      .filter((Head) => Head !== null && Head !== undefined)
      .map((Head) => getHeadElementHtml(Head, pageContext))
      .join("\n"),
  );

  const headHtml = escapeInject`
    ${titleTags}
    ${viewportTag}
    ${headElementsHtml}
    ${faviconTag}
    ${descriptionTags}
    ${imageTags}
  `;
  return headHtml;
}
function getHeadElementHtml(Head: Head, pageContext: PageContextServer): string {
  let headElement: () => JSX.Element;
  if (isElement(Head)) {
    headElement = () => Head;
  } else {
    headElement = () => (
      <PageContextProvider pageContext={pageContext}>
        <Head />
      </PageContextProvider>
    );
  }
  const headElementHtml = renderToString(headElement);
  return headElementHtml;
}
function isElement(value: unknown): value is JSX.Element {
  return !isCallable(value);
}

function getTagAttributes(pageContext: PageContextServer) {
  let lang = getHeadSetting<string | null>("lang", pageContext);
  // Don't set `lang` to its default value if it's `null` (so that users can set it to `null` in order to remove the default value)
  if (lang === undefined) lang = "en";

  const bodyAttributes = mergeTagAttributesList(getHeadSetting<TagAttributes[]>("bodyAttributes", pageContext));
  const htmlAttributes = mergeTagAttributesList(getHeadSetting<TagAttributes[]>("htmlAttributes", pageContext));

  const bodyAttributesString = getTagAttributesString(bodyAttributes);
  const htmlAttributesString = getTagAttributesString({ ...htmlAttributes, lang: lang ?? htmlAttributes.lang });

  return { htmlAttributesString, bodyAttributesString };
}
function mergeTagAttributesList(tagAttributesList: TagAttributes[] = []) {
  const tagAttributes: TagAttributes = {};
  tagAttributesList.forEach((tagAttrs) => Object.assign(tagAttributes, tagAttrs));
  return tagAttributes;
}

export type Viewport = "responsive" | number | null;
function getViewportTag(viewport: Viewport | undefined): string {
  if (viewport === "responsive" || viewport === undefined) {
    // `user-scalable=no` isn't recommended anymore:
    //   - https://stackoverflow.com/questions/22354435/to-user-scalable-no-or-not-to-user-scalable-no/22544312#comment120949420_22544312
    return '<meta name="viewport" content="width=device-width,initial-scale=1">';
  }
  if (typeof viewport === "number") {
    return `<meta name="viewport" content="width=${viewport}">`;
  }
  return "";
}
