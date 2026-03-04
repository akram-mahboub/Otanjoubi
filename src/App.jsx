import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   CHARACTER DATA — 14 characters
   ═══════════════════════════════════════════════════════════════════════════ */
const CHARACTERS = [
  { id:"oikawa", name:"Oikawa Tōru", series:"Haikyuu!!", placeholder:"🏐", accentColor:"#7ecef4", quote:"The greatest miracle is your existence.",
    getMessage:(n,a)=>`Oya oya? Is it really your birthday, ${n}-chan? *flips hair* Even someone as talented as me takes a moment to bow for you today. You're a true setter — always making everyone around you shine. Happy ${a}th! Don't forget, the greatest miracle is your existence. ✨🏐` },
  { id:"levi", name:"Levi Ackerman", series:"Attack on Titan", placeholder:"⚔️", accentColor:"#c8d8e0", quote:"Tch. Don't waste this year.",
    getMessage:(n,a)=>`Tch. Don't get all teary-eyed just because it's your birthday. But... I'll say this once — you've made it ${a} years and you're still standing. That takes real strength. So happy birthday, ${n}. Don't waste this year. ⚔️` },
  { id:"eren", name:"Eren Yeager", series:"Attack on Titan", placeholder:"🔑", accentColor:"#a8d8a8", quote:"Keep moving forward.",
    getMessage:(n,a)=>`You were born free, ${n}. And ${a} years later you're still fighting for your dreams. I see the fire in you — that same freedom-hungry flame. Keep moving forward. No matter what walls they build around you, you'll break through. Happy Birthday! 🔑🌊` },
  { id:"sasuke", name:"Sasuke Uchiha", series:"Naruto", placeholder:"🌀", accentColor:"#d4a8e8", quote:"A new power is awakening.",
    getMessage:(n,a)=>`...I don't usually say these things. But you've walked your own path and that demands respect. ${a} is not the end — it's a new power awakening. Don't rely on others for your strength, ${n}. You already have everything you need inside you. 🌀⚡` },
  { id:"naruto", name:"Naruto Uzumaki", series:"Naruto", placeholder:"🍜", accentColor:"#ffe066", quote:"Believe it, dattebayo!",
    getMessage:(n,a)=>`HAPPY BIRTHDAY ${n.toUpperCase()}!! BELIEVE IT!! 🎉 Dattebayo! You're ${a} and absolutely AWESOME! I know sometimes the path is hard and you feel alone but I promise — your ninja way is worth it! Ramen's on me today! 🍜🍥` },
  { id:"gojo", name:"Gojo Satoru", series:"Jujutsu Kaisen", placeholder:"👁️", accentColor:"#88ccff", quote:"Throughout heaven and earth, I alone am the honored one.",
    getMessage:(n,a)=>`Yooo ${n}~ Happy Birthday! 🎂 Being ${a} is pretty great — almost as great as being me. *lifts blindfold* I'm using my Six Eyes just to see how bright your future is... and trust me, it's BLINDING. You're the strongest version of yourself yet! 💙✨` },
  { id:"yuta", name:"Okkotsu Yuta", series:"Jujutsu Kaisen", placeholder:"💍", accentColor:"#a0b8d8", quote:"I'll find a reason to live.",
    getMessage:(n,a)=>`Happy Birthday, ${n}. I know what it feels like to wonder if you're enough... But ${a} years of surviving this world? That's proof you are. You have more strength inside you than you realize. I believe in you — and so does everyone who loves you. 💍🌸` },
  { id:"maki", name:"Maki Zenin", series:"Jujutsu Kaisen", placeholder:"🔱", accentColor:"#88d888", quote:"I'll destroy everything that holds me back.",
    getMessage:(n,a)=>`${n}. Happy Birthday. No cursed energy? No special powers? Good — you don't need any of that. ${a} years and you're still proving everyone wrong. That's real strength. Don't let anyone define your limits. Break through them all. 🔱💚` },
  { id:"itachi", name:"Itachi Uchiha", series:"Naruto", placeholder:"🌙", accentColor:"#e88888", quote:"You don't have to forgive me... just know the truth.",
    getMessage:(n,a)=>`${n}... Happy Birthday. The path of ${a} years has been long. You've carried burdens others couldn't see. But true strength isn't about power — it's about the love you protect silently. Never lose sight of what truly matters. 🌙❤️` },
  { id:"minato", name:"Minato Namikaze", series:"Naruto", placeholder:"⚡", accentColor:"#ffdd44", quote:"The Yellow Flash believes in you.",
    getMessage:(n,a)=>`Happy Birthday, ${n}! ⚡ Being a father taught me the most important jutsu — believing in the next generation. At ${a}, you're proof that the Will of Fire lives on. You're faster than you think, brighter than you know. Flash forward! 💛✨` },
  { id:"hinata", name:"Hinata Hyuga", series:"Naruto", placeholder:"🤍", accentColor:"#d4b8e8", quote:"I never go back on my word. That's my nindō.",
    getMessage:(n,a)=>`H-Happy Birthday, ${n}-san! *blushes* I... I want you to know that turning ${a} is something to be proud of. You've been so brave, even when you felt small. Your kindness is your greatest strength. Never give up! 🤍💜` },
  { id:"aizen", name:"Aizen Sōsuke", series:"Bleach", placeholder:"🪑", accentColor:"#c8a8e8", quote:"Since when were you under the impression you weren't special?",
    getMessage:(n,a)=>`Happy Birthday, ${n}. *adjusts glasses* Turning ${a} was always part of my plan. Everything in your life has led to this moment — each triumph, each struggle, perfectly orchestrated. Since when were you under the impression you weren't extraordinary? 🪑👑` },
  { id:"robin", name:"Nico Robin", series:"One Piece", placeholder:"📚", accentColor:"#88a8d8", quote:"I want to live.",
    getMessage:(n,a)=>`Happy Birthday, ${n}. The world tried to tell me I shouldn't exist... but I found people who said otherwise. At ${a}, I hope you've found yours too. Your story is a treasure — every chapter matters, even the dark ones. 📚🌺` },
  { id:"hancock", name:"Boa Hancock", series:"One Piece", placeholder:"🐍", accentColor:"#ff88aa", quote:"I am beautiful, and so are you.",
    getMessage:(n,a)=>`Happy Birthday, ${n}! *strikes pose* Of course someone as magnificent as me would grace you with birthday wishes. But truthfully... turning ${a} suits you perfectly. You radiate a beauty that even my Mero Mero beam can't match. Stay gorgeous! 🐍💗👑` },
];

