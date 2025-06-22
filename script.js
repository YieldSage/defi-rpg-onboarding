/* ---------------- LocalStorage Helpers ---------------- */
function loadState() {
  return JSON.parse(localStorage.getItem('defiState') || '{}');
}
function saveState(state) {
  localStorage.setItem('defiState', JSON.stringify(state));
}
function getState() {
  const s = loadState();
  return {
    defiClass: s.defiClass || null,
    completed: s.completed || [],
    badges: s.badges || []
  };
}
function setClass(name) {
  const s = getState();
  s.defiClass = name;
  s.completed = [];
  s.badges = [];
  saveState(s);
}
function completeQuest(id, badge) {
  const s = getState();
  if (!s.completed.includes(id)) s.completed.push(id);
  if (!s.badges.find(b=>b.id===badge.id)) s.badges.push(badge);
  saveState(s);
}

/* ---------------- Data Definitions ---------------- */
const QUESTS = [
  {
    id:1, title:"Secure a Wallet",
    narrative:"The Village Elder requests you to secure a magical wallet! Protect your treasures.",
    description:"A crypto wallet is a digital tool to store and manage your assets securely using private keys and passphrases in DeFi.",
    quiz:[
      {q:"What protects your wallet recovery?", opts:["Username","Password","Seed phrase"], ans:"Seed phrase"},
      {q:"Who controls a non-custodial wallet?", opts:["Bank","You","Exchange"], ans:"You"}
    ],
    badge:{id:1,name:"Wallet Guardian",color:"bg-blue-500"}
  }
  /* ...complete quests 2-12 similarly... */
];

/* ---------------- Page Logic ---------------- */
document.addEventListener('DOMContentLoaded',()=>{
  const page = location.pathname.split("/").pop();

  if (page==="map.html") initMapPage();
  if (page==="quest.html") initQuestPage();
  if (page==="badges.html") initBadgesPage();
  if (page==="reset.html") {} 
});

/* ------------ Map Page ------------ */
function initMapPage(){
  const state = getState();
  if(!state.defiClass) return window.location.href='index.html';
  const pct = Math.floor(state.completed.length/12*100);
  document.getElementById('progressText').innerText = `${pct}% Completed`;
  const coords = [
    {id:1,top:"10%",left:"10%"},{id:2,top:"10%",left:"30%"},{id:3,top:"10%",left:"50%"},{id:4,top:"10%",left:"70%"},
    {id:5,top:"30%",left:"10%"},{id:6,top:"30%",left:"30%"},{id:7,top:"30%",left:"50%"},{id:8,top:"30%",left:"70%"},
    {id:9,top:"50%",left:"10%"},{id:10,top:"50%",left:"30%"},{id:11,top:"50%",left:"50%"},{id:12,top:"50%",left:"70%"}
  ];
  const container = document.getElementById('mapContainer');
  coords.forEach(({id,top,left})=>{
    const btn = document.createElement('button');
    btn.innerText = QUESTS[id-1].title;
    btn.style.position="absolute";btn.style.top=top;btn.style.left=left;
    const unlocked = id===1 || state.completed.includes(id-1);
    btn.className = state.completed.includes(id)
      ? "text-xs px-2 py-1 rounded bg-green-500"
      : unlocked
        ? "text-xs px-2 py-1 rounded bg-yellow-500 hover:bg-yellow-600"
        : "text-xs px-2 py-1 rounded bg-gray-500";
    btn.title = unlocked ? "Start quest" : "Complete previous quest!";
    if(unlocked) btn.onclick = ()=>goToQuest(id,left,top);
    container.appendChild(btn);
  });
  const sprite = document.getElementById('sprite');
  let next = state.completed.length+1; if(next>12) next=12;
  sprite.style.transform = `translate(${coords[next-1].left},${coords[next-1].top})`;
}
function goToQuest(id,left,top){
  const sprite = document.getElementById('sprite');
  sprite.style.transform = `translate(${left},${top})`;
  setTimeout(()=>location.href=`quest.html?id=${id}`,800);
}

/* ------------ Quest Page ------------ */
function initQuestPage(){
  const params = new URLSearchParams(location.search);
  const id = Number(params.get('id')||1);
  const quest = QUESTS.find(q=>q.id===id);
  if(!quest) return window.location.href='map.html';
  document.getElementById('questHeader').innerText = quest.title;
  document.getElementById('questTitle').innerText = quest.title;
  document.getElementById('narrative').innerText = quest.narrative;
  document.getElementById('description').innerText = quest.description;
  const form = document.getElementById('quizForm');
  quest.quiz.forEach((qa,i)=>{
    const div = document.createElement('div');
    div.innerHTML = `<p class="text-xs">${qa.q}</p>`;
    qa.opts.forEach(opt=>{
      div.innerHTML += `
        <label class="block text-xs mt-1">
          <input type="radio" name="q${i}" value="${opt}"> ${opt}
        </label>`;
    });
    form.insertBefore(div, form.lastElementChild);
  });
  form.onsubmit = e=>{
    e.preventDefault();
    let correct=0;
    quest.quiz.forEach((qa,i)=>{
      const val = form[`q${i}`].value;
      if(val===qa.ans) correct++;
    });
    if(correct/quest.quiz.length>=0.75){
      completeQuest(id, quest.badge);
      alert('Quest complete! Badge earned: '+quest.badge.name);
      location.href='map.html';
    } else {
      alert('You failed the quiz. Try again.');
    }
  };
}

/* ------------ Badges Page ------------ */
function initBadgesPage(){
  const state = getState();
  const main = document.querySelector('main')||document.body;
  state.badges.forEach(b=>{
    const div = document.createElement('div');
    div.className = `p-4 rounded text-center ${b.color} text-black text-xs`;
    div.innerText = b.name;
    main.appendChild(div);
  });
  QUESTS.forEach(q=>{
    if(!state.badges.find(b=>b.id===
