/* Interatividade nativa, sem dependências. Guará Agency — Modelo demonstrativo. */
(() => {
'use strict';
const D = window.NORD_DATA;
if(!D) return;
const $ = (sel,root=document) => root.querySelector(sel);
const $$ = (sel,root=document) => Array.from(root.querySelectorAll(sel));
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const normalize = v => String(v ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
const byId = new Map(D.materials.map(x=>[x.id,x]));
const projectsById = new Map(D.projects.map(x=>[x.id,x]));
const pictureFallback = D.photos.interior;
const updateStatus = (el,t) => { if(el) el.textContent=t; };

// Entrada suave na tela
if(!reduced && 'IntersectionObserver' in window) {
 const observer=new IntersectionObserver((entries,obs)=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');obs.unobserve(entry.target)}});
 },{rootMargin:'0px 0px -40px 0px',threshold:.09});
 $$('.reveal').forEach(el=>observer.observe(el));
} else $$('.reveal').forEach(el=>el.classList.add('visible'));

// Cabeçalho e menu acessível
const header=$('#site-header'), menu=$('#main-nav'), menuButton=$('#menu-button');
const closeMenu=()=>{menu?.classList.remove('open');menuButton?.setAttribute('aria-expanded','false');menuButton?.setAttribute('aria-label','Abrir menu')};
menuButton?.addEventListener('click',()=>{const open=!menu.classList.contains('open');menu.classList.toggle('open',open);menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Fechar menu':'Abrir menu')});
$$('a',menu).forEach(a=>a.addEventListener('click',closeMenu));
window.addEventListener('resize',()=>{if(innerWidth>1050)closeMenu()},{passive:true});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
document.addEventListener('click',e=>{if(menu&&menuButton&&!menu.contains(e.target)&&!menuButton.contains(e.target))closeMenu()});
let lastScrollFrame=0;
window.addEventListener('scroll',()=>{if(lastScrollFrame) return;lastScrollFrame=requestAnimationFrame(()=>{header?.classList.toggle('is-sticky',scrollY>35);lastScrollFrame=0})},{passive:true});

// Carrossel do hero
const slideImage=$('#showcase-image'),slideTitle=$('#showcase-title'),slideCategory=$('#showcase-category'),slideCount=$('#showcase-count'),track=$('#showcase-track'),showcase=$('#hero-showcase');
let slideIndex=0, slideTimer=null,slideTransition=null;
function showSlide(index,animate=true){
 slideIndex=(index+D.slides.length)%D.slides.length;
 const slide=D.slides[slideIndex];
 if(animate&&!reduced) slideImage?.classList.add('showcase-fade');
 clearTimeout(slideTransition);
 const apply=()=>{
  if(slideImage){slideImage.src=slide.image;slideImage.alt=slide.alt;slideImage.classList.remove('showcase-fade')}
  updateStatus(slideTitle,slide.title);updateStatus(slideCategory,slide.category);
  updateStatus(slideCount,String(slideIndex+1).padStart(2,'0')+' / '+String(D.slides.length).padStart(2,'0'));
  $$('b',track).forEach((bar,i)=>{bar.classList.toggle('active',i===slideIndex);bar.style.animation='none';void bar.offsetHeight;bar.style.animation=''});
 };
 if(animate&&!reduced)slideTransition=setTimeout(apply,180);else apply();
}
function pauseSlide(){if(slideTimer){clearInterval(slideTimer);slideTimer=null}}
function startSlide(){pauseSlide();if(!reduced&&!document.hidden)slideTimer=setInterval(()=>showSlide(slideIndex+1),6000)}
$('#showcase-prev')?.addEventListener('click',()=>{showSlide(slideIndex-1);startSlide()});
$('#showcase-next')?.addEventListener('click',()=>{showSlide(slideIndex+1);startSlide()});
showcase?.addEventListener('mouseenter',pauseSlide);showcase?.addEventListener('mouseleave',startSlide);
showcase?.addEventListener('focusin',pauseSlide);showcase?.addEventListener('focusout',e=>{if(!showcase.contains(e.relatedTarget))startSlide()});
showcase?.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();showSlide(slideIndex-1)}if(e.key==='ArrowRight'){e.preventDefault();showSlide(slideIndex+1)}});
document.addEventListener('visibilitychange',()=>{document.hidden?pauseSlide():startSlide()});
showSlide(0,false);startSlide();

// Serviços / aplicações
const applications=$('#applications');
applications.innerHTML=D.applications.map((a,i)=>'<a class="application-card" href="#orcamento" data-application="'+escapeHtml(a.name)+'"><img src="'+escapeHtml(a.image)+'" alt="Imagem ilustrativa de '+escapeHtml(a.name)+'" loading="lazy" decoding="async"><div class="application-meta"><span>'+escapeHtml(a.kind.toUpperCase())+'</span><span>'+String(i+1).padStart(2,'0')+' / 10</span></div><div class="application-card-content"><h3>'+escapeHtml(a.name)+'</h3><p>'+escapeHtml(a.desc)+'</p></div><span class="application-card-arrow">↗</span></a>').join('');

// Texturas procedurais: amostras ilustrativas e identificadas como tal
function hashString(s){let h=2166136261;for(let i=0;i<s.length;i++){h=Math.imul(h^s.charCodeAt(i),16777619)}return h>>>0}
function randomGen(seed){let s=seed||1;return ()=>{s+=0x6D2B79F5;let t=s;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296}}
function textureSvg(material,w=520,h=370){
 const rand=randomGen(hashString(material.name)),wood=material.category==='MDF e Madeiras';
 const dark=/Preto|Nero|Grafite|Marrom Absoluto|Verde Ubatuba|Marrom Imperador|Laurent|Kelya|Trilium|Nogueira/.test(material.name);
 const white=/Branco|Carrara|Cristallo|Zenith|Prime|Calacatta|Calacata|White|Off White/.test(material.name);
 const green=/Verde|Oliva|Guatemala/.test(material.name);
 const warm=/Bege|Crema|Areia|Carvalho|Freijó|Madeira|Jequitibá|Travertino|Taj Mahal|Saara|Dakar/.test(material.name);
 let colors=dark?['#141e1b','#43443f','#88745e']:green?['#354d42','#6b7760','#1b382b']:white?['#f5f1e8','#d4d2c9','#b4b1a6']:warm?['#dcc9ab','#b9a186','#f1e6d4']:material.colors;
 if(material.category==='Ultracompactos'&&!dark&&!white) colors=['#c4bbae','#aca79e','#e9e6df'];
 const lines=[];
 if(wood){
  for(let i=0;i<65;i++){let x=Math.floor(rand()*w),spread=(rand()-.5)*140,th=rand()*1.9+.25;lines.push('<path d="M '+x+' -30 C '+(x+spread)+' '+(h*.28)+' '+(x-spread)+' '+(h*.65)+' '+(x+spread*.5)+' '+(h+30)+'" stroke="'+(rand()>.65?'#3b3228':'#f5e7d2')+'" opacity="'+(rand()*.2+.08).toFixed(2)+'" stroke-width="'+th.toFixed(1)+'" fill="none"/>')}
 } else {
  for(let i=0;i<16;i++){let x=rand()*w,y=rand()*h,ex=x+(rand()-.5)*600,ey=y+(rand()-.5)*400,width=(rand()*7+.5).toFixed(2);lines.push('<path d="M '+(x-160).toFixed(1)+' '+(y-150).toFixed(1)+' Q '+(x+rand()*190).toFixed(1)+' '+(y+rand()*190).toFixed(1)+' '+(ex+100).toFixed(1)+' '+(ey+150).toFixed(1)+'" fill="none" stroke="'+(rand()>.38?'#5d5852':'#fff9ee')+'" opacity="'+(rand()*.32+.12).toFixed(2)+'" stroke-width="'+width+'"/>')}
  if(material.category==='Granitos'){for(let i=0;i<170;i++){let x=rand()*w,y=rand()*h,r=rand()*2.5+.4;lines.push('<ellipse cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" rx="'+r.toFixed(1)+'" ry="'+(r/1.4).toFixed(1)+'" fill="'+(rand()>.5?'#fff3e5':'#151c1a')+'" opacity="'+(rand()*.23+.12).toFixed(2)+'"/>')}}
 }
 const svg='<svg xmlns="http://www.w3.org/2000/svg" width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="'+colors[0]+'"/><stop offset=".48" stop-color="'+colors[1]+'"/><stop offset="1" stop-color="'+colors[2]+'"/></linearGradient><filter id="f"><feTurbulence type="fractalNoise" baseFrequency="'+(wood?'.013 .06':'.017')+'" numOctaves="3" seed="'+(hashString(material.name)%900)+'" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="'+(wood?8:18)+'"/></filter><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency=".45" numOctaves="3" seed="'+(hashString(material.name)%100)+'" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".16"/></feComponentTransfer></filter></defs><rect width="100%" height="100%" fill="url(#g)"/><g filter="url(#f)">'+lines.join('')+'</g><rect width="100%" height="100%" filter="url(#noise)" opacity=".3"/><rect width="100%" height="100%" fill="url(#g)" opacity=".08"/></svg>';
 return 'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(svg);
}
const textures=new Map();
function textureFor(item){if(!textures.has(item.id))textures.set(item.id,textureSvg(item));return textures.get(item.id)}
let materialFilter='Todos',materialQuery='',materialLimit=12;
const filters=$('#materials-filters'),count=$('#materials-count'),materialGrid=$('#material-grid'),moreMaterials=$('#materials-more'),searchMaterials=$('#materials-search');
const families=['Todos',...D.groupNames];
filters.innerHTML=families.map((name,i)=>'<button type="button" data-filter="'+escapeHtml(name)+'" aria-pressed="'+String(i===0)+'" class="'+(i===0?'active':'')+'">'+escapeHtml(name)+'</button>').join('');
const suggestions=$('#material-suggestions');suggestions.innerHTML=D.materials.map(m=>'<option value="'+escapeHtml(m.name)+'"></option>').join('');
function filteredMaterials(){return D.materials.filter(m=>(materialFilter==='Todos'||m.category===materialFilter)&&(!materialQuery||normalize(m.name+' '+m.category).includes(materialQuery)))}
function renderMaterials(){
 const list=filteredMaterials(),visible=list.slice(0,materialLimit);
 materialGrid.innerHTML=visible.length?visible.map(m=>'<article class="material-card"><button class="material-image" type="button" data-open-material="'+m.id+'" aria-label="Ampliar amostra ilustrativa de '+escapeHtml(m.name)+'"><img src="'+textureFor(m)+'" loading="lazy" alt="Textura sintética ilustrativa de '+escapeHtml(m.name)+'"><span class="sample-tag">AMOSTRA ILUSTRATIVA</span></button><div class="material-body"><span class="material-category">'+escapeHtml(m.category)+'</span><h3>'+escapeHtml(m.name)+'</h3><button type="button" data-choose-material="'+m.id+'">Selecionar para projeto <span>↗</span></button></div></article>').join(''):'<p class="empty-state">Nenhum material corresponde à pesquisa. Experimente outro termo ou categoria.</p>';
 updateStatus(count,list.length+' '+(list.length===1?'material encontrado':'materiais encontrados'));
 moreMaterials.hidden=list.length<=materialLimit;
}
filters.addEventListener('click',e=>{const b=e.target.closest('button[data-filter]');if(!b)return;materialFilter=b.dataset.filter;materialLimit=12;$$('button',filters).forEach(btn=>{let a=btn===b;btn.classList.toggle('active',a);btn.setAttribute('aria-pressed',String(a))});renderMaterials()});
searchMaterials.addEventListener('input',e=>{materialQuery=normalize(e.target.value);materialLimit=12;renderMaterials()});
moreMaterials.addEventListener('click',()=>{materialLimit+=12;renderMaterials()});
renderMaterials();

// Acabamentos
$('#finish-grid').innerHTML=D.finishes.map((f,i)=>'<article class="finish-card"><div class="finish-surface" aria-hidden="true"></div><div class="finish-card-body"><span>'+String(i+1).padStart(2,'0')+' / ACABAMENTO</span><h3>'+escapeHtml(f.title)+'</h3><p>'+escapeHtml(f.desc)+'</p></div></article>').join('');
const edgeDescriptions={reta:'Visual limpo e espessura aparente do material.',meia:'Junção em ângulo que pode produzir a aparência de maior espessura.',rebaixo:'Geometria de contenção de água usada em determinadas bancadas, conforme projeto.'};
$('#edge-controls').addEventListener('click',e=>{const b=e.target.closest('button[data-edge]');if(!b)return;$$('button[data-edge]',$('#edge-controls')).forEach(x=>x.classList.toggle('active',x===b));$('#finish-visual').dataset.edge=b.dataset.edge;updateStatus($('#edge-description'),edgeDescriptions[b.dataset.edge])});

// Galeria de projetos — referências, sem atribuir execuções à marca
let projectFilter='Todos',projectLimit=6;
const projectFilters=$('#projects-filters'),projectsGrid=$('#project-grid'),projectsMore=$('#projects-more');
const projectGroups=['Todos',...new Set(D.projects.map(p=>p.category))];
projectFilters.innerHTML=projectGroups.map((name,i)=>'<button type="button" class="'+(i===0?'active':'')+'" data-project-filter="'+escapeHtml(name)+'" aria-pressed="'+String(i===0)+'">'+escapeHtml(name)+'</button>').join('');
function renderProjects(){
 const list=D.projects.filter(p=>projectFilter==='Todos'||p.category===projectFilter),visible=list.slice(0,projectLimit);
 projectsGrid.innerHTML=visible.map((p,i)=>'<article class="project-card"><div class="project-cover"><img loading="lazy" src="'+escapeHtml(p.images[0])+'" alt="Fotografia ilustrativa do ambiente '+escapeHtml(p.title)+'"><span class="project-number">'+String(i+1).padStart(2,'0')+'</span><span class="project-image-label">REFERÊNCIA VISUAL</span><span class="view-icon" aria-hidden="true">↗</span></div><div class="project-card-body"><span>'+escapeHtml(p.category)+'</span><h3>'+escapeHtml(p.title)+'</h3><p>'+escapeHtml(p.material)+'</p></div><button class="project-card-button" type="button" data-open-project="'+p.id+'" aria-label="Ver detalhes do ambiente '+escapeHtml(p.title)+'"></button></article>').join('');
 projectsMore.hidden=list.length<=projectLimit;
}
projectFilters.addEventListener('click',e=>{const b=e.target.closest('button[data-project-filter]');if(!b)return;projectFilter=b.dataset.projectFilter;projectLimit=6;$$('button',projectFilters).forEach(x=>{let active=x===b;x.classList.toggle('active',active);x.setAttribute('aria-pressed',String(active))});renderProjects()});
projectsMore.addEventListener('click',()=>{projectLimit+=6;renderProjects()});renderProjects();

// Diálogos de materiais e projetos
const materialDialog=$('#material-dialog'),projectDialog=$('#project-dialog'),materialContent=$('#material-dialog-content'),projectContent=$('#project-dialog-content');
function openDialog(dialog){if(dialog?.showModal) dialog.showModal();else dialog.setAttribute('open','')}
function closeDialog(dialog){if(dialog?.close) dialog.close();else dialog.removeAttribute('open')}
$$('.modal').forEach(dialog=>{
 dialog.addEventListener('click',e=>{if(e.target===dialog)closeDialog(dialog);else if(e.target.closest('[data-close]'))closeDialog(dialog)});
});
function showMaterial(id){
 const m=byId.get(id);if(!m)return;
 materialContent.innerHTML='<div class="material-modal-layout"><div class="modal-art"><img src="'+textureFor(m)+'" alt="Amostra gerada ilustrativa '+escapeHtml(m.name)+'"></div><div class="modal-copy"><p class="eyebrow">'+escapeHtml(m.category)+'</p><h2>'+escapeHtml(m.name)+'</h2><p>'+escapeHtml(m.description)+'</p><div class="modal-rule"><span>TIPO</span><strong>'+escapeHtml(m.category)+'</strong></div><div class="modal-rule"><span>IMAGEM</span><strong>SIMULAÇÃO VISUAL</strong></div><div class="modal-rule"><span>CONFIRMAÇÃO</span><strong>AMOSTRA FÍSICA</strong></div><button type="button" class="button button-dark" data-choose-material="'+m.id+'">Adicionar ao pedido <span>↗</span></button></div></div>';
 openDialog(materialDialog);
}
function showProject(id){
 const p=projectsById.get(id);if(!p)return;
 projectContent.innerHTML='<div class="project-modal-hero"><img id="project-modal-main" src="'+escapeHtml(p.images[0])+'" alt="Imagem ilustrativa de '+escapeHtml(p.title)+'"><div class="project-modal-title"><span>REFERÊNCIA VISUAL · '+escapeHtml(p.category.toUpperCase())+'</span><h2>'+escapeHtml(p.title)+'</h2></div></div><div class="project-modal-body"><p>'+escapeHtml(p.description)+'</p><div class="project-facts"><div><span>MATERIAL DE REFERÊNCIA</span><strong>'+escapeHtml(p.material)+'</strong></div><div><span>TIPO DE SERVIÇO</span><strong>'+escapeHtml(p.application)+'</strong></div></div><div class="project-thumbs">'+p.images.map((img,i)=>'<button class="'+(i===0?'active':'')+'" type="button" data-project-photo="'+i+'" aria-label="Ver imagem '+(i+1)+'"><img src="'+escapeHtml(img)+'" loading="lazy" alt="Vista ilustrativa '+(i+1)+'"></button>').join('')+'</div><button class="button button-dark" type="button" data-use-project="'+p.id+'">Usar como referência <span>↗</span></button><p>Imagens de referência de banco de fotos; este modelo não afirma que o serviço tenha sido executado pela marca fictícia.</p></div>';
 openDialog(projectDialog);
}
projectContent.addEventListener('click',e=>{const b=e.target.closest('[data-project-photo]');if(!b)return;let p=e.target.closest('#project-dialog-content');const img=$('img',b);const main=$('#project-modal-main');if(img&&main)main.src=img.src;$$('button[data-project-photo]',p).forEach(x=>x.classList.toggle('active',x===b))});
document.addEventListener('click',e=>{
 const mo=e.target.closest('[data-open-material]');if(mo){showMaterial(mo.dataset.openMaterial);return}
 const ch=e.target.closest('[data-choose-material]');if(ch){const item=byId.get(ch.dataset.chooseMaterial);if(item)selectMaterial(item);return}
 const pr=e.target.closest('[data-open-project]');if(pr){showProject(pr.dataset.openProject);return}
 const use=e.target.closest('[data-use-project]');if(use){const p=projectsById.get(use.dataset.useProject);if(p){$('#quote-form').elements.namedItem('observacoes').value='Referência de ambiente: '+p.title+'; '+p.material+'.';closeDialog(projectDialog);goQuote(0)}}
});

// Formulário em cinco etapas
const form=$('#quote-form'),fieldset=$$('.quote-step',form),stepDisplay=$('#quote-step-display'),stepMeter=$$('#step-meter span'),back=$('#quote-back'),next=$('#quote-next'),feedback=$('#quote-feedback'),summary=$('#quote-summary'),whatsapp=$('#quote-whatsapp');
let currentStep=0;
function getValue(name){const el=form.elements.namedItem(name);return el?.value?.trim()||''}
function checkStep(step){
 const required=$$('[required]',fieldset[step]);let valid=true;
 required.forEach(el=>{const missing=!String(el.value||'').trim();el.setAttribute('aria-invalid',String(missing));if(missing)valid=false});
 if(!valid){updateStatus(feedback,'Preencha os campos obrigatórios para continuar.');const bad=required.find(el=>!String(el.value||'').trim());bad?.focus()}else updateStatus(feedback,'');
 return valid;
}
function summaryText(){
 const fields=[['Ambiente','ambiente'],['Aplicação','aplicacao'],['Material','material'],['Acabamento','acabamento'],['Comprimento','comprimento'],['Largura / profundidade','largura'],['Cidade','cidade'],['Nome','nome'],['WhatsApp','whatsapp'],['Observações','observacoes']];
 const lines=fields.map(([label,name])=>{const v=getValue(name);return v?label+': '+v:null}).filter(Boolean);
 return 'PROJETO DEMONSTRATIVO — ATELIER NÓRD\n\n'+lines.join('\n')+'\n\nEnviado como exemplo de um sistema de solicitação de orçamento. Confirmação de preços e viabilidade depende de fornecedor real.';
}
function goQuote(step){
 currentStep=Math.max(0,Math.min(4,step));
 fieldset.forEach((el,i)=>el.classList.toggle('active',i===currentStep));
 updateStatus(stepDisplay,'PASSO '+String(currentStep+1).padStart(2,'0')+' DE 05');
 stepMeter.forEach((el,i)=>el.classList.toggle('active',i<=currentStep));
 $('#step-meter').setAttribute('aria-label','Etapa '+(currentStep+1)+' de 5');
 back.hidden=currentStep===0;next.hidden=currentStep===4;updateStatus(feedback,'');
 if(currentStep===4){summary.textContent=summaryText();const msg='Olá, vi o modelo demonstrativo Atelier Nórd da Guará Agency e gostaria de conversar sobre um site desse tipo.\n\nResumo de simulação:\n'+summaryText();whatsapp.href='https://wa.me/5532976718309?text='+encodeURIComponent(msg)}
 $('#orcamento').scrollIntoView({behavior:reduced?'auto':'smooth',block:'start'});
}
next.addEventListener('click',()=>{if(checkStep(currentStep))goQuote(currentStep+1)});
back.addEventListener('click',()=>goQuote(currentStep-1));
form.addEventListener('submit',e=>e.preventDefault());
form.addEventListener('input',e=>{if(e.target.matches('[aria-invalid="true"]'))e.target.removeAttribute('aria-invalid')});
$('#copy-summary').addEventListener('click',async()=>{
 const t=summaryText();const button=$('#copy-summary');let copied=false;
 try{await navigator.clipboard.writeText(t);copied=true}catch(_){
  const ta=document.createElement('textarea');ta.value=t;ta.style.position='fixed';ta.style.left='-9999px';document.body.appendChild(ta);ta.select();try{copied=document.execCommand('copy')}catch(__){}ta.remove();
 }
 button.innerHTML=copied?'Resumo copiado ✓':'Selecione o texto acima para copiar';
 setTimeout(()=>{button.innerHTML='Copiar resumo <span>⧉</span>'},3000);
});
function selectMaterial(item){$('#quote-material').value=item.name;closeDialog(materialDialog);goQuote(1)}
applications.addEventListener('click',e=>{const a=e.target.closest('[data-application]');if(!a)return;const val=normalize(a.dataset.application);const select=$('#quote-aplicacao');if(val.includes('cozinha'))select.value='Cozinha planejada';else if(val.includes('armario')||val.includes('closet')||val.includes('moveis'))select.value='Armários planejados';else if(val.includes('lavatorio')||val.includes('cuba'))select.value='Cuba / Lavatório';else if(val.includes('revestimento')||val.includes('painel'))select.value='Painel e marcenaria';else if(val.includes('escada')||val.includes('soleira'))select.value='Escada / Soleira';else if(val.includes('ilha')||val.includes('gourmet'))select.value='Bancada ou ilha';else select.value='Projeto integrado';});

// FAQ mantém um item aberto por vez
$$('.faq-items details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)$$('.faq-items details').forEach(o=>{if(o!==d)o.open=false})}));

// Fallback visual de fotos externas
document.addEventListener('error',e=>{const img=e.target;if(img instanceof HTMLImageElement && !img.dataset.fallback && img.src.startsWith('https://images.unsplash.com/')){img.dataset.fallback='true';img.src=pictureFallback}},true);
})();