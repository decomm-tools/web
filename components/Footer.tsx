import { Wordmark } from "@/components/Mark.tsx";

export const Footer = () => (
  <footer class="mt-auto border-t border-line">
    <div class="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-6">
      <div class="space-y-2">
        <Wordmark />
        <p class="max-w-sm text-sm text-mute">
          Tools for machines that never come back online.
        </p>
      </div>
      <nav class="flex gap-4 text-sm text-mute">
        <a class="hover:text-paper" href="/tools">Tools</a>
        <a class="hover:text-paper" href="/why">Why</a>
      </nav>
    </div>
  </footer>
);
