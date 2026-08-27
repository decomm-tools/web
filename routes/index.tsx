import { Head } from "fresh/runtime";
import { CarryNote } from "@/components/CarryNote.tsx";
import { ToolCard } from "@/components/ToolCard.tsx";
import { tools } from "@/data/tools.ts";
import { define } from "@/utils.ts";

const problems = [
  {
    title: "Personal sandbox",
    body:
      "A machine you keep off the internet on purpose. You still want tools that feel finished, not a pile of scripts.",
  },
  {
    title: "Home server that should stay quiet",
    body:
      "It does not need to phone home. It does need a face for people, hashes for files, and certs for the LAN.",
  },
  {
    title: "USB between two computers",
    body:
      "The oldest network there is. Pack it, hash it, walk it over, check it. Then run what you brought.",
  },
];

const steps = [
  {
    n: "01",
    title: "Init on a connected box",
    body:
      "Grab the tool while you still have wifi. A folder appears. That folder is the whole product.",
  },
  {
    n: "02",
    title: "Copy it over",
    body:
      "USB, sneakernet, whatever you have. No installer. No account. No second download on the far side.",
  },
  {
    n: "03",
    title: "Run it dark",
    body:
      "Deno `--offline`. Tight permissions. The box never needs to come back online for the tool to work.",
  },
];

const principles = [
  {
    title: "Isolation-native",
    body:
      "Useful because you are cut off, not a cloud app with the wifi unplugged.",
  },
  {
    title: "Carry-in",
    body:
      "A folder you can copy. Nothing that phones home to finish installing.",
  },
  {
    title: "No telemetry",
    body:
      "No analytics, no update check, no crash report looking for a network.",
  },
  {
    title: "Honest status",
    body: "If a tool is not built yet, the page says so. No pretend downloads.",
  },
];

export default define.page(() => (
  <>
    <Head>
      <title>decomm — tools for machines that never come back online</title>
    </Head>

    <section class="relative overflow-hidden">
      <div class="pointer-events-none absolute inset-x-0 -top-24 h-80 bg-[radial-gradient(ellipse_at_top,rgba(245,185,66,0.14),transparent_60%)]" />
      <div class="relative mx-auto max-w-6xl px-4 pb-20 pt-20 sm:px-6 sm:pb-28 sm:pt-28">
        <p class="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-amber">
          decomm
        </p>
        <h1 class="max-w-4xl text-4xl font-semibold tracking-tight text-paper sm:text-6xl sm:leading-[1.05]">
          Tools for machines that never come back online.
        </h1>
        <p class="mt-6 max-w-2xl text-lg leading-8 text-mute">
          Download them on a laptop that has wifi. Copy the folder onto the box
          that does not. Run them there. Built for people with isolated machines
          — and yes, labs can use them too.
        </p>
        <div class="mt-10 flex flex-wrap gap-3">
          <a
            href="/tools"
            class="inline-flex items-center rounded-full bg-amber px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-amber-2"
          >
            See the tools
          </a>
          <a
            href="#carry-in"
            class="inline-flex items-center rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-paper transition hover:border-mute"
          >
            How carry-in works
          </a>
        </div>
      </div>
    </section>

    <section class="border-t border-line">
      <div class="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:grid-cols-3 sm:px-6 sm:py-20">
        {problems.map((item) => (
          <div
            key={item.title}
            class="rounded-2xl border border-line bg-zinc-950/50 p-6"
          >
            <h2 class="text-base font-semibold text-paper">{item.title}</h2>
            <p class="mt-3 text-sm leading-6 text-mute">{item.body}</p>
          </div>
        ))}
      </div>
      <p class="mx-auto max-w-6xl px-4 pb-16 text-sm text-mute sm:px-6">
        Secure labs and air-gapped rooms are a fit. They are not the whole
        story.
      </p>
    </section>

    <section id="carry-in" class="border-t border-line">
      <div class="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <p class="text-sm font-medium uppercase tracking-[0.18em] text-amber">
          Carry-in
        </p>
        <h2 class="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Three steps. Then the cable comes out.
        </h2>
        <div class="mt-12 grid gap-6 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.n} class="rounded-2xl border border-line p-6">
              <p class="font-mono text-xs text-amber">{step.n}</p>
              <h3 class="mt-3 text-lg font-semibold">{step.title}</h3>
              <p class="mt-3 text-sm leading-6 text-mute">{step.body}</p>
            </div>
          ))}
        </div>
        <div class="mt-10 max-w-2xl">
          <CarryNote command="deno run -A jsr:@decomm/<tool>/init ./<tool>" />
        </div>
      </div>
    </section>

    <section class="border-t border-line">
      <div class="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="text-sm font-medium uppercase tracking-[0.18em] text-amber">
              Catalog
            </p>
            <h2 class="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              First tools on the list
            </h2>
            <p class="mt-3 max-w-xl text-sm leading-6 text-mute">
              None of these are pretend downloads. Avatar and ledger are
              available. The rest are pitches for what we build next.
            </p>
          </div>
          <a
            href="/tools"
            class="text-sm font-medium text-amber hover:underline"
          >
            Full catalog
          </a>
        </div>
        <div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
        </div>
      </div>
    </section>

    <section class="border-t border-line">
      <div class="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <h2 class="text-3xl font-semibold tracking-tight sm:text-4xl">
          How we pick what to build
        </h2>
        <div class="mt-12 grid gap-6 sm:grid-cols-2">
          {principles.map((item) => (
            <div key={item.title} class="rounded-2xl border border-line p-6">
              <h3 class="text-lg font-semibold">{item.title}</h3>
              <p class="mt-3 text-sm leading-6 text-mute">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
));
