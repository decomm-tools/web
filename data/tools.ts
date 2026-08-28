export type ToolStatus = "coming" | "prototype" | "available";

export type Tool = {
  slug: string;
  name: string;
  oneLiner: string;
  problem: string;
  does: string;
  carryIn: string;
  runLocal?: string;
  github?: string;
  jsr?: string;
  how?: string;
  related: string[];
  status: ToolStatus;
};

export const tools: Tool[] = [
  {
    slug: "avatar",
    name: "Avatar",
    oneLiner:
      "Unique profile pics from a seed. Same name, same face, every time.",
    problem:
      "Isolated boxes still have people on them. Those people need a face in the local wiki, the chat, the board on the wall. Gravatar will never answer.",
    does:
      "The decomm mark minus the plug: a socket with two eyes. Type a seed, get an SVG. Same seed, same drawing, slight combinations across names. No CDN, no account, no round trip.",
    carryIn: "deno run -A jsr:@decomm/avatar/init ./avatar",
    runLocal: "cd avatar && deno task compile && ./avatar.sh",
    github: "https://github.com/decomm-tools/avatar",
    jsr: "https://jsr.io/@decomm/avatar",
    related: ["ident", "qr"],
    status: "available",
  },
  {
    slug: "ident",
    name: "Ident",
    oneLiner: "A face and a name for a box with no accounts.",
    problem:
      "There is no SSO on the far side of the unplug. You still want to know who is sitting at this machine.",
    does:
      "A local identity kit: handle, color, fingerprint, avatar. Print it, pin it, put it next to a name in a file.",
    carryIn: "deno run -A jsr:@decomm/ident/init ./ident",
    related: ["avatar", "ca"],
    status: "coming",
  },
  {
    slug: "ferry",
    name: "Ferry",
    oneLiner:
      "Pack a folder for USB. Hashes on the way out, check them on the way in.",
    problem:
      "You copied a folder onto a stick and walked it over. Did every byte survive? Did anything extra hitch a ride?",
    does:
      "Manifest the tree, hash every file, pack it, copy it, verify it. A receipt for sneakernet.",
    carryIn: "deno run -A jsr:@decomm/ferry/init ./ferry",
    related: ["pack", "inspect"],
    status: "coming",
  },
  {
    slug: "pack",
    name: "Pack",
    oneLiner: "Seal a Deno project so it runs after the cable comes out.",
    problem:
      "`deno run` likes the network. The isolated box does not have one. A tool you cannot start is just a folder of regret.",
    does:
      "Lockfile, cached modules, sources — one folder that runs with `deno run --cached-only`. The rest of the suite depends on this, unlike Deno pack.",
    carryIn: "deno run -A jsr:@decomm/pack/init ./pack",
    related: ["ferry", "inspect"],
    status: "coming",
  },
  {
    slug: "qr",
    name: "QR",
    oneLiner:
      "Move a small secret with a screen and a camera. No cable, no wifi.",
    problem:
      "Two machines, a few kilobytes, and you do not want to plug anything in. USB is a conversation. A QR is a glance.",
    does:
      "Encode a file or a secret into QR frames. Film them. Rebuild the bytes on the other side.",
    carryIn: "deno run -A jsr:@decomm/qr/init ./qr",
    related: ["ferry", "avatar"],
    status: "coming",
  },
  {
    slug: "ca",
    name: "CA",
    oneLiner: "HTTPS on a LAN that will never see Let's Encrypt.",
    problem:
      "Browsers still want certificates. The isolated LAN has no ACME, no public DNS, no second chances from the internet.",
    does:
      "A tiny local certificate authority. Issue, trust, renew — all in the folder you carried in.",
    carryIn: "deno run --allow-read=. --allow-write=./ca ./init.ts ./ca",
    runLocal: "cd ca && deno task compile && ./ca.sh init --dir ./ca-data",
    related: ["ident", "inspect"],
    status: "coming",
  },
  {
    slug: "ledger",
    name: "Ledger",
    oneLiner:
      "A log of what happened on this machine that you can hash and trust later.",
    problem:
      "Something changed. A note in a text file is a rumor. You want a trail that is annoying to rewrite after the fact.",
    does:
      "A folder of jsonl ledgers. Each note stores SHA-256 of its index, time, body, and the previous note's hash. CLI for the box, plus a small UI on the LAN. verify walks the chain and fails if an old line was edited.",
    how:
      "Hashing is a fingerprint, not encryption. Anyone with the folder can still read the notes. The first note's prev is the word genesis. verify recomputes every hash and checks that prev pointers and indexes still line up. It will not catch a rewrite of the whole file where every hash is recomputed. It will catch a silent edit, a dropped line, or two notes swapped.",
    carryIn: "deno run -A jsr:@decomm/ledger/init ./ledger",
    runLocal:
      "cd ledger && deno task compile && ./ledger.sh --dir ./ledgers serve",
    github: "https://github.com/decomm-tools/ledger",
    jsr: "https://jsr.io/@decomm/ledger",
    related: ["inspect", "ferry"],
    status: "available",
  },
  {
    slug: "inspect",
    name: "Inspect",
    oneLiner: "A hashed inventory of what you carried in.",
    problem:
      "You brought a kit onto the box. Weeks later: is it still what you brought, or did a file grow a new friend?",
    does:
      "Walk the tree. Hash everything. Compare next time. A packing list for the sandbox.",
    carryIn: "deno run -A jsr:@decomm/inspect/init ./inspect",
    related: ["ferry", "pack"],
    status: "coming",
  },
];

export const getTool = (slug: string): Tool | undefined =>
  tools.find((tool) => tool.slug === slug);

export const relatedTools = (tool: Tool): Tool[] =>
  tool.related
    .map((slug) => getTool(slug))
    .filter((related): related is Tool => related !== undefined);
