# decomm site

Pitch site for [decomm](https://github.com/decomm-tools): tools you download on
a connected machine, copy onto an isolated box, and run with no internet.

```sh
deno task dev
```

The catalog lives in `data/tools.ts`.

## Tools

| Tool                                             | Status    | What it is for                                                              |
| ------------------------------------------------ | --------- | --------------------------------------------------------------------------- |
| Avatar                                           | Available | Deterministic profile pics from a seed. Same name, same face. No Gravatar.  |
| Ident                                            | Coming    | A local face and handle when there is no SSO.                               |
| Ferry                                            | Coming    | Pack a folder for USB, hash it on the way out, verify on the way in.        |
| Pack                                             | Coming    | Vendor a Deno project so `deno run --offline` works after the copy.         |
| QR                                               | Coming    | Move a small secret with a screen and a camera.                             |
| CA                                               | Available | Your own certificates for HTTPS on a LAN that will never see Let's Encrypt. |
| [Ledger](https://github.com/decomm-tools/ledger) | Available | Append-only notes. Each hashes the last. `verify` walks the chain.          |
| Inspect                                          | Coming    | A hashed inventory of what you carried onto the box.                        |

Ledger hashing is not encryption. It is a fingerprint of each note plus a
pointer to the previous fingerprint. Edit an old line and `verify` fails.
