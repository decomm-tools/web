export type ToolStatus = "coming" | "prototype" | "available";

export type ExampleStep = {
  run: string;
  out: string;
};

export type Tool = {
  slug: string;
  name: string;
  oneLiner: string;
  problem: string;
  does: string;
  example: ExampleStep[];
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
    example: [
      {
        run: "./avatar.sh --seed sandbox --out sandbox.svg",
        out: "Wrote sandbox.svg",
      },
    ],
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
    example: [
      {
        run: "./ident.sh --dir ./idents init",
        out: "Ident folder ./idents",
      },
      {
        run: "./ident.sh --dir ./idents create holden",
        out:
          "created holden\nseed holden\ncolor #e8a317 (warm)\nfingerprint 00a503d3-5d63ac5f\n./idents/holden/face.svg\n./idents/holden/card.html",
      },
      {
        run: "./ident.sh --dir ./idents show holden",
        out:
          "holden\nseed holden\ncolor #e8a317 (warm)\nfingerprint 00a503d3-5d63ac5f\n./idents/holden/face.svg\n./idents/holden/card.html",
      },
    ],
    carryIn: "deno run -A jsr:@decomm/ident/init ./ident",
    runLocal: "cd ident && deno task compile && ./ident.sh",
    github: "https://github.com/decomm-tools/ident",
    jsr: "https://jsr.io/@decomm/ident",
    related: ["avatar", "task"],
    status: "available",
  },
  {
    slug: "task",
    name: "Task",
    oneLiner: "A local board for the dark box. Deno KV, no cloud, no accounts.",
    problem:
      "The isolated box still has work on it. Notion is HQ for the connected team. The far side needs its own board that never phones home.",
    does:
      "A carry-in folder with a sqlite KV file you can ferry. CLI is the source of truth: init, add, show, list, move, assign, serve. Statuses are backlog, todo, doing, done. serve is a small LAN board over the same store.",
    example: [
      {
        run: "./task.sh --dir ./tasks init",
        out: "Task folder ./tasks",
      },
      {
        run: './task.sh --dir ./tasks add "swap the drive"',
        out: "#1  backlog  swap the drive",
      },
      {
        run: "./task.sh --dir ./tasks move 1 doing",
        out: "#1  doing  swap the drive",
      },
      {
        run: "./task.sh --dir ./tasks assign 1 holden",
        out: "#1  doing  holden  swap the drive",
      },
    ],
    carryIn: "deno run -A jsr:@decomm/task/init ./task",
    related: ["ident", "ledger"],
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
      "Manifest the tree, hash every file, pack it, copy it, verify it. A receipt for sneakernet. `out` writes ferry.jsonl inside the folder. `in` fails on missing, extra, or changed.",
    example: [
      {
        run: "./ferry.sh out ./kit",
        out: "1 file, 14 B\n./kit/ferry.jsonl",
      },
      {
        run: "./ferry.sh in ./kit",
        out: "ok (1)",
      },
    ],
    carryIn: "deno run -A jsr:@decomm/ferry/init ./ferry",
    runLocal: "cd ferry && deno task compile && ./ferry.sh",
    github: "https://github.com/decomm-tools/ferry",
    jsr: "https://jsr.io/@decomm/ferry",
    related: ["pack", "inspect"],
    status: "available",
  },
  {
    slug: "pack",
    name: "Pack",
    oneLiner: "Seal a Deno project so it runs after the cable comes out.",
    problem:
      "`deno run` likes the network. The isolated box does not have one. A tool you cannot start is just a folder of regret.",
    does:
      "Lockfile, cached modules, sources — one folder that runs with `deno run --cached-only`. This is not Deno's `pack` command (npm tarballs). The rest of the suite depends on this.",
    example: [
      {
        run: "./pack.sh seal ./my-app",
        out:
          "Sealed ./my-app\nentry: main.ts\nCopy the folder, including vendor/ and deno.lock, onto the isolated box.\nThen: deno run --cached-only main.ts",
      },
    ],
    carryIn: "deno run -A jsr:@decomm/pack/init ./pack",
    runLocal: "cd pack && deno task compile && ./pack.sh",
    github: "https://github.com/decomm-tools/pack",
    jsr: "https://jsr.io/@decomm/pack",
    related: ["ferry", "inspect"],
    status: "available",
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
    example: [
      {
        run: "./qr.sh send ./secret.txt",
        out: "3 frames. Point the far camera at this screen.",
      },
      {
        run: "./qr.sh recv --out ./secret.txt",
        out: "Wrote ./secret.txt (ok)",
      },
    ],
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
    example: [
      {
        run: './ca.sh init --dir ./ca-data --name "sandbox CA"',
        out: "CA created in ./ca-data",
      },
      {
        run:
          "./ca.sh issue --dir ./ca-data --cn box.local --dns box.local --ip 10.0.0.5",
        out: "Issued box.local in ./ca-data/issued",
      },
      {
        run: "./ca.sh trust --dir ./ca-data --out ./ca.pem",
        out: "Wrote ./ca.pem",
      },
    ],
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
    example: [
      {
        run: "./ledger.sh --dir ./ledgers init",
        out: "Ledger folder ./ledgers",
      },
      {
        run: "./ledger.sh --dir ./ledgers create notes",
        out: "Created notes",
      },
      {
        run: './ledger.sh --dir ./ledgers add notes "swapped the drive"',
        out:
          "#0 b2670c829eafc2f26e2f1e942e2a8d824a58919497225fab29f88973af75387c",
      },
      {
        run: "./ledger.sh --dir ./ledgers verify",
        out: "notes: ok (1)",
      },
    ],
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
    example: [
      {
        run: "./inspect.sh snap ./kit",
        out: "Wrote ./kit/inspect.jsonl (1 file)",
      },
      {
        run: "./inspect.sh check ./kit",
        out: "ok (1)",
      },
    ],
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

export const exampleCommands = (tool: Tool): string =>
  tool.example.map((step) => step.run).join("\n");

export const availableNames = (): string => {
  const names = tools
    .filter((tool) => tool.status === "available")
    .map((tool) => tool.name);
  if (names.length === 0) return "None";
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
};

export const availableBlurb = (): string => {
  const names = availableNames();
  const verb = names.includes(" and ") ? "are" : "is";
  return `${names} ${verb} available`;
};
