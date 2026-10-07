<div align="center">
  <img src="public/icon/128.png" width="88" height="88" alt="LinkZap" />

  <h1>LinkZap</h1>

  <p><strong>Select a phone number on any page, right-click, and the WhatsApp chat opens.</strong></p>

  <p>
    <img src="https://img.shields.io/badge/Chrome-MV3-4285F4?logo=googlechrome&logoColor=white" alt="Chrome MV3" />
    <img src="https://img.shields.io/badge/Firefox-MV2-FF7139?logo=firefoxbrowser&logoColor=white" alt="Firefox MV2" />
    <img src="https://img.shields.io/badge/built%20with-WXT-67D4A0" alt="Built with WXT" />
    <img src="https://img.shields.io/badge/privacy-no%20data%20collected-2E7D32" alt="No data collected" />
  </p>
</div>

---

No more copying a number, opening WhatsApp Web, pasting it into a contact form
and hoping the formatting survives. Highlight the number where you found it —
a CRM, a spreadsheet, an email, a listing — and start the conversation.

## Features

- **Right-click to chat.** The context menu appears on any text selection and
  previews the number it recognized.
- **Toolbar popup.** Click the icon to see the detected number, copy it in one
  tap, or open the chat.
- **Smart parsing.** Finds a phone number inside messy text, accepts `+`
  international formats, and assumes Brazil (`+55`) when no country code is
  present.
- **Not fooled by lookalikes.** Validates area code and subscriber length, so
  CPF, CNPJ and order IDs are not mistaken for phone numbers.
- **Works inside iframes.** Every frame of the active tab is scanned for the
  selection.
- **No account, no setup.** Install and use.

## How it works

```
"Contact: (11) 99876-5432"  →  5511998765432  →  https://wa.me/5511998765432
      selected text            E.164 digits          new tab
```

Number recognition lives in [`lib/phone.ts`](lib/phone.ts) — a single pass that
extracts candidate digit sequences, normalizes them to E.164, and validates
them before building the `wa.me` link.

## Install

**From source**

```bash
pnpm install
pnpm build           # Chrome / Edge — output in .output/chrome-mv3
pnpm build:firefox   # Firefox      — output in .output/firefox-mv2
```

Then load the built folder as an unpacked extension:

- **Chrome / Edge** — `chrome://extensions` → enable *Developer mode* → *Load unpacked*
- **Firefox** — `about:debugging#/runtime/this-firefox` → *Load Temporary Add-on*

## Development

```bash
pnpm dev             # Chrome, with hot reload
pnpm dev:firefox     # Firefox
pnpm compile         # type-check only
pnpm zip             # packaged build for store submission
```

## Project structure

```
entrypoints/
  background.ts      context menu registration and click handling
  popup/             toolbar UI (React + Tailwind)
lib/
  phone.ts           number extraction, E.164 normalization, formatting
  selection.ts       reads the selected text from the active tab
components/ui/       shadcn-style primitives (button, card, input)
```

## Permissions

The extension requests the minimum it needs, and nothing host-wide:

| Permission | Why |
| --- | --- |
| `activeTab` | Temporary access to the current tab, granted by your click, to read the selected text. |
| `scripting` | Runs a single function that only calls `window.getSelection()`. It never modifies the page. |
| `contextMenus` | Adds the *Open in WhatsApp* item when text is selected. |

## Privacy

LinkZap collects nothing. No servers, no database, no accounts, no analytics.
The selected text is processed in browser memory and discarded. See
[PRIVACY.md](PRIVACY.md) for the full policy.

## Tech stack

[WXT](https://wxt.dev) · React 19 · TypeScript · Tailwind CSS 4 · Radix UI · Lucide

## License

MIT
