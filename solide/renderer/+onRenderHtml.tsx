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
  const title = getTitle(pageContext);
  const titleTag = !title ? "" : escapeInject`<title>${title}</title>`;

  const { description } = pageContext.config;
  const descriptionTag = !description
    ? ""
    : escapeInject`<meta name="description" content="${description}" />`;

  const Head = pageContext.config.Head || (() => <></>);
  const headHtml = renderToString(() => (
    <PageContextProvider pageContext={pageContext}>
      <Head />
    </PageContextProvider>
  ));

  const { pipe } = renderToStream(() => getPageElement(pageContext));
  // const asString = renderToString(() => page);
  stampPipe(pipe, "node-stream");

  const lang = pageContext.config.lang || "en";

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
