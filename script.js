/* ═══════════════════════════════════════════
   PORTFOLIO SCRIPT v2 — Abdul Razak Bilal
   Canvas · Counters · Skill bars · Drag scroll
═══════════════════════════════════════════ */

/* ─── CURSOR ─── */
const cur  = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');
if (window.matchMedia('(pointer:fine)').matches) {
  let mx=0,my=0,tx=0,ty=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px'});
  (function loop(){tx+=(mx-tx)*.1;ty+=(my-ty)*.1;trail.style.left=tx+'px';trail.style.top=ty+'px';requestAnimationFrame(loop)})();
}

/* ─── SCROLL PROGRESS ─── */
const prog = document.getElementById('scrollProgress');
window.addEventListener('scroll',()=>{
  const pct = window.scrollY/(document.documentElement.scrollHeight-window.innerHeight)*100;
  prog.style.width = pct+'%';
},{passive:true});

/* ─── NAVBAR ─── */
const nav = document.getElementById('navbar');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>40),{passive:true});

/* ─── MOBILE MENU ─── */
const ham = document.getElementById('hamburger');
const mob = document.getElementById('mobileMenu');
ham.addEventListener('click',()=>mob.classList.toggle('open'));
function closeMobile(){mob.classList.remove('open')}

/* ─── HERO CANVAS — particle grid ─── */
(function(){
  const canvas = document.getElementById('heroCanvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let W,H,dots=[];

  function resize(){
    W=canvas.width=canvas.offsetWidth;
    H=canvas.height=canvas.offsetHeight;
    buildDots();
  }

  function buildDots(){
    dots=[];
    const cols=Math.ceil(W/70), rows=Math.ceil(H/70);
    for(let r=0;r<rows;r++){
      for(let c=0;c<cols;c++){
        dots.push({
          x:(c+.5)*(W/cols), y:(r+.5)*(H/rows),
          ox:(c+.5)*(W/cols), oy:(r+.5)*(H/rows),
          vx:(Math.random()-.5)*.3, vy:(Math.random()-.5)*.3,
          r: Math.random()<.15 ? 1.5 : .8,
          a: Math.random()*.5+.15
        });
      }
    }
  }

  let mouseX=-9999,mouseY=-9999;
  window.addEventListener('mousemove',e=>{
    const rect=canvas.getBoundingClientRect();
    mouseX=e.clientX-rect.left; mouseY=e.clientY-rect.top;
  });

  function draw(){
    ctx.clearRect(0,0,W,H);
    dots.forEach(d=>{
      const dx=mouseX-d.x, dy=mouseY-d.y;
      const dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<120){
        d.x -= dx*.02; d.y -= dy*.02;
      } else {
        d.x += (d.ox-d.x)*.04 + d.vx;
        d.y += (d.oy-d.y)*.04 + d.vy;
      }
      ctx.beginPath();
      ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
      ctx.fillStyle = `rgba(0,212,164,${d.a})`;
      ctx.fill();
    });
    // draw nearby connections
    for(let i=0;i<dots.length;i++){
      for(let j=i+1;j<dots.length;j++){
        const dx=dots[i].x-dots[j].x, dy=dots[i].y-dots[j].y;
        const d=Math.sqrt(dx*dx+dy*dy);
        if(d<90){
          ctx.beginPath();
          ctx.moveTo(dots[i].x,dots[i].y);
          ctx.lineTo(dots[j].x,dots[j].y);
          ctx.strokeStyle=`rgba(0,212,164,${.08*(1-d/90)})`;
          ctx.lineWidth=.6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  resize();
  window.addEventListener('resize',resize);
  draw();
})();

/* ─── TYPEWRITER ─── */
const roles = [
  'Aspiring Data Scientist',
  'Machine Learning Engineer',
  'Cricket Analytics Enthusiast',
  'Hackathon Builder',
  'Agentic AI Developer',
];
const tel = document.getElementById('typedText');
let ri=0,ci=0,del=false;
function type(){
  if(!tel) return;
  const cur = roles[ri];
  if(!del){ tel.textContent=cur.slice(0,++ci); if(ci===cur.length){setTimeout(()=>{del=true;type()},2200);return;} }
  else    { tel.textContent=cur.slice(0,--ci); if(ci===0){del=false;ri=(ri+1)%roles.length;} }
  setTimeout(type, del?40:72);
}
setTimeout(type,900);

/* ─── HERO FADE-UPS ─── */
document.addEventListener('DOMContentLoaded',()=>{
  setTimeout(()=>document.querySelectorAll('.fade-up').forEach(el=>el.classList.add('vis')),120);
});

/* ─── INTERSECTION OBSERVER (scroll reveals) ─── */
const revObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('vis'); });
},{threshold:.1,rootMargin:'0px 0px -40px 0px'});

document.querySelectorAll('.reveal-fade,.reveal-up,.reveal-left,.sec-label').forEach(el=>revObs.observe(el));