/* ─── Desktop floating positions (6 slots) ───────────────────────────────── */
const DESKTOP_POS = [
  { floatX:"4%",floatY:"48%" }, { floatX:"80%",floatY:"12%" },
  { floatX:"16%",floatY:"10%" }, { floatX:"76%",floatY:"58%" },
  { floatX:"42%",floatY:"74%" }, { floatX:"58%",floatY:"8%" },
];

/* ─── Particle seeds ─────────────────────────────────────────────────────── */
const STARS = Array.from({length:90},(_,i)=>({id:i,x:(i*37.3+13)%100,y:(i*61.7+27)%100,size:1+(i%3)*0.8,delay:(i*0.23)%5,dur:2+(i%4)}));
const RAIN = Array.from({length:55},(_,i)=>({id:i,x:(i*1.87)%100,delay:(i*0.13)%3,dur:0.6+(i%5)*0.15,len:18+(i%4)*10,opacity:0.06+(i%5)*0.04}));

/* Falling petals — manga style white petals drifting down */
const FALLING_PETALS = Array.from({length:30},(_,i)=>({
  id:i,
  startX: (i*3.47+7)%100,
  delay: (i*0.7)%12,
  dur: 8+(i%6)*3,
  size: 6+(i%5)*3,
  drift: (i%2===0?1:-1)*(15+(i%4)*12),
  rotStart: (i*43)%360,
  opacity: 0.15+(i%4)*0.1,
}));

/* ─── Hook ────────────────────────────────────────────────────────────────── */
function useIsMobile() {
  const [m,setM]=useState(()=>window.innerWidth<768);
  useEffect(()=>{const fn=()=>setM(window.innerWidth<768);window.addEventListener("resize",fn);return()=>window.removeEventListener("resize",fn)},[]);
  return m;
}

/* ═══════════════════════════════════════════════════════════════════════════
   SVG FLOWER CLUSTER — manga style white flowers for corners
   ═══════════════════════════════════════════════════════════════════════════ */
function FlowerCluster({style,flowers}) {
  return (
    <div style={{position:"fixed",pointerEvents:"none",zIndex:2,...style}}>
      <svg width="320" height="320" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
        {flowers.map((f,i)=>{
          const petals = f.petals||5;
          const r = f.r||18;
          return (
            <g key={i} transform={`translate(${f.cx},${f.cy}) rotate(${f.rot||0})`} opacity={f.opacity||0.85}>
              {Array.from({length:petals},(_,p)=>{
                const angle = (p*360/petals)*Math.PI/180;
                const px = Math.sin(angle)*r;
                const py = -Math.cos(angle)*r;
                return <ellipse key={p} cx={px} cy={py} rx={r*0.55} ry={r*0.9}
                  transform={`rotate(${p*360/petals} ${px} ${py})`}
                  fill="white" stroke="rgba(200,200,220,0.3)" strokeWidth="0.5"/>;
              })}
              <circle cx="0" cy="0" r={r*0.18} fill="rgba(220,220,240,0.6)"/>
              {Array.from({length:6},(_,s)=>{
                const sa = (s*60)*Math.PI/180;
                return <line key={s} x1="0" y1="0" x2={Math.sin(sa)*r*0.25} y2={-Math.cos(sa)*r*0.25}
                  stroke="rgba(200,200,220,0.4)" strokeWidth="0.5"/>;
              })}
            </g>
          );
        })}
        {/* Stems / branches connecting flowers */}
        {flowers.length > 1 && flowers.slice(1).map((f,i)=>(
          <line key={`stem${i}`} x1={flowers[0].cx} y1={flowers[0].cy}
            x2={f.cx} y2={f.cy} stroke="rgba(180,180,200,0.15)" strokeWidth="1"/>
        ))}
      </svg>
    </div>
  );
}

