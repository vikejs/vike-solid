// https://vike.dev/onRenderHtml
import { generateHydrationScript, renderToStream, renderToString } from "solid-js/web";
import { dangerouslySkipEscape, escapeInject, stampPipe } from "vike/server";
import { getHeadSetting } from "./getHeadSetting.js";
import { getPageElement } from "./getPageElement.js";
import type { OnRenderHtmlAsync, PageContextServer } from "vike/types";
import { PageContextProvider } from "../hooks/usePageContext.js";
import { getTagAttributesString, type TagAttributes } from "../utils/getTagAttributesString.js";
import type { Component } from "solid-js";

export { onRenderHtml };

type TPipe = Parameters<typeof stampPipe>[0];

const onRenderHtml: OnRenderHtmlAsync = async (pageContext): ReturnType<OnRenderHtmlAsync> => {
  const pageHtml = getPageHtml(pageContext);

  const headHtml = getHeadHtml(pageContext);

  const { htmlAttributesString, bodyAttributesString } = getTagAttributes(pageContext);

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

function getPageHtml(pageContext: PageContextServer) {
  let pageHtml: string | ReturnType<typeof dangerouslySkipEscape> | TPipe = "";
  if (pageContext.Page) {
    if (!pageContext.config.stream) {
      pageHtml = dangerouslySkipEscape(renderToString(() => getPageElement(pageContext)));
    } else if (pageContext.config.stream === "web") {
      pageHtml = renderToStream(() => getPageElement(pageContext)).pipeTo;
      stampPipe(pageHtml, "web-stream");
    } else {
      pageHtml = renderToStream(() => getPageElement(pageContext)).pipe;
      stampPipe(pageHtml, "node-stream");
    }
  }
  return pageHtml;
}

function getHeadHtml(pageContext: PageContextServer) {
  const title = getHeadSetting("title", pageContext);
  const favicon = getHeadSetting("favicon", pageContext);
  const description = getHeadSetting("description", pageContext);
  const image = getHeadSetting("image", pageContext);

  const titleTags = !title ? "" : escapeInject`<title>${title}</title><meta property="og:title" content="${title}">`;
  const faviconTag = !favicon ? "" : escapeInject`<link rel="icon" href="${favicon}" />`;
  const descriptionTags = !description
    ? ""
    : escapeInject`<meta name="description" content="${description}"><meta property="og:description" content="${description}">`;
  const imageTags = !image
    ? ""
    : escapeInject`<meta property="og:image" content="${image}"><meta name="twitter:card" content="summary_large_image">`;
  const viewportTag = dangerouslySkipEscape(getViewportTag(pageContext.config.viewport));

  const headElementHtml = dangerouslySkipEscape(
    getHeadElementHtml(pageContext.config.Head || (() => <></>), pageContext),
  );

  const headHtml = escapeInject`
    ${titleTags}
    ${viewportTag}
    ${headElementHtml}
    ${faviconTag}
    ${descriptionTags}
    ${imageTags}
  `;
  return headHtml;
}
function getHeadElementHtml(Head: Component, pageContext: PageContextServer): string {
  const headElement = () => (
    <PageContextProvider pageContext={pageContext}>
      <Head />
    </PageContextProvider>
  );
  const headElementHtml = renderToString(headElement);
  return headElementHtml;
}

function getTagAttributes(pageContext: PageContextServer) {
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
