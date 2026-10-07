# Copilot Chat Basic Workshop

Participant site for a one-day corporate workshop on Microsoft Copilot Chat for people **without** the paid Microsoft 365 Copilot license. Trainer: Asraf Jaafar Sidik (independent MCT, Malaysia). Published with GitHub Pages at asraf-js.github.io/Copilot-Chat-Basic-Workshop.

## Read this first

The shared rules for all of Asraf's courses (writing style, repository layout, chapter and prompts skeletons, screenshots, book, git) are in `COURSE-CONVENTIONS.md` in **Asraf-JS/training-book-kit**. Read it before you write or change anything. If that repository isn't in your session, add it (read access is enough) and open the file. This file only covers what is specific to this course, and wins where the two differ.

---

## What Basic users can and can't do

Everything on the main path must work with both **Copilot Chat (Basic)** (organisations over 2,000 users, no Copilot inside Word, Excel, PowerPoint or OneNote since 15 April 2026) and **M365 Copilot (Basic)** (smaller organisations, in-app Copilot with standard access). Chapter 09 is the only part that needs in-app Copilot, and it's marked optional.

**Can use:** Copilot Chat in the Microsoft 365 Copilot app (web grounding, file upload, the green EDP shield), Copilot in Outlook (thread summaries, drafting, questions about the inbox and calendar), Copilot Pages (export to Word), Copilot Notebooks in the Copilot app (not in OneNote for Copilot Chat Basic), prebuilt agents (Writing Coach, Prompt Coach, Visual Creator), Agent Builder with instructions and public websites only, Prompt Gallery, custom instructions and memory, the screenshot tool (Windows).

**Never on the main path:** Researcher, Analyst, Cowork, work-data grounding beyond uploaded files, SharePoint or file knowledge in agents, custom skills in Agent Builder, voice.

Standard access can be slow or limited at peak times. Every chapter has at least one `> **If you don't see this:**` box.

---

## Scenario

You're an executive in the Admin and Facilities department at **Teratai Holdings Berhad** (fictional, Kuala Lumpur). The department buys 25 laptops. Policy: above RM20,000 needs three written quotations, a comparison and a justification memo before the HOD signs off. Fictional HOD: Encik Faizal Rahman. Budget code: ADM-IT-2026-07. Class date used in screenshots and prompts: 14 October 2026.

Ten stages, one per chapter: Check, Explore, Ask, Compare, Chase, Draft, Organise, Reuse, Extend (optional), Repeat (capstone).

- Each chapter has `README.md` (notes) and `prompts.md` (in place of the `copy-paste.md` used in the Power Automate course).
- GCSE here means **Goal, Context, Source, Expectations**, the same as M365-Copilot-Workshop.
- Outlook training emails use the subject prefix `[CCB TRAINING]` and are only ever sent to yourself.

---

## Sample files and answer keys

- `_design/sample-files/build-sample-files.py` generates every sample PDF, both zips and both answer keys from one set of figures. Run `python3 _design/sample-files/build-sample-files.py`. It's deterministic: a rebuild only changes files whose content changed.
- Laptop purchase (Chapter 4, `04-compare-the-quotations/sample-files/`): Pinnacle Komputer (A, grand total digits transposed), Seri Mutiara Technology (B, expired), Cyberjaya Digital Supplies (C, 1-year warranty, not like-for-like), plus `procurement-policy.pdf`. The policy's Sections 5 to 7 are written so each seeded problem maps to a clause.
- Capstone (Chapter 10, `10-capstone/sample-files/`): Ilmu Cemerlang (no HRD Corp status), Pena Mahir (per-pax price charged per group), Bestari Skills (one day against a two-day brief).
- Answer keys go to `_trainer/`, which git ignores. They never go in the public repository. After changing a figure, regenerate and send Asraf the updated key, because the container is temporary.
- Chapter READMEs must not reveal the seeded problems before the chapter that finds them.

---

## Screenshots

