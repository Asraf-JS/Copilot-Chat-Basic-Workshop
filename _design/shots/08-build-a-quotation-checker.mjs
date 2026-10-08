import {readFileSync} from 'node:fs';import {attach,capture,remember,state,send,note} from './run-helpers.mjs';
const chapter='08-build-a-quotation-checker';const ps=[...readFileSync(chapter+'/prompts.md','utf8').matchAll(/```(?:text)?\r?\n([\s\S]*?)```/g)].map(x=>x[1].trim());const {browser,context,page}=await attach();
async function upload(names){await page.getByRole('button',{name:'Add and manage sources',exact:true}).click();const chooser=page.waitForEvent('filechooser');await page.getByRole('menuitem',{name:'Upload images and files',exact:true}).click();await(await chooser).setFiles(names.map(n=>'04-compare-the-quotations/sample-files/'+n));await page.waitForTimeout(2500);}
try{
 // Writing Coach's paragraph placeholder requires approval under this run's exact-prompt rule.
 if(!state['08-prompt-coach']){await page.getByText('Agents',{exact:true}).first().click();await page.getByRole('button',{name:'Prompt Coach',exact:true}).click();await send(page,ps[1]);remember('08-prompt-coach',page.url());}
 if(!state['08-agent-created']){
  await page.getByText('Agents',{exact:true}).first().click();await page.getByRole('button',{name:/^New agent/}).click();await page.getByRole('button',{name:'Skip',exact:true}).click();
  const builder=page;const got=builder.getByText('Got it',{exact:true});await got.waitFor({timeout:15000}).catch(()=>{});if(await got.isVisible())await got.click();
  await capture(builder,chapter,'08-02-agent-builder.png');
  await builder.getByRole('textbox',{name:'Enter agent name',exact:true}).fill(ps[2]);await builder.getByRole('textbox',{name:'Describe your agent',exact:true}).fill(ps[3]);
  const instruction=builder.getByPlaceholder('Describe what this agent should do, define its tone, and outline any rules or guidelines it must follow',{exact:true});await instruction.click();await builder.keyboard.insertText(ps[4]);await builder.waitForTimeout(2500);await instruction.evaluate(e=>e.scrollTop=0);await capture(builder,chapter,'08-03-instructions.png');
  for(let i=0;i<3;i++){await builder.getByRole('textbox',{name:`Starter prompt ${i+1} title`,exact:true}).fill(['Check a quotation','Compare quotations',"What's missing?"][i]);await builder.getByRole('textbox',{name:`Starter prompt ${i+1} message`,exact:true}).fill(ps[i+5].replaceAll("[today's date]",'14 October 2026'));}
  await builder.getByRole('textbox',{name:'Starter prompt 1 title',exact:true}).scrollIntoViewIfNeeded();await capture(builder,chapter,'08-04-starter-prompts.png');
  await builder.getByRole('button',{name:'Create',exact:true}).click();await builder.getByRole('button',{name:'Share',exact:true}).waitFor({timeout:180000});remember('08-agent-created',true);
  await builder.getByRole('button',{name:'Share',exact:true}).click();await capture(builder,chapter,'08-06-share-agent.png');await builder.getByRole('button',{name:'Cancel',exact:true}).click();
 }
 if(state['08-agent-url'])await page.goto(state['08-agent-url'],{waitUntil:'domcontentloaded'});
 else{await page.getByText('Agents',{exact:true}).first().click();await page.reload({waitUntil:'domcontentloaded'});await page.getByText('Quotation Checker',{exact:true}).filter({visible:true}).first().click();await page.getByRole('textbox',{name:'Message Quotation Checker',exact:true}).waitFor();remember('08-agent-url',page.url());}
 if(!state['08-test-pinnacle']){await upload(['quotation-pinnacle-komputer.pdf']);await send(page,ps[8]);remember('08-test-pinnacle',true);const a=page.locator('.fai-CopilotMessage').last();if((await a.innerText()).includes('98,253')){await a.getByText(/98,253/).first().scrollIntoViewIfNeeded();await capture(page,chapter,'08-05-test-agent.png');}else note(chapter,'8.6 / 08-05','agent detects the arithmetic error','the test did not show the correct 98,253 total, so the shot was skipped');}
 if(!state['08-test-two']){await upload(['quotation-seri-mutiara.pdf','quotation-cyberjaya-digital.pdf']);await send(page,ps[9]);remember('08-test-two',true);}
}finally{await browser.close();}
