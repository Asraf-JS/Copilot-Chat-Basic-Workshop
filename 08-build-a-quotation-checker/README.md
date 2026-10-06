# 08 - Build a Quotation Checker Agent

The checks you ran in Chapter 4 took an hour and about a dozen prompts. The next purchase will need the same checks. An agent is a version of Copilot with your instructions built in, so in this chapter you write those checks once and get the same careful review every time you upload a quotation.

> **Prompts:** every prompt and the full agent instructions are in the steps, with a Copy button. The [prompts page](./prompts.md) has them all on one page too.

**Estimated time:** 45 minutes

**Your result:** A **Quotation Checker** agent that checks validity, arithmetic, tax, warranty and delivery terms on any quotation you upload, shared with a colleague.

---

## What You Will Learn

- Use two prebuilt agents: Writing Coach and Prompt Coach
- Create an agent in Agent Builder
- Write agent instructions that turn a checklist into a repeatable review
- Add starter prompts
- Test an agent against known problems
- Share an agent with a colleague

---

## Before You Begin

You need the four PDFs from `sample-files.zip` (Chapter 4), and your justification memo from Chapter 6.

> **Note:** With Copilot Chat (Basic), you can build agents from **instructions** and **public websites**. You can't give an agent SharePoint sites or files as knowledge, and custom skills need a license. That's fine for this agent: you upload the quotations into the chat each time you use it.

---

## 8.1 Try a Prebuilt Agent

Microsoft includes some ready-made agents. Try two before you build your own.

**Writing Coach**

1. In the Copilot app, select **Agents** in the left pane (or **All agents**).
2. Select **Writing Coach**.
3. Paste the recommendation paragraph from your justification memo (Chapter 6) with the prompt below, then send:

   ```
   Give me feedback on this paragraph from a purchase memo to my head of department. Is it clear, and does it sound confident without overstating? Suggest one improved version.

   [paste your paragraph here]
   ```

![Writing Coach giving feedback on a paragraph from the memo](./images/08-01-writing-coach.png)

*Writing Coach explains what to change and why, as well as rewriting.*

**Prompt Coach**

4. Go back to **Agents** and select **Prompt Coach**.
5. Send it a weak prompt to improve:

   ```
   Improve this prompt using clear goal, context, source and expectations: "check this quotation"
   ```

6. Keep the improved prompt. It's a good start for your agent's instructions.

<!-- VERIFY: "Agents" in the left pane, and that Writing Coach, Prompt Coach and Visual Creator are listed for Copilot Chat (Basic) users. -->

> **If you don't see this:** Your admin decides which agents you see. If Writing Coach or Prompt Coach is missing, skip to 8.2. If **Agents** is missing completely, agents are turned off for your account, and the rest of this chapter is a trainer demo.

---

## 8.2 Open Agent Builder

1. In the left pane, select **Create agent** (it may be under **Agents** as **New agent**).
2. Agent Builder opens with two tabs: **Describe**, where you build the agent by chatting, and **Configure**, where you fill in each setting yourself.
3. Select **Configure**. You'll fill in each field, so you know exactly what the agent has been told.

<!-- VERIFY: "Create agent" / "New agent" wording and the Describe and Configure tabs in Agent Builder for Basic users. -->

![Agent Builder open on the Configure tab, with empty name, description and instructions fields](./images/08-02-agent-builder.png)

*Configure shows every setting on one screen. The test pane on the right lets you try the agent as you build it.*

---

## 8.3 Name and Describe the Agent

1. In **Name**, enter:

   ```text
   Quotation Checker
   ```

2. In **Description**, enter:

   ```text
   Checks supplier quotations for validity, arithmetic, tax, warranty, delivery terms and missing details before you compare them. Upload one or more quotations to start.
   ```

The description is what colleagues see when you share the agent, so make it say what the agent does and how to start.

---

## 8.4 Write the Instructions

The instructions are the most important part. They're the same checks you ran in Chapter 4, written once.

1. Click in **Instructions**.
2. Paste the instructions below. Read them through: every line is something you did by hand earlier.

   ```
   You are Quotation Checker, an assistant for the Admin and Facilities department of a Malaysian company. You check supplier quotations before they are compared or approved.

   When the user uploads one or more quotations:
   1. If the user has not told you today's date, ask for it before you check validity. Do not guess the date.
   2. For each quotation, list: supplier name and registration number, quotation number, date, validity or expiry date, and the person who signed it.
   3. Validity: say whether the quotation is still valid on today's date. If it has expired, say so clearly and say that the supplier must revalidate it in writing.
   4. Arithmetic: recalculate every line amount (quantity x unit price), the subtotal, the tax and the grand total. Show your working in a table. Compare each figure with the figure printed in the quotation and report every difference, however small. Never correct a supplier's figures silently: show the printed figure and your figure side by side.
   5. Tax: confirm the tax is shown as a separate line, and state the rate printed on the quotation. Do not assume or name an official tax rate.
   6. Warranty and delivery: state the warranty (length, onsite or carry-in, what it covers) and the delivery lead time. If there is more than one quotation, flag any differences that stop them being like-for-like.
   7. Missing details: check that each quotation shows all of the following, and list anything missing: supplier name and registration number, quotation number, date, validity, item descriptions with quantities and unit prices, subtotal, tax as a separate line, grand total, payment terms, delivery lead time, warranty or service scope, and an authorised signature. For training services, also check whether the quotation says if the programme is HRD Corp claimable.
   8. End with a short section called "Questions to ask the supplier", with one question for each problem you found.

   Rules:
   - Use only what is written in the uploaded quotations. Quote the exact words when you report a problem.
   - If something is unclear or unreadable, say so. Do not fill the gap with a guess.
   - Use Malaysian Ringgit (RM) and British English.
   - Do not recommend a supplier unless the user asks you to.
   ```

