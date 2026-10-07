# Screenshot capture rules for Codex

This repo is a training site. Your job here is to capture screenshots of Microsoft Copilot on Asraf's Windows machine. Claude reviews every screenshot, updates the notes and adds the red boxes afterwards, so keep your work to capturing and recording what you saw. Keep output short.

## Each run

Asraf names one chapter, for example `05-copilot-in-outlook`. CHAPTER means that name.

1. `git checkout main`, `git pull origin main`, `git checkout -b shots/CHAPTER`. If `shots/CHAPTER` already exists on origin, stop and say so.
2. Read only `CHAPTER/README.md`, `CHAPTER/prompts.md` and `_design/shots/CHAPTER.md`. Don't read other chapters.
3. Capture every screenshot listed in `_design/shots/CHAPTER.md`, following the numbered steps in the README.
4. Run `node _design/check-screenshots.mjs`.
5. `git add CHAPTER/images _design/shots`, commit `Add CHAPTER screenshots`, `git push -u origin shots/CHAPTER`. Never push to `main`. Don't open pull requests.
6. Reply with only: files saved, shots skipped, and the `NOTES.md` lines you added.

## Saving tokens

- Build on `_design/shots/run-helpers.mjs` (`attach`, `newChat`, `send`, `capture`, `stable`, `note`, `remember`). Write one short script per chapter, `_design/shots/CHAPTER.mjs`, that imports it. Don't rediscover the page layout.
- Never print page HTML or the accessibility tree. When a locator fails, read the first error line, fix that locator, and rerun from the failing step. Use `debug()` only after two failed fixes.
- Don't open saved screenshots to check them. Rely on the waits in `send()` and `stable()`. Claude reviews the images.
- Don't summarise between steps.

## Browser

- Headless Edge through Playwright, persistent profile `./.copilot-profile`, viewport 1600x900, deviceScaleFactor 1. Never open two browsers on the same profile.
- The sign-in account comes from `$env:CAPTURE_ACCOUNT`. Never write an email address into a committed file.
- If sign-in is needed, close headless Edge, open visible Edge on the same profile, and wait up to 5 minutes for Asraf to sign in. Never type a password.
- `capture()` masks the account avatar. Mask anything else personal too: Asraf's own saved memories, notes, or emails other than `[CCB TRAINING]` ones.

## Account

- Read the label under the account name at the bottom left of the Copilot app. It must read **M365 Copilot (Basic)**. If it reads **M365 Copilot (Premium)**, stop.
- Researcher, Analyst, a Work IQ toggle or a Cowork tab may be visible. Never open or use them, and don't stop because of them.

## Capturing

- Send prompts exactly as written in `CHAPTER/prompts.md`. The only change allowed is replacing `[today's date]` with `14 October 2026`. If an answer is too long for one screen, scroll; don't change the prompt.
- Each image line in the README has a description and an italic caption under it. Capture when the screen matches both.
- Wait for animations to finish: the greeting has stopped typing, the response is complete (Stop button gone), menus are fully open.
- For a shot about message-box controls, capture with the box empty unless the description says text is typed.
- Skip shots headless Playwright can't show (the Edge sidebar, the Windows desktop app, a personal Microsoft account). Add a `NOTES.md` line for each saying it needs a manual capture.
- Copilot takes at most three files per upload. Upload more with a second **+** in the same chat.
- Save each screenshot to both `CHAPTER/images/` and `_design/shots/raw/`, overwriting.

## Never

- Send email except the four setup emails in `05-copilot-in-outlook/prompts.md` Part 1, to the signed-in account only. Never send a drafted reply.
- Share a chat, Page, Notebook or agent. Open the Share dialog for the shot, then close it without copying the link.
- Change a setting or save a memory (Chapter 03's custom instructions are already done).
- Delete the chat "Laptop purchase - comparison", the Page "Laptop purchase - comparison and memo", the Notebook "Laptop purchase 2026" or the agent "Quotation Checker". Reuse them instead of creating duplicates.
- Edit README files, `prompts.md` files, `annotations.json` or this file.
- Show real people's names, emails, chats or files other than Asraf's. Stop and ask instead.

## NOTES.md

Add one line to `_design/shots/NOTES.md` for each difference between the README and the screen: `- CHAPTER, step: README says ...; UI shows ...`. Answer every item under "Check while you're there" in `_design/shots/CHAPTER.md` with one line, even when the README is right.

## Order

Later chapters reuse earlier work. Chapter 06 uses the Chapter 04 chat, 07 uses the Chapter 06 Page, and 10 uses the Chapter 08 agent. Chapter 09 needs Copilot inside Word and Excel: if it isn't there, note it and stop that chapter.
