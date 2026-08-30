import ExampleSession from "@/islands/ExampleSession.tsx";
import { exampleCommands, type Tool } from "@/data/tools.ts";

export const ExampleBlock = ({
  tool,
  compact = false,
}: {
  tool: Tool;
  compact?: boolean;
}) => {
  if (compact) {
    return (
      <pre class="mt-4 overflow-x-auto rounded-xl border border-line bg-zinc-950 px-3 py-2 font-mono text-xs leading-5 text-paper">
        {exampleCommands(tool)}
      </pre>
    );
  }

  return <ExampleSession example={tool.example} />;
};
