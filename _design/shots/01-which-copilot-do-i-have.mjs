import {chromium} from "playwright";
import {mkdirSync,copyFileSync,readFileSync,writeFileSync,existsSync} from "node:fs";
import {resolve,dirname} from "node:path";import {fileURLToPath} from "node:url";
const root=resolve(dirname(fileURLToPath(import.meta.url)),"../..");
const chapter="01-which-copilot-do-i-have";
const prompt='Explain in plain English what "enterprise data protection" means in Microsoft 365 Copilot Chat. What happens to a file I upload? Answer in 5 short bullet points for an office worker with no IT background.';
const record=resolve(root,".copilot-profile/chapter01-capture.json");
let browser,context,owned=false;
try{browser=await chromium.connectOverCDP("http://127.0.0.1:9223");context=browser.contexts()[0];}
catch{context=await chromium.launchPersistentContext(resolve(root,".copilot-profile"),{channel:"msedge",headless:true,viewport:{width:1600,height:900},deviceScaleFactor:1});owned=true;}
const page=context.pages().find(p=>p.url().includes("m365.cloud.microsoft/chat"))||await context.newPage();
page.setDefaultTimeout(15000);
async function capture(name,hover=false){
 if(!hover)await page.mouse.move(1550,880);await page.waitForTimeout(1200);
 const mask=page.frames().flatMap(f=>[f.getByRole("button",{name:/Work account|Account manager/i,includeHidden:true}),f.locator('#mectrl_main_trigger,[data-tid="me-control-mini-avatar"]')]);
 mkdirSync(resolve(root,chapter,"images"),{recursive:true});mkdirSync(resolve(root,"_design/shots/raw"),{recursive:true});
 const path=resolve(root,chapter,"images",name);await page.screenshot({path,mask,maskColor:"#ffffff"});copyFileSync(path,resolve(root,"_design/shots/raw",name));console.log("SAVED",name);
}
try {
 await page.setViewportSize({width:1600,height:900});
 if(!page.url().includes("m365.cloud.microsoft/chat"))await page.goto("https://m365.cloud.microsoft/chat",{waitUntil:"domcontentloaded",timeout:60000});
 await page.waitForTimeout(2000);
 if(page.url().includes("login.microsoftonline.com")&&await page.getByText("asraf@jsasraf.onmicrosoft.com",{exact:true}).count())await page.getByText("asraf@jsasraf.onmicrosoft.com",{exact:true}).click();
 if(page.url().includes("login.microsoftonline.com")){await page.waitForTimeout(3000);if(page.url().includes("login.microsoftonline.com"))throw Error("Manual sign-in required; close headless Edge before visible sign-in.");}
 await page.getByText(/^M365 Copilot \((?:Basic|Premium)\)\s*$/).first().waitFor({timeout:60000});
 await page.keyboard.press("Escape");
 await page.getByRole("button",{name:/Work account/i}).click();await page.waitForTimeout(600);
 const accountText=await page.locator("body").innerText();
 if(accountText.includes("M365 Copilot (Premium)"))throw Error("STOP: M365 Copilot (Premium)");
 if(!accountText.includes("M365 Copilot (Basic)"))throw Error("STOP: expected M365 Copilot (Basic)");
 console.log("ACCOUNT M365 Copilot (Basic)");await page.keyboard.press("Escape");
 if(!process.argv.includes("--response-only")){
 // 01-01 and 01-02 are manual shots and are deliberately skipped.
 await page.getByText("New chat",{exact:true}).first().click();await page.waitForTimeout(2500);
 const badge=page.getByRole("button",{name:"Commercial data protection badge.",exact:true});await badge.hover();
 await page.getByText("Enterprise data protection applies to this chat.",{exact:false}).waitFor();console.log("SHIELD",await badge.boundingBox());await capture("01-03-edp-shield.png",true);await page.mouse.move(900,350);await page.waitForTimeout(500);
 if(existsSync(record)){
 const stored=JSON.parse(readFileSync(record,"utf8"));await page.goto(stored.url,{waitUntil:"domcontentloaded"});await page.getByText(prompt,{exact:true}).waitFor({timeout:60000});
 }else{
 await page.getByRole("textbox",{name:"Message Copilot",exact:true}).fill(prompt);await page.keyboard.press("Enter");await page.waitForTimeout(2000);
 const stop=page.getByRole("button",{name:/Stop generating|Stop response|Stop/i});if(await stop.count())await stop.first().waitFor({state:"hidden",timeout:180000});await page.waitForTimeout(2500);writeFileSync(record,JSON.stringify({url:page.url()}));
 }
 }
 if(process.argv.includes("--response-only")&&existsSync(record)){await page.goto(JSON.parse(readFileSync(record,"utf8")).url,{waitUntil:"domcontentloaded"});await page.getByText(prompt,{exact:true}).waitFor({timeout:60000});}
 const citations=page.getByRole("button",{name:/^Citation:/});await citations.first().waitFor({timeout:60000});console.log("Citation count",await citations.count());
 if(!(await citations.count()))throw Error("Response has no inline sources; 01-04 does not match its caption.");
 // User approved capturing the current source-chip style and recording the difference.
 await page.getByText(prompt,{exact:true}).scrollIntoViewIfNeeded();await page.waitForTimeout(1500);await capture("01-04-first-prompt.png");
}finally{if(owned)await context.close();else await browser.close();}
