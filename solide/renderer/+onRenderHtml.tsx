export default onRenderHtml;
import { renderToString } from "solid-js/web";
import { escapeInject, dangerouslySkipEscape } from "vite-plugin-ssr/server";
import { getPageElement } from "./getPageElement";
import type { PageContextServer } from "./types";

async function onRenderHtml(pageContext: PageContextServer) {
  const page = getPageElement(pageContext);
  const p = renderToString(() => page);

  // const { pipe } = renderToStream(() => page);
  // stampPipe(pipe, "node-stream");

  const lang = pageContext.exports.lang || "en";

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang='${lang}'>
      <head>
        <meta charset="UTF-8" />
      </head>
      <body>
        <div id="page-view">${dangerouslySkipEscape(p)}</div>
      </body>
    </html>`;

  return {
    documentHtml,
  };
}
