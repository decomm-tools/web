import { useSignal } from "@preact/signals";
import type { ExampleStep } from "@/data/tools.ts";

export default ({ example }: { example: ExampleStep[] }) => {
  const copied = useSignal(false);
  const commands = example.map((step) => step.run).join("\n");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(commands);
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
          Example
        </p>
        <button
          type="button"
          onClick={copy}
          class="rounded-full px-3 py-1 text-xs font-medium text-amber transition hover:bg-amber/10"
        >
          {copied.value ? "Copied" : "Copy"}
        </button>
      </div>
      <div class="space-y-4 px-4 py-4 font-mono text-sm leading-6">
        {example.map((step) => (
          <div key={step.run}>
            <p class="text-amber">$ {step.run}</p>
            <pre class="whitespace-pre-wrap text-mute">{step.out}</pre>
          </div>
        ))}
      </div>
    </div>
  );
};
