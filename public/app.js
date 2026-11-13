import { createDemo, money, personalBalance, localDate } from './core.js';

const state = createDemo();
const paths = {
  home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z"/><path d="M9 21v-8h6v8"/>',
  wallet: '<rect x="3" y="5" width="18" height="15" rx="3"/><path d="M3 8V5a2 2 0 0 1 2-2h12v2M21 11h-5v5h5"/><path d="M17 13.5h.01"/>',
  sparkles: '<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5ZM20 2v4M18 4h4"/>',
  box: '<path d="m3 7 9-4 9 4v11l-9 4-9-4ZM3 7l9 4 9-4M12 11v11M7 5l9 4"/>',
  people: '<circle cx="9" cy="8" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 5a3 3 0 0 1 0 6M21 21v-3a5 5 0 0 0-3-4"/>',
  arrow: '<path d="M5 12h14m-5-5 5 5-5 5"/>',
  chevron: '<path d="m9 5 7 7-7 7"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4M17 3v4M3 11h18M8 15h2M14 15h2"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
  leaf: '<path d="M20 3C7 1 3 8 6 14s15 4 14-11ZM4 21 16 8"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  heart: '<path d="M20 5c-3-3-7-1-8 2-1-3-5-5-8-2-5 5 3 11 8 15 5-4 13-10 8-15Z"/>',
  tissue: '<path d="M3 12h18v9H3zM8 12V7l3-4 3 3 2 6M3 15h18"/>',
  bottle: '<path d="M9 3h6v5l3 3v10H6V11l3-3ZM9 6h6M6 14h12M10 17h4"/>',
  bag: '<path d="M5 8h14l2 13H3ZM8 8V6a4 4 0 0 1 8 0v2"/>',
  document: '<path d="M5 3h10l4 4v14H5ZM14 3v5h5M8 12h8M8 16h6"/>',
  coffee: '<path d="M4 8h13v9a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4ZM17 9h2a3 3 0 0 1 0 6h-2M7 2v3M12 2v3"/>',
  wifi: '<path d="M2 8a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0M8 16a6 6 0 0 1 8 0M12 20h.01"/>'
};
const icon = (name) => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths.home}</svg>`;
const avatar = m => `<span class="avatar ${m.color}">${m.avatar}</span>`;
const nav = [['home','首页','home'],['bills','账本','wallet'],['chores','值日','sparkles'],['items','公共物品','box'],['family','我的小家','people']];
const member = id => state.members.find(m=>m.id===id);
const me = member(state.currentMemberId);
const balance = personalBalance(state.bills, me.id);
const currentMonth = localDate().slice(0,7);
const total = state.bills.filter(b=>b.date.startsWith(currentMonth)).reduce((n,b)=>n+b.amountCents,0);
const lowItems = state.items.filter(i=>i.quantity<=i.threshold);
const myChores = state.chores.filter(c=>c.assigneeId===me.id&&!c.done);
const art = `<svg class="home-art" viewBox="0 0 410 225" fill="none" aria-hidden="true">
<ellipse cx="229" cy="205" rx="157" ry="11" fill="#dce5cc"/>
<rect x="203" y="17" width="107" height="111" rx="53" fill="#f8f9ef"/><path d="M257 18v109M205 74h103" stroke="#d6dfc7" stroke-width="4"/><circle cx="281" cy="47" r="12" fill="#e9d5a4"/>
<path d="M67 175v-48c0-15 13-27 28-27h127c15 0 27 12 27 27v48" fill="#a2b58d"/><rect x="67" y="131" width="182" height="48" rx="13" fill="#b6c5a1"/><path d="M153 108v55" stroke="#94a87e" stroke-width="2"/>
<rect x="54" y="144" width="26" height="43" rx="10" fill="#92a67c"/><rect x="237" y="144" width="26" height="43" rx="10" fill="#92a67c"/><path d="M77 185v15M241 185v15" stroke="#8a9575" stroke-width="6" stroke-linecap="round"/>
<rect x="94" y="115" width="42" height="38" rx="8" transform="rotate(-9 94 115)" fill="#f3edce"/><path d="m107 125 19 16M111 121l19 16" stroke="#e0d6aa" stroke-width="2"/>
<rect x="169" y="126" width="48" height="25" rx="8" fill="#d7b69c"/>
<ellipse cx="198" cy="183" rx="50" ry="12" fill="#d7bb99"/><path d="m167 186-5 22M226 185l6 23" stroke="#bca07f" stroke-width="4"/>
<rect x="187" y="165" width="14" height="15" rx="3" fill="#fff9e9"/><path d="M201 168c10-2 9 10 0 8" stroke="#fff9e9" stroke-width="3"/>
<path d="M324 157V93M324 128c-30 0-35-28-35-28 31-3 35 28 35 28ZM324 110c29-2 35-26 35-26-30-1-35 26-35 26ZM324 143c27 1 34-20 34-20-26-4-34 20-34 20Z" fill="#8fa87b" stroke="#789565" stroke-width="2"/>
<path d="M304 155h40l-5 39h-30Z" fill="#d3b592"/><path d="M303 155h42v8h-42Z" fill="#dec4a6"/>
<path d="M40 116V51h36" stroke="#a9a889" stroke-width="3"/><path d="m63 51 13-24 14 24Z" fill="#f3e7ba"/><path d="M24 199h33" stroke="#a9a889" stroke-width="3"/><path d="M40 115v83" stroke="#a9a889" stroke-width="3"/>
<path d="m350 43 3-7 3 7 7 3-7 3-3 7-3-7-7-3Z" fill="#c4cead"/>
</svg>`;

function stats() {
  return `<section class="stats" aria-label="小家概览">
  ${[
    ['本月公共支出',`<em>¥</em>${money(total)}`,'每一笔，都清清楚楚','wallet',''],
    ['我的待结算',`<em>¥</em>${money(balance.owe)}`,'已分摊，等待结算','wallet','orange'],
    ['我的待办值日',`${myChores.length}<small>项</small>`,'顺手一点，舒适多一点','sparkles','blue'],
    ['物品补货提醒',`${lowItems.length}<small>件</small>`,'小家需要添点新补给','box','purple']
  ].map(([label,num,foot,i,color])=>`<article class="stat"><div class="stat-label">${icon(i)}${label}</div><strong class="stat-number">${num}</strong><div class="stat-foot">${icon('leaf')}${foot}</div><span class="stat-mark ${color}">${icon(i)}</span></article>`).join('')}
  </section>`;
}
function head(title,subtitle,en){return `<header class="page-heading"><div><p class="eyebrow">${en}</p><h2>${title}</h2><p>${subtitle}</p></div><span class="pill green">展示版 · 功能准备中</span></header>`;}
function cardHead(title,i,link,label='查看全部'){return `<div class="card-head"><h3 class="card-title">${icon(i)}${title}</h3>${link?`<a class="text-link" href="#${link}">${label}${icon('chevron')}</a>`:''}</div>`;}
function home() {
  return `${head('早安，小林 <span>☀</span>','好好生活的小事，今天也一起完成。','a little better, together')}
    <section class="hero"><div class="hero-text"><span class="hero-label">${icon('leaf')} OUR SHARED LITTLE HOME</span><h3>一个屋檐下，<br>把日子过成<span>喜欢的样子。</span></h3><p>记清每一笔，分好每件事。<br>让合租少一点烦恼，多一点温暖。</p><a class="hero-link" href="#family">看看我们的小家 ${icon('arrow')}</a></div>${art}</section>
    ${stats()}
    <div class="dashboard-grid"><section class="card">${cardHead('我的待办','calendar','chores')}<div class="tabs"><button class="active" type="button">待处理 <span>${myChores.length+1}</span></button><a class="text-link" href="#chores">查看排班</a></div><div class="todo-list">
    ${myChores.map((c,i)=>`<div class="todo"><span class="check" aria-hidden="true"></span><div class="todo-info"><strong>${c.title}</strong><small>${icon('clock')}${i===0?'今天':c.date.slice(5).replace('-','月')+'日'} · ${c.area}</small></div><span class="pill ${i===0?'orange':'green'}">${i===0?'今天轮到我':'计划中'}</span></div>`).join('')}
    <a href="#bills" class="todo"><span class="check" aria-hidden="true"></span><div class="todo-info"><strong>核对本月水电账单</strong><small>${icon('wallet')}小王已垫付 · 四人均摊</small></div><span class="pill purple">待结算</span>${icon('chevron')}</a>
    <a href="#family" class="todo"><span class="check" aria-hidden="true"></span><div class="todo-info"><strong>看看新增的厨房公约</strong><small>${icon('document')}让小厨房保持整洁</small></div><span class="pill blue">待确认</span>${icon('chevron')}</a>
    </div></section>
    <div class="right-stack"><section class="card">${cardHead('屋檐下的我们','people','family','我的小家')}<div class="roommate-row">${state.members.map((m,i)=>`<div class="roommate-mini">${avatar(m)}<strong>${m.name}${m.id===me.id?'（我）':''}</strong><span class="status">${['今日值日','美食担当','整洁担当','快乐担当'][i]}</span></div>`).join('')}</div><div class="home-tip">${icon('heart')}相处的默契，藏在每一件小事里。</div></section>
    <section class="card">${cardHead('小家补给站','box','items')}${lowItems.map(i=>`<div class="stock-row"><span class="item-icon">${icon(i.icon)}</span><div class="todo-info"><strong>${i.name}</strong><small>${i.quantity===0?'已经用完了':`仅剩 ${i.quantity} ${i.unit}`}，记得补充哦</small></div><a class="button light small" href="#items">去看看</a></div>`).join('')}</section></div></div>
    <section class="card activity-card">${cardHead('小家的新鲜事','leaf')}<div class="activities">${state.activities.map(a=>`<div class="activity"><span class="activity-icon">${icon(a.icon)}</span><div><p>${a.text}</p><small>${a.time.slice(5,10).replace('-','月')}日</small></div></div>`).join('')}</div></section>`;
}
function bills(){
 return `${head('账单清楚，相处轻松','每一笔公共开支，都有据可查。','shared expenses')}${stats()}<div class="filterbar"><button class="active">全部账单</button></div><section class="card list-card">${state.bills.map(b=>`<article class="bill-row"><span class="bill-icon">${icon(b.category==='一起吃饭'?'coffee':b.category==='网络通讯'?'wifi':'wallet')}</span><div class="bill-info"><strong>${b.title}</strong><small>${b.date} · ${member(b.payerId).name}垫付 · ${b.participantIds.length}人均摊</small></div><div class="bill-amount">¥ ${money(b.amountCents)}<small>${b.category}</small></div></article>`).join('')}</section><p class="section-note">当前展示模拟账单。发布完成后，将继续加入记账、分摊与结算功能。</p>`;
}
function chores(){
 return `${head('分好小事，共享舒适','今天的干净小家，从举手之劳开始。','a tidy home, a happy home')}<div class="filterbar"><button class="active">小家排班</button></div><section class="task-grid">${state.chores.map(c=>`<article class="card task-card ${c.done?'completed':''}"><span class="check ${c.done?'done':''}" aria-hidden="true">${c.done?icon('check'):''}</span><div class="todo-info"><strong>${c.title}</strong><small>${c.area} · ${c.date===localDate()?'今天':c.date}</small><div class="task-meta">${avatar(member(c.assigneeId))}${member(c.assigneeId).name}<span class="pill ${c.done?'green':'orange'}">${c.done?'已完成':'待完成'}</span></div></div></article>`).join('')}</section><p class="section-note">当前展示模拟排班。值日打卡与轮换功能将在发布后接入。</p>`;
}
function items(){
 return `${head('小家补给，心里有数','常用物品不缺席，生活就少一点措手不及。','little things for everyday living')}<section class="inventory-grid">${state.items.map(i=>`<article class="card inventory-card"><div class="inventory-top"><span class="item-icon">${icon(i.icon)}</span><span class="pill ${i.quantity<=i.threshold?'orange':'green'}">${i.quantity<=i.threshold?'需要补货':'库存充足'}</span></div><h3>${i.name}</h3><p>${i.category} · 低于等于 ${i.threshold} ${i.unit}提醒</p><strong class="quantity">${i.quantity}<small>${i.unit}</small></strong><div class="stock-bar ${i.quantity<=i.threshold?'low':''}"><span style="width:${Math.min(100,i.quantity*23)}%"></span></div></article>`).join('')}</section><p class="section-note">当前展示模拟库存。消耗登记、补货与采购记账将在发布后接入。</p>`;
}
function family(){
 return `${head('我们的小家','住在一起，也把生活的默契慢慢攒起来。','our shared little home')}<section class="family-banner"><span class="brand-logo">${icon('home')}</span><div><h3>${state.household.name}</h3><p>${state.household.subtitle}</p></div><span class="pill green">4 位室友 · 一份温暖</span></section><section class="member-grid">${state.members.map(m=>`<article class="card member-card ${m.id===me.id?'current':''}">${avatar(m)}<h3>${m.name}${m.id===me.id?'（我）':''}</h3><p>${m.room}<br>${m.tagline}</p><span class="pill green">小家成员</span></article>`).join('')}</section><section class="card">${cardHead('我们一起约定','document')}<div class="agreements">${state.agreements.map(a=>`<article class="agreement"><div class="agreement-top"><h4>${a.title}</h4><span class="pill ${a.confirmedIds.length===4?'green':'orange'}">${a.confirmedIds.length}/4 人已确认</span></div><p>${a.content}</p><div class="agreement-bottom"><span>室友公约 · 第 ${a.version} 版</span><span>${a.confirmedIds.includes(me.id)?'我已确认':'待我确认'}</span></div></article>`).join('')}</div></section><p class="section-note">这是使用模拟数据的展示版，暂不提供真实室友邀请或多人同步。</p>`;
}
function render(){
 const route=location.hash.slice(1)||'home';
 const page=nav.find(n=>n[0]===route)||nav[0];
 const links=nav.map(([id,label,i])=>`<a href="#${id}" class="${page[0]===id?'active':''}" ${page[0]===id?'aria-current="page"':''}>${icon(i)}<span>${label}</span></a>`).join('');
 document.title=`${page[1]} · 合住日常`;
 document.getElementById('app').innerHTML=`<aside class="sidebar"><a class="brand" href="#home"><span class="brand-logo">${icon('home')}</span><div><h1>合住日常</h1><p>BETTER LIVING, TOGETHER</p></div></a><a class="home-switch" href="#family">${icon('home')}<div><strong>${state.household.name}</strong><small>属于我们的温暖小窝</small></div><span class="dot"></span></a><nav class="nav" aria-label="主要导航">${links}</nav><div class="sidebar-bottom"><div class="sidebar-note">${icon('leaf')}<p>生活的美好，<br>在于有人一起分享。</p></div><a class="sidebar-user" href="#family">${avatar(me)}<div><strong>${me.name}</strong><small>今天也要好好生活</small></div>${icon('chevron')}</a></div></aside><div class="main-wrap"><header class="topbar"><div class="breadcrumb">向阳小屋 ${icon('chevron')}<strong>${page[1]}</strong></div><a class="mobile-brand" href="#home"><span class="brand-logo">${icon('home')}</span>合住日常</a><div class="top-actions"><span class="date">${icon('calendar')}${new Date().toLocaleDateString('zh-CN',{month:'long',day:'numeric',weekday:'long'})}</span><a class="icon-button" href="#home" aria-label="查看我的待办">${icon('bell')}</a><a href="#family" aria-label="我的小家">${avatar(me)}</a></div></header><main id="main" class="content page-enter">${({home,bills,chores,items,family}[page[0]])()}<footer class="footer">${icon('heart')}一起住，一起把生活过好 · 合住日常</footer></main></div><nav class="mobile-nav" aria-label="手机导航">${links}</nav>`;
 window.scrollTo(0,0);
}
window.addEventListener('hashchange',render);
render();
