// Default <head> (can be overridden by pages)

import logoUrl from "../assets/logo.svg";

export function Head() {
  return (
    <>
      <meta name="description" content="Demo showcasing Vike + Solid" />
      <link rel="icon" href={logoUrl} />
    </>
  );
}
