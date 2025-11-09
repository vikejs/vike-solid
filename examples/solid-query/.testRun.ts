export { testRun };

import { autoRetry, expect, getServerUrl, page, partRegex, run, test } from "@brillout/test-e2e";
const dataHk = partRegex`data-hk="${/[0-9-]+/}"`;

function testRun(cmd: `pnpm run ${"dev" | "preview"}`) {
  run(cmd, {
    serverIsReadyMessage: "Local:",
  });

  const content = "Return of the Jedi";
  const loading = "Loading movies...";
  const titleDefault = "My Vike + Solid App";
  const titleOverriden = "6 Star Wars movies";
  const titleAsScript = `<script>document.title = "${titleOverriden}"</script>`;
  const description = partRegex`<meta ${dataHk} name="description" content="List of 6 Star Wars movies.">`;
  test("HTML (as user)", async () => {
    const html = await fetchAsUser("/");
    expect(html).toContain(content);
    expect(html).toContain(loading);
    expect(html).toContain(titleAsScript);
    expect(getTitle(html)).toBe(titleDefault);
    expect(html.split("<title>").length).toBe(2);
    expect(html).not.toMatch(description);
  });
  test("HTML (as bot)", async () => {
    const html = await fetchAsBot("/");
    expect(html).toContain(content);
    expect(html).not.toContain(loading);
    expect(html).not.toContain(titleAsScript);
    expect(getTitle(html)).toBe(titleOverriden);
    expect(html.split("<title>").length).toBe(2);
    expect(html).toMatch(description);
  });
  test("DOM", async () => {
    await page.goto(getServerUrl() + "/");
    const body = await page.textContent("body");
    // Playwright seems to await the HTML stream
    expect(body).not.toContain(loading);
    expect(body).toContain(content);
    await testCounter();
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

async function fetchAsBot(pathname: string) {
  return await fetchHtml(pathname, "curl/8.5.0");
}
async function fetchAsUser(pathname: string) {
  return await fetchHtml(pathname, "chrome");
}
async function fetchHtml(pathname: string, userAgent: string) {
  const response = await fetch(getServerUrl() + pathname, { headers: { ["User-Agent"]: userAgent } });
  const html = await response.text();
  return html;
}