![The Instructions box filled in with the Quotation Checker instructions](./images/08-03-instructions.png)

*Numbered steps make the agent work through the checks in the same order every time.*

3. Look for **Knowledge** below the instructions. Leave it empty. This agent doesn't need web pages, and Basic can't add files or SharePoint as knowledge.
4. If there's an option to search the web, turn it off, so the agent sticks to the quotations you upload.

<!-- VERIFY: the Knowledge section layout and the web search toggle in Configure for Basic users. -->

> **Key point:** An agent is only as good as its instructions. Rule 1 (ask for the date) and the "never correct silently" line in step 4 fix the two mistakes Copilot made most often in Chapter 4.

---

## 8.5 Add Starter Prompts

Starter prompts are buttons people see when they open the agent. They show colleagues how to use it.

1. Find **Starter prompts** and add these three. Each one has a title and a message.

| Title | Message |
|-------|---------|
| Check a quotation | `Check the quotation I've uploaded. Today's date is [today's date].` |
| Compare quotations | `Check the quotations I've uploaded and tell me whether they're like-for-like. Today's date is [today's date].` |
| What's missing? | `List anything missing from the quotation I've uploaded, and draft one question to the supplier for each item.` |

![The Starter prompts section with three prompts added](./images/08-04-starter-prompts.png)

*Starter prompts appear as buttons when someone opens the agent.*

---

## 8.6 Test the Agent with the Quotations

Test the agent against the quotations you already know the answers to. If it finds the three problems, it's ready.

1. In the test pane on the right, upload `quotation-pinnacle-komputer.pdf`.
2. Send `Check this quotation. Today's date is [today's date].` with today's date filled in.
3. Did it find the arithmetic error? Did it show the printed and correct totals side by side?
4. Upload `quotation-seri-mutiara.pdf` and `quotation-cyberjaya-digital.pdf`. Send `Check these two as well, and tell me whether all three are like-for-like.`
5. Check it flagged the expired quotation and the warranty difference.

<!-- VERIFY: whether files can be uploaded in the Agent Builder test pane for Basic users. If not, test after creating the agent (8.7). -->

![The test pane showing the agent's check of the Pinnacle Komputer quotation, with the grand total difference highlighted](./images/08-05-test-agent.png)

*The agent found the same error you found by hand in Chapter 4, in one prompt.*

6. If it missed something, add a line to the instructions that tells it what to do, then test again. For example, if it didn't ask for the date, make Rule 1 the very first line.

> **If you don't see this:** If you can't upload files in the test pane, create the agent first (8.7), open it from **Agents**, and test it there. If an upload fails at a busy time, wait a minute and try again.

---

## 8.7 Create and Share the Agent

1. Select **Create** at the top right. Agent Builder creates the agent and shows a confirmation.
2. Select **Share** (or copy the link from the confirmation).
3. Choose who can use it. For this course, share it with the person your trainer pairs you with.
4. Copy the link and send it to them in Teams.
5. Open your agent from **Agents** in the left pane, and use a starter prompt with one of the quotations.

<!-- VERIFY: the share options after "Create" (specific people, anyone in the organisation) and whether admins can restrict agent sharing for Basic users. -->

![The agent created, with the Share option and the sharing link](./images/08-06-share-agent.png)

*People you share with can use the agent. They can't see your chats with it, and they upload their own quotations.*

> **Important:** Sharing the agent shares its instructions, not your files or chats. Anyone who opens it can read the instructions, so don't put confidential information in them, such as budget limits or a preferred supplier.

---

## Independent Practice

Update the agent so it also checks payment terms, and flags any quotation that asks for a deposit before delivery. Edit the agent (open it, then **Edit**), add one line to the instructions, update, and test it on one of the capstone quotations in `10-capstone/sample-files`.

---

## Troubleshooting

| Symptom | What to check |
|---------|---------------|
| The agent checks validity without asking for the date | Put Rule 1 at the top of the instructions, and include the date in your starter prompts |
| The agent quietly corrects a vendor's total | Add "Show the printed figure and your figure side by side" to step 4 |
| The agent says it has no files | You're in a new chat with the agent. Upload the quotation again |
| Create or Share is greyed out | Your admin may limit who can create or share agents. Ask your trainer |
| Your colleague can't open the agent | Check you shared it with their work account. They may need to refresh the Agents list |
| Responses are slow | Standard access is busy. Wait a minute and try again |

---

## Lesson Summary

You turned an hour of careful checking into an agent that runs the same checks on any quotation in one prompt. The instructions hold the checklist, you upload the quotations each time, and colleagues can use it too. Next, if your label allows it, you look at Copilot inside Word and Excel. If not, go straight to the capstone, where your agent gets its first real job.

**Check yourself:** Why does this agent need no knowledge sources? Which two lines in the instructions fix mistakes Copilot made in Chapter 4?
