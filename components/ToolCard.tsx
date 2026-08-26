import { SourceLinks } from "@/components/SourceLinks.tsx";
import { StatusBadge } from "@/components/StatusBadge.tsx";
import type { Tool } from "@/data/tools.ts";

export const ToolCard = ({ tool }: { tool: Tool }) => (
  <article class="group relative flex flex-col rounded-2xl border border-line bg-zinc-950/60 p-6 transition hover:-translate-y-0.5 hover:border-amber/40 hover:bg-zinc-900/70">
    <a
      href={`/tools/${tool.slug}`}
      class="absolute inset-0 rounded-2xl"
      aria-label={`${tool.name} pitch`}
    />
    <div class="relative mb-4 flex items-center justify-between gap-3">
      <h3 class="text-lg font-semibold tracking-tight text-paper">
        {tool.name}
      </h3>
      <StatusBadge status={tool.status} />
    </div>
    <p class="relative flex-1 text-sm leading-6 text-mute">{tool.oneLiner}</p>
    <div class="relative z-10 mt-5 flex items-center justify-between gap-3">
      <span class="pointer-events-none text-sm font-medium text-amber group-hover:underline">
        See the pitch
      </span>
      <SourceLinks tool={tool} class="flex gap-3 text-sm font-medium" />
    </div>
  </article>
);
