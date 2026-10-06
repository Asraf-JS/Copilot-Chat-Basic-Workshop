# Screenshot prompt for Codex

> **Red boxes and step numbers.** Codex captures clean screenshots. They're copied into `_design/shots/raw/`, and the red highlight boxes and numbers are drawn from `_design/shots/annotations.json` by the kit's `annotate-shots` command: `cd book && npm run annotate`. To move a box, edit its `[x0, y0, x1, y1, step]` numbers and run it again. After a recapture, copy the new clean image into `raw/` first.

Codex works in a local clone of this repository, drives a real browser with Playwright, and saves each screenshot straight into the chapter's `images` folder. No uploading.

## One-time setup

1. Clone the repo and switch to the working branch:
   ```
   git clone https://github.com/Asraf-JS/Copilot-Chat-Basic-Workshop
   cd Copilot-Chat-Basic-Workshop
   git checkout build/initial-content
   ```
2. Open Codex in that folder.
3. You need **two training accounts**:
   - **Account 1** shows the **Copilot Chat (Basic)** label. It's used for every chapter except 09.
   - **Account 2** shows the **M365 Copilot (Basic)** label, with Copilot inside Word and Excel. It's used for Chapter 09 only.

   Check the label on each account before you start (see section 1.1 of the notes). A screenshot that shows a different label, or a Premium-only feature such as Researcher, can't be used.
4. You sign in once, by hand, in the browser window Codex opens. The sign-in is kept in `.copilot-profile/`, which git ignores, so it never reaches GitHub. For Chapter 09, sign out and sign in with Account 2, then switch back afterwards.

## How to run it

Paste the prompt below into Codex, **one chapter per conversation**, changing `CHAPTER` each time. Run the chapters in order (01 to 11), because later chapters reuse earlier work. Chapter 6 reuses the Chapter 4 chat, for example, and Chapter 10 uses the Chapter 8 agent.

Each chapter has a shot list in `_design/shots/CHAPTER.md`: the account label it needs, what to set up first, every screenshot with what the screen must show, and the `VERIFY` items to check while you're there.

| Chapter | Shots | Account | Sends or shares |
|---|---|---|---|
| 01-which-copilot-do-i-have | 4 | 1 (and a personal account for 01-02) | No |
| 02-find-your-way-around | 8 | 1 | Copy a share link only |
| 03-write-better-prompts | 6 | 1 | No |
| 04-compare-the-quotations | 8 | 1 | No |
| 05-copilot-in-outlook | 6 | 1 | Four setup emails to the signed-in account only |
| 06-from-chat-to-pages | 6 | 1 | Share dialog only, then Cancel |
| 07-copilot-notebooks | 4 | 1 | No |
| 08-build-a-quotation-checker | 6 | 1 | Share dialog only, then Cancel |
| 09-copilot-in-office-apps | 3 | 2 | No |
| 10-capstone | 2 | 1 | No |
| 11-extra-practice | 4 | 1 | No |

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
- Before the first capture, open the account card and check the Copilot label matches the one in _design/shots/CHAPTER.md. If it doesn't, stop and tell me.

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
- If a screen shows a feature the shot list says Basic doesn't have (Researcher, Analyst, a Work/Web toggle, SharePoint knowledge), stop and tell me: the account may have the wrong license.
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
