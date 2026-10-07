import {readFileSync} from 'node:fs';
import {attach,send,capture,remember,state,note} from './run-helpers.mjs';
const ch='11-extra-practice',ps=[...readFileSync(`${ch}/prompts.md`,'utf8').matchAll(/```(?:text)?\r?\n([\s\S]*?)```/g)].map(x=>x[1].trim());
const {browser,page,context}=await attach();
async function request(key,index,url='https://m365.cloud.microsoft/chat'){await page.goto(state[key]||url);if(!state[key]){await send(page,ps[index]);remember(key,page.url());}}
try{
 await page.keyboard.press('Escape');
 await request('11-writing',0);await page.locator('.fai-CopilotMessage').first().scrollIntoViewIfNeeded();await capture(page,ch,'11-01-writing-coach.png');
 await request('11-visual',2);await page.locator('.fai-CopilotMessage').first().locator('img').scrollIntoViewIfNeeded();await capture(page,ch,'11-02-visual-creator.png');
 await request('11-prompt-coach',4,state['08-prompt-coach']);await page.getByText('Improved Prompt',{exact:true}).last().evaluate(e=>e.scrollIntoView({block:'start'}));await capture(page,ch,'11-03-prompt-coach.png');
 await request('11-research',5);await page.locator('.fai-CopilotMessage').first().locator('h1,h2,h3,p').first().evaluate(e=>e.scrollIntoView({block:'start'}));await capture(page,ch,'11-04-research.png');
 // The Writing Coach Add attempt was denied by the organisation. README allows normal-chat fallback.
 // Follow-ups 1, 3 and 6 were sent exactly. Two sources were opened and checked in headless Edge:
 // https://ewaste.doe.gov.my and https://csrc.nist.gov/pubs/sp/800/88/r2/final.
 note(ch,'agents check','Writing Coach, Prompt Coach and Visual Creator appear under Agents','Writing Coach is discoverable but blocked by admin permissions, Prompt Coach is available and usable, and no Visual Creator search result or replacement name was found; normal Copilot Chat generated the notice image');
}catch(e){console.log('ERROR',e.message.split('\n')[0]);}finally{await browser.close();}
