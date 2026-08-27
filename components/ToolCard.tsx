import { SourceLinks } from "@/components/SourceLinks.tsx";
import { StatusBadge } from "@/components/StatusBadge.tsx";
import type { Tool } from "@/data/tools.ts";

export const ToolCard = ({ tool }: { tool: Tool }) => (
  <article class="group flex flex-col rounded-2xl border border-line bg-zinc-950/60 p-6 transition hover:-translate-y-0.5 hover:border-amber/40 hover:bg-zinc-900/70">
    <div class="mb-4 flex items-center justify-between gap-3">
      <h3 class="text-lg font-semibold tracking-tight text-paper">
        <a href={`/tools/${tool.slug}`} class="hover:text-amber">
          {tool.name}
        </a>
      </h3>
      <StatusBadge status={tool.status} />
    </div>
    <p class="flex-1 text-sm leading-6 text-mute">{tool.oneLiner}</p>
    <div class="mt-5 flex items-center justify-between gap-3">
      <a
        href={`/tools/${tool.slug}`}
        class="text-sm font-medium text-amber group-hover:underline"
      >
        See the pitch
      </a>
      <SourceLinks tool={tool} class="flex gap-3 text-sm font-medium" />
    </div>
  </article>
);
