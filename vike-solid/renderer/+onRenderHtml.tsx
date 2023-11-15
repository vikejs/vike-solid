// https://vike.dev/onRenderHtml
export { onRenderHtml };

import {
  generateHydrationScript,
  renderToStream,
  renderToString,
} from "solid-js/web";
import { dangerouslySkipEscape, escapeInject, stampPipe } from "vike/server";
import { getTitle } from "./getTitle";
import { getPageElement } from "./getPageElement";
import type { OnRenderHtmlAsync } from "vike/types";
import { PageContextProvider } from "./PageContextProvider";

const onRenderHtml: OnRenderHtmlAsync = async (
  pageContext
): ReturnType<OnRenderHtmlAsync> => {
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

  const favicon = pageContext.config.favicon;
  const faviconTag = !favicon ? '' : escapeInject`<link rel="icon" href="${favicon}" />`;

  const { pipe } = renderToStream(() =>
    !pageContext.Page ? (
      <></> // the ssr config flag is false
    ) : (
      getPageElement(pageContext)
    )
  );
  // const asString = renderToString(() => page);
  stampPipe(pipe, "node-stream");

  const lang = pageContext.config.lang || "en";

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
        <div id="page-view">${pipe}</div>
      </body>
      <!-- built with https://github.com/vikejs/vike-solid -->
    </html>`;

  return documentHtml;
};
