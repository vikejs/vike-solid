// https://vike.dev/onRenderHtml
export { onRenderHtml };

import {
  generateHydrationScript,
  renderToStream,
  renderToString,
} from "solid-js/web";
import {
  dangerouslySkipEscape,
  escapeInject,
  stampPipe,
  version,
} from "vike/server";
import { getHeadSetting } from "./getHeadSetting.js";
import { getPageElement } from "./getPageElement.js";
import type { OnRenderHtmlAsync } from "vike/types";
import { PageContextProvider } from "./PageContextProvider.js";

checkVikeVersion();

const onRenderHtml: OnRenderHtmlAsync = async (
  pageContext
): ReturnType<OnRenderHtmlAsync> => {
  const title = getHeadSetting("title", pageContext);
  const favicon = getHeadSetting("favicon", pageContext);
  const lang = getHeadSetting("lang", pageContext) || "en";

  const titleTag = !title ? "" : escapeInject`<title>${title}</title>`;
  const faviconTag = !favicon
    ? ""
    : escapeInject`<link rel="icon" href="${favicon}" />`;

  const Head = pageContext.config.Head || (() => <></>);
  const headHtml = renderToString(() => (
    <PageContextProvider pageContext={pageContext}>
      <Head />
    </PageContextProvider>
  ));

  type TPipe = (writable: { write: (v: string) => void }) => void;

  let pageView: string | ReturnType<typeof dangerouslySkipEscape> | TPipe = "";
  if (!!pageContext.Page) {
    if (!pageContext.config.stream) {
      pageView = dangerouslySkipEscape(
        renderToString(() => getPageElement(pageContext))
      );
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
        ${dangerouslySkipEscape(headHtml)}
        ${faviconTag}
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
    const versionParts = version.split(".").map((s) => parseInt(s, 10)) as [
      number,
      number,
      number
    ];
    if (versionParts[0] > 0) return;
    if (versionParts[1] > 4) return;
    if (versionParts[2] >= 147) return;
  }
  throw new Error("Update Vike to 0.4.147 or above");
}
