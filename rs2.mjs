import { chromium } from '/Users/mathavanr1968/MnT Website/node_modules/playwright-core/index.mjs';
const OUT='/private/tmp/claude-501/-Users-mathavanr1968-MnT-Website/92ddc431-4269-4d50-81ae-1b06aa42ef68/scratchpad/';
const b=await chromium.launch({channel:'chrome'});

// --- mobile: region rows inside the menu, tappable, no dropdown ---
const m=await b.newPage({viewport:{width:375,height:812},deviceScaleFactor:2,hasTouch:true,isMobile:true});
await m.goto('http://localhost:3111/in',{waitUntil:'domcontentloaded',timeout:60000});
await m.waitForTimeout(1000);
await m.tap('button[aria-label="Toggle menu"]');
await m.waitForTimeout(500);
const r=await m.evaluate(()=>{
  const rows=[...document.querySelectorAll('a[href="/"],a[href="/in"]')]
    .filter(a=>a.closest('.fixed'))
    .map(a=>({href:a.getAttribute('href'),txt:a.innerText.trim(),h:Math.round(a.getBoundingClientRect().height),
              right:Math.round(a.getBoundingClientRect().right)}));
  return {rows, dropdownButtons:document.querySelectorAll('.fixed button[aria-label="Change region"]').length};
});
console.log('MOBILE menu region rows:', JSON.stringify(r));
await m.evaluate(()=>{const a=[...document.querySelectorAll('.fixed a')].find(x=>/India|United States/.test(x.innerText)); a?.scrollIntoView({block:'center'});});
await m.waitForTimeout(400);
await m.screenshot({path:OUT+'rs2-mobile.png'});
await m.close();

// --- desktop: dropdown must open on click and close on outside click ---
const d=await b.newPage({viewport:{width:1440,height:900},deviceScaleFactor:2});
await d.goto('http://localhost:3111/in',{waitUntil:'domcontentloaded',timeout:60000});
await d.waitForTimeout(900);
await d.click('button[aria-label="Change region"]');
await d.waitForTimeout(350);
const open=await d.evaluate(()=>{
  const menu=document.querySelector('[role="menu"]');
  if(!menu) return 'NOT OPEN';
  const bx=menu.getBoundingClientRect();
  return {w:Math.round(bx.width),offRight:bx.right>1440,items:menu.querySelectorAll('a').length};
});
console.log('DESKTOP click-open:', JSON.stringify(open));
await d.screenshot({path:OUT+'rs2-desktop.png',clip:{x:980,y:60,width:460,height:230}});
await d.mouse.click(300,500);
await d.waitForTimeout(300);
console.log('DESKTOP outside-click closes:', await d.evaluate(()=>!document.querySelector('[role="menu"]')));
await d.close();
await b.close();
