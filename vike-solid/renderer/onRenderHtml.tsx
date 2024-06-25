// https://vike.dev/onRenderHtml
import { generateHydrationScript, renderToStream, renderToString } from "solid-js/web";
import { dangerouslySkipEscape, escapeInject, stampPipe, version } from "vike/server";
import { getHeadSetting } from "./getHeadSetting.js";
import { getPageElement } from "./getPageElement.js";
import type { OnRenderHtmlAsync } from "vike/types";
import { PageContextProvider } from "../hooks/usePageContext.js";

export { onRenderHtml };

type TPipe = Parameters<typeof stampPipe>[0];

checkVikeVersion();

const onRenderHtml: OnRenderHtmlAsync = async (pageContext): ReturnType<OnRenderHtmlAsync> => {
  const title = getHeadSetting("title", pageContext);
  const favicon = getHeadSetting("favicon", pageContext);
  const lang = getHeadSetting("lang", pageContext) || "en";

  const titleTag = !title ? "" : escapeInject`<title>${title}</title>`;
  const faviconTag = !favicon ? "" : escapeInject`<link rel="icon" href="${favicon}" />`;

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
    } else if (pageContext.config.stream === 'web') {
      pageView = renderToStream(() => getPageElement(pageContext)).pipeTo;
      stampPipe(pageView, "web-stream");
    } else {
      pageView = renderToStream(() => getPageElement(pageContext)).pipe;
      stampPipe(pageView, "node-stream");
    }
  }

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang='${lang}'>
      <head>
        <meta charset="UTF-8" />
        ${titleTag}
        ${headHtml}
        ${faviconTag}
        ${dangerouslySkipEscape(generateHydrationScript())}
      </head>
      <body>
        <div id="root">${pageView}</div>
      </body>
      <!-- built with https://github.com/vikejs/vike-solid -->
    </html>`;

  return documentHtml;
};

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
