import type { Tool } from "@/data/tools.ts";

const linkClass = "relative z-10 text-amber transition hover:underline";

export const SourceLinks = ({
  tool,
  class: className = "flex flex-wrap gap-4 text-sm font-medium",
}: {
  tool: Tool;
  class?: string;
}) => {
  if (!tool.github && !tool.jsr) return null;

  return (
    <p class={className}>
      {tool.github && (
        <a class={linkClass} href={tool.github} rel="noreferrer">
          GitHub
        </a>
      )}
      {tool.jsr && (
        <a class={linkClass} href={tool.jsr} rel="noreferrer">
          JSR
        </a>
      )}
    </p>
  );
};