/* Top-left flower cluster */
const TOP_LEFT_FLOWERS = [
  {cx:60,cy:60,r:28,petals:5,rot:0,opacity:0.9},
  {cx:120,cy:40,r:22,petals:5,rot:15,opacity:0.8},
  {cx:30,cy:120,r:20,petals:5,rot:-10,opacity:0.75},
  {cx:90,cy:100,r:16,petals:5,rot:30,opacity:0.7},
  {cx:160,cy:80,r:14,petals:5,rot:45,opacity:0.5},
  {cx:50,cy:170,r:12,petals:5,rot:20,opacity:0.45},
  {cx:140,cy:140,r:10,petals:5,rot:-20,opacity:0.35},
];

/* Bottom-right flower cluster */
const BOTTOM_RIGHT_FLOWERS = [
  {cx:260,cy:260,r:28,petals:5,rot:180,opacity:0.9},
  {cx:200,cy:280,r:22,petals:5,rot:195,opacity:0.8},
  {cx:290,cy:200,r:20,petals:5,rot:170,opacity:0.75},
  {cx:230,cy:220,r:16,petals:5,rot:210,opacity:0.7},
  {cx:160,cy:240,r:14,petals:5,rot:225,opacity:0.5},
  {cx:270,cy:150,r:12,petals:5,rot:200,opacity:0.45},
  {cx:180,cy:180,r:10,petals:5,rot:160,opacity:0.35},
];

/* ═══════════════════════════════════════════════════════════════════════════
   ENVIRONMENT — stars, rain, flowers, falling petals
   ═══════════════════════════════════════════════════════════════════════════ */
