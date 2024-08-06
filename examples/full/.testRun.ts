export { testRun };

import { test, expect, run, fetchHtml, page, getServerUrl, autoRetry, partRegex } from "@brillout/test-e2e";
import assert from "node:assert";
const dataHk = partRegex`data-hk="${/[0-9-]+/}"`;

let isProd: boolean;

function testRun(cmd: `pnpm run ${"dev" | "preview"}`) {
  run(cmd);

  isProd = cmd !== "pnpm run dev";

  testUrl({
    url: "/",
    title: "My Vike + Solid App",
    text: "Rendered to HTML.",
    counter: true,
  });

  testUrl({
    url: "/star-wars",
    title: "6 Star Wars Movies",
    description: "All the 6 movies from the Star Wars franchise",
    text: "A New Hope",
  });

  testUrl({
    url: "/star-wars/3",
    title: "Return of the Jedi",
    description: "Star Wars Movie Return of the Jedi from Richard Marquand",
    text: "1983-05-25",
  });

  const textNoSSR = "This page is rendered only in the browser";
  testUrl({
    url: "/without-ssr",
    title: "No SSR",
    text: textNoSSR,
    counter: true,
    noSSR: true,
  });

  testNavigationBetweenWithSSRAndWithoutSSR();

  testHeadComponent();
}

function testNavigationBetweenWithSSRAndWithoutSSR() {
  const textWithSSR = "Rendered to HTML.";
  const textWithoutSSR = "It isn't rendered to HTML";

  const url = "/without-ssr";
  test(url + " isn't rendered to HTML", async () => {
    const html = await fetchHtml(url);
    expect(html).toContain('<div id="root"></div>');
    expect(html).not.toContain(textWithoutSSR);
    await page.goto(getServerUrl() + url);
    await testCounter();
    const body = await page.textContent("body");
    expect(body).toContain(textWithoutSSR);
  });

  test("Switch between SSR and non-SSR page", async () => {
    let body: string | null;
    const t1 = textWithoutSSR;
    const t2 = textWithSSR;

    body = await page.textContent("body");
    expect(body).toContain(t1);
    expect(body).not.toContain(t2);
    ensureWasClientSideRouted("/pages/without-ssr");

    await page.click('a:has-text("Welcome")');
    await testCounter();
    body = await page.textContent("body");
    expect(body).toContain(t2);
    expect(body).not.toContain(t1);
    ensureWasClientSideRouted("/pages/without-ssr");

    await page.click('a:has-text("Without SSR")');
    await testCounter();
    body = await page.textContent("body");
    expect(body).toContain(t1);
    expect(body).not.toContain(t2);
    ensureWasClientSideRouted("/pages/without-ssr");
  });
}

function testUrl({
  url,
  title,
  description,
  text,
  counter,
  noSSR,
}: {
  url: string;
  title: string;
  description?: string;
  text: string;
  counter?: true;
  noSSR?: true;
}) {
  test(url + " (HTML)", async () => {
    const html = await fetchHtml(url);
    if (!noSSR) {
      expect(html).toContain(text);
    }

    expect(getTitle(html)).toBe(title);
    expect(html).toMatch(partRegex`<link ${dataHk} rel="icon" href="${getAssetUrl("logo.svg")}">`);

    if (!description) description = "Demo showcasing Vike + Solid";
    expect(html).toMatch(partRegex`<meta name="description" content="${description}">`);
  });
  test(url + " (Hydration)", async () => {
    await page.goto(getServerUrl() + url);
    if (counter) {
      await testCounter();
    }
    const body = await page.textContent("body");
    expect(body).toContain(text);
  });
}

function testHeadComponent() {
  test("Head Component (HTML)", async () => {
    const html = await fetchHtml("/images");
    expect(html).toMatch(
      partRegex`<script ${dataHk} type="application/ld+json">{"@context":"https://schema.org/","contentUrl":{"src":"${getAssetUrl(
        "logo-new.svg",
      )}"},"creator":{"@type":"Person","name":"brillout"}}</script>`,
    );
    expect(html).toMatch(
      partRegex`<script ${dataHk} type="application/ld+json">{"@context":"https://schema.org/","contentUrl":{"src":"${getAssetUrl(
        "logo.svg",
      )}"},"creator":{"@type":"Person","name":"Romuald Brillout"}}</script>`,
    );
  });
  test("Head Component (Hydration)", async () => {
    await page.goto(getServerUrl() + "/");
    await testCounter();
    ensureWasClientSideRouted("/pages/index");
    await page.click('a:has-text("Head Component")');
    await testCounter();
    ensureWasClientSideRouted("/pages/index");
  });
}

function getTitle(html: string) {
  const title = html.match(/<title>(.*?)<\/title>/i)?.[1];
  return title;
}

async function testCounter() {
  // autoRetry() for awaiting client-side code loading & executing
  await autoRetry(
    async () => {
      expect(await page.textContent("button")).toBe("Counter 0");
      await page.click("button");
      expect(await page.textContent("button")).toContain("Counter 1");
    },
    { timeout: 5 * 1000 },
  );
}

/** Ensure page wasn't server-side routed.
 *
 * Examples:
 *   await ensureWasClientSideRouted('/pages/index')
 *   await ensureWasClientSideRouted('/pages/about')
 */
async function ensureWasClientSideRouted(pageIdFirst: `/pages/${string}`) {
  // Check whether the HTML is from the first page before Client-side Routing.
  // page.content() doesn't return the original HTML (it dumps the DOM to HTML).
  // Therefore only the serialized pageContext tell us the original HTML.
  const html = await page.content();
  const pageId = findFirstPageId(html);
  expect(pageId).toBe(pageIdFirst);
}
function findFirstPageId(html: string) {
  expect(html).toContain('<script id="vike_pageContext" type="application/json">');
  expect(html).toContain("_pageId");
  expect(html.split("_pageId").length).toBe(2);
  const match = partRegex`"_pageId":"${/([^"]+)/}"`.exec(html);
  expect(match).toBeTruthy();
  const pageId = match![1];
  expect(pageId).toBeTruthy();
  return pageId;
}

function getAssetUrl(fileName: string) {
  if (!isProd) {
    return `/assets/${fileName}`;
  }
  const [fileBaseName, fileExt, ...r] = fileName.split(".");
  assert(r.length === 0);
  return partRegex`/assets/static/${fileBaseName}.${/[a-zA-Z0-9_-]+/}.${fileExt}`;
}
