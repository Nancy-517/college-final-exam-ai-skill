import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the exam workbench", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>期末周 AI 工作台/);
  assert.match(html, /上传资料/);
  assert.match(html, /考试逆向工程/);
  assert.match(html, /北航经济学学生真实验证/);
  assert.match(html, /做透往年题/);
  assert.match(html, /创建我的复习项目/);
  assert.match(html, /真实冲刺案例 Mock/);
  assert.match(html, /github/i);
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton/);
});