function Environment() {
  return <>
    {/* Stars */}
    {STARS.map(s=><div key={s.id} style={{position:"fixed",left:`${s.x}vw`,top:`${s.y}vh`,width:s.size,height:s.size,borderRadius:"50%",background:"#fff",animation:`twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,pointerEvents:"none",zIndex:0}}/>)}

    {/* Rain */}
    {RAIN.map(r=><div key={`r${r.id}`} style={{position:"fixed",left:`${r.x}vw`,top:"-20px",width:"1px",height:r.len,background:`linear-gradient(to bottom,transparent,rgba(200,210,255,${r.opacity}),transparent)`,animation:`rainFall ${r.dur}s linear ${r.delay}s infinite`,pointerEvents:"none",zIndex:1,transform:"skewX(-8deg)"}}/>)}

    {/* Corner flower clusters */}
    <FlowerCluster style={{top:"-20px",left:"-20px"}} flowers={TOP_LEFT_FLOWERS}/>
    <FlowerCluster style={{bottom:"-20px",right:"-20px"}} flowers={BOTTOM_RIGHT_FLOWERS}/>

    {/* Falling petals — smooth drift */}
    {FALLING_PETALS.map(p=>(
      <div key={`fp${p.id}`} style={{
        position:"fixed",
        left:`${p.startX}vw`,
        top:"-30px",
        width:p.size,
        height:p.size*0.65,
        background:`rgba(255,255,255,${p.opacity})`,
        borderRadius:"50% 0 50% 0",
        transform:`rotate(${p.rotStart}deg)`,
        animation:`petalDrift ${p.dur}s ease-in-out ${p.delay}s infinite`,
        pointerEvents:"none",
        zIndex:2,
        filter:"blur(0.3px)",
        ["--drift"]:`${p.drift}px`,
      }}/>
    ))}
  </>;
}

/* ═══════════════════════════════════════════════════════════════════════════
   DESKTOP FLOATING BUBBLE — original design
   ═══════════════════════════════════════════════════════════════════════════ */
function DesktopBubble({char,pos,onClick}) {
  const [hovered,setHovered]=useState(false);
  const size=145;
  const floatDur=4+(char.id.length%3);
  const floatDel=CHARACTERS.indexOf(char)*0.8;

  return (
    <div onClick={()=>onClick(char)} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{position:"fixed",left:pos.floatX,top:pos.floatY,zIndex:20,cursor:"crosshair",
        animation:`charFloat ${floatDur}s ease-in-out ${floatDel}s infinite`,
        transition:"transform 0.25s ease",transform:hovered?"scale(1.1) translateY(-4px)":"scale(1)"}}>
      <div style={{width:size,position:"relative"}}>
        {[
          {top:0,left:0,borderTop:"2px solid",borderLeft:"2px solid"},
          {top:0,right:0,borderTop:"2px solid",borderRight:"2px solid"},
          {bottom:0,left:0,borderBottom:"2px solid",borderLeft:"2px solid"},
          {bottom:0,right:0,borderBottom:"2px solid",borderRight:"2px solid"},
        ].map((s,i)=>(
          <div key={i} style={{position:"absolute",...s,width:"14px",height:"14px",
            borderColor:hovered?char.accentColor:`${char.accentColor}66`,transition:"border-color 0.25s",zIndex:2}}/>
        ))}
        <div style={{width:size,height:size,overflow:"hidden",background:"#050508",
          border:`1px solid ${hovered?char.accentColor+"88":"#ffffff14"}`,
          display:"flex",alignItems:"center",justifyContent:"center",
          position:"relative",transition:"border-color 0.25s"}}>
          <div style={{position:"absolute",inset:0,zIndex:1,pointerEvents:"none",
            backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.15) 3px,rgba(0,0,0,0.15) 4px)"}}/>
          <span style={{fontSize:size*0.38,zIndex:2,position:"relative"}}>{char.placeholder}</span>
          {hovered&&<div style={{position:"absolute",inset:0,zIndex:2,
            background:`linear-gradient(to top,${char.accentColor}22 0%,transparent 60%)`}}/>}
        </div>
        <div style={{background:hovered?char.accentColor:"#0a0a12",
          borderTop:`1px solid ${hovered?char.accentColor:"#ffffff18"}`,
          padding:"5px 10px",transition:"background 0.25s"}}>
          <div style={{fontFamily:"'Rajdhani','Quicksand',sans-serif",fontSize:"10px",fontWeight:700,
            letterSpacing:"0.18em",color:hovered?"#000":char.accentColor,textTransform:"uppercase",
            transition:"color 0.25s"}}>{char.name}</div>
          {hovered&&<div style={{fontFamily:"'Quicksand',sans-serif",fontSize:"9px",
            color:"#00000099",fontStyle:"italic",marginTop:"1px",letterSpacing:"0.05em"}}>{char.quote}</div>}
        </div>
      </div>
      {hovered&&<div style={{position:"absolute",bottom:"-22px",left:"50%",transform:"translateX(-50%)",
        fontSize:"9px",color:char.accentColor,fontFamily:"'Quicksand',sans-serif",
        letterSpacing:"0.2em",textTransform:"uppercase",whiteSpace:"nowrap"}}>— click —</div>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MOBILE CHARACTER CARD
   ═══════════════════════════════════════════════════════════════════════════ */
function MobileCard({char,onClick}) {
  const [pressed,setPressed]=useState(false);
  return (
    <div onClick={()=>onClick(char)} onTouchStart={()=>setPressed(true)} onTouchEnd={()=>setPressed(false)}
      style={{display:"flex",alignItems:"center",gap:"12px",padding:"10px 12px",
        background:pressed?`${char.accentColor}14`:"rgba(255,255,255,0.03)",
        border:`1px solid ${pressed?char.accentColor+"88":"#ffffff12"}`,cursor:"pointer",
        transition:"all 0.2s ease",transform:pressed?"scale(0.98)":"scale(1)",position:"relative"}}>
      <div style={{position:"absolute",left:0,top:0,bottom:0,width:"2px",background:char.accentColor,opacity:0.7}}/>
      <div style={{width:"52px",height:"58px",flexShrink:0,border:`1px solid ${char.accentColor}55`,
        overflow:"hidden",background:"#080810",display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.18) 3px,rgba(0,0,0,0.18) 4px)",zIndex:1}}/>
        <span style={{fontSize:"26px",position:"relative",zIndex:2}}>{char.placeholder}</span>
      </div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontFamily:"'Rajdhani','Quicksand',sans-serif",fontSize:"13px",fontWeight:700,letterSpacing:"0.12em",color:char.accentColor,textTransform:"uppercase",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{char.name}</div>
        <div style={{fontFamily:"'Quicksand',sans-serif",fontSize:"10px",color:"rgba(255,255,255,0.3)",letterSpacing:"0.08em",marginTop:"2px"}}>{char.series}</div>
        <div style={{fontFamily:"'Quicksand',sans-serif",fontSize:"10px",fontStyle:"italic",color:`${char.accentColor}99`,marginTop:"4px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>"{char.quote}"</div>
      </div>
      <div style={{fontSize:"14px",color:`${char.accentColor}88`,fontFamily:"monospace",flexShrink:0}}>›</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CHARACTER POPUP
   ═══════════════════════════════════════════════════════════════════════════ */
function CharPopup({char,onClose,isMobile,userName,userAge}) {
  const [visible,setVisible]=useState(false);
  useEffect(()=>{requestAnimationFrame(()=>setVisible(true))},[]);
  const close=()=>{setVisible(false);setTimeout(onClose,350)};

  return (
    <div onClick={close} style={{position:"fixed",inset:0,zIndex:1000,display:"flex",
      alignItems:isMobile?"flex-end":"center",justifyContent:"center",
      background:`rgba(0,0,2,${visible?0.92:0})`,transition:"background 0.35s ease",padding:isMobile?"0":"20px"}}>
      <div style={{position:"absolute",inset:0,pointerEvents:"none",
        backgroundImage:"repeating-linear-gradient(-45deg,transparent,transparent 30px,rgba(255,255,255,0.012) 30px,rgba(255,255,255,0.012) 31px)"}}/>
      <div onClick={e=>e.stopPropagation()} style={{
        width:isMobile?"100%":"500px",maxWidth:isMobile?"100%":"500px",background:"#04040c",
        border:isMobile?"none":`1px solid ${char.accentColor}66`,borderTop:`1px solid ${char.accentColor}66`,
        position:"relative",
        transform:visible?"scale(1) translateY(0)":isMobile?"translateY(100%)":"scale(0.9) translateY(20px)",
        opacity:visible?1:0,transition:"all 0.35s cubic-bezier(0.34,1.4,0.64,1)",
        maxHeight:isMobile?"88vh":"none",overflowY:isMobile?"auto":"visible",
        borderRadius:isMobile?"20px 20px 0 0":"0"}}>

        {isMobile&&<div style={{display:"flex",justifyContent:"center",paddingTop:"12px",paddingBottom:"4px"}}>
          <div style={{width:"36px",height:"4px",borderRadius:"2px",background:"rgba(255,255,255,0.15)"}}/>
        </div>}

        <div style={{background:char.accentColor,padding:isMobile?"10px 16px":"10px 20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontFamily:"'Rajdhani','Quicksand',sans-serif",fontWeight:700,fontSize:"13px",letterSpacing:"0.2em",color:"#000",textTransform:"uppercase"}}>{char.series}</div>
          <button onClick={close} style={{background:"none",border:"1px solid #00000033",color:"#000",width:"28px",height:"28px",fontSize:"13px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,borderRadius:isMobile?"4px":"0"}}>✕</button>
        </div>

        <div style={{padding:isMobile?"20px 16px 16px":"32px 32px 28px",display:"flex",gap:isMobile?"14px":"24px",alignItems:"flex-start"}}>
          <div style={{flexShrink:0,width:isMobile?"80px":"110px",height:isMobile?"96px":"130px",
            border:`1px solid ${char.accentColor}55`,overflow:"hidden",background:"#080810",
            display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
            <div style={{position:"absolute",inset:0,zIndex:1,
              backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.2) 3px,rgba(0,0,0,0.2) 4px)"}}/>
            <span style={{fontSize:"42px",position:"relative",zIndex:2}}>{char.placeholder}</span>
          </div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontFamily:"'Rajdhani','Quicksand',sans-serif",fontSize:isMobile?"18px":"22px",fontWeight:700,color:char.accentColor,letterSpacing:"0.06em",lineHeight:1,marginBottom:"4px"}}>{char.name}</div>
            <div style={{fontSize:"10px",color:"#ffffff44",letterSpacing:"0.18em",textTransform:"uppercase",fontFamily:"'Quicksand',sans-serif",marginBottom:"12px"}}>wishes you a happy birthday</div>
            <div style={{borderLeft:`2px solid ${char.accentColor}`,paddingLeft:"10px",fontFamily:"'Quicksand',sans-serif",fontSize:isMobile?"11px":"12px",fontStyle:"italic",color:char.accentColor+"cc"}}>"{char.quote}"</div>
          </div>
        </div>

        <div style={{height:"1px",background:`linear-gradient(90deg,${char.accentColor}44,transparent)`,margin:isMobile?"0 16px":"0 32px"}}/>
        <div style={{padding:isMobile?"16px 16px 24px":"24px 32px 32px"}}>
          <p style={{fontFamily:"'Quicksand',sans-serif",fontSize:isMobile?"13px":"14px",lineHeight:1.9,color:"rgba(220,220,240,0.82)",margin:0}}>{char.getMessage(userName,userAge)}</p>
        </div>
        <div style={{height:"3px",background:`linear-gradient(90deg,transparent,${char.accentColor},transparent)`}}/>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   DATE INPUT VIEW
   ═══════════════════════════════════════════════════════════════════════════ */
function DateInputView({onSubmit}) {
  const [name,setName]=useState("");
  const [day,setDay]=useState("");
  const [month,setMonth]=useState("");
  const [year,setYear]=useState("");
  const [loaded,setLoaded]=useState(false);
  useEffect(()=>{setTimeout(()=>setLoaded(true),80)},[]);

  const valid=name.trim()&&day&&month&&year;
  const handleGo=()=>{
    if(!valid)return;
    const d=parseInt(day),m=parseInt(month),y=parseInt(year);
    if(d<1||d>31||m<1||m>12||y<1900||y>2025)return;
    onSubmit({name:name.trim(),day:d,month:m,year:y});
  };

  const iStyle={fontFamily:"'Rajdhani','Quicksand',sans-serif",fontSize:"18px",fontWeight:700,
    letterSpacing:"0.08em",textAlign:"center",background:"rgba(255,255,255,0.04)",
    border:"1px solid rgba(255,255,255,0.12)",color:"#fff",padding:"12px 8px",outline:"none",
    transition:"border-color 0.2s"};

  return (
    <div style={{position:"relative",zIndex:10,display:"flex",flexDirection:"column",
      alignItems:"center",justifyContent:"center",minHeight:"100vh",padding:"40px 20px",textAlign:"center"}}>

      <div style={{animation:loaded?"fadeUp 0.7s ease 0.2s both":"none",opacity:loaded?undefined:0}}>
        <h1 className="title-main" style={{fontSize:"clamp(36px,10vw,80px)",lineHeight:1,marginBottom:"4px"}}>Anime</h1>
      </div>
      <div style={{animation:loaded?"slashIn 0.8s ease 0.4s both":"none",opacity:loaded?undefined:0,marginBottom:"16px"}}>
        <h1 className="title-main" style={{fontSize:"clamp(36px,10vw,80px)",lineHeight:1,
          background:"linear-gradient(90deg,#fff 30%,rgba(200,200,255,0.7) 70%)",
          WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Birthday</h1>
      </div>

      <div style={{width:"80px",height:"1px",
        background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)",
        marginBottom:"16px",animation:loaded?"fadeUp 0.6s ease 0.55s both":"none",opacity:loaded?undefined:0}}/>

      <div style={{fontFamily:"'Quicksand',sans-serif",fontSize:"13px",color:"rgba(255,255,255,0.3)",
        fontStyle:"italic",marginBottom:"36px",maxWidth:"340px",
        animation:loaded?"fadeUp 0.6s ease 0.6s both":"none",opacity:loaded?undefined:0}}>
        Enter your name and birthday to receive personalized wishes from your favorite anime characters
      </div>

      <div style={{animation:loaded?"fadeUp 0.6s ease 0.7s both":"none",opacity:loaded?undefined:0,marginBottom:"16px",width:"100%",maxWidth:"300px"}}>
        <input type="text" placeholder="Your Name" value={name} onChange={e=>setName(e.target.value)}
          style={{...iStyle,width:"100%"}}
          onFocus={e=>e.target.style.borderColor="#e8e0ff"}
          onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.12)"}/>
      </div>

      <div style={{display:"flex",gap:"10px",justifyContent:"center",
        animation:loaded?"fadeUp 0.6s ease 0.8s both":"none",opacity:loaded?undefined:0,marginBottom:"8px"}}>
        {[{l:"Day",ph:"DD",v:day,s:setDay,w:"80px"},{l:"Month",ph:"MM",v:month,s:setMonth,w:"80px"},{l:"Year",ph:"YYYY",v:year,s:setYear,w:"100px"}].map(f=>(
          <div key={f.l} style={{width:f.w}}>
            <div style={{fontSize:"9px",letterSpacing:"0.2em",color:"rgba(255,255,255,0.3)",marginBottom:"4px",
              fontFamily:"'Rajdhani',sans-serif",textTransform:"uppercase"}}>{f.l}</div>
            <input type="number" placeholder={f.ph} value={f.v} onChange={e=>f.s(e.target.value)}
              style={{...iStyle,width:"100%"}}
              onFocus={e=>e.target.style.borderColor="#e8e0ff"}
              onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.12)"}/>
          </div>
        ))}
      </div>

      <div style={{animation:loaded?"fadeUp 0.6s ease 0.95s both":"none",opacity:loaded?undefined:0,marginTop:"24px"}}>
        <button onClick={handleGo} disabled={!valid}
          style={{fontFamily:"'Rajdhani','Quicksand',sans-serif",fontSize:"12px",fontWeight:700,
            letterSpacing:"0.25em",textTransform:"uppercase",
            background:valid?"#e8e0ff":"transparent",
            color:valid?"#000":"rgba(255,255,255,0.3)",
            border:`1px solid ${valid?"#e8e0ff":"rgba(255,255,255,0.15)"}`,
            padding:"14px 48px",cursor:valid?"pointer":"default",transition:"all 0.25s ease"}}
          onMouseEnter={e=>{if(valid){e.target.style.boxShadow="0 0 20px rgba(232,224,255,0.4)";e.target.style.transform="translateY(-2px)"}}}
          onMouseLeave={e=>{e.target.style.boxShadow="none";e.target.style.transform="translateY(0)"}}>
          Reveal My Wishes
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   BIRTHDAY VIEW — floating characters
   ═══════════════════════════════════════════════════════════════════════════ */
function BirthdayView({userData,onReset}) {
  const [activeChar,setActiveChar]=useState(null);
  const [loaded,setLoaded]=useState(false);
  const [displayChars,setDisplayChars]=useState([]);
  const isMobile=useIsMobile();
  const {name,day,month,year}=userData;
  const today=new Date();
  const age=today.getFullYear()-year-(today<new Date(today.getFullYear(),month-1,day)?1:0);
  const pad=n=>String(n).padStart(2,"0");

  const shuffle=()=>{setDisplayChars([...CHARACTERS].sort(()=>Math.random()-0.5).slice(0,6))};
  useEffect(()=>{shuffle();setTimeout(()=>setLoaded(true),80)},[]);

  return (
    <>
      {/* Desktop: floating characters */}
      {!isMobile&&displayChars.map((c,i)=>(
        <DesktopBubble key={c.id} char={c} pos={DESKTOP_POS[i]} onClick={setActiveChar}/>
      ))}

      {/* Center content */}
      <div style={{position:"relative",zIndex:10,display:"flex",flexDirection:"column",
        alignItems:"center",justifyContent:"center",
        minHeight:isMobile?"auto":"100vh",
        padding:isMobile?"60px 20px 20px":"40px 20px 200px",textAlign:"center",pointerEvents:"none"}}>

        <div style={{pointerEvents:"auto",marginBottom:"16px",
          animation:loaded?"fadeUp 0.5s ease 0.1s both":"none",opacity:loaded?undefined:0}}>
          <button onClick={onReset} style={{fontFamily:"'Rajdhani',sans-serif",fontSize:"9px",letterSpacing:"0.2em",textTransform:"uppercase",background:"none",border:"1px solid rgba(255,255,255,0.15)",color:"rgba(255,255,255,0.3)",padding:"6px 16px",cursor:"pointer"}}>← New Birthday</button>
        </div>

        <div style={{fontFamily:"'Rajdhani','Quicksand',sans-serif",fontSize:isMobile?"10px":"11px",
          letterSpacing:"0.3em",color:"rgba(255,255,255,0.3)",textTransform:"uppercase",
          marginBottom:isMobile?"16px":"24px",
          animation:loaded?"fadeUp 0.6s ease 0.2s both":"none",opacity:loaded?undefined:0}}>
          {pad(day)} · {pad(month)} · {year} &nbsp;—&nbsp; {pad(today.getDate())} · {pad(today.getMonth()+1)} · {today.getFullYear()}
        </div>

        <div style={{overflow:"hidden",marginBottom:"4px",animation:loaded?"fadeUp 0.7s ease 0.3s both":"none",opacity:loaded?undefined:0}}>
          <h1 className="title-main" style={{fontSize:isMobile?"clamp(44px,14vw,72px)":"clamp(52px,11vw,120px)",lineHeight:1}}>Happy</h1>
        </div>
        <div style={{overflow:"hidden",marginBottom:"16px",animation:loaded?"slashIn 0.8s ease 0.5s both":"none",opacity:loaded?undefined:0}}>
          <h1 className="title-main" style={{fontSize:isMobile?"clamp(44px,14vw,72px)":"clamp(52px,11vw,120px)",lineHeight:1,
            background:"linear-gradient(90deg,#fff 30%,rgba(200,200,255,0.7) 70%)",
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Birthday</h1>
        </div>

        <div style={{width:"80px",height:"1px",
          background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)",
          marginBottom:"16px",animation:loaded?"fadeUp 0.6s ease 0.65s both":"none",opacity:loaded?undefined:0}}/>

        <div className="title-name" style={{fontSize:isMobile?"clamp(26px,8vw,42px)":"clamp(30px,5.5vw,58px)",
          marginBottom:"20px",animation:loaded?"fadeUp 0.7s ease 0.75s both":"none",opacity:loaded?undefined:0}}>
          {name}
        </div>

        <div style={{display:"flex",gap:"10px",justifyContent:"center",
          marginBottom:isMobile?"20px":"28px",
          animation:loaded?"fadeUp 0.7s ease 0.9s both":"none",opacity:loaded?undefined:0}}>
          {String(age).split("").map((d,i)=>(
            <div key={i} style={{width:isMobile?"58px":"72px",height:isMobile?"72px":"90px",
              border:"1px solid rgba(255,255,255,0.18)",
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:isMobile?"40px":"52px",
              fontFamily:"'Rajdhani','Quicksand',sans-serif",fontWeight:700,
              color:"#fff",background:"rgba(255,255,255,0.03)",
              textShadow:"0 0 20px rgba(255,255,255,0.3)",
              position:"relative",animation:"ringGlow 3s ease-in-out infinite"}}>
              {[{top:0,left:0},{top:0,right:0},{bottom:0,left:0},{bottom:0,right:0}].map((p,j)=>(
                <div key={j} style={{position:"absolute",...p,width:"8px",height:"8px",
                  borderTop:p.top===0?"1px solid #fff5":undefined,
                  borderBottom:p.bottom===0?"1px solid #fff5":undefined,
                  borderLeft:p.left===0?"1px solid #fff5":undefined,
                  borderRight:p.right===0?"1px solid #fff5":undefined}}/>
              ))}
              {d}
            </div>
          ))}
        </div>

        <div style={{fontFamily:"'Rajdhani','Quicksand',sans-serif",fontSize:"10px",color:"rgba(255,255,255,0.22)",
          letterSpacing:isMobile?"0.15em":"0.3em",textTransform:"uppercase",
          animation:loaded?"fadeUp 0.6s ease 1.1s both":"none",opacity:loaded?undefined:0}}>
          {isMobile?"— tap a character below —":"— click on the characters around you —"}
        </div>
        <div style={{pointerEvents:"auto",marginTop:"16px",
          animation:loaded?"fadeUp 0.5s ease 1.2s both":"none",opacity:loaded?undefined:0}}>
          <button onClick={shuffle} style={{fontFamily:"'Rajdhani',sans-serif",fontSize:"9px",letterSpacing:"0.2em",textTransform:"uppercase",background:"none",border:"1px solid rgba(255,255,255,0.12)",color:"rgba(255,255,255,0.25)",padding:"6px 20px",cursor:"pointer",transition:"all 0.2s"}}
            onMouseEnter={e=>{e.target.style.borderColor="#fff4";e.target.style.color="#fff6"}}
            onMouseLeave={e=>{e.target.style.borderColor="rgba(255,255,255,0.12)";e.target.style.color="rgba(255,255,255,0.25)"}}>
            ↻ Shuffle Characters
          </button>
        </div>
      </div>

      {/* Mobile: character list */}
      {isMobile&&(
        <div style={{position:"relative",zIndex:10,padding:"0 16px 160px",display:"flex",flexDirection:"column",gap:"8px"}}>
          <div style={{fontFamily:"'Rajdhani','Quicksand',sans-serif",fontSize:"9px",letterSpacing:"0.3em",color:"rgba(255,255,255,0.2)",textTransform:"uppercase",marginBottom:"4px",
            animation:loaded?"fadeUp 0.6s ease 1.2s both":"none",opacity:loaded?undefined:0}}>Characters</div>
          {displayChars.map((c,i)=>(
            <div key={c.id} style={{animation:loaded?`cardSlideUp 0.5s ease ${1.3+i*0.1}s both`:"none",opacity:loaded?undefined:0}}>
              <MobileCard char={c} onClick={setActiveChar}/>
            </div>
          ))}
        </div>
      )}

      {activeChar&&<CharPopup char={activeChar} onClose={()=>setActiveChar(null)} isMobile={isMobile} userName={name} userAge={age}/>}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [userData,setUserData]=useState(null);

  return (
    <div style={{minHeight:"100vh",background:"#010108",position:"relative",overflow:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Quicksand:wght@400;600;700&family=Satisfy&family=Rajdhani:wght@600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html,body{overflow-x:hidden}
        input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}
        input[type=number]{-moz-appearance:textfield;appearance:textfield}

        @keyframes twinkle{0%,100%{opacity:0.1}50%{opacity:0.9}}
        @keyframes rainFall{0%{transform:translateY(-20px);opacity:0}10%{opacity:1}90%{opacity:0.6}100%{transform:translateY(105vh);opacity:0}}
        @keyframes charFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}
        @keyframes titleFlicker{0%,100%{opacity:1}92%{opacity:1}93%{opacity:0.85}94%{opacity:1}97%{opacity:0.9}98%{opacity:1}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slashIn{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0% 0 0)}}
        @keyframes ringGlow{0%,100%{box-shadow:0 0 8px 2px #fff2}50%{box-shadow:0 0 20px 4px #fff4}}
        @keyframes cardSlideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}

        @keyframes petalDrift {
          0% {
            transform: translateY(-30px) translateX(0px) rotate(0deg) scale(1);
            opacity: 0;
          }
          5% {
            opacity: var(--petal-opacity, 0.3);
          }
          25% {
            transform: translateY(25vh) translateX(var(--drift, 20px)) rotate(90deg) scale(0.95);
          }
          50% {
            transform: translateY(50vh) translateX(calc(var(--drift, 20px) * -0.5)) rotate(200deg) scale(0.9);
          }
          75% {
            transform: translateY(75vh) translateX(var(--drift, 20px)) rotate(310deg) scale(0.85);
          }
          95% {
            opacity: 0.05;
          }
          100% {
            transform: translateY(105vh) translateX(calc(var(--drift, 20px) * -0.3)) rotate(400deg) scale(0.8);
            opacity: 0;
          }
        }

        @keyframes flowerSway {
          0%,100% { transform: rotate(-1deg) scale(1); }
          50% { transform: rotate(1.5deg) scale(1.02); }
        }

        .title-main{font-family:'Rajdhani','Quicksand',sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#ffffff;animation:titleFlicker 6s ease-in-out infinite;text-shadow:0 0 1px #fff,0 0 30px rgba(200,210,255,0.4)}
        .title-name{font-family:'Satisfy',cursive;color:#e8e0ff;text-shadow:0 0 20px rgba(200,180,255,0.5)}
      `}</style>

      {/* Scanlines */}
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:50,
        backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,0.018) 3px,rgba(255,255,255,0.018) 4px)"}}/>

      {/* Full environment — always the same */}
      <Environment/>

      {/* Views */}
      {!userData
        ? <DateInputView onSubmit={setUserData}/>
        : <BirthdayView userData={userData} onReset={()=>setUserData(null)}/>
      }
    </div>
  );
}