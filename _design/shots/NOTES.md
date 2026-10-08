# Screenshot capture notes

Codex adds one line here for each step where the screen did not match the notes.

- 02-find-your-way-around, account check: README and shot list require Copilot Chat (Basic); account card/header show M365 Copilot (Basic), accepted by the user for all chapters. Stop only for M365 Copilot (Premium).
- 02-find-your-way-around, agent listings: Researcher and Analyst appear under Pinned in the Copilot web app and Teams Copilot; Researcher also appears in the web app Add content menu. Neither agent was opened or used.
- 02-find-your-way-around, 2.1 check: README lists New chat, Agents, Notebooks and Pages; web UI shows New chat, Search, Library, Agents, Notebooks, Pinned and Chats. Pages and Create are not separate left-pane entries.
- 02-find-your-way-around, 2.2 / 02-02: README requests the Edge Copilot sidebar; headless Playwright cannot capture native Edge browser chrome. No visible browser was opened for this shot; manual capture required.
- 02-find-your-way-around, 2.2 / 02-03: README places Copilot at the top of the Teams chat list; UI places Copilot in the left app rail, opening an embedded Copilot app with the green shield. Account avatar and unrelated chat titles are masked, as approved.
- 02-find-your-way-around, 2.2 check: README says Edge/Outlook chat history may stay in those apps; Edge/Outlook history synchronisation was not tested because Edge sidebar is unavailable headlessly and README says no Outlook action is needed yet. The quotation checklist chat created in the web app appears in Teams Copilot history.
- 02-find-your-way-around, 2.3 check: README lists add, Prompt Gallery, response mode and Send; labels are Add and manage sources, Open prompt gallery, Auto, Model Selector, Start dictation and Send. Auto is in the top bar; the gallery control disappears when text is entered. No Work/Web toggle appears in the web app.
- 02-find-your-way-around, 2.4: README requests two prompts in one chat; both were sent and completed in the same chat, now named Laptop purchase - quotation checklist. The checklist response is captured separately from the other steps.
- 02-find-your-way-around, 2.5 check: README places Rename and Delete under the chat ellipsis; More opens Rename, Move to notebook and Delete. A separate Search entry is present in the left pane. The chat was renamed and reopened; nothing was deleted.
- 02-find-your-way-around, 2.6 check: README says Share/Copy link under a response and a read-only response; More options contains Share response (Frontier), opening Share Response with Copy link and company-wide link access. Preview contains the selected prompt and response; the notice calls it a copy of this chat. Recipient view was not tested because sharing is prohibited. No scope selector or Cancel button appears; Close dismissed the dialog without copying or sending the link.
- 02-find-your-way-around, 2.7 check / 02-08: README places the Windows screenshot option inside +; browser Add content menu lists Upload images and files, Attach cloud files, Designer and Researcher, with no screenshot option. Exact screenshot-tool label and desktop availability could not be verified under the headless-browser constraint; shot skipped per the shot list and needs manual desktop capture.

- 01-which-copilot-do-i-have, 1.1 / 01-01: README requests the Copilot Chat (Basic) account-label screenshot; skipped because it is captured by hand, as instructed.
- 01-which-copilot-do-i-have, 1.2 / 01-02: README requests work and personal Copilot side by side; skipped because it is captured by hand, as instructed.
- 01-which-copilot-do-i-have, 1.1 check: README places the Copilot label inside the account card under the name; UI shows M365 Copilot (Basic) under the name in the bottom-left account control. The opened card shows account details but no separate license label. Organisation seat count was not checked.
- 01-which-copilot-do-i-have, 1.4 listings: Researcher and Analyst appear under Pinned in the left pane; Work IQ and Cowork are not visible on this web-chat screen. None was opened or used.
- 01-which-copilot-do-i-have, 1.3 check: README places the green shield at the top of the chat area; UI places it in the top-right bar, with hover text Enterprise data protection applies to this chat. The tooltip is shown in 01-03.
- 01-which-copilot-do-i-have, 1.4 check: README calls retrying a response Regenerate; no Regenerate or replacement retry control appears in the completed response toolbar or its More options menu, which contains Share response (Frontier), Edit in Pages, Export to and Read aloud. No retry action was used.
- 01-which-copilot-do-i-have, 1.5 / 01-04: README description and caption show small numbered source links; UI shows inline microsoft and +1 source chips at sentence ends. Captured this citation-style equivalent with explicit user approval.
- 02-find-your-way-around, rerun check: six screenshots recaptured using the existing chat, visually checked at 1600x900 with avatar masks and identical raw copies. Added a wait for the Send control to finish rendering. Checker remains 6/8; 02-02 needs a manual Edge-sidebar capture and 02-08 needs a manual desktop screenshot-tool capture.

