/* ------- State & Helpers ------- */
function loadState() {
  return JSON.parse(localStorage.getItem('defiState') || '{}');
}
function saveState(s) {
  localStorage.setItem('defiState', JSON.stringify(s));
}
function getState() {
  const s = loadState();
  return {
    defiClass: s.defiClass || null,
    completed: s.completed || [],
    badges: s.badges || []
  };
}
function completeQuest(id, badge) {
  const s = loadState();
  s.completed = s.completed || [];
  s.badges    = s.badges    || [];
  if (!s.completed.includes(id)) s.completed.push(id);
  if (!s.badges.find(b=>b.id===badge.id)) s.badges.push(badge);
  saveState(s);
}

/* ------- Quest Data (12 total) ------- */
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
  },
  {
    id:2, title:"Enter the Swap Market",
    narrative:"A bustling market of token trades awaits! Learn to swap assets on a DEX.",
    description:"On a Decentralized Exchange (DEX), you trade directly with liquidity pools—no middleman. You pay gas fees to the network to execute your swaps.",
    quiz:[
      {q:"What is a DEX?", opts:["Centralized Exchange","Decentralized Exchange"], ans:"Decentralized Exchange"},
      {q:"What fee do you pay when swapping?", opts:["Interest","Gas","Subscription"], ans:"Gas"}
    ],
    badge:{id:2,name:"Swap Sorcerer",color:"bg-red-500"}
  },
  {
    id:3, title:"Stake Your Claim",
    narrative:"At the Staking Altar, lock your tokens to earn rewards over time.",
    description:"Staking means you lock tokens in a protocol to secure the network or provide liquidity, earning staking rewards in return.",
    quiz:[
      {q:"What does staking earn?", opts:["Voting power","Rewards","No benefit"], ans:"Rewards"},
      {q:"Staked tokens are:", opts:["Unlocked immediately","Locked for a duration","Burned"], ans:"Locked for a duration"}
    ],
    badge:{id:3,name:"Staking Sentinel",color:"bg-yellow-500"}
  },
  {
    id:4, title:"Lend Your Power",
    narrative:"Offer your assets to borrowers in exchange for interest.",
    description:"Lending platforms let you deposit tokens that others can borrow—lenders earn interest while borrowers pay it.",
    quiz:[
      {q:"Earning interest comes from:", opts:["Borrower fees","Staking","Swapping"], ans:"Borrower fees"},
      {q:"Your collateral is:", opts:["Sold","Locked","Given away"], ans:"Locked"}
    ],
    badge:{id:4,name:"Lending Luminary",color:"bg-green-500"}
  },
  {
    id:5, title:"Join a Guild (Liquidity Pool)",
    narrative:"Band with fellow adventurers to provide liquidity and earn fees.",
    description:"In a liquidity pool, you deposit two tokens proportionally—traders pay swap fees, which go to liquidity providers.",
    quiz:[
      {q:"LP fees come from:", opts:["Swaps","Stakes","Minting"], ans:"Swaps"},
      {q:"Risk in LP is:", opts:["Impermanent loss","Hacking only","None"], ans:"Impermanent loss"}
    ],
    badge:{id:5,name:"Pool Protector",color:"bg-purple-500"}
  },
  {
    id:6, title:"Mint a Treasure",
    narrative:"A magical forge awaits—mint an NFT to prove ownership.",
    description:"NFTs are unique tokens representing art or collectibles. Minting creates your proof-of-ownership on-chain.",
    quiz:[
      {q:"NFT stands for:", opts:["Non-Fungible Token","New Financial Tool","No Fee Token"], ans:"Non-Fungible Token"},
      {q:"NFTs are:", opts:["Identical","Unique","Valueless"], ans:"Unique"}
    ],
    badge:{id:6,name:"Mint Master",color:"bg-pink-500"}
  },
  {
    id:7, title:"Govern the Realm",
    narrative:"Cast your vote in the DAO council to shape protocol rules.",
    description:"DAOs let tokenholders vote on governance proposals—your stake determines your voting weight.",
    quiz:[
      {q:"DAO means:", opts:["Decentralized Autonomous Organization","Digital Asset Ops","Direct Action Order"], ans:"Decentralized Autonomous Organization"},
      {q:"You vote with:", opts:["Off-chain bills","On-chain tokens","Comments"], ans:"On-chain tokens"}
    ],
    badge:{id:7,name:"Governance Guru",color:"bg-indigo-500"}
  },
  {
    id:8, title:"Insure Your Journey",
    narrative:"Protect your assets—buy coverage against smart contract hacks.",
    description:"DeFi insurance pools compensate you if a covered protocol loses funds due to exploits.",
    quiz:[
      {q:"Insurance covers:", opts:["All losses","Hacks defined in policy","Volatility"], ans:"Hacks defined in policy"},
      {q:"Premiums paid are:", opts:["Burned","Lockup","Paid to pool"], ans:"Paid to pool"}
    ],
    badge:{id:8,name:"Insurance Advocate",color:"bg-orange-500"}
  },
  {
    id:9, title:"Bridge the Realms",
    narrative:"Travel between chains—bridge your tokens across networks.",
    description:"Cross-chain bridges lock tokens on one chain and mint equivalents on another, enabling interoperability.",
    quiz:[
      {q:"Bridging tokens involves:", opts:["Lock & mint","Trade only","Burning"], ans:"Lock & mint"},
      {q:"Risk in bridges:", opts:["No risk","Smart contract risk","Gas risk only"], ans:"Smart contract risk"}
    ],
    badge:{id:9,name:"Bridge Builder",color:"bg-teal-500"}
  },
  {
    id:10, title:"Harvest Yield",
    narrative:"Combine multiple protocols—farm strategies to amplify returns.",
    description:"Yield farming compounds rewards by moving assets between pools, maximizing APY through strategic rotations.",
    quiz:[
      {q:"Farming boosts:", opts:["Base yields","Only fees","No benefit"], ans:"Base yields"},
      {q:"Compounding auto reinvests:", opts:["Rewards","Fees","Collateral"], ans:"Rewards"}
    ],
    badge:{id:10,name:"Yield Harvester",color:"bg-gray-500"}
  },
  {
    id:11, title:"Master Stablecoins",
    narrative:"Balance coins pegged to real-world assets for stability.",
    description:"Stablecoins maintain a 1:1 peg to USD or other assets, offering low-volatility liquidity in DeFi.",
    quiz:[
      {q:"Stablecoins peg to:", opts:["Volatility","USD","Cryptokitties"], ans:"USD"},
      {q:"Use-case:", opts:["Speculation only","Stable savings","None"], ans:"Stable savings"}
    ],
    badge:{id:11,name:"Stable Sage",color:"bg-cyan-500"}
  },
  {
    id:12, title:"Become a DeFi Sage",
    narrative:"You have mastered all arts—become the ultimate DeFi Sage!",
    description:"Review all concepts—wallets, staking, swaps, governance, and more—to teach new adventurers.",
    quiz:[
      {q:"DeFi means:", opts:["Finance without banks","Bank finance","Game finance"], ans:"Finance without banks"},
      {q:"NFT stands for:", opts:["New Finance Tech","Non-Fungible Token","Network Fee Token"], ans:"Non-Fungible Token"}
    ],
    badge:{id:12,name:"DeFi Sage",color:"bg-lime-500"}
  }
];

