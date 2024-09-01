import { usePageContext } from "vike-solid/usePageContext";
import { Movie } from "./Movie";

export function Page() {
  const pageContext = usePageContext();
  const id = pageContext.routeParams["id"];
  return <Movie id={id} />;
}
