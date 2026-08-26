import { Footer } from "@/components/Footer.tsx";
import { Nav } from "@/components/Nav.tsx";
import { define } from "@/utils.ts";

export default define.layout(({ Component, url }) => (
  <div class="flex min-h-screen flex-col bg-ink bg-grid">
    <Nav path={url.pathname} />
    <main class="flex-1">
      <Component />
    </main>
    <Footer />
  </div>
));
