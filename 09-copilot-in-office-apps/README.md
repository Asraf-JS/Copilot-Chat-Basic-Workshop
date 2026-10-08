# 09 - Optional: Copilot in Word and Excel

> **Optional chapter, for M365 Copilot (Basic) only.** If your label in section 1.1 is **Copilot Chat (Basic)**, you don't have Copilot inside Word and Excel. Watch your trainer's demo, or go straight to [Chapter 10](../10-capstone/).

> **The purchase so far:** The memo is exported to Word and the comparison is on a Page (Chapter 6). This optional chapter polishes both inside the Office apps.

If your organisation is under 2,000 users, you probably have **M365 Copilot (Basic)**, which includes Copilot inside the Office apps with standard access. In this chapter you open the memo you exported in Chapter 6 in Word, and the comparison in Excel, and use Copilot where the documents live.

> **Prompts:** every prompt you need is in the steps, with a Copy button. The [prompts page](./prompts.md) has them all on one page too.

**Estimated time:** 30 minutes

**Your result:** A tightened memo in Word and an Excel comparison with a checked total column.

---

## What You Will Learn

- Confirm you have Copilot inside Word and Excel
- Ask Copilot about the document you have open in Word, and improve part of it
- Put the comparison into an Excel table and ask Copilot questions about it
- Use a formula Copilot suggests to check totals

---

## Before You Begin

You need:

- the label **M365 Copilot (Basic)** (or Premium) from section 1.1
- the Word memo you exported in Chapter 6, saved in OneDrive
- the Page **Laptop purchase - comparison and memo**

> **Note:** Standard access applies inside the apps too. At busy times the Copilot pane can be slow or say it's temporarily limited. Wait a minute and try again.

---

## 9.1 Check You Have Copilot in the Apps

1. Open the exported memo from OneDrive in **Word for the web**.
2. On the **Home** tab, look for the **Copilot** button at the right end of the ribbon.
3. Select it. The Copilot pane opens on the right.

<!-- Screenshot still to capture: 09-01-word-copilot-pane.png. Remove this comment wrapper when the image is added.
![Word for the web with the Copilot button on the Home tab and the Copilot pane open](./images/09-01-word-copilot-pane.png)

*If the Copilot button is there and the pane opens, you can do this chapter.*
-->

> **If you don't see this:** No Copilot button means your label is Copilot Chat (Basic), or your admin has turned Copilot off in the apps. Close Word and watch the demo. If the button is there but greyed out, check the document is saved in OneDrive (not on your computer), and that **AutoSave** is on.

---

## 9.2 Refine the Memo in Word

1. In the Copilot pane, send:

   ```
   Summarise this memo in three bullet points, and tell me which part a busy head of department is most likely to question.
   ```

2. Read the answer. Copilot is working with the document you have open.
3. Ask for a tighter version of the weakest part:

   ```
   Rewrite the recommendation section so it is no more than 80 words, keeps every figure exactly as it is, and states the conditions clearly. Show me the new version in the chat.
   ```

4. Compare the new version with your original. Check every figure. If you prefer the new one, copy it from the pane and paste it over the old paragraph.

<!-- VERIFY: which Copilot actions in Word are available with M365 Copilot (Basic): the chat pane is expected; check whether inline "Rewrite" or "Draft with Copilot" also appear for Basic or only for Premium. -->

<!-- Screenshot still to capture: 09-02-word-rewrite.png. Remove this comment wrapper when the image is added.
![The Copilot pane in Word with a shorter recommendation section](./images/09-02-word-rewrite.png)

*Copilot suggests, you paste. Check the figures before you replace anything.*
-->

> **Important:** Your memo was checked line by line in Chapter 6. Any rewrite can change a figure or soften a condition. Read the new version against the old one before you keep it.

---

## 9.3 Analyse the Comparison in Excel

1. Open your Page **Laptop purchase - comparison and memo**, select the comparison table, and copy it (Ctrl+C).
2. In OneDrive, select **Create or upload** > **Excel workbook**. Name it `Laptop comparison`.
3. Select cell **A1** and paste (Ctrl+V).
4. Select any cell in the data, then **Insert** > **Table**. Tick **My table has headers** and select **OK**. Copilot works best with data in a table.
5. Select **Copilot** on the **Home** tab to open the pane.
6. Ask:

   ```
   Which vendor has the lowest like-for-like total in this table, and by how much?
   ```

7. Ask for a formula to check the totals:

   ```
   Give me a formula I can put in a new row to check that subtotal plus tax equals the grand total for each vendor, showing TRUE or FALSE. Tell me which cell to put it in.
   ```

8. Add the formula where Copilot suggests, then fill it across for all three vendors. A FALSE shows a vendor whose total doesn't add up.

<!-- VERIFY: whether Copilot in Excel (M365 Copilot Basic) can insert the formula itself, or only suggest it in the pane. The steps assume it suggests and you add it. -->

<!-- Screenshot still to capture: 09-03-excel-check.png. Remove this comment wrapper when the image is added.
![Excel with the comparison table and a TRUE or FALSE check row, and the Copilot pane showing the suggested formula](./images/09-03-excel-check.png)

*A check row in Excel catches the same arithmetic error you found with a calculator in Chapter 4.*
-->

> **Tip:** The comparison table may paste with numbers stored as text (left-aligned, with RM in the cell). If a formula returns an error, ask Copilot: `Some numbers in this table are stored as text. How do I convert them to numbers?`

---

## Independent Practice

In Word, ask Copilot to list every number in the memo with the sentence it appears in. Check each one against your Excel table.

---

## Troubleshooting

| Symptom | What to check |
|---------|---------------|
| No Copilot button | Your label is Copilot Chat (Basic), or Copilot is turned off in the apps |
| The Copilot button is greyed out | Save the file to OneDrive and turn on AutoSave |
| Copilot in Excel says it needs a table | Select the data and choose **Insert** > **Table** |
| The formula returns #VALUE! | Some numbers are stored as text. Convert them, or retype the figures |
| Copilot says it's temporarily limited | Standard access is busy. Wait and try again |

---

## Lesson Summary

With M365 Copilot (Basic), Copilot works inside the documents themselves: you tightened the memo in Word and checked the comparison with a formula in Excel. Next is the capstone, where you run a whole purchase on your own.

**Check yourself:** Why put the comparison into an Excel table before asking Copilot about it?
