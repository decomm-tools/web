import { useSignal } from "@preact/signals";

type Props = {
  text: string;
  caption?: string;
};

export default ({ text, caption }: Props) => {
  const copied = useSignal(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      copied.value = true;
      setTimeout(() => {
        copied.value = false;
      }, 1600);
    } catch {
      copied.value = false;
    }
  };

  return (
    <div class="overflow-hidden rounded-2xl border border-line bg-zinc-950">
      <div class="flex items-center justify-between gap-3 border-b border-line px-4 py-2">
        <p class="text-xs font-medium uppercase tracking-wider text-mute">
          {caption ?? "Carry-in flow"}
        </p>
        <button
          type="button"
          onClick={copy}
          class="rounded-full px-3 py-1 text-xs font-medium text-amber transition hover:bg-amber/10"
        >
          {copied.value ? "Copied" : "Copy"}
        </button>
      </div>
      <pre class="overflow-x-auto px-4 py-3 font-mono text-sm leading-6 text-paper">
        {text}
      </pre>
    </div>
  );
};