/* ------- Map Page Logic ------- */
function initMapPage() {
  const state = getState();
  if (!state.defiClass) return window.location.href = 'index.html';

  // Progress percent
  const pct = Math.floor(state.completed.length / 12 * 100);
  document.getElementById('progressText').innerText = `${pct}%`;

  // Quest coordinates
  const coords = [
    {id:1,top:"10%",left:"10%"},
    {id:2,top:"10%",left:"30%"},
    {id:3,top:"10%",left:"50%"},
    {id:4,top:"10%",left:"70%"},
    {id:5,top:"30%",left:"10%"},
    {id:6,top:"30%",left:"30%"},
    {id:7,top:"30%",left:"50%"},
    {id:8,top:"30%",left:"70%"},
    {id:9,top:"50%",left:"10%"},
    {id:10,top:"50%",left:"30%"},
    {id:11,top:"50%",left:"50%"},
    {id:12,top:"50%",left:"70%"}
  ];

  const container = document.getElementById('mapContainer');
  coords.forEach(({id, top, left}) => {
    const btn = document.createElement('button');
    btn.innerText = QUESTS[id-1].title;
    btn.style.position = "absolute";
    btn.style.top = top;
    btn.style.left = left;
    const unlocked = id === 1 || state.completed.includes(id - 1);

    btn.className = state.completed.includes(id)
      ? "text-xs px-2 py-1 rounded bg-green-500"
      : unlocked
        ? "text-xs px-2 py-1 rounded bg-yellow-500 hover:bg-yellow-600"
        : "text-xs px-2 py-1 rounded bg-gray-500";
    btn.title = unlocked
      ? "Start quest"
      : "Complete previous quest!";
    if (unlocked) {
      btn.onclick = () => goToQuest(id, top, left);
    }
    container.appendChild(btn);
  });

  // Place sprite on next quest
  let next = state.completed.length + 1;
  if (next > 12) next = 12;
  const sprite = document.getElementById('sprite');
  sprite.style.transform = `translate(${coords[next-1].left}, ${coords[next-1].top})`;
}

function goToQuest(id, top, left) {
  const sprite = document.getElementById('sprite');
  sprite.style.transform = `translate(${left}, ${top})`;
  setTimeout(() => location.href = `quest.html?id=${id}`, 600);
}

/* ------- Quest & Badges & Reset Logic (unchanged) ------- */
document.addEventListener('DOMContentLoaded', () => {
  const p = location.pathname.split('/').pop();
  if (p === 'map.html') initMapPage();
  if (p === 'quest.html') initQuestPage();
  if (p === 'badges.html') initBadgesPage();
});

function initQuestPage() {
  /* ... your existing quest page loader ... */
}
function initBadgesPage() {
  /* ... your existing badges page loader ... */
}
function resetAll() {
  localStorage.clear();
  location.href = 'index.html';
}
