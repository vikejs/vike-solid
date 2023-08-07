export default function Page() {
  // Will be printed on the server and in the browser:
  console.log("Rendering SSR page");

  return (
    <>
      <h1>My vike-solid app</h1>
      This page is rendered to HTML (using SSR) and hydrated in the browser.
    </>
  );
}
