import { ClientOnly } from "vike-solid/ClientOnly";

export default function Page() {
  return (
    <>
      <h1>My vike-solid app</h1>
      This page is:
      <ul>
        <li>Rendered to HTML.</li>

        <ClientOnly load={() => import("./Counter")} fallback={<li>Waiting for client-side only component to load (quick)</li>}>
          {(Counter) => <li>
            Interactive 1. <Counter />
          </li>}
        </ClientOnly>

        <ClientOnly load={async () => {
          // Wasting time to show the fallback
          await new Promise(resolve => setTimeout(resolve, 2000));

          return import("./Counter");
        }} fallback={<li>Waiting for client-side only component to load (slow)</li>}>
          {(Counter) => <li>
            Interactive 2. <Counter />
          </li>}
        </ClientOnly>
      </ul>
    </>
  );
}
