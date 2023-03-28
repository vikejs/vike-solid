// Default <head> (can be overriden by pages)
export default Head;

import logoUrl from "../assets/logo.svg";

function Head() {
  return (
    <>
      <link rel="icon" href={logoUrl} />
    </>
  );
}
