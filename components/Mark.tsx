export const Mark = ({ class: className = "h-8 w-8" }: { class?: string }) => (
  <svg
    class={className}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect
      x="3.5"
      y="8.5"
      width="11"
      height="15"
      rx="3"
      stroke="currentColor"
      stroke-width="1.75"
    />
    <rect
      x="6.75"
      y="12.5"
      width="1.75"
      height="5"
      rx="0.5"
      fill="currentColor"
    />
    <rect
      x="9.75"
      y="12.5"
      width="1.75"
      height="5"
      rx="0.5"
      fill="currentColor"
    />
    <rect
      x="20"
      y="10.5"
      width="8.5"
      height="11"
      rx="2.25"
      fill="currentColor"
    />
    <rect
      x="17.5"
      y="13"
      width="3.25"
      height="1.75"
      rx="0.5"
      fill="currentColor"
    />
    <rect
      x="17.5"
      y="17.25"
      width="3.25"
      height="1.75"
      rx="0.5"
      fill="currentColor"
    />
  </svg>
);

export const Wordmark = ({ class: className = "" }: { class?: string }) => (
  <span class={`inline-flex items-center gap-3 ${className}`}>
    <Mark class="h-12 w-12 text-amber" />
    <span class="font-sans text-2xl font-semibold tracking-tight text-paper">
      decomm
    </span>
  </span>
);
