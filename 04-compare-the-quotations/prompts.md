# 04 - Compare the Quotations: Prompts

Compare the three laptop quotations against the procurement policy. Upload all four files from [sample-files.zip](./sample-files.zip) to **one chat** before you start. Hover over a grey box and click the copy icon in its top-right corner.

> **Session guide:** every part runs in the **same chat**, the one you uploaded the files to. Starting a new chat loses the files.

---

## Part 1: First look at the quotations

**Session:** new chat, with all four files uploaded | **Grounding:** uploaded files

```
I've uploaded three laptop quotations and an extract from our procurement policy. For each quotation, give me the vendor name, quotation number, date, validity, grand total, warranty and delivery lead time. Then tell me in one sentence what the policy extract covers.
```

If a file is missing from the answer:

```
You missed one of the quotations. Please read all three and include it.
```

If you had to upload the files in two batches:

```
I've added two more files. Include them too.
```

---

## Part 2: The comparison table

**Session:** same chat | **Grounding:** uploaded files

```
Build a side-by-side comparison table of the three quotations. Use one column per vendor and these rows: laptop model, processor, memory, storage, screen, unit price, bag, imaging and setup, delivery charge, subtotal, tax, grand total, warranty, delivery lead time, payment terms, validity. Use RM and show the figures exactly as printed in each quotation.
```

---

## Part 3: Checking the numbers

**Session:** same chat | **Grounding:** uploaded files

```
For each quotation, recalculate every line amount (quantity x unit price), the subtotal, the tax and the grand total. Show your working in a table, and compare your grand total with the grand total printed in the quotation. Tell me about any difference, however small.
```

When Copilot's figure and yours disagree:

```
My calculator gives a different figure for this total. Show me your working step by step, and tell me which figure is correct.
```

---

## Part 4: Checking against the policy

**Session:** same chat | **Grounding:** uploaded files

Replace `[today's date]` first.

```
Today's date is [today's date]. Check each quotation against Section 5 of the procurement policy, "What a valid quotation must show". Make a table with one row per requirement and one column per vendor. Mark each cell Yes, No or Unclear, and quote the words from the quotation that support your answer. Pay particular attention to whether each quotation is still valid today.
```

```
Are these three quotations like-for-like, according to Section 6 of the policy? List every difference in what is being offered, apart from price. For each difference, say whether it changes the comparison.
```

```
Adjust the comparison so all three quotations are like-for-like, using only prices the vendors have stated in writing in their quotations. Show the adjusted totals, including tax, and explain each adjustment.
```

To check any claim:

```
Where in the quotation did you find that? Quote the exact words.
```

---

## Part 5: Recommendation

**Session:** same chat | **Grounding:** uploaded files

```
Based on the checked figures, the policy check and the like-for-like adjustment, which vendor would you recommend, and why? List what must happen before the HOD can approve this purchase, for example any quotation that needs to be corrected or revalidated by the vendor. Say which approval the policy requires for this amount.
```

Name for the chat:

```text
Laptop purchase - comparison
```

---

## Part 6: Independent practice

**Session:** same chat | **Grounding:** uploaded files

Check the answer in the PDFs yourself.

```
Which vendor offers the shortest delivery lead time, and what condition, if any, is attached to it?
```
