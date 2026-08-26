import CopyCommand from "@/islands/CopyCommand.tsx";

export const CarryNote = ({
  command,
  note =
    "This is the carry-in flow once the tool ships — not a live install. Init on a connected machine, copy the folder, run it dark.",
}: {
  command: string;
  note?: string;
}) => (
  <div class="space-y-3">
    <p class="text-sm leading-6 text-mute">{note}</p>
    <CopyCommand text={command} />
  </div>
);
