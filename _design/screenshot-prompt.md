# Screenshot prompt for Codex

> **Current workflow:** the capture rules now live in `AGENTS.md` at the repo root, which Codex reads automatically. Start a fresh Codex session per chapter with low reasoning effort (`codex -c model_reasoning_effort="low"`) and give it the short prompt: `Capture chapter <CHAPTER> following AGENTS.md.` The longer prompt below is kept for reference.

> **Red boxes and step numbers.** Codex captures clean screenshots. They're copied into `_design/shots/raw/`, and the red highlight boxes and numbers are drawn from `_design/shots/annotations.json` by the kit's `annotate-shots` command: `cd book && npm run annotate`. To move a box, edit its `[x0, y0, x1, y1, step]` numbers and run it again. After a recapture, copy the new clean image into `raw/` first.

Codex works in a local clone of this repository, drives a real browser with Playwright, and saves each screenshot straight into the chapter's `images` folder. No uploading.

## One-time setup

1. Clone the repo and switch to the working branch:
   ```
   git clone https://github.com/Asraf-JS/Copilot-Chat-Basic-Workshop
   cd Copilot-Chat-Basic-Workshop
   git checkout main
   ```
2. Open Codex in that folder.
3. Use **one training account** that shows the **M365 Copilot (Basic)** label: an unlicensed user (no Microsoft 365 Copilot add-on) in Asraf's training tenant. The Copilot app, Outlook, Pages, Notebooks and Agent Builder look the same under both Basic labels, and this label also has Copilot inside Word and Excel for Chapter 09.

   The **Copilot Chat (Basic)** label only appears in organisations with more than 2,000 users, so `01-01` (that label) and `01-02` (work and consumer Copilot side by side) are captured by hand. Codex skips them.

   If the account shows **M365 Copilot (Premium)**, stop: it has the paid license. Researcher and Analyst may still appear in the left pane of a Basic account. Never open them, and record what's visible in `NOTES.md` so the notes can say what Basic users will see.
4. You sign in once, by hand, in the browser window Codex opens. The sign-in is kept in `.copilot-profile/`, which git ignores, so it never reaches GitHub.

## How to run it

Paste the prompt below into Codex, **one chapter per conversation**, changing `CHAPTER` each time. Run the chapters in order (01 to 11), because later chapters reuse earlier work. Chapter 6 reuses the Chapter 4 chat, for example, and Chapter 10 uses the Chapter 8 agent.

Each chapter has a shot list in `_design/shots/CHAPTER.md`: the account label it needs, what to set up first, every screenshot with what the screen must show, and the `VERIFY` items to check while you're there.

| Chapter | Shots | Sends or shares |
|---|---|---|
| 01-which-copilot-do-i-have | 4 (2 by hand: 01-01, 01-02) | No |
| 02-find-your-way-around | 8 | Copy a share link only |
| 03-write-better-prompts | 6 | No |
| 04-compare-the-quotations | 8 | No |
| 05-copilot-in-outlook | 6 | Four setup emails to the signed-in account only |
| 06-from-chat-to-pages | 6 | Share dialog only, then Cancel |
| 07-copilot-notebooks | 4 | No |
| 08-build-a-quotation-checker | 6 | Share dialog only, then Cancel |
| 09-copilot-in-office-apps | 3 | No |
| 10-capstone | 2 | No |
| 11-extra-practice | 4 | No |

Check progress any time with `node _design/check-screenshots.mjs`.

---

## The prompt

```text
CHAPTER = 04-compare-the-quotations

Capture the screenshots for one chapter of a Microsoft Copilot Chat training guide in this repo. Keep output short: no explanations or summaries while working.

Read only these files: CHAPTER/README.md, CHAPTER/prompts.md, _design/shots/CHAPTER.md, and _design/shots/NOTES.md. Don't read other chapters.

Setup:
- Use Playwright for Node with a persistent, headed context: user data dir ./.copilot-profile, viewport 1600x900, deviceScaleFactor 1. Use Microsoft Edge (channel 'msedge') if it's installed, otherwise Chromium. Install playwright in _design/ if it isn't there.
- Open https://m365.cloud.microsoft/chat. If it shows a sign-in page, wait (up to 5 minutes) for me to sign in by hand, then continue. Never type a password yourself.
- Before the first capture, open the account card and check the Copilot label reads M365 Copilot (Basic). If it reads M365 Copilot (Premium), stop and tell me.

Capture:
- Write one script, _design/shots/CHAPTER.mjs, that follows the numbered steps in README.md in order, using the prompts and values from prompts.md. Prefer getByRole / getByLabel / getByText locators. Copilot responses take time: wait for the response to finish (the Stop button disappears) before capturing.
- Every image line in README.md, ![description](./images/FILE.png), is a screenshot. The shot list says what each screen must show. When the screen matches, save page.screenshot({ path: 'CHAPTER/images/FILE.png', mask: [the signed-in account button/avatar at the top right] }) and copy the same file to _design/shots/raw/FILE.png. Close menus and tooltips first unless the description mentions them.
- Replace [today's date] in prompts with 14 October 2026.
- To save tokens: never print page HTML or the accessibility tree in full. When a locator fails, take one small screenshot to look, fix that locator, and rerun from the failing step.
- Reuse chats, Pages, Notebooks and agents from earlier chapters instead of creating duplicates.

Rules:
- Only send email to the signed-in account, and only the setup emails in 05/prompts.md Part 1. Never send a drafted reply.
- Never share a chat, Page or agent with anyone. Open the Share dialog for the screenshot, then Cancel.
- Never turn on, change or save any admin or organisation setting.
- If a screen would show real people's names, emails, chats or files other than mine, stop and ask me first.
- Researcher and Analyst may be listed in the left pane. Never open or use them, and don't stop because they're visible. Add one NOTES.md line saying which of them appear and where. Stop only if the label reads M365 Copilot (Premium).
- If a step doesn't match the UI (a renamed button, a missing option), use the closest equivalent and add one line to _design/shots/NOTES.md: chapter, step, what the README says, what the UI shows.
- Answer every item under "Check while you're there" in the shot list with one line in NOTES.md, even when the README is right.

Finish:
- Run node _design/check-screenshots.mjs and fix anything still missing for CHAPTER.
- git add CHAPTER/images _design/shots && git commit -m "Add CHAPTER screenshots" && git push
- Reply with only: files saved, and the NOTES.md lines you added.
```

---

## After capture

Paste the new `NOTES.md` lines to Claude. Claude updates the notes to match the real UI, removes the matching `<!-- VERIFY -->` comments, and adds the red boxes to `annotations.json`. Then run `cd book && npm run annotate` and rebuild the book.
