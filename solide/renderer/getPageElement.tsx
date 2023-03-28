export { getPageElement };

import type { PageContext } from "./types";
import { PageContextProvider } from "./PageContextProvider";
import { JSX } from "solid-js";

function getPageElement(pageContext: PageContext): JSX.Element {
  const Layout = pageContext.exports.Layout ?? PassThrough;
  const Wrapper = pageContext.exports.Wrapper ?? PassThrough;
  const { Page, pageProps } = pageContext;
  const page = (
    <PageContextProvider pageContext={pageContext}>
      <Wrapper>
        <Layout>
          <Page {...pageProps} />
        </Layout>
      </Wrapper>
    </PageContextProvider>
  );
  return page;
}

function PassThrough({ children }: any) {
  return <>{children}</>;
}
