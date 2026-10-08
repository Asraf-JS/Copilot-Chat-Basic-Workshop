import {readFileSync} from 'node:fs';
import {attach,capture,remember,state,note,send} from './run-helpers.mjs';
const chapter='06-from-chat-to-pages';
const prompts=[...readFileSync(chapter+'/prompts.md','utf8').matchAll(/```(?:text)?\r?\n([\s\S]*?)```/g)].map(x=>x[1].trim());
const {browser,context,page}=await attach();
try{
 if(!state['06-page-created']){
  await page.goto(state['04-chat'],{waitUntil:'domcontentloaded'});
  await page.getByRole('textbox',{name:'Message Copilot',exact:true}).waitFor({timeout:60000});
  for(let i=state['06-drift']||0;i<3;i++){await send(page,prompts[i]);remember('06-drift',i+1);}
  const answer=page.locator('.fai-CopilotMessage').last();
  for(let i=0;i<3;i++){await answer.locator('table').first().evaluate(e=>e.scrollIntoView({block:'start'}));await page.waitForTimeout(1000);}
  await capture(page,chapter,'06-01-chat-drift.png');
  if(!state['06-complete']){await send(page,prompts[3]);remember('06-complete',true);}
  await page.locator('.fai-CopilotMessage').last().getByRole('button',{name:'More options',exact:true}).click();
  await page.getByRole('menuitem',{name:'Edit in Pages',exact:true}).click();
  await page.getByRole('textbox',{name:'Canvas',exact:true}).waitFor();
  await capture(page,chapter,'06-02-edit-in-pages.png');remember('06-page-created',true);
 }
 const canvas=page.getByRole('textbox',{name:'Canvas',exact:true});
 if(!await canvas.count()){await page.getByRole('button',{name:prompts[4],exact:true}).click();await canvas.waitFor();}
 if(!state['06-page-title']){await page.getByRole('textbox',{name:'Laptop purchase - comparison',exact:true}).fill(prompts[4]);await page.keyboard.press('Enter');remember('06-page-title',prompts[4]);}
 if(!state['06-status']){await send(page,prompts[5]);remember('06-status',true);}
 if(!await canvas.getByText('Status',{exact:true}).count()){
  await page.getByRole('button',{name:'Add new row',exact:true}).click();
  const cells=page.getByRole('textbox',{name:'Cell',exact:true});const n=await cells.count();
  for(const [i,t]of ['Status','Needs correction','Needs revalidation','Needs revised quotation'].entries()){await cells.nth(n-4+i).dblclick();await page.keyboard.type(t);await page.keyboard.press('Tab');}
  await capture(page,chapter,'06-03-page-edited.png');
 }
 if(!state['06-memo']){await send(page,prompts[6]);remember('06-memo',true);}
 if(!state['06-memo-final']){
  await page.locator('.fai-CopilotMessage').last().getByRole('button',{name:'More options',exact:true}).click();
  await page.getByRole('menuitem',{name:'Add to page',exact:true}).click();
  // Use the browser clipboard to move the supplied memo above the comparison.
  await context.grantPermissions(['clipboard-read','clipboard-write'],{origin:'https://m365.cloud.microsoft'});
  const memo=canvas.getByText('Justification Memo',{exact:true});await memo.click();await page.keyboard.press('Home');await page.keyboard.press('Control+Shift+End');await page.keyboard.press('Control+x');
  const title=canvas.getByText('Laptop Quotation Comparison for HOD Review (14 October 2026)',{exact:true});await title.click();await page.keyboard.press('Home');await page.keyboard.press('Control+v');
  // Fictional placeholders can be replaced through the normal Page editor.
  for(const [from,to]of [['[HOD name]',prompts[8]],['[budget code]',prompts[7]]]){
   const target=canvas.getByText(from,{exact:false}).first();if(await target.count()){await target.click();await page.keyboard.press('Home');await page.keyboard.press('Shift+End');await page.keyboard.type((await target.innerText()).replace(from,to));}
  }
  await capture(page,chapter,'06-04-memo.png');remember('06-memo-final',true);
 }
 await page.getByRole('button',{name:'Share',exact:true}).click();await page.waitForTimeout(800);await capture(page,chapter,'06-05-share-page.png');await page.keyboard.press('Escape');
 await page.getByTestId('overflow-button').click();await page.getByRole('menuitem',{name:'Export',exact:true}).hover();await page.waitForTimeout(800);await capture(page,chapter,'06-06-export-word.png',{hover:true});
 if(!state['06-word-url']){await page.getByRole('menuitem',{name:'Document',exact:true}).click();await page.getByRole('button',{name:'Open Word',exact:true}).click();await page.waitForTimeout(8000);for(const p of context.pages())if(p.url().includes('sharepoint'))remember('06-word-url',p.url());}
}finally{await browser.close();}
