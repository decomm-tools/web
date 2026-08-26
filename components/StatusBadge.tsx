import type { ToolStatus } from "@/data/tools.ts";

export const StatusBadge = ({ status }: { status: ToolStatus }) => {
  if (status === "available") {
    return (
      <span class="inline-flex items-center rounded-full border border-amber/40 bg-amber/10 px-2.5 py-0.5 text-xs font-medium text-amber">
        Available
      </span>
    );
  }
  if (status === "prototype") {
    return (
      <span class="inline-flex items-center rounded-full border border-amber/40 bg-amber/10 px-2.5 py-0.5 text-xs font-medium text-amber">
        Prototype
      </span>
    );
  }
  return (
    <span class="inline-flex items-center rounded-full border border-line bg-zinc-900 px-2.5 py-0.5 text-xs font-medium text-mute">
      Coming
    </span>
  );
};