- 57 screenshots are referenced in the READMEs; the per-chapter lists are in `_design/shots/<chapter>.md`, generated from the README image lines. Regenerate them if you add or rename an image.
- Codex captures on Asraf's Windows machine with `_design/screenshot-prompt.md` and the browser profile `.copilot-profile/`. It works on a `shots/<chapter>` branch and never pushes to `main`.
- Capture account: one unlicensed user in Asraf's training tenant, showing **M365 Copilot (Basic)**, for every chapter. The Copilot Chat (Basic) label only exists in organisations over 2,000 users, so `01-01` (that label) and `01-02` (work and consumer Copilot side by side) are captured by hand.
- Researcher and Analyst may be listed in a Basic account's left pane. Codex never opens them and records what's visible in `NOTES.md`. Stop only if the label reads M365 Copilot (Premium).

---

## Where things stand

Update this section in the same pull request as the work it describes.

- **Done and merged (PRs #1 and #2):** all eleven chapters with notes and prompts, sample files, answer keys, program flow banner, screenshot pipeline and shot lists, book config. The course book PDF is a first build without screenshots.
- **Capture accounts decided (PR #3):** every chapter is captured with one M365 Copilot (Basic) account; `01-01` and `01-02` are manual captures. If Codex reports Researcher or Analyst in the left pane, update section 1.4 of Chapter 01 to say Basic users may see them listed.
- **21 of 57 screenshots in place:** Chapters 03 (all 6) and 04 (7 of 8, `04-02` to retake after the upload fix) added from the first one-shot run, which stopped after Chapter 04; chapters 05 to 11 still to capture. Earlier: Chapter 01 (`01-03`, `01-04`) and Chapter 02 (`02-01`, `02-03` to `02-07`), all with red boxes. They were captured with Asraf's own account after its license was removed, so the left pane shows his other chats and pinned Researcher and Analyst. Use them for now and retake with a fresh, clean M365 Copilot (Basic) user. `02-03` shows Work IQ and Cowork, and `02-04` needs an empty message box. Manual captures still needed: `01-01` (Copilot Chat (Basic) label), `01-02` (work and consumer side by side), `02-02` (Edge sidebar), `02-08` (screenshot tool in the Windows desktop app).
- **Chapter 01 notes updated:** the label sits under your name at the bottom left of the Copilot app, the shield is at the top right with the tooltip "Enterprise data protection applies to this chat", there's no Regenerate button, and sources show as small grey labels (such as "microsoft +1") plus a **Sources** button. Chapter 03 (sources) and Chapter 06 (**More options** > **Edit in Pages**, Pages under **Library**) were updated to match.
- **Chapters 03 and 04 notes updated:** Sources opens a Sources pane (References); Prompt Gallery opens as Prompt Lab, prompts are saved with **Save prompt** on hover and listed under **Your saved prompts**; Settings is **Settings and more** (gear, bottom left) > **Settings** > **Personalization** > **Edit instructions** / **Save instructions**; Saved memories has a switch, per-memory delete and **Delete all memories**. **Copilot accepts at most three files per upload**, so Chapter 04 uploads the three quotations, then the policy (Chapter 10 hint updated too). The 4.3 prompt now ends "Use four short bullets: one per vendor and one for the policy."
- **Open decision: Chapter 04 spoilers.** `04-05` to `04-08` show Copilot finding the seeded problems. Asraf to decide whether to blur the telling values.
- **Privacy:** Asraf's account address was removed from the capture scripts (now read from the `CAPTURE_ACCOUNT` environment variable); a personal memory was blanked in `03-06`.
- **Chapter 02 notes updated to the real UI:** left pane (New chat, Search, Library, Agents, Notebooks, Pinned, Chats), Auto in the top bar, the chat menu (Rename, Move to notebook, Delete), Share response is a Frontier feature so Copy is the main path, and the screenshot tool isn't in the browser.
- **24 `<!-- VERIFY -->` comments** remain across the chapter READMEs. Clear each one when Codex's `NOTES.md` lines confirm or correct it.
- **After capture:** update the notes from `NOTES.md`, add red boxes to `_design/shots/annotations.json`, run `cd book && npm run annotate`, and rebuild the book.
- **Open choice:** British "licence" versus "license". The course uses "license" to match Asraf's brief and the repository description.
