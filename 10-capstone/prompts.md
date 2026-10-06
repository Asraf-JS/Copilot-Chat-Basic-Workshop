# 10 - Capstone: The Training Vendor Purchase: Prompts

Starter prompts for each stage of the capstone. Try writing your own with GCSE first, and use these only if you get stuck. Hover over a grey box and click the copy icon in its top-right corner.

> **Session guide:** Part 1 runs in a new chat. Part 2 starts in your **Quotation Checker** agent, then moves to a new chat with all four files uploaded. Parts 3 and 4 run in that same chat. Part 5 runs in Outlook.

---

## Part 1: Requirements

**Session:** new chat | **Grounding:** web

```
Draft the requirements for a request for quotation for a two-day in-house Effective Business Writing course for 30 executives at our Kuala Lumpur office in November 2026. The course must be HRD Corp claimable. Base it on what a good in-house training quotation should include, and show your sources. Format it as a numbered list under 200 words, including duration, participants, venue, HRD Corp status, what the fee must include, and what the quotation must show (validity, tax as a separate line, payment terms).
```

---

## Part 2: Comparison and checks

**Session:** Quotation Checker agent, with the three quotations uploaded | **Grounding:** uploaded files

```
Check the quotations I've uploaded and tell me whether they're like-for-like. Today's date is [today's date].
```

**Session:** new chat, with all four files uploaded | **Grounding:** uploaded files

```
I've uploaded three quotations for a two-day in-house Effective Business Writing course for 30 participants, and our procurement policy. Build a comparison table with one column per provider and these rows: course title, duration, number of participants covered, pricing basis (per participant or per group), fee, materials, subtotal, tax, grand total, HRD Corp claimable status, validity, payment terms. Show figures exactly as printed.
```

```
Check each quotation against our brief: two days, 30 participants, in-house, HRD Corp claimable. Then check each against Section 5 of the policy. Today's date is [today's date]. Quote the words from each quotation that support your answer.
```

```
One quotation states a price per participant but calculates the fee as one group. What would the total be if the per-participant price were applied to 30 participants, including tax? Show your working. I will ask the provider to confirm, so label this as unconfirmed.
```

---

## Part 3: Memo

**Session:** same chat | **Grounding:** uploaded files

```
Give me one complete comparison of the three training quotations for my HOD. Include: figures as printed; any figure that needs correcting by the provider, clearly marked as unconfirmed; whether each quotation matches the brief; HRD Corp status; and the open action for each provider. Use one table plus a short list of actions.
```

```
Write a justification memo to the HOD for the training purchase, following Section 7 of the procurement policy exactly. Use a heading for each item Section 7 lists. Make the recommendation conditional on the open actions being completed in writing, and explain why the cheapest-looking quotation is or isn't recommended. Use [budget code] and [HOD name] as placeholders. One page, plain British English.
```

---

## Part 4: Notebook

**Session:** Training purchase 2026 Notebook | **Grounding:** Notebook references

Notebook name (text):

```text
Training purchase 2026
```

```
What's still outstanding before the HOD can approve this? For each item, say which provider it involves and which policy section requires it.
```

---

## Part 5: Chasing emails

**Session:** Outlook, new mail to yourself, Draft with Copilot | **Grounding:** your prompt

Use a subject that starts `[CCB TRAINING]`. Fill in the square brackets from your own findings.

```
Write a polite email to [contact name] at [provider] about quotation [quotation number] for our two-day Effective Business Writing course for 30 executives. Explain that [the problem you found], and ask them to [what you need: a revised quotation, or written confirmation]. Brief and factual, British English.
```
