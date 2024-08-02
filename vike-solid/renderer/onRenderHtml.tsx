// https://vike.dev/onRenderHtml
import { generateHydrationScript, renderToStream, renderToString } from "solid-js/web";
import { dangerouslySkipEscape, escapeInject, stampPipe, version } from "vike/server";
import { getHeadSetting } from "./getHeadSetting.js";
import { getPageElement } from "./getPageElement.js";
import type { OnRenderHtmlAsync, PageContext } from "vike/types";
import { PageContextProvider } from "../hooks/usePageContext.js";
import { getTagAttributesString, type TagAttributes } from "../utils/getTagAttributesString.js";

export { onRenderHtml };

type TPipe = Parameters<typeof stampPipe>[0];

checkVikeVersion();

const onRenderHtml: OnRenderHtmlAsync = async (pageContext): ReturnType<OnRenderHtmlAsync> => {
  const title = getHeadSetting("title", pageContext);
  const favicon = getHeadSetting("favicon", pageContext);
  const description = getHeadSetting("description", pageContext);

  const titleTag = !title ? "" : escapeInject`<title>${title}</title><meta property="og:title" content="${title}">`;
  const faviconTag = !favicon ? "" : escapeInject`<link rel="icon" href="${favicon}" />`;
  const descriptionTags = !description
    ? ""
    : escapeInject`<meta name="description" content="${description}"><meta property="og:description" content="${description}">`;

  const Head = pageContext.config.Head || (() => <></>);
  const head = renderToString(() => (
    <PageContextProvider pageContext={pageContext}>
      <Head />
    </PageContextProvider>
  ));

  const headHtml = dangerouslySkipEscape(head);

  let pageView: string | ReturnType<typeof dangerouslySkipEscape> | TPipe = "";
  if (pageContext.Page) {
    if (!pageContext.config.stream) {
      pageView = dangerouslySkipEscape(renderToString(() => getPageElement(pageContext)));
    } else if (pageContext.config.stream === "web") {
      pageView = renderToStream(() => getPageElement(pageContext)).pipeTo;
      stampPipe(pageView, "web-stream");
    } else {
      pageView = renderToStream(() => getPageElement(pageContext)).pipe;
      stampPipe(pageView, "node-stream");
    }
  }

  const { htmlAttributesString, bodyAttributesString } = getTagAttributes(pageContext);

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html${dangerouslySkipEscape(htmlAttributesString)}>
      <head>
        <meta charset="UTF-8" />
        ${titleTag}
        ${headHtml}
        ${faviconTag}
        ${descriptionTags}
        ${dangerouslySkipEscape(generateHydrationScript())}
      </head>
      <body${dangerouslySkipEscape(bodyAttributesString)}>
        <div id="root">${pageView}</div>
      </body>
      <!-- built with https://github.com/vikejs/vike-solid -->
    </html>`;

  return documentHtml;
};

function getTagAttributes(pageContext: PageContext) {
  let lang = getHeadSetting("lang", pageContext);
  // Don't set `lang` to its default value if it's `null` (so that users can set it to `null` in order to remove the default value)
  if (lang === undefined) lang = "en";

  const bodyAttributes = mergeTagAttributesList(pageContext.config.bodyAttributes);
  const htmlAttributes = mergeTagAttributesList(pageContext.config.htmlAttributes);

  const bodyAttributesString = getTagAttributesString(bodyAttributes);
  const htmlAttributesString = getTagAttributesString({ ...htmlAttributes, lang: lang ?? htmlAttributes.lang });

  return { htmlAttributesString, bodyAttributesString };
}
function mergeTagAttributesList(tagAttributesList: TagAttributes[] = []) {
  const tagAttributes: TagAttributes = {};
  tagAttributesList.forEach((tagAttrs) => Object.assign(tagAttributes, tagAttrs));
  return tagAttributes;
}

// We don't need this anymore starting from vike@0.4.173 which added the `require` setting.
// TODO/eventually: remove this once <=0.4.172 versions become rare.
function checkVikeVersion() {
  if (version) {
    const versionParts = version.split(".").map((s) => parseInt(s, 10)) as [number, number, number];
    if (versionParts[0] > 0) return;
    if (versionParts[1] > 4) return;
    if (versionParts[2] >= 173) return;
  }
  // We can leave it 0.4.173 until we entirely remove checkVikeVersion() (because starting vike@0.4.173 we use the new `require` setting).
  throw new Error("Update Vike to 0.4.173 or above");
}
