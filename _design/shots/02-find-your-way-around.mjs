import { chromium } from "playwright";
import { mkdirSync, copyFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root=resolve(dirname(fileURLToPath(import.meta.url)),"../..");
const chapter="02-find-your-way-around";
const chatName="Laptop purchase - quotation checklist";
const prompt="I work in the Admin and Facilities department of a Malaysian company. We are buying 25 business laptops and will receive three quotations from suppliers. What should a complete laptop quotation include? Give me a checklist I can use to review each quotation.";
const follow="Which three items on that checklist are most often missing or wrong in real quotations? Explain why each one matters.";
let browser,context,owned=false;
try {browser=await chromium.connectOverCDP("http://127.0.0.1:9223");context=browser.contexts()[0];}
catch {context=await chromium.launchPersistentContext(resolve(root,".copilot-profile"),{channel:"msedge",headless:true,viewport:{width:1600,height:900},deviceScaleFactor:1});owned=true;}
context.setDefaultTimeout(15000);
const page=context.pages().find(p=>p.url().includes("m365.cloud.microsoft"))||await context.newPage();
async function shot(filename){
 await page.setViewportSize({width:1600,height:900});await page.mouse.move(1550,880);await page.waitForTimeout(800);
 const mask=page.frames().flatMap(f=>[f.getByRole("button",{name:/Work account|Account manager/i,includeHidden:true}),f.locator('#mectrl_main_trigger, [data-tid="me-control-mini-avatar"]')]);
 mkdirSync(resolve(root,chapter,"images"),{recursive:true});mkdirSync(resolve(root,"_design/shots/raw"),{recursive:true});
 const path=resolve(root,chapter,"images",filename);await page.screenshot({path,mask,maskColor:"#ffffff"});copyFileSync(path,resolve(root,"_design/shots/raw",filename));console.log("Saved",filename);
}
async function send(text){await page.getByRole("textbox",{name:"Message Copilot",exact:true}).fill(text);await page.keyboard.press("Enter");await page.waitForTimeout(2500);const stop=page.getByRole("button",{name:/Stop generating|Stop response|Stop/i});if(await stop.count())await stop.first().waitFor({state:"hidden",timeout:180000});await page.waitForTimeout(1500);}
async function teamsShot(){
 // User approved navigating to Copilot and masking unrelated chat titles.
 const teams=context.pages().find(p=>p.url().includes("teams.cloud.microsoft"))||await context.newPage();
 if(!teams.url().includes("teams.cloud.microsoft"))await teams.goto("https://teams.microsoft.com",{waitUntil:"domcontentloaded",timeout:60000});
 await teams.getByRole("button",{name:"Copilot (Ctrl+Shift+6)",exact:true}).waitFor({timeout:60000});
 await teams.getByRole("button",{name:"Copilot (Ctrl+Shift+6)",exact:true}).click();
 let frame;
 for(let i=0;i<30;i++){frame=teams.frames().find(f=>f!==teams.mainFrame());if(frame&&await frame.getByRole("textbox",{name:"Message Copilot",exact:true}).count())break;await teams.waitForTimeout(1000);}
 if(!frame)throw Error("Teams Copilot did not load headlessly; no visible fallback is allowed.");
 if((await frame.locator("body").innerText()).includes("M365 Copilot (Premium)"))throw Error("STOP: Premium account in Teams");
 await frame.getByRole("button",{name:"Commercial data protection badge.",exact:true}).waitFor({timeout:60000});
 await teams.setViewportSize({width:1600,height:900});await teams.mouse.move(1550,880);await teams.waitForTimeout(1000);
 const masks=[teams.getByRole("button",{name:/Your profile/i,includeHidden:true}),frame.getByRole("button",{name:/Work account|Account manager/i,includeHidden:true}),frame.locator("button.fui-NavSubItem[value]").filter({hasNotText:/Laptop purchase - quotation checklist|Researcher|Analyst/})];
 const path=resolve(root,chapter,"images/02-03-teams-copilot.png");await teams.screenshot({path,mask:masks,maskColor:"#ffffff"});copyFileSync(path,resolve(root,"_design/shots/raw/02-03-teams-copilot.png"));console.log("Saved 02-03-teams-copilot.png");
}
try {
 if(!page.url().includes("m365.cloud.microsoft/chat"))await page.goto("https://m365.cloud.microsoft/chat",{waitUntil:"domcontentloaded",timeout:60000});
 await page.waitForTimeout(2000);
 if(page.url().includes("login.microsoftonline.com") && await page.getByText((process.env.CAPTURE_ACCOUNT||"(no CAPTURE_ACCOUNT set)"),{exact:true}).count()){
 await page.getByText((process.env.CAPTURE_ACCOUNT||"(no CAPTURE_ACCOUNT set)"),{exact:true}).click();await page.waitForTimeout(3000);
 }
 if(page.url().includes("login.microsoftonline.com"))throw Error("Manual sign-in required; close headless Edge before signing in visibly with the same profile.");
 await page.getByText(/^M365 Copilot \((?:Basic|Premium)\)\s*$/).first().waitFor({timeout:60000});
 let text=await page.locator("body").innerText();if(text.includes("M365 Copilot (Premium)"))throw Error("STOP: Premium account");
 if(!text.includes("M365 Copilot (Basic)"))throw Error("Expected M365 Copilot (Basic) label");
 await page.keyboard.press("Escape");
 await page.getByRole("button",{name:/Work account/i}).click();await page.waitForTimeout(500);
 if((await page.locator("body").innerText()).includes("M365 Copilot (Premium)"))throw Error("STOP: Premium account card");
 await page.keyboard.press("Escape");
 if(process.argv.includes("--message-only")){
 await page.getByText("New chat",{exact:true}).first().click();await page.getByRole("textbox",{name:"Message Copilot",exact:true}).fill(prompt);
 await page.getByRole("button",{name:"Send",exact:true}).waitFor();await page.waitForTimeout(2000);await shot("02-04-message-box.png");await page.getByRole("textbox",{name:"Message Copilot",exact:true}).fill("");
 }else if(process.argv.includes("--teams-only")){
 await teamsShot();
 }else if(process.argv.includes("--share-only")){
 await page.getByRole("button",{name:"More options",exact:true}).first().scrollIntoViewIfNeeded();await page.getByRole("button",{name:"More options",exact:true}).first().click();await page.getByRole("menuitem",{name:"Share response (Frontier)",exact:true}).click();await page.waitForTimeout(2500);await shot("02-07-share-response.png");await page.getByRole("dialog").getByRole("button",{name:"Close",exact:true}).click();
 } else {
 // 2.1: one app screenshot. Native Edge sidebar (2.2) needs manual capture.
 await page.getByText("New chat",{exact:true}).first().click();await page.waitForTimeout(1000);await shot("02-01-copilot-app.png");
 await teamsShot();
 // 2.3: one message-box screenshot, before sending.
 await page.getByRole("textbox",{name:"Message Copilot",exact:true}).fill(prompt);await page.getByRole("button",{name:"Send",exact:true}).waitFor();await page.waitForTimeout(2000);await shot("02-04-message-box.png");await page.getByRole("textbox",{name:"Message Copilot",exact:true}).fill("");
 // 2.4: reuse the workshop chat if it exists, never duplicate it.
 let row=page.locator("div.fui-SplitNavItem").filter({has:page.getByText(chatName,{exact:true})});
 let old=page.locator("div.fui-SplitNavItem").filter({has:page.getByText("Laptop Quotation Review Checklist",{exact:true})});
 if(await row.count()||await old.count()){
 const existing=await row.count()?row:old;const href=await existing.locator("a").getAttribute("href");await page.goto(new URL(href,page.url()).href,{waitUntil:"domcontentloaded"});await page.getByRole("heading",{name:"Laptop Quotation Review Checklist",exact:true}).waitFor();
 }else{await send(prompt);}
 await page.getByRole("heading",{name:"Laptop Quotation Review Checklist",exact:true}).scrollIntoViewIfNeeded();await shot("02-05-first-prompt.png");
 if(!(await page.locator("body").innerText()).includes(follow))await send(follow);
 // 2.5: rename the same chat and capture its menu.
 if(!(await page.getByText(chatName,{exact:true}).count())){
 await old.hover();await old.getByRole("button",{name:"More",exact:true}).click();await page.getByRole("menuitem",{name:"Rename",exact:true}).click();await page.getByRole("textbox",{name:"Chat name",exact:true}).fill(chatName);await page.keyboard.press("Enter");await page.waitForTimeout(700);
 }
 row=page.locator("div.fui-SplitNavItem").filter({has:page.getByText(chatName,{exact:true})});await row.hover();await row.getByRole("button",{name:"More",exact:true}).click();await shot("02-06-rename-chat.png");await page.keyboard.press("Escape");
 // 2.6: selected response sharing preview, then Close (UI has no Cancel).
 await page.getByRole("button",{name:"More options",exact:true}).first().scrollIntoViewIfNeeded();await page.getByRole("button",{name:"More options",exact:true}).first().click();await page.getByRole("menuitem",{name:"Share response (Frontier)",exact:true}).click();await page.waitForTimeout(2500);await shot("02-07-share-response.png");await page.getByRole("dialog").getByRole("button",{name:"Close",exact:true}).click();
 // 2.7: inspect only; no screenshot tool is present in this browser menu.
 await page.getByRole("button",{name:"Add and manage sources",exact:true}).click();console.log("Add menu has screenshot option:",/screenshot/i.test(await page.getByRole("menu").first().innerText()));await page.keyboard.press("Escape");
 }
}finally{if(owned)await context.close();else await browser.close();}
