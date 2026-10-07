import {attach,newChat,send,capture,note,remember,state,root,debug} from "./run-helpers.mjs";
import {readFileSync,writeFileSync,existsSync} from "node:fs";import {resolve} from "node:path";
const chapter="03-write-better-prompts";const {browser,page}=await attach();
const prompts=[...readFileSync(resolve(root,chapter,"prompts.md"),"utf8").matchAll(/```\s*\n([\s\S]*?)```/g)].map(m=>m[1].trim().replaceAll("[date]","14 October 2026"));
try{
 note(chapter,"account/navigation","M365 Copilot (Basic)","M365 Copilot (Basic); Researcher and Analyst under Pinned; neither opened or used");
 await newChat(page,"03-chat");
 for(let i=state["03-done"]||0;i<8;i++){await send(page,prompts[i]);remember("03-chat",page.url());remember("03-done",i+1);}
 const requirements=page.locator(".fai-CopilotMessage").filter({hasText:"Quantity: 25 units of new business-class laptops."}).first();
 await requirements.locator("ol").first().scrollIntoViewIfNeeded();await capture(page,chapter,"03-01-gcse-requirements.png");
 const email=page.locator(".fai-CopilotMessage").filter({hasText:"Subject: Request for Quotation"}).first();await email.locator("p").first().scrollIntoViewIfNeeded();await capture(page,chapter,"03-02-rfq-email.png");
 await requirements.getByRole("button",{name:"Sources",exact:true}).click();await page.getByText("Windows 11 requirements | Microsoft Learn",{exact:true}).waitFor();await capture(page,chapter,"03-03-citations.png");await page.getByRole("button",{name:"Close",exact:true}).last().click();
 if(!state["03-sourcecheck"]){await send(page,prompts[8]);remember("03-sourcecheck",true);}
 if(!state["03-savedprompt"]){const user=page.locator(".fai-UserMessage").filter({hasText:"Format it as a numbered list I can paste into a request for quotation, under 200 words."}).first();await user.hover();await page.getByRole("button",{name:"Save prompt",exact:true}).click();await page.getByRole("dialog").getByRole("textbox").fill("Laptop RFQ requirements");await page.getByRole("button",{name:"Save",exact:true}).click();remember("03-savedprompt",true);}
 await page.getByText("New chat",{exact:true}).first().click();await page.getByRole("button",{name:"Open prompt gallery",exact:true}).click();await page.getByRole("tab",{name:"Your saved prompts",exact:true}).click();await page.getByText("Laptop RFQ requirements",{exact:true}).waitFor();await capture(page,chapter,"03-04-prompt-gallery.png");await page.keyboard.press("Escape");
 await page.getByRole("button",{name:"Settings and more",exact:true}).first().click();await page.getByRole("menuitem",{name:"Settings",exact:true}).click();await page.getByRole("tab",{name:"Personalization",exact:true}).click();
 console.log("MEMORY_SWITCHES",await page.getByRole("switch").evaluateAll(es=>es.map(e=>({label:e.getAttribute("aria-label"),checked:e.getAttribute("aria-checked")}))));
 await page.getByRole("button",{name:"Edit instructions",exact:true}).click();const field=page.getByLabel("Add your own custom instructions or choose from the suggestions",{exact:true});const backup=resolve(root,".copilot-profile/original-custom-instructions.txt");if(!existsSync(backup))writeFileSync(backup,await field.inputValue());
 const instructions="I work in the Admin and Facilities department of a Malaysian company. Use British spelling and Malaysian Ringgit (RM). Keep answers short and practical, use tables for comparisons, and tell me when you're unsure of a fact.";
 if(await field.inputValue()!==instructions){await field.fill(instructions);await page.getByRole("button",{name:"Save instructions",exact:true}).click();remember("03-custominstructions",true);}
 await capture(page,chapter,"03-05-custom-instructions.png");await page.getByRole("button",{name:"Cancel",exact:true}).click();await page.getByRole("button",{name:"Manage saved memories",exact:true}).click();await page.getByRole("button",{name:"Delete all memories",exact:true}).waitFor();await capture(page,chapter,"03-06-memory.png");await page.getByRole("button",{name:"Settings, Close",exact:true}).click();
 if(!state["03-test"]){await page.getByText("New chat",{exact:true}).first().click();await send(page,prompts[11]);remember("03-test",true);}
}catch(e){await debug(page);throw e;}finally{await browser.close();}
