import { Head } from "fresh/runtime";
import { define } from "@/utils.ts";

export default define.page(() => (
  <>
    <Head>
      <title>Why — decomm</title>
    </Head>
    <article class="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <p class="text-sm font-medium uppercase tracking-[0.18em] text-amber">
        Why
      </p>
      <h1 class="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
        “Works offline” is not a product.
      </h1>
      <div class="mt-10 space-y-6 text-base leading-8 text-mute">
        <p>
          Plenty of software still runs if you yank the ethernet. Most of it was
          designed for the other case: an account, a CDN, a license check, a
          friendly “we’ll try again when you’re back online.”
        </p>
        <p class="text-paper">
          decomm is for the machine that is not coming back online. A personal
          sandbox. A home server that should stay quiet. Two computers and a USB
          stick. An offline creative box. The interesting tools are the ones
          that only make sense once the cable is out.
        </p>
        <p>
          You still need a face for people when Gravatar cannot answer. You
          still need to know the folder on the stick is the folder you packed.
          You still want HTTPS on a LAN that Let’s Encrypt will never see. You
          still want a log you can trust next month.
        </p>
        <h2 class="pt-4 text-2xl font-semibold tracking-tight text-paper">
          Why Deno
        </h2>
        <p>
          One runtime. TypeScript without a ceremony. Permissions you can read
          off the command line. A folder you can copy. Init on a connected
          machine, then `--cached-only` on the far side.
        </p>
        <h2 class="pt-4 text-2xl font-semibold tracking-tight text-paper">
          Why carry-in, not an installer
        </h2>
        <p>
          An installer that phones home is a second internet. decomm tools are
          meant to leave the network in a folder: init (or a JSR install) while
          you have wifi, copy that folder onto the isolated box, run it there.
          If it cannot survive that trip, it is not a decomm tool.
        </p>
        <h2 class="pt-4 text-2xl font-semibold tracking-tight text-paper">
          Labs
        </h2>
        <p>
          Air-gapped rooms and secure labs can use this. They are a fit, not the
          narrator. The pitch is to a person with an isolated box.
        </p>
      </div>
    </article>
  </>
));
