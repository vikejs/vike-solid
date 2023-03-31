export { getPageElement };

import type { PageContext } from "./types";
import { PageContextProvider } from "./PageContextProvider";
import type { JSX } from "solid-js";

function getPageElement(pageContext: PageContext): JSX.Element {
  const Layout = pageContext.config.Layout ?? PassThrough;
  const Wrapper = pageContext.config.Wrapper ?? PassThrough;
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

function PassThrough(props: { children: JSX.Element }) {
  return <>{props.children}</>;
}
