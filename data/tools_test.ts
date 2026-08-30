import { assert, assertEquals, assertStringIncludes } from "@std/assert";
import { availableBlurb, exampleCommands, getTool, tools } from "./tools.ts";

Deno.test("every tool has a run example", () => {
  for (const tool of tools) {
    assert(tool.example.length > 0, `${tool.slug} needs an example`);
    for (const step of tool.example) {
      assert(step.run.startsWith(`./${tool.slug}.sh`), step.run);
      assert(step.out.length > 0, `${tool.slug} example is missing output`);
    }
  }
});

Deno.test("ident and task stay coming", () => {
  assertEquals(getTool("ident")?.status, "coming");
  assertEquals(getTool("task")?.status, "coming");
});

Deno.test("catalog lists task next to ident", () => {
  const slugs = tools.map((tool) => tool.slug);
  assert(slugs.includes("task"));
  assertEquals(slugs.indexOf("task"), slugs.indexOf("ident") + 1);
});

Deno.test("available blurb names the shipped tools", () => {
  assertStringIncludes(availableBlurb(), "Avatar");
  assertStringIncludes(availableBlurb(), "Ledger");
  assertStringIncludes(availableBlurb(), "available");
  assertEquals(availableBlurb().includes("Ident"), false);
  assertEquals(availableBlurb().includes("Task"), false);
});

Deno.test("exampleCommands is the copy payload", () => {
  const ferry = getTool("ferry");
  assert(ferry);
  assertEquals(
    exampleCommands(ferry),
    "./ferry.sh out ./kit\n./ferry.sh in ./kit",
  );
});
