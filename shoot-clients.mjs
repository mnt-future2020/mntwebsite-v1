import { chromium } from '/Users/mathavanr1968/MnT Website/node_modules/playwright-core/index.mjs';
const OUT='/private/tmp/claude-501/-Users-mathavanr1968-MnT-Website/92ddc431-4269-4d50-81ae-1b06aa42ef68/scratchpad/cshots/';
import { mkdirSync } from 'node:fs';
mkdirSync(OUT,{recursive:true});
const SITES=[
 ['blufacade','https://www.blufacade.com/'],
 ['print-emporium','https://www.theprintemporium.in/'],
 ['vsv-unite','https://www.vsvunite.com/'],
 ['solar-power-house','https://solarpowerhouses.in/'],
 ['career-hq','https://careerhq.in/'],
 ['jcss-global','https://www.jcssglobal.com/'],
 ['elegant-care','https://elegantcareservices.com.au/'],
 ['rg-golden-palace','https://rggoldenpalace.com/'],
 ['perfect-pest-control','https://www.perfectpestcontrol.services/'],
 ['sri-jaidev-travels','https://srijaidevtravels.com/'],
 ['vinushree-travels','https://www.vinushreetravels.com/'],
 ['filigree-solutions','https://filigreesolutions.com/'],
 ['santhosh-ambulance','https://santhoshambulance.com/'],
 ['dheera-technologies','https://dheeratechnologies.com/'],
 ['we-believe-logistics','https://webelievelogistics.org/'],
 ['mahaajaya','https://mahaajaya.com/'],
];
const b=await chromium.launch({channel:'chrome'});
for(const [slug,url] of SITES){
  const pg=await b.newPage({viewport:{width:1440,height:900},deviceScaleFactor:2});
  try{
    await pg.goto(url,{waitUntil:'networkidle',timeout:45000});
  }catch(e){
    try{ await pg.goto(url,{waitUntil:'domcontentloaded',timeout:45000}); }catch(e2){ console.log('FAIL',slug,String(e2.message).slice(0,50)); await pg.close(); continue; }
  }
  await pg.waitForTimeout(3500);
  // dismiss the usual overlays without clicking anything destructive
  await pg.evaluate(()=>{
    document.querySelectorAll('[id*="cookie" i],[class*="cookie" i],[id*="consent" i],[class*="consent" i],[class*="popup" i],[id*="popup" i],[class*="modal" i][class*="show" i]')
      .forEach(el=>{const cs=getComputedStyle(el);if(cs.position==='fixed'||cs.position==='absolute')el.style.display='none';});
    window.scrollTo(0,0);
  });
  await pg.waitForTimeout(800);
  await pg.screenshot({path:OUT+slug+'.png'});
  console.log('shot', slug);
  await pg.close();
}
await b.close();