/* ─── COUNTER ANIMATION ─── */
function animateCount(el){
  const target = parseFloat(el.dataset.target);
  const dec    = parseInt(el.dataset.dec||'0');
  const suffix = el.dataset.suffix||'';
  const dur    = 1600;
  const start  = performance.now();
  function step(now){
    const p = Math.min((now-start)/dur,1);
    const ease = 1-Math.pow(1-p,3);
    const val = target*ease;
    el.textContent = (dec>0 ? val.toFixed(dec) : Math.floor(val)) + suffix;
    if(p<1) requestAnimationFrame(step);
    else el.textContent = (dec>0 ? target.toFixed(dec) : target) + suffix;
  }
  requestAnimationFrame(step);
}
const countObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.hstat-n').forEach(animateCount);
      countObs.unobserve(e.target);
    }
  });
},{threshold:.5});
const statsRow = document.querySelector('.hero-stats-row');
if(statsRow) countObs.observe(statsRow);

/* ─── SKILL BAR ANIMATION ─── */
const barObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.sbar-fill').forEach(bar=>{
        setTimeout(()=>{ bar.style.width = bar.dataset.w+'%'; },100);
      });
      barObs.unobserve(e.target);
    }
  });
},{threshold:.2});
const skillSection = document.querySelector('#skills');
if(skillSection) barObs.observe(skillSection);

/* ─── PROJECT CAROUSEL — drag + nav ─── */
(function(){
  const track = document.getElementById('projTrack');
  const dotsC = document.getElementById('projDots');
  const btnL  = document.getElementById('pLeft');
  const btnR  = document.getElementById('pRight');
  if(!track) return;

  const cards = track.querySelectorAll('.pcard');
  const total = cards.length;
  let current = 0;
  let isDragging=false, startX=0, startScroll=0;

  // build dots
  cards.forEach((_,i)=>{
    const d=document.createElement('div');
    d.className='pdot'+(i===0?' active':'');
    d.addEventListener('click',()=>goTo(i));
    dotsC.appendChild(d);
  });

  function getCardW(){
    return cards[0].offsetWidth + 20; // gap
  }

  function goTo(idx){
    current = Math.max(0,Math.min(idx,total-1));
    const offset = current * getCardW();
    track.style.transform = `translateX(-${offset}px)`;
    document.querySelectorAll('.pdot').forEach((d,i)=>d.classList.toggle('active',i===current));
  }

  if(btnL) btnL.addEventListener('click',()=>goTo(current-1));
  if(btnR) btnR.addEventListener('click',()=>goTo(current+1));

  // keyboard
  document.addEventListener('keydown',e=>{
    if(e.key==='ArrowLeft') goTo(current-1);
    if(e.key==='ArrowRight') goTo(current+1);
  });

  // drag
  track.addEventListener('mousedown',e=>{isDragging=true;startX=e.pageX;startScroll=current*getCardW();track.style.transition='none';});
  window.addEventListener('mousemove',e=>{
    if(!isDragging) return;
    const dx = startX-e.pageX;
    track.style.transform=`translateX(-${startScroll+dx}px)`;
  });
  window.addEventListener('mouseup',e=>{
    if(!isDragging) return;
    isDragging=false;
    track.style.transition='transform .45s cubic-bezier(.4,0,.2,1)';
    const dx=startX-e.pageX;
    if(dx>50) goTo(current+1);
    else if(dx<-50) goTo(current-1);
    else goTo(current);
  });

  // touch
  let touchX=0;
  track.addEventListener('touchstart',e=>{touchX=e.touches[0].pageX;},{passive:true});
  track.addEventListener('touchend',e=>{
    const dx=touchX-e.changedTouches[0].pageX;
    if(dx>40) goTo(current+1);
    else if(dx<-40) goTo(current-1);
  });
})();

/* ─── SMOOTH SCROLL ─── */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const id=a.getAttribute('href');
    if(id==='#') return;
    const t=document.querySelector(id);
    if(t){e.preventDefault();window.scrollTo({top:t.getBoundingClientRect().top+window.scrollY-80,behavior:'smooth'});}
  });
});

/* ─── ACTIVE NAV ─── */
const navLinks=document.querySelectorAll('.nav-links a');
const sections=document.querySelectorAll('section[id]');
const secObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const id=e.target.id;
      navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+id));
    }
  });
},{threshold:.4});
sections.forEach(s=>secObs.observe(s));

/* ─── STAGGER GRID REVEALS ─── */
const gridObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.reveal-up,.reveal-fade').forEach((el,i)=>{
        el.style.setProperty('--rd',i*.07+'s');
        setTimeout(()=>el.classList.add('vis'),i*70);
      });
      gridObs.unobserve(e.target);
    }
  });
},{threshold:.06});
document.querySelectorAll('.certs-grid,.exp-list,.skills-layout,.about-grid').forEach(el=>gridObs.observe(el));
