# 04 - Compare the Quotations

> **The purchase so far:** Your requirements went out to three vendors (Chapter 3), and their quotations are back.

Before the HOD can sign off, policy says you need a written comparison and a justification memo. In this chapter you upload the quotations and the procurement policy, ask Copilot to build the comparison, and then do the part that matters most: check its work. Each quotation has a problem. Your job is to find all three.

> **Prompts:** every prompt you need is in the steps, with a Copy button. The [prompts page](./prompts.md) has them all on one page too.

**Estimated time:** 60 minutes

**Your result:** A checked comparison table of the three quotations, a list of problems to chase, and a recommendation you can defend.

---

## What You Will Learn

- Upload several files to one chat and ask questions across them
- Turn three quotations into one comparison table
- Check Copilot's arithmetic instead of trusting it
- Check documents against a policy, including dates
- Spot when a comparison isn't like-for-like, and adjust it
- Ask for a recommendation with reasons

---

## Before You Begin

You need:

- the green shield showing in the Copilot app (section 1.3)
- the four sample files, which you download in 4.1
- a calculator (the one on your computer or phone is fine)

| File | What it is |
|------|------------|
| `quotation-pinnacle-komputer.pdf` | Vendor A, Pinnacle Komputer Sdn Bhd, Petaling Jaya |
| `quotation-seri-mutiara.pdf` | Vendor B, Seri Mutiara Technology Sdn Bhd, Shah Alam |
| `quotation-cyberjaya-digital.pdf` | Vendor C, Cyberjaya Digital Supplies Sdn Bhd, Cyberjaya |
| `procurement-policy.pdf` | A two-page extract from Teratai Holdings' procurement policy |

> **Note:** Some screenshots in this chapter are blurred where they would give away the answers. Finding the problems yourself is the point of the lab.

> **Note:** Every company, person and number in these files is fictional. The tax rate is for training only. Never practise with real supplier quotations: they can contain prices and terms your company has agreed to keep confidential.

---

## 4.1 Download the Sample Files

1. Download **[sample-files.zip](./sample-files.zip)** (one click, all four files).
2. Open your Downloads folder, right-click the ZIP and choose **Extract All**, then **Extract**.
3. Open one quotation and have a quick look. You'll find a letterhead, a quotation number, a date, a validity period, line items, a tax line, a grand total and the terms. That's what Copilot is about to read.

![The Pinnacle Komputer quotation open in a PDF viewer](./images/04-01-sample-quotation.png)

*A typical quotation. Copilot reads the text in the PDF, including the small print in the terms.*

---

## 4.2 Start a New Chat and Upload the Files

1. In the Copilot app, select **New chat**. Check the green shield.
Copilot takes at most three files in one message, so the policy goes first, on its own.

2. In the message box, select **+**, then **Upload images and files**. Go to the extracted folder, select `procurement-policy.pdf` and select **Open**.
3. Wait for the upload to finish, then send this message with it:

   ```
   Here's our procurement policy. Confirm in one sentence that you've read it, then wait for the quotations.
   ```

4. Select **+** > **Upload images and files** again. Select the three quotations at once: click the first, then hold **Ctrl** and click the other two. Select **Open**.
5. Wait until each file shows in the message box without a progress circle. Don't send anything yet: the prompt for these files is in 4.3.

![The message box with the three quotation files attached and ready](./images/04-02-files-uploaded.png)

*Three quotations attached, ready for the prompt in 4.3. The policy is already in the chat from your first message.*

> **Note:** You may see a notice that uploading from your device saves a copy to your OneDrive. That's normal: the files stay in your organisation's storage.

> **Important:** Upload all four files in the **same chat**. Copilot can only compare files that are in the conversation it's working in. A quotation you uploaded in a different chat is invisible to this one.

> **If you don't see this:** If Copilot refuses a file, check you've attached no more than three to one message. If upload is greyed out or missing, your admin may have turned it off, or standard access may be limiting uploads at a busy time. Wait a few minutes and try again, or tell your trainer.

---

## 4.3 Summarise Each Quotation

Start with a summary of each file. It shows you whether Copilot read every file before you ask it to compare them.

1. With the four files attached, paste the prompt below and send it.

   ```
   I've uploaded three laptop quotations and an extract from our procurement policy. For each quotation, give me the vendor name, quotation number, date, validity, grand total, warranty and delivery lead time. Then tell me in one sentence what the policy extract covers. Use four short bullets: one per vendor and one for the policy.
   ```

2. Check that all three vendors and the policy appear in the answer. If one is missing, say so: `You missed the Seri Mutiara quotation. Please include it.`

