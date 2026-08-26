import { define } from "@/utils.ts";

export default define.page(({ Component }) => (
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#09090b" />
      <meta
        name="description"
        content="decomm — tools for machines that never come back online. Download on a connected laptop, copy onto an isolated box, run with no internet."
      />
      <title>decomm</title>
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Sora:wght@400;500;600;700&display=swap"
      />
    </head>
    <body class="min-h-screen bg-ink font-sans text-paper antialiased">
      <Component />
    </body>
  </html>
));
