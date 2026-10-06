# 05 - Chase Vendors with Copilot in Outlook: Prompts

The vendor emails to send yourself, and the prompts for Copilot in Outlook. Hover over a grey box and click the copy icon in its top-right corner. Anything marked **text** is pasted straight into an email.

> **Session guide:** these prompts run in Outlook on the web, not in the Copilot app. Part 2 uses **Summarize** on an open email, Part 3 uses the **Copilot pane**, and Part 4 uses **Draft with Copilot** in a reply.

---

## Part 1: Vendor emails to send yourself

Send each email to your own address. Send Emails 1, 2 and 3 as new messages. Send Email 4 as a **reply** to Email 1, so the two form one conversation.

### Email 1: Seri Mutiara Technology (new email)

Subject (text):

```text
[CCB TRAINING] Quotation SMT-QT-26-0388 for 25 laptops
```

Body (text):

```text
Dear Sir/Madam,

Thank you for your call this morning about our quotation SMT-QT-26-0388 dated 4 August 2026 for 25 Halcyon WorkBook 14 laptops.

You are right that the quotation was valid for 30 days only. Memory and storage prices have moved since August, so some of our prices may have changed. I have asked our principal to confirm current pricing and will come back to you as soon as I hear from them.

In the meantime, please confirm that you still need the laptop backpacks and the imaging service.

Best regards,
Nur Aisyah binti Kamal
Account Executive
Seri Mutiara Technology Sdn Bhd
Tel: 019-277 5103
```

### Email 2: Cyberjaya Digital Supplies (new email)

Subject (text):

```text
[CCB TRAINING] Warranty options for quotation CDS/2026/Q-1142
```

Body (text):

```text
Dear Sir/Madam,

Thank you for considering Cyberjaya Digital Supplies.

Our quotation CDS/2026/Q-1142 includes the standard 1-year carry-in warranty. For corporate customers we recommend the 3-year onsite warranty upgrade at RM280.00 per unit, as stated in our quotation. We can also offer a 2-year carry-in extension at RM150.00 per unit.

We would be happy to issue a revised quotation that includes either option. Please let us know which you prefer.

Regards,
Arvind Selvaraj
Business Development Manager
Cyberjaya Digital Supplies Sdn Bhd
Tel: 017-640 2289
```

### Email 3: Pinnacle Komputer (new email)

Subject (text):

```text
[CCB TRAINING] Delivery schedule for quotation PKS/Q/2026/0917
```

Body (text):

```text
Dear Sir/Madam,

I am following up on our quotation PKS/Q/2026/0917 for 25 Kestrel Business 14 laptops.

If we receive your purchase order this month, we can deliver all 25 units 3 to 4 weeks later in a single delivery, or in two batches if that suits your onboarding plan better. Our technician can also be onsite on delivery day to help with setup at no extra charge.

May I know when you expect to make a decision?

Regards,
Kelvin Tan Wei Ming
Sales Manager
Pinnacle Komputer Sdn Bhd
Tel: 012-338 4071
```

### Email 4: Seri Mutiara follow-up (reply to Email 1)

Open Email 1 in your Inbox, select **Reply**, and paste this above the original message. Keep the subject as it is.

Body (text):

```text
Dear Sir/Madam,

Further to my earlier email, our principal has confirmed that pricing is unchanged from quotation SMT-QT-26-0388.

We can hold stock of 25 units for 7 days from today. After that, availability depends on the next shipment, which could add 3 weeks to delivery.

Once you confirm, I will issue a revalidated quotation in writing with a new date and validity period.

Best regards,
Nur Aisyah binti Kamal
Account Executive
Seri Mutiara Technology Sdn Bhd
Tel: 019-277 5103
```

---

## Part 2: Summarising

**Session:** open email, Summarize | **Grounding:** the email thread

No prompt needed: open the Seri Mutiara conversation and select **Summarize**. Then check the summary reflects the latest message.

---

## Part 3: Asking about your inbox

**Session:** Copilot pane in Outlook | **Grounding:** your mailbox

```
Look at my emails with [CCB TRAINING] in the subject. Which vendors are waiting for a reply from me, and what does each one need from me? Put it in a table with the vendor, what they asked, and any deadline.
```

```
Which vendor has offered a warranty upgrade, and at what price per unit?
```

If Copilot thinks you are the vendor:

```
The vendor is the person who signs each email, not the sender. Please answer again.
```

---

## Part 4: Drafting replies

**Session:** Reply, then Draft with Copilot | **Grounding:** the email you're replying to

**Seri Mutiara: request a revalidated quotation**

```
Thank Nur Aisyah for confirming the price is unchanged. Ask her to issue a revalidated quotation in writing for the same 25 laptops, bags and imaging service, with a new date and a validity period of at least 30 days. Ask her to hold the 25 units while we complete our internal approval. Polite, brief, and in British English.
```

**Pinnacle Komputer: request a corrected quotation**

Replace both figures in square brackets with your own findings from section 4.5.

```
Thank Kelvin for the delivery update. Explain that while checking quotation PKS/Q/2026/0917 we found the grand total is printed as RM[printed grand total], but the subtotal plus tax comes to RM[correct grand total]. Ask him to check and issue a revised quotation with the correct total. Say we expect to decide once all quotations are confirmed. Polite and factual, no blame.
```

**Cyberjaya Digital: request a like-for-like quotation (independent practice)**

```
Thank Arvind for the warranty options. Ask him to issue a revised quotation for the same items that includes the 3-year onsite warranty upgrade, so we can compare it like-for-like with the other quotations. Brief and polite.
```

To fix a draft that changed your numbers:

```
Use the figures I gave you exactly, without rounding.
```
