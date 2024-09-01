import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import type { JSX } from "solid-js";
import { usePageContext } from "vike-solid/usePageContext";

export default function Wrapper(props: { children: JSX.Element }) {
  const pageContext = usePageContext();
  const queryClient = new QueryClient(pageContext.config.queryClientConfig);

  return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>;
}
