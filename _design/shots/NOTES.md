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
- 06-from-chat-to-pages, navigation: README says Basic account; UI shows M365 Copilot (Basic); Researcher and Analyst appear under Pinned; neither opened or used.

- 06-from-chat-to-pages, 6.1 / 06-01: README says warranty adjustment disappears after three changes; UI shows the warranty adjustment survived, but the recalculated Pinnacle total disappeared and the adjusted row reverted to its incorrect printed RM98,523.00; the complete-comparison prompt restored a separate RM98,253.00 recalculation.

- 06-from-chat-to-pages, 6.2 control check: README says More options > Edit in Pages creates a Page; UI shows More options > Edit in Pages opens a Page beside the chat and automatically attaches it to the chat box.

- 06-from-chat-to-pages, 6.3 editing check: README says Copilot box on the Page edits the Page directly; UI shows the chat box remains at the bottom left with the Page attached; the Status prompt offered a row in chat without applying it, so the row was inserted by hand in the Page table.

- 06-from-chat-to-pages, 6.4 add-response check: README says Edit in Pages can add the memo to the existing Page; UI shows with a Page open, More options changes to Add to page and appends the second response to that Page.

- 06-from-chat-to-pages, 6.5 Share check / 06-05: README says Share dialog with specific people and edit/view permissions; UI shows Share opens only Copy link and Copy component; no recipient or edit/view dialog is offered from this Page; the menu was closed without copying or sharing.

- 06-from-chat-to-pages, 6.6 export check: README says Convert/Export to Word and File > Export > Download as PDF; UI shows Page More actions > Export offers Document and PDF directly; Document export was selected; the menu capture shows these labels.

- 06-from-chat-to-pages, 6.4 manual editing: README says memo headings and comparison formatting are retained; UI shows the memo was placed above the comparison and fictional placeholders replaced; clipboard transfer flattened the memo headings and small tables, so formatting still needs manual tidying in the exported document.

- 06-from-chat-to-pages, 6.6 Word PDF path: README says File > Export > Download as PDF; UI shows the exported document opens in Word for the web; File > Export offers Download as PDF, Download as PDF with comments and Download as ODT.

- 06-from-chat-to-pages, 6.6 export result: README says Page, Word document and PDF contain the memo; UI shows Word document was created and opened; its PDF download was saved locally in the repository profile folder; the memo is above the comparison.
- 07-copilot-notebooks, 7.1 creation check: README says Notebooks > New notebook > Create opens references, chat and notes; UI shows Notebooks > New notebook asks for Notebook name, then Next opens an add-references step and Create opens the notebook with Chat history and a Content pane containing Creations and References.

- 07-copilot-notebooks, 7.2 references check: README says Add references uploads four PDFs and adds a Page and OneDrive Word memo; UI shows Add references offers Upload files and OneDrive files; the four existing training PDFs and exported Word memo were selected together, then the saved .page was found by name and added; six references are listed; no limit was reached with six.

- 07-copilot-notebooks, 7.4 notes check: README says add a note under the references, or use a Page if notes are unavailable; UI shows no standalone note control is shown; New Page opens a Page within the Notebook, where the supplied Vendor emails note was entered with 14 October 2026.

- 07-copilot-notebooks, 7.4 Page reference search: README says add the fallback Page as a reference; UI shows the saved Vendor emails Page appears under the Notebook Creations; searching its exact new name in Add references returned no results yet, so it could not be added as an extra reference during this run.

- 07-copilot-notebooks, navigation: README says Basic account; UI shows M365 Copilot (Basic); Researcher and Analyst appear under Pinned; neither opened or used.

- 08-build-a-quotation-checker, 8.1 prebuilt agents check: README says Writing Coach, Prompt Coach and Visual Creator are listed for Basic; UI shows Agent Store lists Prompt Coach and search finds a Writing Coach card; Visual Creator search returns no matching agent; Quotation Checker is not present yet.


- 08-build-a-quotation-checker, 8.2 builder check: README says Create agent/New agent opens Describe and Configure tabs; UI shows Agent Store has New agent; the initial Build your own specialist agent screen has a Message Agent Builder box and Skip; Skip opens the form directly instead of Describe/Configure tabs.

- 08-build-a-quotation-checker, 8.4 Knowledge check: README says Knowledge empty and web search disabled; UI shows Knowledge offers Add knowledge and Web search shows Search all; no knowledge was added and web-search settings were left unchanged under the no-setting-change rule.

- 08-build-a-quotation-checker, 8.6 upload check: README says right-hand test pane can accept quotation files; UI shows this Builder has an Agent Builder chat and Configure form without a quotation test pane; the agent will be created first and tested in its own chat.

- 08-build-a-quotation-checker, 8.7 Share check: README says share with specific people or anyone in the organisation after Create; UI shows Create succeeded and the confirmation says the agent is private and available only to you; Share was opened for inspection, with no link copied or sharing submitted.

- 08-build-a-quotation-checker, 8.7 sharing options: README says specific people and organisation access options; UI shows Share Quotation Checker shows Org-wide sharing for chat access, the owner with Can edit, Copy chat link and an alternative copy-edit-link option; no specific-person entry is shown; Cancel closed it; administrator restrictions were not tested.

- 08-build-a-quotation-checker, 8.6 known-error test / 08-05: README says agent finds the Pinnacle arithmetic error and shows printed and corrected totals; UI shows the exact test prompts completed and found Seri Mutiara expiry and Cyberjaya warranty differences, but the Pinnacle check incorrectly claimed 90,975 + 7,278 = 98,523 with no discrepancy; the correct sum is 98,253; 08-05 is skipped because the required error result is absent.

- 08-build-a-quotation-checker, 8.1 / 08-01: README says Writing Coach gives feedback on the pasted memo paragraph; UI shows the prompt contains a paragraph placeholder, while the exact-prompt rule permits only the date replacement; paragraph substitution is awaiting approval, so this shot is skipped.
