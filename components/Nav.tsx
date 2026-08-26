import { Wordmark } from "@/components/Mark.tsx";

const links = [
  { href: "/tools", label: "Tools" },
  { href: "/why", label: "Why" },
];

export const Nav = ({ path }: { path: string }) => (
  <header class="sticky top-0 z-30 border-b border-line/80 bg-ink/80 backdrop-blur-md">
    <div class="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
      <a
        href="/"
        class="rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
      >
        <Wordmark />
        <span class="sr-only">decomm home</span>
      </a>
      <nav class="flex items-center gap-1 sm:gap-2">
        {links.map((link) => {
          const active = path === link.href || path.startsWith(`${link.href}/`);
          return (
            <a
              key={link.href}
              href={link.href}
              class={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-zinc-800 text-paper"
                  : "text-mute hover:bg-zinc-900 hover:text-paper"
              }`}
            >
              {link.label}
            </a>
          );
        })}
      </nav>
    </div>
  </header>
);
