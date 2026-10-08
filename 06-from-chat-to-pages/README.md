# 06 - From Chat to Pages

> **The purchase so far:** You've compared the quotations (Chapter 4) and chased the vendors by email (Chapter 5). Now the HOD needs a memo.

Your comparison lives in a long chat, and long chats have a weakness: the more you go back and forth, the more likely something you agreed earlier quietly drops out. In this chapter you see that happen, then move the comparison into a Copilot Page, where the content stays put and you can edit it like a document. You write the justification memo on the same Page, share it, and export it for the HOD.

> **Prompts:** every prompt you need is in the steps, with a Copy button. The [prompts page](./prompts.md) has them all on one page too.

**Estimated time:** 40 minutes

**Your result:** A Copilot Page with the checked comparison and the justification memo, shared with a colleague and exported as a Word document and a PDF.

---

## What You Will Learn

- Recognise when a long chat has started to drift
- Send a Copilot response to a Page
- Edit a Page by hand and with Copilot
- Write a justification memo that follows the policy
- Share a Page and export it to Word and PDF

---

## Before You Begin

You need the **Laptop purchase - comparison** chat from Chapter 4, with the four files still in it. If you lost it, start a new chat, upload the four files again, and run Parts 2 to 5 of the [Chapter 4 prompts](../04-compare-the-quotations/prompts.md) before you start.

---

## 6.1 Why Long Chats Drift

Copilot reads the whole chat each time you send a message, but it doesn't treat every earlier message equally. After several rounds of changes, a point you settled ten messages ago can quietly disappear from the latest version. Nobody tells you. It's just no longer there.

Try it.

1. Open the **Laptop purchase - comparison** chat.
2. Send these three changes, one at a time:

   ```
   Shorten the comparison table to the 8 rows that matter most to a manager.
   ```

   ```
   Make the language more formal, and add a final row with your overall comment on each vendor.
   ```

   ```
   Now give me the final comparison table, ready for the HOD.
   ```

3. Look at the final table and compare it with what you found in Chapter 4. Check for each of these:
   - the corrected grand total for the vendor with the arithmetic error
   - the expired validity of the other vendor's quotation
   - the warranty adjustment that made the comparison like-for-like

