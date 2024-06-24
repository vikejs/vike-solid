import { clientOnly } from "vike-solid/clientOnly";

const ClientOnlyCounter = clientOnly(() => import("./Counter"));
const ClientOnlyCounterSlow = clientOnly(async () => {
  // Wasting time to show the fallback
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return import("./Counter");
});

export default function Page() {
  return (
    <>
      <h1>My vike-solid app</h1>
      This page is:
      <ul>
        <li>Rendered to HTML.</li>

        <li>
          <ClientOnlyCounter fallback={<>Waiting for client-side only component to load (quick)</>} />
        </li>

        <li>
          <ClientOnlyCounterSlow fallback={<>Waiting for client-side only component to load (slow)</>} />
        </li>
      </ul>
    </>
  );
}
