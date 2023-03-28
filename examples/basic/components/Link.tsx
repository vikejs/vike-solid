export { Link };

import { usePageContext } from "solide/usePageContext";

function Link({ href, children }: { href: string; children: string }) {
  const pageContext = usePageContext();
  const { urlPathname } = pageContext;
  const isActive =
    href === "/" ? urlPathname === href : urlPathname.startsWith(href);
  return (
    <a href={href} class={isActive ? "is-active" : undefined}>
      {children}
    </a>
  );
}
