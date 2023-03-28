export { Link };

import { usePageContext } from "solide/usePageContext";

function Link(props: { href: string; children: string }) {
  const pageContext = usePageContext();
  const { urlPathname } = pageContext;
  const isActive =
    props.href === "/"
      ? urlPathname === props.href
      : urlPathname.startsWith(props.href);
  return (
    <a href={props.href} class={isActive ? "is-active" : undefined}>
      {props.children}
    </a>
  );
}
