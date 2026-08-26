import { HttpError } from "fresh";
import { Head } from "fresh/runtime";
import { define } from "@/utils.ts";

export default define.page((ctx) => {
  const error = ctx.error;
  const status = error instanceof HttpError ? error.status : 500;
  const notFound = status === 404;

  return (
    <>
      <Head>
        <title>{notFound ? "Not found" : "Something broke"} — decomm</title>
      </Head>
      <div class="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
        <p class="font-mono text-sm text-amber">{status}</p>
        <h1 class="mt-3 text-3xl font-semibold tracking-tight">
          {notFound ? "That page is not here." : "Something broke."}
        </h1>
        <p class="mt-4 text-sm leading-6 text-mute">
          {notFound
            ? "Maybe the tool does not exist yet. The catalog is the honest list."
            : "The site hit an error. Try the catalog, or come back in a minute."}
        </p>
        <a
          href="/tools"
          class="mt-8 inline-flex rounded-full bg-amber px-5 py-2.5 text-sm font-semibold text-ink hover:bg-amber-2"
        >
          See the tools
        </a>
      </div>
    </>
  );
});