- 03-write-better-prompts, account/navigation: README says M365 Copilot (Basic); UI shows M365 Copilot (Basic); Researcher and Analyst under Pinned; neither opened or used.

- 03-write-better-prompts, 3.4: README says hover over a number to see the source name; UI shows source chips show publisher labels; Sources opens a Citations pane with Microsoft source titles instead of a numbered-hover preview.

- 03-write-better-prompts, 3.5 check: README says Prompt Gallery opens from the message box and has a saved-prompts tab; UI shows Open prompt gallery is below the empty new-chat box and opens Prompt Lab; hover on a sent prompt exposes Save prompt; saved prompts are under Your saved prompts; Laptop RFQ requirements is present.

- 03-write-better-prompts, 3.6 settings check: README says Settings > Personalization > Edit; UI shows bottom-left Settings and more > Settings > Personalization > Edit instructions; editor is titled Custom Instructions and Save instructions confirms the instructions are saved.

- 03-write-better-prompts, 3.6 memory check: README says saved memories list, delete and on/off control are available to Basic; UI shows Saved memories contains two existing communication/spelling preferences and a delete icon per memory plus Delete all memories; no memory was added or deleted; the parent Personalization page has a Saved memories switch, currently On; no switch was changed.
- 04-compare-the-quotations, navigation: README says Basic account; UI shows M365 Copilot (Basic); Researcher and Analyst under Pinned; Researcher also appears in Add content; none opened or used.



- 04-compare-the-quotations, 4.2 check / 04-02: README says four PDFs together in the message box; UI shows Upload images and files permits multiple selection but rejects more than 3 files at a time; 04-02 skipped because four cannot appear together; three quotations followed by policy in the same chat.

- 04-compare-the-quotations, capture layout: README says summaries and tables with all vendors and policy; UI shows requested compact formatting of the same supplied prompts to keep vendor columns and key checks readable in one screenshot.

- 04-compare-the-quotations, 4.2 / 04-02 retake: README says three quotations and the policy attached to the same message; UI shows three quotation PDFs attached and finished uploading; adding procurement-policy.pdf in a second upload did not add a fourth attachment; captured the three-file fallback before any prompt, then removed its attachments and cleared the unsent temporary chat; no saved conversation was created.

- 05-copilot-in-outlook, account/navigation: README says Basic account; UI shows M365 Copilot (Basic); Researcher and Analyst appear under Pinned in the Copilot app; neither opened or used.

- 05-copilot-in-outlook, 5.3: README says summary at the top of the email thread; UI shows Summarize this email opens the right-hand Copilot pane; the summary reflects unchanged pricing, the 7-day stock hold and promised written revalidation.

- 05-copilot-in-outlook, 5.2 controls / 05-02: README says Summarize, compose Draft with Copilot, and the Copilot pane button; UI shows Summarize this email is above the selected thread; Chat with Copilot opens the right pane; no separate Draft with Copilot control appears in compose, so 05-02 cannot show all three requested controls.

- 05-copilot-in-outlook, 5.4 inbox check: README says Basic can answer across the inbox and find all three vendors; UI shows the exact mailbox prompts returned only the selected Seri Mutiara thread, including its 7-day stock hold; removing the current email attachment did not expose the other two training conversations; the warranty query could not find Cyberjaya.

- 05-copilot-in-outlook, 5.5 draft controls check: README says Generate, tone and length controls, and Keep it; UI shows no classic Draft with Copilot editor or those controls appears in this Basic compose UI; used the Outlook Copilot chat pane to generate the supplied reply prompts; drafts were not sent.
