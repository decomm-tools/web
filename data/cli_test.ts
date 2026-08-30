import { assertEquals, assertStringIncludes } from "@std/assert";
import { getTool } from "./tools.ts";

const siblingDir = (slug: string): string | null => {
  const dir = `${Deno.cwd()}/../${slug}`;
  try {
    Deno.statSync(`${dir}/${slug}.sh`);
    return dir;
  } catch {
    return null;
  }
};

const runSh = async (
  slug: string,
  args: string[],
  cwd?: string,
): Promise<{ stdout: string; stderr: string }> => {
  const dir = siblingDir(slug);
  if (!dir) throw new Error(`no sibling CLI for ${slug}`);
  const proc = new Deno.Command("sh", {
    args: [`${dir}/${slug}.sh`, ...args],
    cwd: cwd ?? dir,
    stdout: "piped",
    stderr: "piped",
  });
  const out = await proc.output();
  const stdout = new TextDecoder().decode(out.stdout);
  const stderr = new TextDecoder().decode(out.stderr);
  if (!out.success) throw new Error(stderr || stdout);
  return { stdout, stderr };
};

Deno.test({
  name: "avatar.sh --seed matches the pitch example",
  ignore: siblingDir("avatar") === null,
  fn: async () => {
    const dir = await Deno.makeTempDir({ prefix: "decomm-web-avatar-" });
    try {
      const out = `${dir}/sandbox.svg`;
      const { stderr } = await runSh("avatar", [
        "--seed",
        "sandbox",
        "--out",
        out,
      ]);
      assertStringIncludes(stderr, "Wrote");
      assertStringIncludes(stderr, "sandbox.svg");
      const svg = await Deno.readTextFile(out);
      assertStringIncludes(svg, "<svg");
      const example = getTool("avatar")?.example[0];
      assertStringIncludes(example?.run ?? "", "--seed sandbox");
      assertStringIncludes(example?.out ?? "", "Wrote sandbox.svg");
    } finally {
      await Deno.remove(dir, { recursive: true });
    }
  },
});

Deno.test({
  name: "ferry.sh out then in is the pitch example",
  ignore: siblingDir("ferry") === null,
  fn: async () => {
    const kit = await Deno.makeTempDir({ prefix: "decomm-web-ferry-" });
    try {
      await Deno.writeTextFile(`${kit}/readme.txt`, "sandbox notes\n");
      const hashed = await runSh("ferry", ["out", kit]);
      assertStringIncludes(hashed.stdout, "1 file, 14 B");
      assertStringIncludes(hashed.stdout, "ferry.jsonl");
      const checked = await runSh("ferry", ["in", kit]);
      assertEquals(checked.stdout.trim(), "ok (1)");
      const example = getTool("ferry")?.example ?? [];
      assertEquals(example[0]?.out.split("\n")[0], "1 file, 14 B");
      assertEquals(example[1]?.out, "ok (1)");
    } finally {
      await Deno.remove(kit, { recursive: true });
    }
  },
});

Deno.test({
  name: "ledger.sh init create add verify is the pitch example",
  ignore: siblingDir("ledger") === null,
  fn: async () => {
    const dir = await Deno.makeTempDir({ prefix: "decomm-web-ledger-" });
    try {
      assertStringIncludes(
        (await runSh("ledger", ["--dir", dir, "init"])).stdout,
        "Ledger folder",
      );
      assertStringIncludes(
        (await runSh("ledger", ["--dir", dir, "create", "notes"])).stdout,
        "Created notes",
      );
      const added = await runSh("ledger", [
        "--dir",
        dir,
        "add",
        "notes",
        "swapped the drive",
      ]);
      assertStringIncludes(added.stdout, "#0");
      assertStringIncludes(
        (await runSh("ledger", ["--dir", dir, "verify"])).stdout,
        "ok (1)",
      );
      const example = getTool("ledger")?.example ?? [];
      assertStringIncludes(example[2]?.run ?? "", "swapped the drive");
      assertEquals(example[3]?.out, "notes: ok (1)");
    } finally {
      await Deno.remove(dir, { recursive: true });
    }
  },
});

Deno.test({
  name: "ident.sh create holden matches the pitch example",
  ignore: siblingDir("ident") === null,
  fn: async () => {
    const dir = await Deno.makeTempDir({ prefix: "decomm-web-ident-" });
    try {
      assertStringIncludes(
        (await runSh("ident", ["--dir", dir, "init"])).stdout,
        "Ident folder",
      );
      const created = (await runSh("ident", ["--dir", dir, "create", "holden"]))
        .stdout;
      assertStringIncludes(created, "created holden");
      assertStringIncludes(created, "color #e8a317 (warm)");
      assertStringIncludes(created, "fingerprint 00a503d3-5d63ac5f");
      const example = getTool("ident")?.example ?? [];
      assertStringIncludes(
        example[1]?.out ?? "",
        "fingerprint 00a503d3-5d63ac5f",
      );
    } finally {
      await Deno.remove(dir, { recursive: true });
    }
  },
});

Deno.test({
  name: "pack.sh help lists the pitch seal command",
  ignore: siblingDir("pack") === null,
  fn: async () => {
    const help = (await runSh("pack", ["--help"])).stdout;
    assertStringIncludes(help, "./pack.sh seal ./my-app");
    assertStringIncludes(help, "cached-only");
    const example = getTool("pack")?.example[0];
    assertEquals(example?.run, "./pack.sh seal ./my-app");
    assertStringIncludes(example?.out ?? "", "deno run --cached-only main.ts");
  },
});
