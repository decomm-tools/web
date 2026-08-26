import { Head } from "fresh/runtime";
import { ToolCard } from "@/components/ToolCard.tsx";
import { tools } from "@/data/tools.ts";
import { define } from "@/utils.ts";

export default define.page(() => (
  <>
    <Head>
      <title>Tools — decomm</title>
    </Head>
    <div class="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <p class="text-sm font-medium uppercase tracking-[0.18em] text-amber">
        Catalog
      </p>
      <h1 class="mt-3 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
        Tools you carry in.
      </h1>
      <p class="mt-5 max-w-2xl text-base leading-7 text-mute">
        Eight ideas to start. Avatar, CA, and ledger are available. The rest are
        on the list — not pretend downloads.
      </p>
      <div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
      </div>
    </div>
  </>
));
