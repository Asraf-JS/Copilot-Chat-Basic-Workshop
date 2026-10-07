import {readFileSync} from 'node:fs';
import {attach,capture,remember,state,note,send} from './run-helpers.mjs';
const chapter='05-copilot-in-outlook';
const account=process.env.CAPTURE_ACCOUNT;
if(!account)throw Error('CAPTURE_ACCOUNT is required');
const prompts=[...readFileSync(chapter+'/prompts.md','utf8').matchAll(/```(?:text)?\r?\n([\s\S]*?)```/g)].map(x=>x[1].trim());
const {browser,context}=await attach();
const page=context.pages().find(p=>p.url().includes('outlook.office.com'))||await context.newPage();
const mask=[page.locator('img'),page.getByText(account,{exact:false}),page.getByRole('tree',{includeHidden:true}),page.locator('button[role="menuitem"][aria-label*="Busy"]'),page.getByRole('option',{includeHidden:true}).filter({hasNotText:'[CCB TRAINING]'})];
const box=name=>page.getByRole('textbox',{name,exact:true,includeHidden:true});
async function search(){await page.getByRole('combobox',{name:'Search for email, meetings, files and more.',exact:true,includeHidden:true}).fill('subject:"[CCB TRAINING]"');await page.keyboard.press('Enter');await page.waitForTimeout(2000);}
async function open(subject){await page.getByText(subject,{exact:true}).filter({visible:true}).first().click();await page.waitForTimeout(1500);}
async function reply(){if(await box('Message body').count())return;await page.getByRole('menuitem',{name:'Reply',exact:true,includeHidden:true}).filter({visible:true}).first().click();await box('Message body').waitFor();}
try{
 await page.setViewportSize({width:1600,height:900});await page.bringToFront();
 if(!page.url().includes('outlook.office.com'))await page.goto('https://outlook.office.com/mail/',{waitUntil:'domcontentloaded'});
 await search();
 for(let i=state['05-setup']||0;i<3;i++){
  if(!await box('Subject').count()){await page.getByRole('tab',{name:'Home',exact:true,includeHidden:true}).click();await page.getByRole('button',{name:'New',exact:true,includeHidden:true}).click();}
  const to=page.locator('[contenteditable][aria-label="To"]');await to.fill(account);await to.press('Enter');
  await box('Subject').fill(prompts[i*2]);await box('Message body').fill(prompts[i*2+1]);
  if(!(await to.innerText()).includes(account)&&!(await to.innerText()).includes('Asraf'))throw Error('Recipient is not the signed-in account');
  await page.getByRole('button',{name:'Send',exact:true,includeHidden:true}).click();await box('Subject').waitFor({state:'detached'});remember('05-setup',i+1);
 }
 if(state['05-setup']!==4){await search();await open(prompts[0]);await reply();await box('Message body').fill(prompts[6]);await page.getByRole('button',{name:'Send',exact:true,includeHidden:true}).click();await box('Message body').waitFor({state:'detached'});remember('05-setup',4);}
 note(chapter,'account/navigation','Basic account','M365 Copilot (Basic); Researcher and Analyst appear under Pinned in the Copilot app; neither opened or used');
 if(!state['05-inbox-shot']){const showNav=page.getByRole('button',{name:'Show navigation pane',exact:true,includeHidden:true});if(await showNav.count())await showNav.click();await page.getByText('Inbox',{exact:true}).filter({visible:true}).first().click();await page.waitForTimeout(2000);const group=page.getByRole('option',{includeHidden:true}).filter({hasText:prompts[0]}).first();const expand=group.getByRole('button',{name:'Expand conversation',exact:true,includeHidden:true});if(await expand.count())await expand.click();await capture(page,chapter,'05-01-vendor-emails.png',{mask});remember('05-inbox-shot',true);}
 await search();await open(prompts[0]);
 let frame=page.frames().find(f=>f.url().includes('semanticoverview'));
 if(!state['05-summary']){
 if(!frame){await page.locator('button').filter({hasText:'Summarize'}).filter({visible:true}).click();await page.waitForTimeout(8000);frame=page.frames().find(f=>f.url().includes('semanticoverview'));}
 frame.waitForTimeout=ms=>page.waitForTimeout(ms);
 await frame.getByRole('button',{name:/^Stop/i}).first().waitFor({state:'hidden',timeout:180000});
 await frame.getByRole('button',{name:'Copy Response',exact:true}).last().waitFor({timeout:180000});
 const answer=frame.locator('.fai-CopilotMessage').last();
 if(await answer.count()){for(let i=0;i<3;i++){await answer.locator('h2,h3,p').first().evaluate(e=>e.scrollIntoView({block:'start'}));await page.waitForTimeout(1000);}}
 await capture(page,chapter,'05-03-thread-summary.png',{mask});remember('05-summary',true);
 note(chapter,'5.3','summary at the top of the email thread','Summarize this email opens the right-hand Copilot pane; the summary reflects unchanged pricing, the 7-day stock hold and promised written revalidation');
 }
 const closePane=page.getByRole('button',{name:'Close',exact:true,includeHidden:true}).filter({visible:true});if(await closePane.count())await closePane.last().click();
 await reply();

 note(chapter,'5.2 controls / 05-02','Summarize, compose Draft with Copilot, and the Copilot pane button','Summarize this email is above the selected thread; Chat with Copilot opens the right pane; no separate Draft with Copilot control appears in compose, so 05-02 cannot show all three requested controls');
 note(chapter,'5.4 inbox check','Basic can answer across the inbox and find all three vendors','the exact mailbox prompts returned only the selected Seri Mutiara thread, including its 7-day stock hold; removing the current email attachment did not expose the other two training conversations; the warranty query could not find Cyberjaya');
 await page.getByRole('button',{name:'Chat with Copilot',exact:true,includeHidden:true}).click();await page.waitForTimeout(3000);frame=page.frames().find(f=>f.url().includes('semanticoverview'));frame.waitForTimeout=ms=>page.waitForTimeout(ms);
 if(!state['05-inbox-check-done']){await send(frame,prompts[7]);await capture(page,chapter,'05-04-inbox-question.png',{mask:[...mask,page.locator('[contenteditable="true"][aria-label="Message body"]')]});await send(frame,prompts[8]);remember('05-inbox-check-done',true);}
 for(const [index,file,key] of [[10,'05-05-draft-revalidation.png','05-revalidation'],[11,'05-06-draft-correction.png','05-correction']]){
  if(state[key])continue;
  if(index===11){await search();await open(prompts[4]);}
  let prompt=prompts[index];if(index===11)prompt=prompt.replace('[printed grand total]','98,523.00').replace('[correct grand total]','98,253.00');
  await send(frame,prompt);
  const response=frame.locator('.fai-CopilotMessage').last();console.log('DRAFT',file,(await response.innerText()).slice(0,1800));
  const pos=await response.getAttribute('aria-posinset');const fixed=frame.locator('.fai-CopilotMessage[aria-posinset="'+pos+'"]');
  for(let i=0;i<3;i++){await fixed.locator('h2,h3,p').first().evaluate(e=>e.scrollIntoView({block:'start'}));await page.waitForTimeout(1200);}
  await capture(page,chapter,file,{mask:[...mask,page.locator('[contenteditable="true"][aria-label="Message body"]')]});remember(key,true);
 }
 note(chapter,'5.5 draft controls check','Generate, tone and length controls, and Keep it','no classic Draft with Copilot editor or those controls appears in this Basic compose UI; used the Outlook Copilot chat pane to generate the supplied reply prompts; drafts were not sent');
}finally{await browser.close();}


