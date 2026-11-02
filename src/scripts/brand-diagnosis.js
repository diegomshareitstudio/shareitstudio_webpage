/**
 * SIS Brand Diagnosis quiz (build v0.15, master document v0.4): questions, routing, diagnosis, plan and the
 * internal brief, as in SIS_Brand_Diagnosis_quiz_v0_15.html. Compact version for the services page: no side panel
 * (the case study number shows inside the card) and everything lives inside `root`.
 * Imported only by components/forms/BrandDiagnosis.astro.
 */
import { dialCodes } from '../data/dialCodes';

// Flag images for the phone country picker (flag emoji don't render on Windows)
const flagSrc = iso => `https://flagcdn.com/${iso}.svg`;

export function initBrandDiagnosis(root){
  const VERSION = 'Brand Diagnosis quiz v0.15';
  const PHASES = ['Welcome','The problem','Your brand','What you have','Your plan'];
  const CARD = 'Credit card';
  const FEE_NOTE = 'with a 3.4% processing fee.';
  const CALL_URL = 'https://shareitstudio.com/call/';
  // Lead source list, shared by A9.1 and the client details field (Paths B and C).
  const SOURCES = ["Abdallah Hesham's Course",'Accelerate event','AI','AMZ Champions','Bopyo','Camp Ecom','Colin Raja',
    'ChatGPT','Claude','Ritz Momentum','Email','Facebook','FBA Formula','Freelancer','Gemini','Google','Helium 10',
    'Instagram','JungleClick','LinkedIn','PickFU','Previous Client','Prosper',"Rafael's contact",'Reddit','Returning',
    'Share It Studio Website','Share It Studio Youtube','Transbiz','Udemy Sumner','Walmart','Web Search']
    .map(l => ({v:l.toLowerCase().replace(/[^a-z0-9]+/g,'-'), l}));
  // PROVISIONAL partner list for the internal discount flag (master doc open question 17). Laura to confirm.
  const PARTNERS = ["Abdallah Hesham's Course",'Accelerate event','AMZ Champions','Bopyo','Camp Ecom','Colin Raja',
    'FBA Formula','Helium 10','JungleClick','PickFU','Prosper','Ritz Momentum','Transbiz','Udemy Sumner'];
  const TRUST = '<b>Social Media Management for E-Com Brands &amp; Optimization.</b> Every plan is built from your answers, not a one-size package.';
  const CHECK = '<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2.5 7.4l2.8 2.8 6.2-6.4" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const CHECK_GOLD = '<svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"><circle cx="11" cy="11" r="11" fill="#FFC643"/><path d="M6.4 11.3l3.1 3.1 6.2-6.4" fill="none" stroke="#1B3939" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const CHECK_SM = '<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="#FFC643"/><path d="M5.8 10.3l2.8 2.8 5.6-5.8" fill="none" stroke="#1B3939" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const PLUS = '<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="currentColor" opacity=".12"/><path d="M10 5.5v9M5.5 10h9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

  // Q3 2026 rate card (Share It Studio Rates). Names and contents exactly as in the rate card. Never prices.
  const TIERS = {
    organic:{name:'Organic', desc:'Full organic photoshoot, human made and AI enhanced.'},
    hybrid:{name:'Hybrid', desc:'Basic organic photoshoot, AI enhanced and human managed.'},
    ai:{name:'Fully AI', desc:'Fully AI made, no organic photoshoot, human assisted.'}
  };
  const RC = {
    photos:{name:'Photos', parts:'10 images: 3 Hero Images, 3 LifeStyle and 4 Infographics.'},
    aplusStd:{name:'Premium A+ Standard', parts:'6 standard modules and 1 module with hotspots.'},
    aplusVideo:{name:'Premium A+ Video', parts:'4 standard modules, 1 carousel module with 5 images, 1 video module and 1 module with hotspots.'},
    mobileVideo:{name:'Mobile Version Premium A+ Content (Video)', parts:'Your Premium A+ Video built for phone screens: 4 standard modules, 1 carousel module with 5 images, 1 video module and 1 module with hotspots.'},
    productVideo:{name:'Product Video', parts:''},
    colorization:{name:'Colorization', parts:'Your Hero Images, LifeStyle and Infographics in every color.'}
  };

  const REVENUE = [
    {v:'pre',l:'Not selling yet'},{v:'lt10',l:'Under $10,000'},{v:'10to50',l:'$10,000 to $50,000'},
    {v:'50to200',l:'$50,000 to $200,000'},{v:'gt200',l:'Over $200,000'}];
  const SHIP = [
    {v:'now',l:'Yes, I can ship it now'},{v:'later',l:'Yes, but it will take a few weeks'},
    {v:'no',l:'No, work from my existing photos or 3D files'}];
  const SHIP_A = [
    {v:'now',l:'Yes, I can ship them now'},{v:'later',l:'Yes, but it will take a few weeks'},
    {v:'no',l:'No, work from my existing photos or 3D files'}];
  const KIT = [{v:'full',l:'Yes, a full brand kit'},{v:'partial',l:'Some of it'},{v:'none',l:'Not yet'}];
  // A2 answers: master doc, minus "I'd rather not say" (Laura, v0.11)
  const REVENUE_A = [
    {v:'lt10',l:'Under $10K, just getting started'},{v:'10to50',l:'$10K to $50K, growing, but slowly'},
    {v:'50to150',l:'$50K to $150K, solid, ready to scale'},
    {v:'pre',l:"Not live yet, that's why I'm here"}];
  // A9 budget (master doc). Client's own range, never a price from us. Under $500: no Organic.
  const BUDGET = [
    {v:'lt500',l:'Under $500'},{v:'500to1k',l:'$500-$1,000'},{v:'1kto2500',l:'$1,000-$2,500'},
    {v:'2500to5k',l:'$2,500-$5,000'},{v:'gt5k',l:'$5,000+'}];
  const CATEGORIES = ['Appliances','Arts, Crafts & Sewing','Automotive','Baby','Beauty & Personal Care','Books',
    'Cell Phones & Accessories','Clothing, Shoes & Jewelry','Collectibles & Fine Art','Computers','Electronics',
    'Garden & Outdoor','Grocery & Gourmet Food','Handmade','Health, Household & Baby Care','Home & Kitchen',
    'Industrial & Scientific','Luggage & Travel Gear','Movies & TV','CDs & Vinyl','Musical Instruments',
    'Office Products','Pet Supplies','Smart Home','Software','Sports & Outdoors','Tools & Home Improvement',
    'Toys & Games','Video Games'].map(l => ({v:l.toLowerCase().replace(/[^a-z0-9]+/g,'-'), l}));

  // ---------- Questions ----------
  const S = {
    start:{phase:0,type:'single',q:'What needs to change for your brand to grow?',options:[
      {v:'a',l:'Sales and Amazon Performance'},{v:'b',l:'Social Media visibility'},
      {v:'c',l:'Professional product visuals'},{v:'unsure',l:'Help me figure it out'}]},
    triage:{phase:0,type:'single',q:'Which of these sounds familiar?',options:[
      {v:'buy',l:'People find my product, but not enough of them buy'},
      {v:'unknown',l:"People don't know my brand exists"},
      {v:'looks',l:'My product looks less impressive than it really is'},
      {v:'all',l:'Honestly, a bit of all of these'}]},

    // Path A. Ecommerce
    a1:{phase:1,type:'multi',m:'What bothers you most',q:'What worries you most about your listing?',options:[
      {v:'buy',l:'People visit, but few of them buy'},
      {v:'pro',l:'My competitors look more professional than me'},
      {v:'launch',l:"I'm launching and want it right from day one"},
      {v:'onebrand',l:"My products don't look like one brand"}]},
    a2:{phase:1,type:'single',m:'What your listing brings in each month',q:'Roughly, what does your listing bring in each month?',
      hint:'In Seller Central this is Ordered Product Sales, under Business Reports.',hintItalic:true,options:REVENUE_A},
    a3:{phase:1,type:'multi',m:"What you've tried",q:'Who has worked on your images so far?',options:[
      {v:'self',l:'I did it myself'},{v:'freelancer',l:'A freelancer'},
      {v:'agency',l:'An agency'},{v:'ai',l:'AI tools'},{v:'nothing',l:'No one yet, starting fresh',ex:true}]},
    a4:{phase:1,type:'single',m:'If nothing changes in 3 months',q:'If your listing stays the same for 3 more months, what happens?',options:[
      {v:'lose',l:'I keep losing sales to competitors'},{v:'ads',l:'My ad costs keep climbing'},
      {v:'season',l:'I miss my launch or peak season'},{v:'nothing',l:'Honestly, not much changes'}]},
    a5:{phase:2,type:'number',unit:'products',q:'How many products do you want to improve?',hint:'Count each product once. Colors and sizes come next.'},
    a6:{phase:2,type:'single',q:'Do they come in colors, sizes or other variations?',options:[
      {v:'color',l:'Only color variations'},{v:'size',l:'Only size or other variations'},
      {v:'both',l:'Color and size or other variations'},{v:'none',l:'No variations'}]},
    a6c:{phase:2,type:'number',n:'A6.1',unit:'colors',start:2,q:'How many color variations?',
      hint:'Count the colors of one product. If it changes from product to product, use the most common number.'},
    a6s:{phase:2,type:'number',n:'A6.2',unit:'variations',start:2,q:'How many size or other variations?',
      hint:'Count the sizes or other versions of one product. If it changes from product to product, use the most common number.'},
    a7:{phase:2,type:'search',q:'What do you sell?',placeholder:'Type to search categories',options:CATEGORIES},
    a7d:{phase:2,type:'text',n:'A7.1',q:'Tell us what your product is and what it does.',
      hint:'In your own words. A sentence or two is enough.',
      placeholder:'For example: A stainless steel water bottle that keeps drinks cold for 24 hours.'},
    a8:{phase:2,type:'single',q:'Can you send us the samples?',hint:'Samples of the product you want us to photograph and film.',options:SHIP_A},
    a9:{phase:2,type:'single',q:"What's your budget?",options:BUDGET},
    a9src:{phase:2,type:'search',n:'A9.1',internal:true,q:'How did you find us?',placeholder:'Type to search',options:SOURCES},
    a10:{phase:3,type:'multi',q:'What does your listing already have?',options:[
      {v:'studio',l:'White-background photos'},{v:'lifestyle',l:'Lifestyle photos'},{v:'infographics',l:'Infographics'},
      {v:'aplus',l:'Basic A+'},{v:'premium',l:'Premium A+'},{v:'brandstory',l:'Brand Story'},
      {v:'video',l:'Product video'},{v:'none',l:'None of these yet',ex:true}]},
    a11:{phase:3,type:'single',q:'How do you feel about your title, bullets and keywords?',options:[
      {v:'rewrite',l:"I'd rewrite them from scratch"},{v:'refresh',l:'They need a refresh'},{v:'good',l:"I'm happy with them"}]},
    a12:{phase:3,type:'single',q:'Do you have brand guidelines?',hint:'Logo, colors and fonts.',options:KIT},
    a12link:{phase:3,type:'link',n:'A12.1',q:'Can you share your brand guidelines with us?',
      hint:"Paste a link to a shared folder, like Google Drive or Dropbox. We'll use it to keep your images on brand."},
    a13:{phase:4,type:'single',q:'After we fix it, what kind of help do you want?',options:[
      {v:'once',l:"Fix it once and I'll take it from there"},{v:'monthly',l:'Keep my content fresh every month'},
      {v:'unsure',l:"I'm not sure yet"}]},

    // Path B. Social media
    b1:{phase:1,type:'single',m:'What frustrates you most',q:"What's not working the way you'd like?",options:[
      {v:'engage',l:'My posts get little engagement'},
      {v:'convert',l:"My followers aren't becoming customers"},{v:'time',l:'Content takes too much time'},
      {v:'ideas',l:"I don't know what to post"}]},
    b2:{phase:1,type:'single',m:'How often you post',q:'How often do you post today?',options:[
      {v:'daily',l:'Almost every day'},{v:'weekly',l:'A few times a week'},
      {v:'monthly',l:'A few times a month'},{v:'rarely',l:'Rarely or never'}]},
    b3:{phase:1,type:'single',m:'When you post',q:'When you post, what usually happens?',options:[
      {v:'real',l:'Real comments, shares and sales'},{v:'likes',l:'Some likes, very few comments'},
      {v:'nothing',l:'Almost nothing'},{v:'unsure',l:"I'm not sure"}]},
    b4:{phase:1,type:'single',m:'Who handles it today',q:'Who handles your social media today?',options:[
      {v:'self',l:'I do it myself'},{v:'team',l:'Someone on my team'},{v:'freelancer',l:'A freelancer'},
      {v:'agency',l:"An agency, but it didn't work out"},{v:'nobody',l:'Nobody right now'}]},
    b5:{phase:1,type:'single',m:'If nothing changes in 6 months',q:'If your social media stays the same for 6 months, what happens?',options:[
      {v:'attention',l:'Competitors keep getting the attention'},{v:'launches',l:'My launches go unnoticed'},
      {v:'ads',l:'I keep paying more for ads to get seen'},{v:'nothing',l:'Honestly, not much changes'}]},
    b6:{phase:2,type:'multi',q:'Which platforms are you on?',options:[
      {v:'instagram',l:'Instagram'},{v:'tiktok',l:'TikTok'},{v:'facebook',l:'Facebook'},{v:'youtube',l:'YouTube'},
      {v:'pinterest',l:'Pinterest'},{v:'linkedin',l:'LinkedIn'},{v:'none',l:'None yet',ex:true}]},
    b7:{phase:2,type:'multi',q:'Where do people buy from you?',options:[
      {v:'amazon',l:'Amazon'},{v:'site',l:'My own website'},{v:'retail',l:'Stores or retail'},
      {v:'none',l:"I'm not selling yet",ex:true}]},
    b8:{phase:2,type:'single',q:'Roughly how much does your brand sell each month?',options:REVENUE},
    b9:{phase:2,type:'single',q:'How involved can your team be in creating content?',options:[
      {v:'film',l:'We can film ourselves or our customers'},{v:'influencer',l:'We can hire an influencer'},
      {v:'all',l:"We'd need you to handle everything"}]},
    b10:{phase:2,type:'single',q:'What result would make this worth it for you?',options:[
      {v:'sales',l:'More visits and sales'},{v:'aware',l:'More people knowing my brand'},
      {v:'community',l:'A community that trusts us'},{v:'launch',l:'A launch people talk about'}]},
    b11:{phase:3,type:'multi',q:'What content do you already have?',options:[
      {v:'photos',l:'Professional photos'},{v:'videos',l:'Videos or reels'},{v:'ugc',l:'Customer or creator videos'},
      {v:'calendar',l:'A content calendar'},{v:'none',l:'Not much yet',ex:true}]},
    b12:{phase:3,type:'single',q:'Do you have brand guidelines?',hint:'Logo, colors and fonts.',options:KIT},
    b13:{phase:4,type:'single',q:'How often would you like your brand to show up?',options:[
      {v:'few',l:'A few times a week'},{v:'daily',l:'Almost every day'},
      {v:'formats',l:'Every day, in different formats'},{v:'several',l:'Several times every day'}]},

    // Path C. Photography and video
    c1:{phase:1,type:'single',m:"What's bothering you",q:"What's bothering you about your photos and videos?",options:[
      {v:'homemade',l:'They look homemade'},{v:'brand',l:"They don't match my brand"},
      {v:'volume',l:"I can't produce enough to keep up"},{v:'use',l:"They don't show how my product is used"},
      {v:'fake',l:'They look fake or too edited'},{v:'none',l:"I don't have any yet"}]},
    c2:{phase:1,type:'single',m:'Would a stranger trust your brand',q:'If a stranger saw your photos today, would they trust your brand?',options:[
      {v:'yes',l:'Yes, completely'},{v:'mostly',l:'Mostly'},{v:'no',l:'Not really'},{v:'none',l:"I don't have photos yet"}]},
    c3:{phase:1,type:'multi',m:"Where you'll use them",q:'Where will you use them?',options:[
      {v:'amazon',l:'Amazon'},{v:'site',l:'My website'},{v:'social',l:'Social media'},{v:'ads',l:'Ads'},
      {v:'wholesale',l:'Wholesale or catalogs'},{v:'packaging',l:'Packaging'}]},
    c4:{phase:1,type:'single',m:'If nothing changes',q:'If your photos stay the same, what happens?',options:[
      {v:'competitors',l:'Shoppers choose better-looking competitors'},{v:'ads',l:'My ads underperform'},
      {v:'launch',l:"I can't launch or update products"},{v:'nothing',l:'Honestly, not much changes'}]},
    c5:{phase:2,type:'single',q:'About how many photos do you need?',options:[
      {v:10,l:'Up to 10'},{v:20,l:'10 to 20'},{v:40,l:'20 to 40'},{v:41,l:'More than 40'},{v:0,l:'Not sure, help me decide'}]},
    c6:{phase:2,type:'single',q:'Roughly how much does your brand sell each month?',options:REVENUE},
    c7:{phase:2,type:'single',q:'Can you send us your product?',options:SHIP},
    c8:{phase:2,type:'multi',q:'What do you picture?',options:[
      {v:'studio',l:'Clean studio shots'},{v:'lifestyle',l:'Lifestyle scenes'},{v:'people',l:'People using my product'},
      {v:'hands',l:'Close-ups of hands using my product'},{v:'short',l:'Short videos'},{v:'creator',l:'Creator-style videos'}]},
    c9:{phase:3,type:'multi',q:'What do you already have?',options:[
      {v:'pro',l:'Some professional photos'},{v:'phone',l:'Phone photos'},{v:'3d',l:'3D files or renders'},
      {v:'videos',l:'Videos'},{v:'nothing',l:'Nothing yet',ex:true}]},
    c10:{phase:3,type:'single',q:'Do you have brand guidelines?',hint:'Logo, colors and fonts.',options:KIT},
    c11:{phase:4,type:'single',q:'How often do you need new content?',options:[
      {v:'once',l:'One shoot to get started'},{v:'monthly',l:'New content every month'},{v:'launch',l:'Every time I launch a product'}]}
  };

  const PATHS = {
    A:{name:'Ecommerce (Amazon listing)',problem:['a1','a2','a3','a4'],rest:['a5','a6','a7','a7d','a8','a9','a9src','a10','a11','a12','a13']},
    B:{name:'Social media',problem:['b1','b2','b3','b4','b5'],rest:['b6','b7','b8','b9','b10','b11','b12','b13']},
    C:{name:'Photography and video',problem:['c1','c2','c3','c4'],rest:['c5','c6','c7','c8','c9','c10','c11']}
  };

  // ---------- State ----------
  let A = {};
  let pos = 0;
  let R = null;      // computed result
  let INV = null;    // invoice data
  const app = root.querySelector('[data-bd-screen]');
  const phaseLabel = root.querySelector('[data-bd-phase]');
  const barFill = root.querySelector('[data-bd-bar]');
  const stageTop = root.querySelector('[data-bd-talk]');
  const esc = s => String(s==null?'':s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const opt = (id, v) => (S[id].options||[]).find(o => o.v === v);
  const lab = id => {
    const v = A[id];
    if (Array.isArray(v)) return v.map(x => opt(id,x).l).join('; ');
    const o = opt(id, v); return o ? o.l : '';
  };
  const arr = id => Array.isArray(A[id]) ? A[id] : [];
  const plural = (n, w) => `${n} ${w}${n===1?'':'s'}`;

  // Q1 is pick one (master doc open question 1). "Help me figure it out" goes to 1b (triage).
  function path(){
    if (A.start === 'unsure') return {buy:'A',unknown:'B',looks:'C',all:'A'}[A.triage] || null;
    return {a:'A',b:'B',c:'C'}[A.start] || null;
  }

  const hasKit = () => ['full','partial'].includes(A.a12);

  function flow(){
    const f = ['welcome','start'];
    if (A.start === 'unsure') f.push('triage');
    const p = path(); if (!p) return f;
    const P = PATHS[p];
    const rest = P.rest.slice();
    if (p==='A'){
      const vx = [];
      if (['color','both'].includes(A.a6)) vx.push('a6c');
      if (['size','both'].includes(A.a6)) vx.push('a6s');
      rest.splice(rest.indexOf('a6')+1, 0, ...vx);
      if (hasKit()) rest.splice(rest.indexOf('a12')+1, 0, 'a12link');
    }
    // "More Case Study": a second story after the last "Your brand" question, before "What you have"
    const firstHave = rest.findIndex(x => S[x] && S[x].phase === 3);
    rest.splice(firstHave < 0 ? rest.length : firstHave, 0, 'proof2');
    return f.concat(P.problem, ['mirror','proof'], rest, ['contact','results','invoice','done']);
  }

  function phaseOf(id){
    if (id==='welcome') return 0;
    if (S[id]) return S[id].phase;
    if (id==='mirror'||id==='proof') return 1;
    if (id==='proof2') return 2;
    return 4;
  }

  // ---------- Progress and phase ----------
  function renderProgress(){
    const f = flow(), id = f[pos], end = f.indexOf('results');
    let frac;
    if (id === 'welcome') frac = 0;
    else if (['results','invoice','done'].includes(id)) frac = 1;
    else if (end < 0) frac = .04;
    else frac = Math.max(.04, pos / end);
    barFill.style.transform = `scaleX(${frac})`;
  }

  // Case studies from shareitstudio.com/case-studies. Each path has two; the main problem picks the first,
  // and the "More Case Study" screen shows the other one.
  const STORIES = {
    A:[{stat:'2x', cap:"Love Play's conversion rate, after we rebuilt the listing",
        copy:'Love Play <b>doubled its conversion rate</b>. Vizayo\'s fire pit <b>converted 107% more</b>.'},
       {stat:'260%', cap:"Pink Miracle's sales growth after we rebuilt the listing",
        copy:'Pink Miracle had a great product and a listing that wasn\'t telling its story. After we rebuilt it, <b>sales grew 260%</b> and monthly revenue went from about $400K to <b>$600K+</b>.'}],
    B:[{stat:'4%', cap:'of cold viewers bought from Organic Reels, $13K in 30 days',
        copy:'Organic Reels sent cold viewers to an Amazon listing and <b>4 out of every 100 bought</b>: $13K in revenue in 30 days.'},
       {stat:'3.05M', cap:'views in 90 days for a brand that started at zero, with $0 in ad spend',
        copy:'We took a brand from zero followers to <b>3.05 million views in 90 days</b>, with $0 in ad spend. 99% of those views came from people who had never seen the brand.'}],
    C:[{stat:'85.7%', cap:"My Blue Bullet's sales growth from one new hero image",
        copy:'One new hero image grew My Blue Bullet\'s <b>sales 85.7%</b>.'},
       {stat:'716.9%', cap:"Super Ninja's US sales growth after we rebuilt its photos",
        copy:'Super Ninja\'s photos looked the same in every market. We rebuilt them for each country and <b>US sales grew 716.9%</b>.'}]
  };
  function proofData(second){
    const p = path();
    const lead = p==='A' ? arr('a1').some(v => ['buy','launch'].includes(v))
      : p==='B' ? A.b1==='convert' : A.c1==='homemade';
    const i = lead ? 0 : 1;
    return STORIES[p][second ? 1 - i : i];
  }

  // "Step X of 5: phase" above the screen (the original's compact phase line)
  function renderPhase(id){
    const cur = phaseOf(id);
    phaseLabel.innerHTML = `Step ${cur+1} of 5: <b>${PHASES[cur]}</b>`;
  }

  // After a step, keep the card's top in view (long screens like the result leave it above the viewport)
  function bring(){
    if (root.getBoundingClientRect().top < 0) root.scrollIntoView({block:'start'});
    const h = app.querySelector('h3'); if (h){ h.setAttribute('tabindex','-1'); h.focus({preventScroll:true}); }
  }

  function go(n, initial){
    pos = Math.max(0, n);
    const id = flow()[pos];
    if (id==='welcome') renderWelcome();
    else if (S[id]) renderQuestion(id);
    else if (id==='mirror') renderMirror();
    else if (id==='proof' || id==='proof2') renderProof(id==='proof2');
    else if (id==='contact') renderContact();
    else if (id==='results') renderResults();
    else if (id==='invoice') renderInvoice();
    else if (id==='done') renderDone();
    renderPhase(id);
    renderProgress();
    addTalk(id);
    if (!initial) bring();
  }

  // ---------- Talk to a real person ----------
  // On every question and both case study screens. Opens the call page in a new tab and shows a confirmation
  // with the answers so far. Sending them to the team needs a backend before launch.
  let TALK = null;
  // Small secondary button in the upper right of the card
  function addTalk(id){
    stageTop.innerHTML = '';
    if (!(S[id] || id==='proof' || id==='proof2')) return;
    stageTop.innerHTML = `<a class="bd-talk" id="talk-q" href="${CALL_URL}" target="_blank" rel="noopener">Talk to a real person</a>`;
    document.getElementById('talk-q').onclick = () => { setTimeout(() => renderTalk(id), 0); };
  }

  function renderTalk(from){
    TALK = {from, step: S[from] ? (S[from].n || from.toUpperCase()) : from==='results' ? 'Result screen' : 'Case study screen'};
    app.innerHTML = `<section class="screen">
      <h3>Your answers are with our team.</h3>
      <p class="talk-note">The booking page opened in a new tab. Pick a time, and the person you talk to will already know what you told us here.</p>
      <div class="actions">
        <a class="btn-primary" href="${CALL_URL}" target="_blank" rel="noopener">Open the booking page</a>
        <button class="btn-link" id="resume">${from==='results' ? 'Back to my diagnosis' : 'Back to my questions'}</button>
      </div>
      ${talkPanel()}
    </section>`;
    document.getElementById('resume').onclick = () => go(pos);
    stageTop.innerHTML = '';
    bring();
    bindCopy();
  }

  function talkPanel(){
    const p = path();
    const head = [`Talk request (from ${VERSION}). Client asked for a custom proposal from: ${TALK.step}.`,
      `- Service path: ${p ? PATHS[p].name + triageNote() : 'not chosen yet'}`,
      `- Contact: ${A.contact ? `${A.contact.name}, ${A.contact.email}, ${A.contact.brand}` : 'not given yet (collected on the booking page)'}`,
      `- Booking page: ${CALL_URL}`].join('\n');
    const brief = (TALK.from==='results' && A.contact && R) ? '\n\n' + buildBrief(R) : '';
    return `<details class="internal">
      <summary>Internal test panel</summary>
      <p>For testing only. Before launch, this block is sent to the team automatically. Remove the panel before going live.</p>
      <p class="int-h">Talk request</p>
      <textarea id="talkblock" readonly>${esc(head + brief)}</textarea>
      <div class="actions"><button class="bd-copy" data-copy="talkblock">Copy talk request</button><span class="copied" role="status"></span></div>
      <p class="int-h">Answers so far</p>
      <textarea id="answers" class="short" readonly>${esc(buildAnswers() || 'No answers yet.')}</textarea>
    </details>`;
  }
  const next = () => go(pos+1);
  const back = () => go(pos-1);

  function backLink(){ return pos > 0 ? '<button class="btn-link" id="back">Back</button>' : ''; }
  function bindBack(){ const b = document.getElementById('back'); if (b) b.onclick = back; }

  function optionsHTML(id){
    const st = S[id];
    const multi = st.type === 'multi';
    const cur = A[id];
    return `<div class="options" role="group" aria-label="${esc(st.q)}">
      ${st.options.map((o,i) => {
        const on = multi ? arr(id).includes(o.v) : cur === o.v;
        const key = `<span class="key" aria-hidden="true">${i+1}</span>`;
        return multi
          ? `<button class="opt" role="checkbox" aria-checked="${on}" data-i="${i}">${key}<span class="opt-label">${esc(o.l)}</span><span class="tick" aria-hidden="true">${CHECK}</span></button>`
          : `<button class="opt" aria-pressed="${on}" data-i="${i}">${key}<span class="opt-label">${esc(o.l)}</span></button>`;
      }).join('')}
    </div>`;
  }

  function bindSingle(id){
    app.querySelectorAll('.opt').forEach(el => {
      el.onclick = () => {
        const v = S[id].options[+el.dataset.i].v;
        // Changing Q1 or the triage answer changes the path, so answers from the old path are cleared
        if (id==='start' && A.start !== undefined && A.start !== v){
          A = {contact:A.contact}; R = null; INV = null;
        }
        if (id==='triage' && A.triage !== undefined && A.triage !== v){
          A = {contact:A.contact, start:A.start};
          R = null; INV = null;
        }
        A[id] = v;
        app.querySelectorAll('.opt').forEach(x => x.setAttribute('aria-pressed','false'));
        el.setAttribute('aria-pressed','true');
        setTimeout(next, 260);
      };
    });
  }

  // ---------- Screens ----------
  function renderQuestion(id){
    const st = S[id];
    const qs = flow().filter(x => S[x]), qn = qs.indexOf(id) + 1;
    const of = path() ? ` of ${qs.length}` : '';
    const head = `<p class="step-of">Question <b>${qn}</b>${of}</p><h3>${esc(st.q)}</h3><p class="hint${st.hintItalic ? ' hint-italic' : ''}">${st.hint ? esc(st.hint) : ''}</p>`;
    if (st.type === 'single'){
      app.innerHTML = `<section class="screen">${head}${optionsHTML(id)}<div class="actions nav">${backLink()}</div></section>`;
      bindSingle(id); bindBack();
    }
    if (st.type === 'multi'){
      const sel = new Set(arr(id));
      app.innerHTML = `<section class="screen">${head}<p class="multi-note">Pick what applies.</p>${optionsHTML(id)}
        <div class="actions nav">${backLink()}<button class="btn-primary" id="next" ${sel.size?'':'disabled'}>Continue</button></div></section>`;
      const btns = app.querySelectorAll('.opt');
      const sync = () => {
        btns.forEach(b => b.setAttribute('aria-checked', sel.has(st.options[+b.dataset.i].v)));
        document.getElementById('next').disabled = sel.size === 0;
      };
      btns.forEach(b => b.onclick = () => {
        const o = st.options[+b.dataset.i];
        if (o.ex){ const had = sel.has(o.v); sel.clear(); if (!had) sel.add(o.v); }
        else { st.options.filter(x=>x.ex).forEach(x=>sel.delete(x.v)); sel.has(o.v) ? sel.delete(o.v) : sel.add(o.v); }
        sync();
      });
      document.getElementById('next').onclick = () => {
        const val = st.options.map(o=>o.v).filter(v=>sel.has(v));
        A[id] = val;
        next();
      };
      bindBack();
    }
    if (st.type === 'number'){
      const val = A[id] || st.start || 1;
      const unit = st.unit || 'items';
      app.innerHTML = `<section class="screen">${head}
        <div class="stepper">
          <button id="minus" aria-label="Fewer ${unit}">&minus;</button>
          <input id="num" type="number" inputmode="numeric" min="1" max="500" value="${val}" aria-label="Number of ${unit}">
          <button id="plus" aria-label="More ${unit}">+</button>
        </div>
        <p class="unit" aria-hidden="true">${esc(unit)}</p>
        <div class="actions nav">${backLink()}<button class="btn-primary" id="next">Continue</button></div></section>`;
      const inp = document.getElementById('num');
      const clamp = v => Math.max(1, Math.min(500, parseInt(v,10)||1));
      document.getElementById('minus').onclick = () => { inp.value = clamp(+inp.value-1); };
      document.getElementById('plus').onclick = () => { inp.value = clamp(+inp.value+1); };
      const done = () => { A[id] = clamp(inp.value); next(); };
      inp.onkeydown = e => { if (e.key==='Enter'){ e.preventDefault(); done(); } };
      document.getElementById('next').onclick = done;
      bindBack();
    }
    if (st.type === 'search'){
      app.innerHTML = `<section class="screen">${head}${searchHTML('sq', st.options, A[id], st.placeholder, st.q)}
        <div class="actions nav">${backLink()}<button class="btn-primary" id="next" ${A[id]?'':'disabled'}>Continue</button></div></section>`;
      const nx = document.getElementById('next');
      let val = A[id] || '';
      bindSearch('sq', st.options, v => { val = v; nx.disabled = !v; }, () => { if (val){ A[id] = val; next(); } });
      nx.onclick = () => { if (!val) return; A[id] = val; next(); };
      bindBack();
    }
    if (st.type === 'text'){
      const cur = A[id] || '';
      app.innerHTML = `<section class="screen">${head}
        <div class="fields"><textarea id="f-text" rows="4" maxlength="600" aria-label="${esc(st.q)}" aria-describedby="f-count" placeholder="${esc(st.placeholder || '')}">${esc(cur)}</textarea></div>
        <p class="count" id="f-count">${cur.length} of 600 characters</p>
        <div class="actions nav">${backLink()}<button class="btn-primary" id="next" ${cur.trim()?'':'disabled'}>Continue</button></div></section>`;
      const ta = document.getElementById('f-text'), nx = document.getElementById('next');
      const cnt = document.getElementById('f-count');
      ta.oninput = () => { nx.disabled = !ta.value.trim(); cnt.textContent = `${ta.value.length} of 600 characters`; };
      const done = () => { const v = ta.value.trim().replace(/\s+/g,' '); if (!v) return; A[id] = v; next(); };
      ta.onkeydown = e => { if (e.key==='Enter' && (e.metaKey || e.ctrlKey)){ e.preventDefault(); done(); } };
      nx.onclick = done;
      bindBack();
    }
    if (st.type === 'link'){
      app.innerHTML = `<section class="screen">${head}
        <div class="fields"><label>Link to your brand guidelines <span>Optional</span><input id="f-link" type="url" inputmode="url" placeholder="https://" value="${esc(A[id])}"></label></div>
        <div class="actions nav">${backLink()}<button class="btn-link push" id="later">I'll send it later</button><button class="btn-primary" id="next">Continue</button></div></section>`;
      const inp = document.getElementById('f-link');
      const done = v => { A[id] = v; next(); };
      inp.onkeydown = e => { if (e.key==='Enter'){ e.preventDefault(); done(inp.value.trim()); } };
      document.getElementById('next').onclick = () => done(inp.value.trim());
      document.getElementById('later').onclick = () => done('');
      bindBack();
    }
  }

  // ---------- Dropdown with search (A7, A9.1, client details) ----------
  function searchHTML(key, options, cur, placeholder, label){
    const c = options.find(o => o.v === cur);
    return `<div class="search">
      <input id="${key}-in" type="text" role="combobox" aria-expanded="true" aria-controls="${key}-list" aria-autocomplete="list"
        autocomplete="off" aria-label="${esc(label)}" placeholder="${esc(placeholder || 'Type to search')}" value="${esc(c ? c.l : '')}">
      <ul class="search-list" id="${key}-list" role="listbox" aria-label="${esc(label)}"></ul>
    </div>`;
  }
  function bindSearch(key, options, onPick, onEnter){
    const inp = document.getElementById(key+'-in'), list = document.getElementById(key+'-list');
    let picked = (options.find(o => o.l === inp.value) || {}).v || '';
    let active = -1, shown = [];
    const draw = q => {
      const t = (q || '').trim().toLowerCase();
      shown = (picked && options.find(o => o.v===picked && o.l.toLowerCase()===t)) ? options : options.filter(o => o.l.toLowerCase().includes(t));
      list.innerHTML = shown.length
        ? shown.map((o,i) => `<li role="option" id="${key}-o${i}" data-v="${esc(o.v)}" aria-selected="${o.v===picked}" class="${i===active?'active':''}">${esc(o.l)}</li>`).join('')
        : '<li class="none" role="presentation">No match. Try another word.</li>';
      inp.setAttribute('aria-activedescendant', active >= 0 ? `${key}-o${active}` : '');
    };
    const choose = o => { picked = o.v; inp.value = o.l; active = -1; draw(inp.value); onPick(o.v); };
    list.onclick = e => { const li = e.target.closest('li[data-v]'); if (li) choose(options.find(o => o.v === li.dataset.v)); };
    inp.oninput = () => { picked = ''; active = -1; onPick(''); draw(inp.value); };
    inp.onkeydown = e => {
      if (e.key==='ArrowDown'){ e.preventDefault(); active = Math.min(shown.length-1, active+1); draw(inp.value); scrollAct(); }
      else if (e.key==='ArrowUp'){ e.preventDefault(); active = Math.max(0, active-1); draw(inp.value); scrollAct(); }
      else if (e.key==='Enter'){
        e.preventDefault();
        if (active >= 0 && shown[active]) choose(shown[active]);
        else if (!picked && shown.length === 1) choose(shown[0]);
        else if (picked && onEnter) onEnter();
      }
    };
    const scrollAct = () => { const el = document.getElementById(`${key}-o${active}`); if (el) el.scrollIntoView({block:'nearest'}); };
    draw(picked ? inp.value : '');
    return () => picked;
  }

  // W0 Welcome (master doc): one screen before question 1
  function renderWelcome(){
    app.innerHTML = `<section class="screen">
      <h3>Here's how it works.</h3>
      <p class="hint">About 3 minutes. No sales pitch, just your answers.</p>
      <ul class="welcome-list">
        <li><span class="key" aria-hidden="true">1</span><span class="t">Tell us what you see</span></li>
        <li><span class="key" aria-hidden="true">2</span><span class="t">Get your diagnosis</span></li>
        <li><span class="key" aria-hidden="true">3</span><span class="t">See your plan</span></li>
      </ul>
      <div class="actions"><button class="btn-primary" id="next">Start my diagnosis</button></div>
      <p class="welcome-foot">We study the market before we act. Every recommendation is based on your answers, not a one-size package.</p>
    </section>`;
    document.getElementById('next').onclick = next;
  }

  function renderMirror(){
    const P = PATHS[path()];
    // Pick-all answers show one per line so each worry reads in the client's own words
    const ans = id => Array.isArray(A[id]) ? A[id].map(x => esc(opt(id,x).l)).join('<br>') : esc(lab(id));
    const items = P.problem.map(id => `<li><div><span class="q">${esc(S[id].m)}</span><span class="a">${ans(id)}</span></div></li>`).join('');
    app.innerHTML = `<section class="screen">
      <h3>Here's what you told us.</h3>
      <p class="hint">Does that sound right?</p>
      <ul class="words reveal">${items}</ul>
      <div class="actions nav">
        <button class="btn-link" id="adjust">Change my answers</button>
        <button class="btn-primary" id="yes">That's right</button>
      </div>
    </section>`;
    document.getElementById('yes').onclick = next;
    document.getElementById('adjust').onclick = () => go(flow().indexOf(P.problem[0]));
  }

  function renderProof(second){
    const d = proofData(second);
    app.innerHTML = `<section class="screen">
      <h3>${second ? 'One more brand like yours.' : 'Other brands told us the same thing.'}</h3>
      <p class="hint">${second ? 'Different product, same kind of problem.' : "Here's what happened next."}</p>
      <div class="stat-card"><p class="stat">${esc(d.stat)}</p><p class="stat-cap">${esc(d.cap)}</p></div>
      <div class="proof"><p>${d.copy}</p></div>
      <div class="actions nav">${backLink()}<button class="btn-primary" id="next">Continue</button></div>
    </section>`;
    document.getElementById('next').onclick = next; bindBack();
  }

  function renderContact(){
    const c = A.contact || {};
    const isA = path()==='A';
    const linkLabel = isA ? 'Amazon link or ASIN' : 'Amazon link, ASIN or website';
    const compLabel = isA ? "A competitor's Amazon link or ASIN" : "A competitor's Amazon link, ASIN or website";
    app.innerHTML = `<section class="screen">
      <h3>Where should we send your plan?</h3>
      <p class="hint">Your plan appears on the next screen. We'll use this to prepare your quote.</p>
      <div class="fields">
        <label>Your name<input id="f-name" autocomplete="name" placeholder="First and last name" value="${esc(c.name)}"></label>
        <label>Email<input id="f-email" type="email" autocomplete="email" placeholder="name@brand.com" value="${esc(c.email)}"></label>
        <label>Brand name<input id="f-brand" autocomplete="organization" placeholder="Share It Studio" value="${esc(c.brand)}"></label>
        <label>${linkLabel} <span>Optional, helps us look at what you have today</span><input id="f-asin" placeholder="${isA ? 'B0CX4T7R2M or amazon.com/dp/…' : 'B0CX4T7R2M, amazon.com/dp/… or yourbrand.com'}" value="${esc(c.asin)}"></label>
        <label>${compLabel} <span>Optional, the one you'd most like to beat</span><input id="f-comp" placeholder="${isA ? 'B0CX4T7R2M or amazon.com/dp/…' : 'B0CX4T7R2M, amazon.com/dp/… or theirbrand.com'}" value="${esc(c.comp)}"></label>
        ${isA ? '' : `<div class="field-src"><label for="src-in">How did you find out about us?</label>${searchHTML('src', SOURCES, c.src, 'Type to search', 'How did you find out about us?')}</div>`}
      </div>
      <p class="error" id="err" role="alert"></p>
      <div class="actions nav">${backLink()}<button class="btn-primary" id="next">See my diagnosis</button></div>
    </section>`;
    let src = c.src || '';
    if (!isA) bindSearch('src', SOURCES, v => { src = v; });
    document.getElementById('next').onclick = () => {
      const v = id => document.getElementById(id).value.trim();
      const d = {name:v('f-name'), email:v('f-email'), brand:v('f-brand'), asin:v('f-asin'), comp:v('f-comp'), src: isA ? '' : src};
      const err = document.getElementById('err');
      const bad = (fid, msg) => { app.querySelectorAll('[aria-invalid]').forEach(x => x.removeAttribute('aria-invalid'));
        const el = document.getElementById(fid); if (el){ el.setAttribute('aria-invalid','true'); el.focus(); } err.textContent = msg; };
      if (!d.name){ bad('f-name', 'Add your name to continue.'); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)){ bad('f-email', 'Enter a valid email address, like name@brand.com.'); return; }
      if (!d.brand){ bad('f-brand', 'Add your brand name to continue.'); return; }
      if (!isA && !d.src){ bad('src-in', 'Tell us how you found out about us to continue.'); return; }
      A.contact = d; next();
    };
    bindBack();
  }

  // ---------- Diagnosis and routing ----------
  function topIssues(){
    const p = path(), c = [];
    const add = (w, t) => { if (t) c.push({w,t}); };
    if (p==='A'){
      // A1 is pick all that apply: the first worry leads, the others can still make the top 3
      arr('a1').forEach((v,i) => add(i===0 ? 100 : 65, opt('a1',v).l));
      if (A.a4 !== 'nothing') add(90, lab('a4'));
      const has = k => arr('a10').includes(k);
      if (has('none')) add(70, 'My listing has none of the basics yet');
      else if (!has('aplus') && !has('premium')) add(45, 'My listing has no A+ Content');
      if (A.a11==='rewrite') add(55, "I'd rewrite my title, bullets and keywords from scratch");
      if (A.a11==='refresh') add(35, 'My title, bullets and keywords need a refresh');
      if (arr('a3').includes('agency')) add(40, 'An agency has already worked on my images');
    }
    if (p==='B'){
      add(100, lab('b1'));
      if (A.b5 !== 'nothing') add(90, lab('b5'));
      if (A.b3==='nothing') add(80, 'When I post, almost nothing happens');
      if (A.b3==='likes') add(60, 'I get some likes, but very few comments');
      if (A.b2==='rarely') add(70, 'I rarely or never post');
      if (A.b2==='monthly') add(50, 'I only post a few times a month');
      if (A.b4==='nobody') add(45, 'Nobody handles my social media right now');
      if (A.b4==='agency') add(40, "I tried an agency, but it didn't work out");
    }
    if (p==='C'){
      add(100, lab('c1'));
      if (A.c4 !== 'nothing') add(90, lab('c4'));
      if (A.c2==='no') add(80, "A stranger wouldn't really trust my brand from my photos");
      if (A.c2==='none') add(70, "I don't have photos yet");
      const has = k => arr('c9').includes(k);
      if (has('phone') && !has('pro')) add(50, 'I only have phone photos');
    }
    const seen = new Set();
    return c.sort((a,b)=>b.w-a.w).filter(x => !seen.has(x.t) && seen.add(x.t)).slice(0,3).map(x=>x.t);
  }

  // Final diagnosis (master doc draft): headline and explanation picked by the main problem.
  const DIAG = {
    A:{buy:["Shoppers find you, then leave without buying.","Your traffic is working. The page they land on isn't convincing them yet. That usually comes down to the main image, the photos and the A+ Content shoppers see in the first few seconds."],
       pro:["Next to your competitors, your listing looks like the riskier choice.","Shoppers compare listings side by side and pick the one that looks most trustworthy. When your photos and A+ look less polished, the sale goes to them, even if your product is better."],
       launch:["Your launch needs to sell from the first visit.","The first weeks decide your ranking and your first reviews. A listing built right from day one turns early traffic into sales instead of paying to learn."],
       onebrand:["Your products look like they come from different brands.","When every listing has its own style, shoppers don't recognize you or trust you across products. A consistent look makes each product help sell the next one."]},
    B:{engage:["People see your posts, but nothing makes them stop.","Reach without engagement usually means the content looks like everyone else's, or doesn't speak to what your audience cares about. The hook and the format matter more than the volume."],
       convert:["Your content gets attention, but not customers.","Followers need a reason and a clear path to buy. Content that shows the product in use and points to where to buy turns viewers into sales."],
       time:["Your social media is taking time you need for your business.","Doing it yourself works until it doesn't. When content depends on your free hours, it's the first thing that stops."],
       ideas:["You have a brand worth showing, but no plan for what to say.","Without a strategy and a calendar, every post starts from zero. A plan built on research makes posting easy and consistent."]},
    C:{homemade:["Your photos make your product look less impressive than it is.","Shoppers judge quality by the photo before they read a word. Homemade-looking images make a good product look like a risk."],
       brand:["Your photos and your brand are telling different stories.","When photos don't match your brand, shoppers get mixed signals about who you are and what you stand for."],
       volume:["You need more content than you can make.","Every launch, listing and channel needs fresh images. Without a steady supply, you end up reusing the same few photos everywhere."],
       use:["Shoppers can't picture your product in their life.","Studio shots show what it is. Lifestyle and in-use shots show why they need it, and that's what makes them buy."],
       fake:["Your photos look too perfect to trust.","Heavy editing or obvious AI makes shoppers doubt what they'll actually receive. Real, well-lit photos build the trust that closes the sale."],
       none:["Your product has no visual story yet.","Without photos, shoppers have nothing to judge you by. A planned shoot gives you images you can use everywhere from day one."]}
  };
  function diagnosis(){
    const p = path();
    // A1 is pick all that apply: the first worry in list order leads the diagnosis
    const main = p==='A' ? arr('a1')[0] : p==='B' ? A.b1 : A.c1;
    const waitId = {A:'a4',B:'b5',C:'c4'}[p];
    const d = (DIAG[p] || {})[main];
    if (!d) return null;
    return {head:d[0], body:d[1], cost: A[waitId] !== 'nothing' ? lab(waitId) : ''};
  }
  function diagnosisHTML(){
    const d = diagnosis(); if (!d) return '';
    return `<div class="result-block">
        <h4>Your diagnosis</h4>
        <div class="diag">
          <p class="diag-head">${esc(d.head)}</p>
          <p class="diag-body">${esc(d.body)}</p>
          ${d.cost ? `<div class="diag-cost"><span class="k">What it's costing you</span><span class="v">“${esc(d.cost)}”</span></div>` : ''}
        </div>
      </div>`;
  }

  function triageNote(){
    return A.start === 'unsure' && A.triage ? ` (from "Help me figure it out": ${lab('triage')})` : '';
  }

  const tierCtx = t => `${TIERS[t].name} (${TIERS[t].desc.replace(/\.$/,'').replace(/^./, c => c.toLowerCase())})`;
  const svc = (key, qty) => ({name:RC[key].name, parts:RC[key].parts, qty});

  function routeA(){
    const has = k => arr('a10').includes(k);
    const N = A.a5 || 1;
    const a1 = arr('a1');
    const brand = ['pre','lt10'].includes(A.a2) ? 'SCS' : 'SIS';
    const highRev = A.a2 === '50to150';
    const core = [], added = [], ongoing = [], flags = [];
    let tier = {now:'organic', later:'hybrid', no:'ai'}[A.a8];
    // A9 budget: under $500 never gets the Organic tier (Laura, master doc)
    if (A.a9 === 'lt500'){
      if (tier === 'organic'){ tier = 'hybrid'; flags.push('Budget under $500 (A9). Organic is not offered, so the production tier moved to Hybrid even though the client can ship samples now. Confirm the tier and services fit the budget.'); }
      else flags.push('Budget under $500 (A9). Organic is not offered. Confirm the services fit the budget.');
    }

    const services = [], also = [], notInCard = [];
    const forN = `For ${N===1 ? 'your product' : `each of your ${N} products`}`;

    // Master doc: competitors, launching and one brand always add photos
    const needPhotos = !(has('studio') && has('lifestyle') && has('infographics')) || a1.some(v => ['pro','launch','onebrand'].includes(v));
    if (needPhotos){
      const name = tier==='organic' ? 'Organic Photos' : tier==='hybrid' ? 'Hybrid Listing Photos' : 'Fully AI Listing Photos';
      core.push(`${name} x${N}`);
      services.push(svc('photos', forN));
      if (tier!=='organic') flags.push(`${name} uses the ${tier==='hybrid'?'Hybrid':'Fully AI'} production tier. It appears in the Q3 2026 rate card; confirm the masterprompt v1.3 rate reference has it.`);
      if (A.a8==='later') flags.push('Client can ship samples, but only in a few weeks. Production tier set to Hybrid; confirm timing and approach.');
      flags.push('Models are no longer asked in the quiz. Confirm whether the client wants people in the images (Models add-on).');
    }
    let aplusVideo = false;
    if (!has('premium')){
      if (brand==='SIS' && highRev && !has('video')){
        aplusVideo = true;
        core.push(`Premium A+ Video x${N}`, `Mobile A+ Video x${N}`);
        services.push(svc('aplusVideo', forN), svc('mobileVideo', forN));
      } else {
        core.push(`Premium A+ Standard x${N}`);
        services.push(svc('aplusStd', forN));
      }
    }
    if (!has('brandstory')){
      core.push('Brand Story x1'); notInCard.push('Brand Story x1');
      also.push('A Brand Story that ties your products together');
    }
    // Few buy and launching add Product Videos (SIS)
    if (brand==='SIS' && !has('video') && a1.some(v => ['buy','launch'].includes(v)) && !aplusVideo){
      core.push(`Product Videos x${N}`); services.push(svc('productVideo', forN));
    }
    if (A.a11 !== 'good'){
      core.push(`SEO English x${N}`); notInCard.push(`SEO English x${N}`);
      also.push('Your title, bullets and keywords, rewritten for search and sales');
    }

    // A6: color and size or other variations, counted per product in A6.1 and A6.2
    const C = ['color','both'].includes(A.a6) ? (A.a6c || 2) : 0;
    const Z = ['size','both'].includes(A.a6) ? (A.a6s || 2) : 0;
    if (C || Z){
      const parts = [C ? plural(C,'color') : '', Z ? plural(Z,'size or other variation') : ''].filter(Boolean);
      const combos = C && Z ? `, ${C*Z} combinations` : '';
      added.push(`Variations: ${parts.join(' and ')} per ASIN${combos} (apply add-on auto-quantity logic: image counts from the Listing Photos Pack x number of variations)`);
      if (C) services.push(svc('colorization', `For ${plural(C,'color')} per product`));
      if (Z){
        also.push(`Images for every size or version (${Z} per product)`);
        flags.push('Client has size or other variations. Confirm which images change per size or version; only Colorization appears in the Q3 2026 rate card.');
      }
      if (C && Z) flags.push(`Client has both colors and sizes (${C} x ${Z} = ${C*Z} combinations per product). Confirm whether images are needed per color only or per combination.`);
      if (N > 1) flags.push('Variation counts are the most common number per product. Confirm the exact count per ASIN.');
    }
    if (tier!=='organic'){
      if (hasKit() && !A.a12link) flags.push(`Client has brand guidelines but did not share a link. Request them before production; the ${tier==='hybrid'?'Hybrid':'Fully AI'} tier works from them.`);
      if (A.a12==='none') flags.push(`Client has no brand guidelines and the tier is ${tier==='hybrid'?'Hybrid':'Fully AI'}. Confirm the brand data we will work from.`);
    }

    const pkg = N<=3?'Starter':N<=10?'Scale':N<=20?'Grow':'Custom';
    if (A.a13==='monthly'){
      ongoing.push(`Content Management ${pkg}, 3 months`); notInCard.push(`Content Management ${pkg}, 3 months`);
      also.push('Fresh content every month after the rebuild');
    }
    if (A.a13==='unsure') flags.push('Client is not sure about ongoing help. Offer monthly content in the proposal (Content Management is not in the Q3 2026 rate card).');
    if (arr('a3').includes('agency')) flags.push("An agency has already worked on the client's images. Ask what didn't work and address it in the proposal.");
    if (A.triage==='all') flags.push('Client picked "a bit of all of these" in triage. Social media and photography are possible add-ons.');
    if (brand==='SCS') flags.push('SCS route. The client saw Share It Studio Q3 2026 rate card names; quote from the SCS rate card.');
    if (notInCard.length) flags.push(`Not in the Q3 2026 rate card, shown to the client as plain descriptions with no package name: ${notInCard.join(', ')}. Confirm masterprompt v1.3 has a rate for each.`);

    let why;
    if (brand==='SCS') why = "You're getting started, so this covers the core content your listing needs to compete, built efficiently.";
    else if (A.a13==='monthly') why = 'You want it fixed and kept fresh, so we rebuild what your listing is missing now and add new content every month.';
    else why = 'You want it fixed, so we rebuild what your listing is missing in one focused project.';

    const shownNames = services.map(s => s.name);
    const planName = shownNames.length
      ? `${TIERS[tier].name} tier: ${shownNames.join(', ')}${also.length ? `; also described in plain words: ${also.join('; ')}` : ''}`
      : `No rate card service shown${also.length ? `; described in plain words: ${also.join('; ')}` : ''}`;

    return {brand, N, core, added, ongoing, flags, plan:{name:planName},
      show:{goalK:'What bothers you most', goal:lab('a1'), tier:TIERS[tier], services, why,
            also, alsoTitle:'Also in your quote', alsoNote:'We confirm these with you in your quote.'},
      ctx:{main:lab('a1'), wait:lab('a4'), product:[lab('a7'), A.a7d].filter(Boolean).join('. '), revenue:lab('a2'), budget:lab('a9'), tier:tierCtx(tier),
           assets: arr('a10').includes('none') ? 'none' : lab('a10'),
           kit: lab('a12') + (hasKit() ? (A.a12link ? ` (link: ${A.a12link})` : ' (link not shared yet)') : '')}};
  }

  // Social media levels from shareitstudio.com/services-prices-and-updates. Not in the Q3 2026 rate card,
  // so the client sees the posting volume and what is included, never the package name.
  const SOCIAL = [
    {name:'Light', posts:'20 posts a month', incl:['Strategy and research','Scripting','Repurposing your content','Basic AI enhanced content','Editing','Uploading and posting','Monthly reports']},
    {name:'Grow', posts:'40+ posts a month', incl:['AI enhanced content','Basic product integration','Ads management','Avatar creation available']},
    {name:'Scale', posts:'60+ posts a month', incl:['Avatar creation','Basic filming of real content','Sales focused product integration']},
    {name:'Dominate', posts:'80+ posts a month', incl:['Deep research','Full filming of real content','Weekly performance tracking','Conversion testing on trends']}
  ];
  const SUPERSEDED = {'Basic AI enhanced content':'AI enhanced content','Avatar creation available':'Avatar creation',
    'Basic product integration':'Sales focused product integration','Basic filming of real content':'Full filming of real content'};

  function routeB(){
    const flags = [];
    let lvl = {few:0, daily:1, formats:2, several:3}[A.b13];
    const base = lvl;
    const reasons = [];
    if (A.b9==='all' && lvl < 2){ lvl = 2; reasons.push('real filming starts at 60+ posts a month, and you\'d need us to handle everything'); flags.push('Plan raised to Scale because the client cannot film (B9). Real filming starts at Scale.'); }
    if (A.b10==='sales' && lvl < 1){ lvl = 1; reasons.push('ads management and product integration start at 40+ posts a month, and you want visits and sales'); flags.push('Plan raised to Grow because the client wants visits and sales (B10).'); }
    const pk = SOCIAL[lvl];
    const all = SOCIAL.slice(0, lvl+1).flatMap(s => s.incl);
    const features = all.filter(x => !(SUPERSEDED[x] && all.includes(SUPERSEDED[x])));
    if (pk.name==='Grow') flags.push('Grow includes avatar creation as an option. The avatar has an extra fee that is not in the rate card; confirm if the client wants one.');
    flags.push(`Social media management is not in the Q3 2026 rate card. Suggested website level: ${pk.name} (${pk.posts}). The client saw the posting volume and features only, no package name. Confirm pricing.`);
    if (A.triage==='unknown') flags.push('Client reached this path from triage ("People don\'t know my brand exists").');
    const freq = lab('b13').toLowerCase();
    const why = `You want to show up ${freq}, so we plan around ${pk.posts}, 100% done for you.` + (reasons.length ? ` We planned more because ${reasons.join(', and ')}.` : '');
    return {brand:'SIS', N:null, core:[], added:[], ongoing:[`Social Media Management ${pk.name}, monthly`], flags,
      plan:{name:`Social media, ${pk.posts}, 100% done for you (website level ${pk.name}; no rate card service shown)`}, raised: lvl > base,
      show:{goalK:'You said this would make it worth it', goal:lab('b10'), posts:pk.posts, features, why},
      ctx:{main:lab('b1'), wait:lab('b5'), revenue:lab('b8'), tier:lab('b9'),
           assets: arr('b11').includes('none') ? 'none' : lab('b11'), kit:lab('b12')}};
  }

  function routeC(){
    const flags = [], added = [];
    const pics = arr('c8');
    const n = A.c5;
    const tmpl = '(Lisa Bader template: art direction, shot list, white background, lifestyle, assembly shots, additional angles, studio, photographer, assistant, equipment, props)';
    let qty;
    if (n===0) qty = ' (photo count to confirm)';
    else if (n===41){ qty = ' x40+'; flags.push('Client needs more than 40 photos. Confirm the exact photo count.'); }
    else qty = ` x${n}`;
    const core = [`Custom Product Photography${qty} ${tmpl}`];
    const incl = ['Art direction and a shot list made for your product','White-background images','Lifestyle images','Assembly or how-to shots','Extra angles'];
    if (pics.includes('people')){ added.push('Regular Model x1'); incl.push('A professional model, so people appear in your photos'); }
    if (pics.includes('hands')){ added.push('Manicure Fee x1'); incl.push('Hand close-ups with a professional manicure'); }
    incl.push('Studio, photographer, assistant, equipment and props, all handled by us');
    flags.push('Custom Product Photography (per photo), Regular Model and Manicure Fee are not in the Q3 2026 rate card or the masterprompt v1.3 rate reference yet. The client saw plain descriptions, no package name. Confirm pricing.');
    flags.push('Product count is not asked in Path C. Confirm how many products the shoot covers.');
    if (pics.includes('short') || pics.includes('creator')) flags.push(`Client also pictures ${[pics.includes('short')?'short videos':'',pics.includes('creator')?'creator-style videos':''].filter(Boolean).join(' and ')}. Video is not in the Lisa Bader template; add a video service from the rate card or confirm.`);
    if (A.c7==='no') flags.push('Client cannot send the product. The Lisa Bader template assumes a physical shoot; confirm an approach from existing photos or 3D files.');
    if (A.c7==='later') flags.push('Client can send the product, but only in a few weeks. Confirm shoot timing.');
    if (A.c11==='monthly') flags.push('Client wants new content every month. Consider a recurring shoot or monthly content (not in the Q3 2026 rate card).');
    if (A.c11==='launch') flags.push('Client wants new content every time they launch. Consider a repeat-shoot agreement.');
    if (A.triage==='looks') flags.push('Client reached this path from triage ("My product looks less impressive than it really is").');
    const tierKey = A.c7==='no' ? null : 'organic';
    const tier = {now:tierCtx('organic'), later:`${tierCtx('organic')}, product ships in a few weeks`, no:'Existing photos or 3D files (no product shipped)'}[A.c7];
    const extras = [pics.includes('people')?'people':'', pics.includes('hands')?'hand close-ups':''].filter(Boolean);
    const why = n===0
      ? "We'll help you choose the right number of photos, then plan and run one shoot around your product."
      : `You need ${lab('c5').toLowerCase()} photos${extras.length?' with '+extras.join(' and '):''}, so we plan and run a shoot around your product.`;
    const where = arr('c3').map(v => opt('c3',v).l);
    return {brand:'SIS', N:1, core, added, ongoing:[], flags,
      plan:{name:`${tierKey ? 'Organic tier, custom' : 'Custom'} photoshoot described in plain words (no rate card service shown)`},
      show:{goalK:"Where you'll use them", goal:where.join(', '), tier: tierKey ? TIERS[tierKey] : null, services:[], why,
            also:incl, alsoTitle:"What's included", alsoNote:'Your photoshoot is planned for your product. We confirm the details in your quote.'},
      ctx:{main:lab('c1'), wait:lab('c4'), revenue:lab('c6'), tier,
           assets: arr('c9').includes('nothing') ? 'none' : lab('c9'), kit:lab('c10')}};
  }

  function compute(){
    const p = path();
    const r = p==='A' ? routeA() : p==='B' ? routeB() : routeC();
    r.path = p; r.issues = topIssues();
    const srcV = p==='A' ? A.a9src : (A.contact && A.contact.src);
    const src = SOURCES.find(o => o.v === srcV);
    if (src && PARTNERS.includes(src.l)) r.flags.push(`Lead source: ${src.l} (partner). Check whether a partner discount applies. Never mentioned to the client. Partner list is provisional, confirm.`);
    return r;
  }

  function buildBrief(r){
    const c = A.contact, L = [];
    L.push(`New quote, ${r.brand}, client: ${c.name} (Brand: ${c.brand}).`);
    if (r.path==='B') L.push(`ASINs: ${c.asin || 'not provided'}.`);
    else L.push(`ASINs: ${c.asin || 'not provided'}. ${r.N} product${r.N>1?'s':''} to quote.`);
    L.push(`Services: ${r.core.length ? r.core.join(', ') : 'none'}.`);
    L.push(`Added Services: ${r.added.length ? r.added.join(', ') : 'none'}.`);
    if (r.ongoing.length) L.push(`Ongoing: ${r.ongoing.join(', ')}.`);
    L.push('Discount: none.');
    L.push('Default payment plan.');
    L.push('No competitor data yet.');
    L.push('');
    L.push(`Diagnosis context (from ${VERSION}, do not include this block in the quote):`);
    L.push(`- Client email: ${c.email}`);
    L.push(`- Service path: ${PATHS[r.path].name}${triageNote()}`);
    if (r.ctx.product) L.push(`- Product: ${r.ctx.product}`);
    L.push(`- Main problem: ${r.ctx.main}`);
    L.push(`- Cost of waiting: ${r.ctx.wait}`);
    L.push(`- Monthly revenue: ${r.ctx.revenue}`);
    if (r.ctx.budget) L.push(`- Budget: ${r.ctx.budget}`);
    L.push(`- Production tier: ${r.ctx.tier}`);
    L.push(`- Current assets: ${r.ctx.assets}`);
    L.push(`- Brand guidelines: ${r.ctx.kit}`);
    if (c.comp) L.push(`- Competitor link: ${c.comp}`);
    L.push(`- Recommended plan shown to client: ${r.plan.name}`);
    L.push(`- Top issues: ${r.issues.join('; ')}`);
    if (r.flags.length){ L.push(''); L.push('Flags for Laura:'); r.flags.forEach(f => L.push(`- ${f}`)); }
    return L.join('\n');
  }

  function buildInvoice(){
    const i = INV || {};
    return ['Invoice details (for the invoicing platform, not for masterprompt):',
      `- Name / Business name: ${i.name||''}`,
      `- Physical address: ${i.address||''}`,
      `- Email: ${A.contact ? A.contact.email : ''}`,
      `- Phone number: ${i.phone||''}`,
      `- Ways of payment: ${i.pay===CARD ? 'Credit card (3.4% processing fee applies)' : (i.pay||'')}`].join('\n');
  }

  function buildAnswers(){
    const rows = flow().filter(id => S[id] && A[id] !== undefined).map(id => `${S[id].n || id.toUpperCase()}. ${S[id].q}\n   ${['number','text'].includes(S[id].type) ? A[id] : S[id].type==='link' ? (A[id] || 'Will send later') : lab(id)}`);
    if (A.contact && A.contact.src) rows.push(`DETAILS. How did you find out about us?\n   ${(SOURCES.find(o => o.v===A.contact.src)||{}).l || ''}`);
    return rows.join('\n');
  }

  function internalPanel(){
    return `<details class="internal">
      <summary>Internal test panel</summary>
      <p>For testing only. Remove before going live.</p>
      <p class="int-h">Quote brief for masterprompt v1.3</p>
      <textarea id="brief" readonly>${esc(buildBrief(R))}</textarea>
      <div class="actions"><button class="bd-copy" data-copy="brief">Copy brief</button><span class="copied" role="status"></span></div>
      <p class="int-h">Invoice block</p>
      <textarea id="invoice" class="short" readonly>${esc(INV ? buildInvoice() : 'Not submitted yet. The client fills this in after "Send me my invoice".')}</textarea>
      <div class="actions"><button class="bd-copy" data-copy="invoice">Copy invoice block</button><span class="copied" role="status"></span></div>
      <p class="int-h">All answers</p>
      <textarea id="answers" readonly>${esc(buildAnswers())}</textarea>
    </details>`;
  }

  function bindCopy(){
    app.querySelectorAll('[data-copy]').forEach(b => b.onclick = async () => {
      const ta = document.getElementById(b.dataset.copy), msg = b.nextElementSibling;
      try { await navigator.clipboard.writeText(ta.value); msg.textContent = 'Copied'; }
      catch(_){ ta.select(); try { document.execCommand('copy'); msg.textContent = 'Copied'; } catch(__){ msg.textContent = 'Select the text and copy it manually'; } }
    });
  }

  function planHTML(r){
    const s = r.show;
    if (r.path==='B'){
      return `<div class="big-posts"><span class="n">${esc(s.posts)}</span><span class="d">100% done for you, on the platforms you choose.</span></div>
        <p class="plan-why gap">${esc(s.why)}</p>
        <p class="sub-h">What's included</p>
        <ul class="also">${s.features.map(x => `<li>${CHECK_SM}<span>${esc(x)}</span></li>`).join('')}</ul>`;
    }
    if (r.path==='C'){
      const tierC = s.tier ? `<div class="tier"><span class="k">Production tier</span><span class="n">${esc(s.tier.name)}</span><span class="d">${esc(s.tier.desc)}</span></div>` : '';
      return `${tierC}<p class="plan-why gap">${esc(s.why)}</p>
        <p class="sub-h">${esc(s.alsoTitle)}</p>
        <ul class="also">${s.also.map(x => `<li>${CHECK_SM}<span>${esc(x)}</span></li>`).join('')}</ul>
        <p class="also-note">${esc(s.alsoNote)}</p>`;
    }
    const tier = s.tier ? `<div class="tier"><span class="k">Production tier</span><span class="n">${esc(s.tier.name)}</span><span class="d">${esc(s.tier.desc)}</span></div>` : '';
    const list = s.services.length
      ? `<ul class="services">${s.services.map(x => `<li>${CHECK_GOLD}<span><span class="n">${esc(x.name)}</span><span class="q">${esc(x.qty)}</span>${x.parts ? `<span class="p">${esc(x.parts)}</span>` : ''}</span></li>`).join('')}</ul>`
      : (r.path==='A' ? '<p class="plan-empty">Your listing already has the basics. We\'ll look at it with you and show you what to improve next.</p>' : '');
    return `${tier}${list}<p class="plan-why">${esc(s.why)}</p>`;
  }

  function alsoHTML(r){
    const s = r.show;
    if (r.path!=='A' || !s.also || !s.also.length) return '';
    return `<div class="result-block">
        <h4>${esc(s.alsoTitle)}</h4>
        <ul class="also">${s.also.map(x => `<li>${PLUS}<span>${esc(x)}</span></li>`).join('')}</ul>
        <p class="also-note">${esc(s.alsoNote)}</p>
      </div>`;
  }

  function renderResults(){
    R = compute();
    const P = PATHS[R.path];
    // Pick-all answers with more than one pick take a full row; an odd last item also goes full so the grid has no gap
    const wide = P.problem.map(id => Array.isArray(A[id]) && A[id].length > 1);
    const narrow = P.problem.filter((id,i) => !wide[i]);
    const recap = P.problem.map((id,i) => {
      const full = wide[i] || (narrow.length % 2 === 1 && id === narrow[narrow.length-1]);
      return `<li class="${full ? 'full' : ''}"><span class="q">${esc(S[id].m)}</span><span class="a">${esc(lab(id)).replace(/; /g, '<br>')}</span></li>`;
    }).join('');
    app.innerHTML = `<section class="screen">
      <h3>Your results, ${esc(A.contact.name.split(' ')[0])}.</h3>
      <p class="hint">Your diagnosis and the plan that fits it. Prices come in your quote.</p>
      <div class="result-block">
        <h4>Based on what you told us</h4>
        <ul class="recap">${recap}</ul>
      </div>

      ${diagnosisHTML()}

      <div class="result-block">
        <h4>Your plan and what's included</h4>
        ${planHTML(R)}
      </div>

      ${alsoHTML(R)}

      <div class="result-block">
        <h4>Next step</h4>
        <div class="actions">
          <button class="btn-primary" id="quote">Send me my invoice</button>
          <a class="btn-outline" id="talk" href="${CALL_URL}" target="_blank" rel="noopener">Talk to a real person</a>
        </div>
        <div class="after"><button class="btn-link" id="back">Back</button><button class="btn-link" id="restart">Start over</button></div>
      </div>
      <p class="trust">${TRUST}</p>
      ${internalPanel()}
    </section>`;
    document.getElementById('quote').onclick = next;
    document.getElementById('talk').onclick = () => { setTimeout(() => renderTalk('results'), 0); };
    document.getElementById('restart').onclick = restart;
    bindBack(); bindCopy();
  }

  function renderInvoice(){
    const i = INV || {};
    const methods = ['Bank transfer','Zelle','Venmo',CARD];
    app.innerHTML = `<section class="screen">
      <h3>Where should we send your invoice?</h3>
      <p class="hint">We'll use these details on your quote and invoice.</p>
      <div class="fields">
        <label>Name or business name for the invoice<input id="i-name" autocomplete="organization" placeholder="Share It Studio" value="${esc(i.name || A.contact.brand)}"></label>
        <label>Physical address<input id="i-address" autocomplete="street-address" placeholder="123 Main St, Miami, FL 33101" value="${esc(i.address)}"></label>
        ${phoneHTML(i)}
        <fieldset class="fieldset">
          <legend>How would you like to pay?</legend>
          <div class="pay" role="radiogroup" aria-label="Payment method">
            ${methods.map(m => `<button class="opt" role="radio" aria-checked="${i.pay===m}" data-m="${m}" ${m===CARD?'aria-describedby="fee-pop"':''}><span class="ring"></span><span class="opt-label">${m}</span>${m===CARD?`<span class="fee-pop" id="fee-pop" role="status" ${i.pay===CARD?'':'hidden'}>${esc(FEE_NOTE)}</span>`:''}</button>`).join('')}
          </div>
        </fieldset>
      </div>
      <p class="error" id="err" role="alert"></p>
      <div class="actions nav">${backLink()}<button class="btn-primary" id="send">Send my invoice</button></div>
    </section>`;
    const country = bindPhone(i.cc);
    let pay = i.pay || '';
    app.querySelectorAll('[data-m]').forEach(b => b.onclick = () => {
      pay = b.dataset.m;
      app.querySelectorAll('[data-m]').forEach(x => x.setAttribute('aria-checked', x===b));
      document.getElementById('fee-pop').hidden = pay !== CARD;
    });
    document.getElementById('send').onclick = () => {
      const v = id => document.getElementById(id).value.trim();
      // The invoice block gets the full international number; the parts are kept to refill the form on Back
      const c = country(), num = v('i-phone');
      const d = {name:v('i-name'), address:v('i-address'), cc:c.iso, num, phone:`+${c.dial} ${num}`, pay};
      const err = document.getElementById('err');
      if (!d.name){ err.textContent = 'Add the name or business name for the invoice.'; return; }
      if (!d.address){ err.textContent = 'Add your physical address.'; return; }
      if (num.replace(/\D/g,'').length < 7){ err.textContent = 'Enter a phone number we can reach you on.'; return; }
      if (!d.pay){ err.textContent = 'Choose how you would like to pay.'; return; }
      INV = d; next();
    };
    bindBack();
  }

  // ---------- Phone with country code (invoice details) ----------
  // Default country: the region of the browser language (es-MX → Mexico), else the United States
  const localIso = () => {
    const r = (navigator.language || '').split('-')[1];
    return r && dialCodes.some(c => c.iso === r.toLowerCase()) ? r.toLowerCase() : 'us';
  };
  function phoneHTML(i){
    const c = dialCodes.find(x => x.iso === (i.cc || localIso()));
    return `<div class="phone-field">
        <label for="i-phone">Phone number</label>
        <div class="phone">
          <button type="button" class="cc" id="cc-btn" aria-haspopup="listbox" aria-expanded="false" aria-controls="cc-pop" aria-label="Country code: ${esc(c.name)} +${c.dial}">
            <img src="${flagSrc(c.iso)}" alt="" width="20" height="15"><span>+${c.dial}</span>
          </button>
          <input id="i-phone" type="tel" inputmode="tel" autocomplete="tel-national" placeholder="555 123 4567" value="${esc(i.num)}">
        </div>
        <div class="cc-pop" id="cc-pop" hidden>
          <input id="cc-search" type="text" autocomplete="off" placeholder="Search country or code" aria-label="Search country or code" aria-controls="cc-list">
          <ul class="cc-list" id="cc-list" role="listbox" aria-label="Country code"></ul>
        </div>
      </div>`;
  }
  function bindPhone(cur){
    const btn = document.getElementById('cc-btn'), pop = document.getElementById('cc-pop');
    const q = document.getElementById('cc-search'), list = document.getElementById('cc-list');
    let picked = dialCodes.find(x => x.iso === (cur || localIso()));
    let shown = [], active = -1;
    const draw = () => {
      const t = q.value.trim().toLowerCase().replace(/^\+/, ''), digits = t.replace(/\s/g, '');
      shown = dialCodes.filter(c => !t || c.name.toLowerCase().includes(t) || c.iso === t || (digits && /^\d+$/.test(digits) && c.dial.replace(' ', '').startsWith(digits)));
      list.innerHTML = shown.length
        ? shown.map((c,k) => `<li role="option" id="cc-o${k}" data-iso="${c.iso}" aria-selected="${c.iso===picked.iso}" class="${k===active?'active':''}"><img src="${flagSrc(c.iso)}" alt="" width="20" height="15" loading="lazy"><span class="cc-name">${esc(c.name)}</span><span class="cc-dial">+${c.dial}</span></li>`).join('')
        : '<li class="none" role="presentation">No match. Try another word.</li>';
      q.setAttribute('aria-activedescendant', active >= 0 ? `cc-o${active}` : '');
    };
    const open = () => {
      pop.hidden = false; btn.setAttribute('aria-expanded', 'true');
      q.value = ''; active = -1; draw(); q.focus();
      const sel = list.querySelector('[aria-selected="true"]'); if (sel) sel.scrollIntoView({block:'nearest'});
    };
    const close = refocus => { pop.hidden = true; btn.setAttribute('aria-expanded', 'false'); if (refocus) btn.focus(); };
    const choose = c => {
      picked = c;
      btn.innerHTML = `<img src="${flagSrc(c.iso)}" alt="" width="20" height="15"><span>+${c.dial}</span>`;
      btn.setAttribute('aria-label', `Country code: ${c.name} +${c.dial}`);
      close(false); document.getElementById('i-phone').focus();
    };
    btn.onclick = () => pop.hidden ? open() : close(true);
    q.oninput = () => { active = -1; draw(); };
    q.onkeydown = e => {
      if (e.key === 'ArrowDown'){ e.preventDefault(); active = Math.min(shown.length-1, active+1); draw(); scrollAct(); }
      else if (e.key === 'ArrowUp'){ e.preventDefault(); active = Math.max(0, active-1); draw(); scrollAct(); }
      else if (e.key === 'Enter'){ e.preventDefault(); const c = shown[active >= 0 ? active : 0]; if (c) choose(c); }
      else if (e.key === 'Escape'){ e.preventDefault(); close(true); }
    };
    const scrollAct = () => { const el = document.getElementById(`cc-o${active}`); if (el) el.scrollIntoView({block:'nearest'}); };
    list.onclick = e => { const li = e.target.closest('li[data-iso]'); if (li) choose(dialCodes.find(c => c.iso === li.dataset.iso)); };
    // A click anywhere else closes the list (the listener goes away with the screen)
    const outside = e => {
      if (!document.body.contains(pop)) return document.removeEventListener('pointerdown', outside);
      if (!pop.hidden && !pop.parentElement.contains(e.target)) close(false);
    };
    document.addEventListener('pointerdown', outside);
    return () => picked;
  }

  function renderDone(){
    app.innerHTML = `<section class="screen">
      <h3>Thanks, ${esc(A.contact.name.split(' ')[0])}.</h3>
      <p class="lede">We're preparing your quote and invoice now. They go to ${esc(A.contact.email)}, usually within one business day.</p>
      <div class="actions"><button class="btn-outline" id="restart">Start over</button></div>
      ${internalPanel()}
    </section>`;
    document.getElementById('restart').onclick = restart;
    bindCopy();
  }

  function restart(){ A = {}; R = null; INV = null; go(0); }

  // Keyboard: number keys pick options, Enter continues
  // Keys only count while focus is inside the card, so they never fire elsewhere on the page
  root.addEventListener('keydown', e => {
    if (['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName)) return;
    const id = flow()[pos];
    if (!S[id]) return;
    const n = parseInt(e.key,10);
    if (n>=1 && n<=9){ const o = app.querySelectorAll('.options .opt')[n-1]; if (o){ o.click(); e.preventDefault(); } }
    if (e.key==='Enter' && !e.target.closest('button, a')){ const nx = document.getElementById('next'); if (nx && !nx.disabled){ nx.click(); e.preventDefault(); } }
  });

  go(0, true);
}
