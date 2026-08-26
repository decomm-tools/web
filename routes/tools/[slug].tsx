import { HttpError } from "fresh";
import { Head } from "fresh/runtime";
import { CarryNote } from "@/components/CarryNote.tsx";
import { SourceLinks } from "@/components/SourceLinks.tsx";
import { StatusBadge } from "@/components/StatusBadge.tsx";
import { ToolCard } from "@/components/ToolCard.tsx";
import { getTool, relatedTools } from "@/data/tools.ts";
import { define } from "@/utils.ts";

export default define.page((ctx) => {
  const tool = getTool(ctx.params.slug);
  if (!tool) throw new HttpError(404);

  const related = relatedTools(tool);

  return (
    <>
      <Head>
        <title>{tool.name} — decomm</title>
        <meta name="description" content={tool.oneLiner} />
      </Head>
      <article class="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <a
          href="/tools"
          class="text-sm font-medium text-mute transition hover:text-paper"
        >
          ← Catalog
        </a>
        <div class="mt-8 flex flex-wrap items-center gap-3">
          <h1 class="text-4xl font-semibold tracking-tight sm:text-5xl">
            {tool.name}
          </h1>
          <StatusBadge status={tool.status} />
        </div>
        <p class="mt-5 text-lg leading-8 text-mute">{tool.oneLiner}</p>
        <SourceLinks
          tool={tool}
          class="mt-4 flex flex-wrap gap-4 text-sm font-medium"
        />

        <section class="mt-12 space-y-3">
          <h2 class="text-sm font-medium uppercase tracking-[0.18em] text-amber">
            The isolated-box problem
          </h2>
          <p class="text-base leading-8 text-paper">{tool.problem}</p>
        </section>

        <section class="mt-10 space-y-3">
          <h2 class="text-sm font-medium uppercase tracking-[0.18em] text-amber">
            What it does
          </h2>
          <p class="text-base leading-8 text-paper">{tool.does}</p>
        </section>

        {tool.how && (
          <section class="mt-10 space-y-3">
            <h2 class="text-sm font-medium uppercase tracking-[0.18em] text-amber">
              Hashing and verify
            </h2>
            <p class="text-base leading-8 text-paper">{tool.how}</p>
          </section>
        )}

        {tool.status === "available" && (
          <p class="mt-8 rounded-2xl border border-amber/30 bg-amber/5 px-5 py-4 text-sm leading-6 text-paper">
            This one runs. From the repo:{" "}
            <code class="font-mono text-amber">
              {tool.runLocal ?? `cd ${tool.slug} && deno task dev`}
            </code>
          </p>
        )}
        {tool.status === "prototype" && (
          <p class="mt-8 rounded-2xl border border-amber/30 bg-amber/5 px-5 py-4 text-sm leading-6 text-paper">
            A prototype already lives as{" "}
            <code class="font-mono text-amber">deno-avatar</code>. It is not
            folded into decomm yet. This page is the pitch for the suite
            version.
          </p>
        )}

        <section class="mt-12">
          <h2 class="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-amber">
            Carry-in
          </h2>
          <CarryNote
            command={tool.carryIn}
            note={tool.status === "available"
              ? "Init on a connected machine, copy the folder, run it dark. This one is real."
              : undefined}
          />
        </section>
      </article>

      {related.length > 0 && (
        <section class="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          <h2 class="mb-6 text-lg font-semibold">Related</h2>
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => <ToolCard key={item.slug} tool={item} />)}
          </div>
        </section>
      )}
    </>
  );
});
