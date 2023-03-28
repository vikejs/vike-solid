export default onRenderHtml;
import {
  generateHydrationScript,
  renderToStream,
  renderToString,
} from "solid-js/web";
import {
  escapeInject,
  dangerouslySkipEscape,
  stampPipe,
} from "vite-plugin-ssr/server";
import { getTitle } from "./getTitle";
import { getPageElement } from "./getPageElement";
import type { PageContextServer } from "./types";
import { PageContextProvider } from "./PageContextProvider";

async function onRenderHtml(pageContext: PageContextServer) {
  const page = getPageElement(pageContext);

  const title = getTitle(pageContext);
  const titleTag = !title ? "" : escapeInject`<title>${title}</title>`;

  const { description } = pageContext.exports;
  const descriptionTag = !description
    ? ""
    : escapeInject`<meta name="description" content="${description}" />`;

  const Head = pageContext.exports.Head || (() => <></>);
  const head = (
    <PageContextProvider pageContext={pageContext}>
      <Head />
    </PageContextProvider>
  );
  const headHtml = renderToString(() => head);

  const { pipe } = renderToStream(() => page);
  stampPipe(pipe, "node-stream");

  const lang = pageContext.exports.lang || "en";

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang='${lang}'>
      <head>
        <meta charset="UTF-8" />
        ${titleTag}
        ${descriptionTag}
        ${dangerouslySkipEscape(headHtml)}
        ${dangerouslySkipEscape(generateHydrationScript())}
      </head>
      <body>
        <div id="page-view">${pipe}</div>
      </body>
    </html>`;

  return {
    documentHtml,
  };
}