![The final table from a long chat, where Pinnacle Komputer's total has gone back to the wrong printed figure](./images/06-01-chat-drift.png)

*After three rounds of changes, the corrected Pinnacle total has quietly gone back to the wrong printed figure. Nothing in the answer says so.*

**Checkpoint:** Did one of your findings disappear or change? In most classes, at least one does. If yours all survived, you were lucky, and it can still happen next time.

<details markdown="1">
<summary>What should you see?</summary>

Your final table should still show all three Chapter 4 findings:

- Pinnacle's grand total corrected to RM98,253.00 (printed RM98,523.00)
- Seri Mutiara's quotation marked as expired
- Cyberjaya's total adjusted for the warranty, RM95,445.00

The usual casualty is Pinnacle's total, which goes back to the printed RM98,523.00, as in the screenshot. The expiry note and the warranty adjustment often disappear when the table is shortened to 8 rows.

</details>

> **Key point:** When an answer matters and you've been changing it for a while, stop iterating in the chat. Ask for one complete version that lists everything it must include, then move it to a Page, where it can't drift.

---

## 6.2 Turn the Comparison into a Page

1. In the same chat, send this prompt. It names every finding, so none can be left out:

   ```
   Give me one complete comparison of the three laptop quotations for my HOD. Include: the figures exactly as printed; the recalculated grand totals, with the arithmetic error clearly marked; the validity of each quotation as of today, with the expired one clearly marked; the warranty adjustment that makes the comparison like-for-like, with adjusted totals; and a short list of open actions for each vendor. Use one table plus a short list of actions.
   ```

2. Check the answer against your Chapter 4 findings. Fix anything wrong now, with one more prompt, before you move it.
3. Under the response, select **More options** (**...**), then **Edit in Pages**. The Page opens next to the chat with the response copied into it, and the Page is attached to the message box so Copilot can work with it.

![A Copilot response with the Edit in Pages option, and the new Page open beside the chat](./images/06-02-edit-in-pages.png)

*The Page opens beside the chat. From now on, the Page is the version that counts.*

<details markdown="1">
<summary>What should you see?</summary>

One table and a short list of actions:

| | Pinnacle Komputer | Seri Mutiara Technology | Cyberjaya Digital Supplies |
|---|---|---|---|
| Grand total as printed | RM98,523.00 | RM94,905.00 | RM87,885.00 |
| Recalculated grand total | RM98,253.00 (error of RM270.00) | RM94,905.00 | RM87,885.00 |
| Valid today? | Yes, until 21 November 2026 | **No, expired 3 September 2026** | Yes, until 9 November 2026 |
| Warranty | 3 years onsite | 3 years onsite | 1 year carry-in |
| Like-for-like total | RM98,253.00 | RM94,905.00 | RM95,445.00 (with the RM280.00 per unit upgrade) |

Open actions: Pinnacle to issue a revised quotation with the correct total; Seri Mutiara to revalidate in writing; Cyberjaya's upgrade price to be confirmed in a revised quotation if it's chosen.

</details>

4. Select the title at the top of the Page and rename it:

   ```text
   Laptop purchase - comparison and memo
   ```

> **If you don't see this:** If there's no **Edit in Pages** option, select **Copy** under the response, open **Library** in the left pane of the Copilot app, create a new Page, and paste. If you can't create a Page at all, your organisation may have turned it off, or your account may not have OneDrive storage. Tell your trainer, and use a Word document instead for the rest of this chapter.

---

## 6.3 Edit the Page with Copilot

A Page is a document you can type in, with Copilot built in.

1. Click anywhere in the Page and type, the same as in Word. Correct any figure that doesn't match your own check.
2. In the message box beside the Page (the Page is attached to it), send:

   ```
   Add a "Status" row to the comparison table with one of these for each vendor: Ready, Needs correction, Needs revalidation, Needs revised quotation.
   ```

3. Copilot replies in the chat with the new row, and may offer a button to insert it. If it doesn't change the Page itself, add the row to the table by hand: select the last row, then **New**, and type the values.

![The Page with the new Status row added to the comparison table](./images/06-03-page-edited.png)

*Copilot suggests the change in the chat. The Page only changes when you insert it or type it yourself.*

> **Tip:** Type small fixes yourself. It's faster than asking Copilot, and you know exactly what changed.

<details markdown="1">
<summary>What should you see?</summary>

| | Pinnacle Komputer | Seri Mutiara Technology | Cyberjaya Digital Supplies |
|---|---|---|---|
| Status | Needs correction | Needs revalidation | Needs revised quotation |

"Needs revised quotation" for Cyberjaya is the strict answer: its quotation doesn't include the 3-year warranty. "Ready" is also defensible if you're happy to compare it using the upgrade price it stated in writing (Section 6.2). Nobody is "Ready" for Pinnacle or Seri Mutiara.

</details>

---

## 6.4 Write the Justification Memo

Section 7 of the policy lists what the memo must include. Ask Copilot to follow it, on the same Page, above the comparison.

1. In the chat beside the Page, send this prompt. The policy is still uploaded in this chat, so Copilot can use Section 7:

   ```
   Write a justification memo to the HOD for the laptop purchase, following Section 7 of the procurement policy exactly. Use a heading for each item Section 7 lists. Recommend the vendor from our comparison, but make the recommendation conditional on the open actions being completed in writing. Use [budget code] and [HOD name] as placeholders. Keep it to one page, in plain British English.
   ```

2. Read the memo. Check that every item in Section 7 has a heading, and that the total is the right one for the recommended vendor.
3. Under the memo, select **More options** (**...**). With your Page still open, the option reads **Add to page**. Select it, and the memo is added to the end of your Page.
4. Move the memo above the comparison: select the memo text, cut it (Ctrl+X), click at the top of the Page and paste (Ctrl+V). Check the headings: they can lose their formatting on the way, so tidy them up.

5. Replace `[budget code]` and `[HOD name]` with `ADM-IT-2026-07` and `Encik Faizal Rahman` (both fictional).

![The Page with the justification memo above the comparison table](./images/06-04-memo.png)

*Memo first, evidence after. The HOD reads the recommendation, then checks the table.*

> **Important:** Read every sentence of the memo as if you'd written it yourself, because you're the one signing it. Delete anything you can't back up from the quotations or the policy.

<details markdown="1">
<summary>What should you see?</summary>

One heading for each item in Section 7, with these facts:

- **Purpose:** 25 laptops for next quarter's new hires in Admin and Facilities
- **Budget:** ADM-IT-2026-07, with confirmation that budget is available
- **Quotations received:** PKS/Q/2026/0917 (22 September 2026), SMT-QT-26-0388 (4 August 2026), CDS/2026/Q-1142 (25 September 2026)
- **Comparison:** the like-for-like totals, with Cyberjaya's warranty adjustment shown
- **Recommendation:** Seri Mutiara Technology, RM94,905.00 including tax, for the lowest like-for-like price, 3-year onsite warranty, free delivery and shortest lead time
- **Issues and how they're resolved:** Seri Mutiara expired, revalidation requested in writing; Pinnacle's total wrong by RM270.00, revised quotation requested
- **Approval:** HOD, because the total is above RM20,000 and up to RM100,000 (Section 4)

The recommendation must be **conditional** on Seri Mutiara's written revalidation. If the memo quotes RM98,523.00 or RM87,885.00 as a comparison figure, it has picked up an unchecked number.

</details>

---

## 6.5 Share the Page

1. Select **Share** at the top right of the Page.
2. Select **Copy link**.
3. Paste the link into a Teams chat with the person your trainer pairs you with.
4. Ask your partner to open the link. They see the Page, but not your chat with Copilot.

![The Share menu on a Page, with Copy link and Copy component](./images/06-05-share-page.png)

*People you share with see the Page. They don't see the chat it came from or the files you uploaded there.*

---

## 6.6 Export to Word or PDF

Your HOD wants the memo as a document. Export the Page to Word, then save a PDF from Word.

1. At the top of the Page, select **More actions** (**...**), then **Export**.
2. Select **Document**. Word for the web opens with your memo and comparison, saved in your OneDrive.
3. Check the formatting, especially the table and the memo headings. Fix anything that moved.
4. For a PDF, go back to the Page and select **More actions** > **Export** > **PDF**. (In Word for the web, **File** > **Export** > **Download as PDF** works too.)

![The Page's More actions menu with Export open, showing Document and PDF](./images/06-06-export-word.png)

*Word for the web works without Copilot, so this step works with either Basic label.*

**Checkpoint:** You have a Page, a Word document in OneDrive, and a PDF in your Downloads folder, all with the same memo.

> **If you don't see this:** If the export option is missing, select everything in the Page (Ctrl+A), copy it, and paste it into a new Word document. The table may need tidying afterwards.

---

## Independent Practice

On your Page, ask Copilot to write a three-sentence summary of the memo for a Teams message to your HOD, letting them know the memo is coming. Put it at the end of the Page under a heading **Teams message**.

---

## Troubleshooting

| Symptom | What to check |
|---------|---------------|
| The memo is missing a policy item | Ask "Which items from Section 7 are missing from this memo?" and add them |
| Copilot says it can't see the policy | You're in a different chat from the one with the files. Go back to the comparison chat, or upload the policy again |
| Your partner can't open the shared Page | Check you shared it with their work account, not a personal address |
| The table breaks in Word | Select the table in Word and choose **Table** > **AutoFit** > **AutoFit to window** |
| Pages is missing | Your organisation may have turned Pages off, or you may not have OneDrive storage. Use Word instead |

---

## Lesson Summary

Long chats drift, so you moved the finished comparison into a Page, where it stays put and you can edit it directly. You wrote the memo against the policy, shared the Page, and turned it into a Word document and a PDF. Next, you put the whole purchase (quotations, policy and memo) into one Notebook.

**Check yourself:** What made the comparison drift, and what did you do to make sure the version on the Page was complete?