![Copilot's summary listing each of the three quotations and the policy](./images/04-03-summaries.png)

*If a file is missing from the summary, Copilot didn't read it. Fix that before you go on.*

---

## 4.4 Build the Comparison Table

1. In the same chat, send:

   ```
   Build a side-by-side comparison table of the three quotations. Use one column per vendor and these rows: laptop model, processor, memory, storage, screen, unit price, bag, imaging and setup, delivery charge, subtotal, tax, grand total, warranty, delivery lead time, payment terms, validity. Use RM and show the figures exactly as printed in each quotation.
   ```

2. Read the table, row by row.

![The comparison table with one column per vendor](./images/04-04-comparison-table.png)

*A clean table. It looks finished, which is exactly why you check it next.*

> **Key point:** "Exactly as printed" matters. You want the table to show what each vendor wrote, mistakes included, so you can check it. If Copilot quietly fixes a figure, you lose the evidence.

---

## 4.5 Check the Arithmetic

Copilot is good with words and less reliable with sums. It often copies a total from a document without checking whether it adds up.

1. Ask Copilot to check the numbers:

   ```
   For each quotation, recalculate every line amount (quantity x unit price), the subtotal, the tax and the grand total. Show your working in a table, and compare your grand total with the grand total printed in the quotation. Tell me about any difference, however small.
   ```

2. Now check it yourself. Open one quotation and use your calculator:
   - add the line amounts and compare with the **Subtotal**
   - add the **Subtotal** and the **Tax** and compare with the **Grand total**
3. Do the same for the other two quotations. It takes about two minutes each.

![Copilot's recalculation table, with a column comparing printed and calculated grand totals](./images/04-05-arithmetic-check.png)

*Copilot shows its working. You still check at least the grand totals yourself.*

> **Warning:** Don't skip step 2 because Copilot says the numbers are fine. Copilot can make the same mistake the vendor made, or agree with the printed figure. If your calculator and Copilot disagree, trust your calculator, then ask Copilot to explain the difference.

**Checkpoint:** Did you find a total that doesn't add up? Note which vendor it is, the printed figure, and the correct figure.

---

## 4.6 Check the Quotations Against the Policy

Section 5 of the policy lists what a valid quotation must show. One of the rules is about dates, and Copilot doesn't always know today's date, so you tell it.

1. Replace `[today's date]` with today's date (for example, `14 October 2026`), then send:

   ```
   Today's date is [today's date]. Check each quotation against Section 5 of the procurement policy, "What a valid quotation must show". Make a table with one row per requirement and one column per vendor. Mark each cell Yes, No or Unclear, and quote the words from the quotation that support your answer. Pay particular attention to whether each quotation is still valid today.
   ```

2. Read the **No** and **Unclear** cells. Open the quotation and find the words Copilot quoted. Are they really there?

![The policy check table with Yes, No and Unclear for each requirement and vendor](./images/04-06-policy-check.png)

*A No or an Unclear is a question to answer, not a verdict. Open the PDF and look.*

**Checkpoint:** Did you find a quotation that can't be used as it is today? Which section of the policy says so?

> **Tip:** Copilot quotes words from the document when you ask it to. That's the fastest way to check a claim: search the PDF for the quoted words (Ctrl+F).

---

## 4.7 Is It Like-for-Like?

The policy says quotations must be compared like-for-like (Section 6). Look at your comparison table again. One vendor looks cheapest. Is it offering the same thing as the others?

1. Send:

   ```
   Are these three quotations like-for-like, according to Section 6 of the policy? List every difference in what is being offered, apart from price. For each difference, say whether it changes the comparison.
   ```

2. If Copilot finds a difference the policy says to adjust for, ask it to adjust using a price the vendor has written in its own quotation:

   ```
   Adjust the comparison so all three quotations are like-for-like, using only prices the vendors have stated in writing in their quotations. Show the adjusted totals, including tax, and explain each adjustment.
   ```

3. Check the adjusted total with your calculator.

![Copilot's list of differences between the quotations and the adjusted totals](./images/04-07-like-for-like.png)

*The cheapest quotation isn't always the cheapest once you compare the same thing.*

**Checkpoint:** Which vendor's position changed after the adjustment, and why?

---

## 4.8 Ask for a Recommendation

You now know the problems. Ask Copilot to put it together, then decide whether you agree.

1. Send:

   ```
   Based on the checked figures, the policy check and the like-for-like adjustment, which vendor would you recommend, and why? List what must happen before the HOD can approve this purchase, for example any quotation that needs to be corrected or revalidated by the vendor. Say which approval the policy requires for this amount.
   ```

2. Read the recommendation. Do you agree? If not, tell Copilot why and ask it to reconsider.
3. Rename the chat `Laptop purchase - comparison`. **Don't delete it.** You use it again in Chapter 6.

![Copilot's recommendation with the actions needed before approval](./images/04-08-recommendation.png)

*A recommendation with conditions. Chasing those conditions is the next chapter.*

> **Key point:** Copilot recommends. You decide. Your name goes on the memo, so you need to be able to explain every number in it without Copilot.

---

## Check Your Findings

Your trainer will go through the answers with the class. Before that, check your list:

- You found **three problems, one for each vendor**: one about the numbers, one about dates, and one about what's included.
- For each problem, you can name the section of the policy that applies.
- You can say what each vendor must do to fix its problem (and that it's the vendor's job to fix it, not yours).

---

## Independent Practice

Ask Copilot one question about the quotations that you can check in under a minute, such as "Which vendor offers the shortest delivery time?" Then check it in the PDFs. Did Copilot get it right?

---

## Troubleshooting

| Symptom | What to check |
|---------|---------------|
| Copilot only talks about one or two quotations | Not every file uploaded. Check the files in your first message, and upload the missing one in the same chat |
| Copilot refuses some of your files | It takes at most three files per message. Send the extra file in its own message in the same chat |
| Copilot says it can't see the files | You started a new chat. Go back to the chat where you uploaded them, or upload them again |
| The table has figures that aren't in any quotation | Ask "Where in the quotation did you find this figure? Quote it." Remove anything it can't quote |
| Copilot says every quotation is valid | Check you gave it today's date in 4.6 |
| The upload button is missing or greyed out | Your admin may have turned off upload, or uploads may be limited at busy times. Tell your trainer |
| An answer stops halfway | Standard access is busy. Wait a minute and send it again |

---

## Lesson Summary

Copilot read three quotations and a policy in seconds and built a comparison that would take you an hour by hand. It also missed things, or got them wrong, until you asked the right questions and checked the numbers yourself. That's the habit to take away: let Copilot do the reading and the layout, and keep the checking for yourself. Next, you use Copilot in Outlook to chase the vendors whose quotations need fixing.

**Check yourself:** Can you explain why all four files must be in the same chat, and why "exactly as printed" matters in a comparison?
