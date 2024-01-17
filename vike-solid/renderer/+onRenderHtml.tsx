// https://vike.dev/onRenderHtml
export { onRenderHtml };

import {
  generateHydrationScript,
  renderToStream,
  renderToString,
} from "solid-js/web";
import { dangerouslySkipEscape, escapeInject, stampPipe, version } from "vike/server";
import { getTitle } from "./getTitle";
import { getPageElement } from "./getPageElement";
import type { OnRenderHtmlAsync } from "vike/types";
import { PageContextProvider } from "./PageContextProvider";
import { getLang } from "./getLang";

checkVikeVersion()

const onRenderHtml: OnRenderHtmlAsync = async (
  pageContext
): ReturnType<OnRenderHtmlAsync> => {
  const { stream, favicon, description } = pageContext.config

  const title = getTitle(pageContext);
  const titleTag = !title ? "" : escapeInject`<title>${title}</title>`;

  const faviconTag = !favicon ? '' : escapeInject`<link rel="icon" href="${favicon}" />`
  const descriptionTag = !description ? '' : escapeInject`<meta name="description" content="${description}" />`

  const Head = pageContext.config.Head || (() => <></>);
  const headHtml = renderToString(() => (
    <PageContextProvider pageContext={pageContext}>
      <Head />
    </PageContextProvider>
  ));

  type TPipe = (writable: { write: (v: string) => void; }) => void

  let pageView: string | ReturnType<typeof dangerouslySkipEscape> | TPipe = ''
  if (!!pageContext.Page) {
    if (!stream) {
      pageView = dangerouslySkipEscape(renderToString(() => getPageElement(pageContext)))
    } else {
      pageView = renderToStream(() => getPageElement(pageContext)).pipe
      stampPipe(pageView, "node-stream");
    }
  }

  const lang = getLang(pageContext) || "en";

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang='${lang}'>
      <head>
        <meta charset="UTF-8" />
        ${titleTag}
        ${faviconTag}
        ${descriptionTag}
        ${dangerouslySkipEscape(headHtml)}
        ${dangerouslySkipEscape(generateHydrationScript())}
      </head>
      <body>
        <div id="page-view">${pageView}</div>
      </body>
      <!-- built with https://github.com/vikejs/vike-solid -->
    </html>`;

  return documentHtml;
};

function checkVikeVersion() {
  if (version) {
    const versionParts = version.split('.').map((s) => parseInt(s, 10)) as [number, number, number]
    if (versionParts[0] > 0) return
    if (versionParts[1] > 4) return
    if (versionParts[2] >= 147) return
  }
  throw new Error('Update Vike to its latest version (or vike@0.4.147 and any version above)')
}
