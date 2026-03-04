import { useState, useEffect } from "react";
import "./App.css";
import charactersData from "./characters.json";

/* ═══════════════════════════════════════════════════════════════════════════
   BUILD CHARACTERS — attach getMessage from JSON messageTemplate
   {name} → user name, {NAME} → uppercased, {age} → user age
   ═══════════════════════════════════════════════════════════════════════════ */
function buildMessage(template, name, age) {
  return template
    .replace(/\{NAME\}/g, name.toUpperCase())
    .replace(/\{name\}/g, name)
    .replace(/\{age\}/g, age);
}

const CHARACTERS = charactersData.map(c => ({
  ...c,
  getMessage: (name, age) => buildMessage(c.messageTemplate, name, age),
}));

/* ─── Desktop floating positions ─────────────────────────────────────────── */
const DESKTOP_POS = [
  { floatX: "4%",  floatY: "48%" },
  { floatX: "80%", floatY: "12%" },
  { floatX: "16%", floatY: "10%" },
  { floatX: "76%", floatY: "58%" },
  { floatX: "42%", floatY: "74%" },
  { floatX: "58%", floatY: "8%"  },
];

/* ─── Particle seeds ─────────────────────────────────────────────────────── */
const STARS  = Array.from({ length: 90 }, (_, i) => ({ id: i, x: (i * 37.3 + 13) % 100, y: (i * 61.7 + 27) % 100, size: 1 + (i % 3) * 0.8, delay: (i * 0.23) % 5, dur: 2 + (i % 4) }));
const RAIN   = Array.from({ length: 55 }, (_, i) => ({ id: i, x: (i * 1.87) % 100, delay: (i * 0.13) % 3, dur: 0.6 + (i % 5) * 0.15, len: 18 + (i % 4) * 10, opacity: 0.06 + (i % 5) * 0.04 }));
const LILIES = Array.from({ length: 8  }, (_, i) => ({ id: i, x: 5 + i * 12.5, scale: 0.5 + (i % 3) * 0.35, delay: i * 0.7 }));

/* ─── Hook ────────────────────────────────────────────────────────────────── */
function useIsMobile() {
  const [m, setM] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setM(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return m;
}

/* ═══════════════════════════════════════════════════════════════════════════
   SPIDER LILY
   ═══════════════════════════════════════════════════════════════════════════ */
function SpiderLily({ x, scale, delay }) {
  return (
    <div className="spider-lily" style={{
      left: `${x}%`,
      transform: `scale(${scale})`,
      opacity: 0.55 + scale * 0.25,
      animation: `lilyWay ${5 + delay}s ease-in-out ${delay}s infinite`,
    }}>
      <svg width="90" height="160" viewBox="0 0 90 160" fill="none">
        <line x1="45" y1="160" x2="45" y2="80" stroke="#c8c8d8" strokeWidth="2.5" />
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const ex = 45 + Math.sin(rad) * 36, ey = 80 - Math.cos(rad) * 36;
          const cx1 = 45 + Math.sin(rad - 0.5) * 18, cy1 = 80 - Math.cos(rad - 0.5) * 10;
          const cx2 = 45 + Math.sin(rad + 0.3) * 30, cy2 = 80 - Math.cos(rad + 0.3) * 28;
          return <path key={i} d={`M45,80 C${cx1},${cy1} ${cx2},${cy2} ${ex},${ey}`} stroke="#e8e8f8" strokeWidth="1.8" fill="none" strokeLinecap="round" />;
        })}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const len = i % 2 === 0 ? 28 : 22;
          const ex = 45 + Math.sin(rad) * len, ey = 80 - Math.cos(rad) * len;
          return <g key={i}><line x1="45" y1="80" x2={ex} y2={ey} stroke="#d0d0e8" strokeWidth="0.8" /><circle cx={ex} cy={ey} r="1.2" fill="#e8e8f8" /></g>;
        })}
        <circle cx="45" cy="80" r="4" fill="#f0f0ff" opacity="0.7" />
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ENVIRONMENT
   ═══════════════════════════════════════════════════════════════════════════ */
function Environment() {
  return <>
    {STARS.map(s => (
      <div key={s.id} className="star" style={{ left: `${s.x}vw`, top: `${s.y}vh`, width: s.size, height: s.size, animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite` }} />
    ))}
    {RAIN.map(r => (
      <div key={`r${r.id}`} className="rain-drop" style={{ left: `${r.x}vw`, height: r.len, background: `linear-gradient(to bottom, transparent, rgba(200,210,255,${r.opacity}), transparent)`, animation: `rainFall ${r.dur}s linear ${r.delay}s infinite` }} />
    ))}
    {LILIES.map(l => <SpiderLily key={l.id} x={l.x} scale={l.scale} delay={l.delay} />)}
  </>;
}

/* ═══════════════════════════════════════════════════════════════════════════
   CHARACTER IMAGE
   ═══════════════════════════════════════════════════════════════════════════ */
function CharImage({ src, name, accentColor, fontSize }) {
  const [err, setErr] = useState(false);
  return (
    <div className="char-image-wrap">
      <div className="char-image-scanlines" />
      {!err
        ? <img src={src} alt={name} onError={() => setErr(true)} className="char-img" />
        : <span className="char-fallback-name" style={{ fontSize: fontSize || "40px", color: accentColor }}>
            {name.split(" ")[0]}
          </span>
      }
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   DESKTOP BUBBLE
   ═══════════════════════════════════════════════════════════════════════════ */
function DesktopBubble({ char, pos, onClick }) {
  const [hovered, setHovered] = useState(false);
  const size = 145;
  const floatDur = 4 + (char.id.length % 3);
  const floatDel = CHARACTERS.indexOf(char) * 0.8;

  return (
    <div
      className="desktop-bubble"
      onClick={() => onClick(char)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ left: pos.floatX, top: pos.floatY, "--float-dur": `${floatDur}s`, "--float-del": `${floatDel}s`, transform: hovered ? "scale(1.1) translateY(-4px)" : "scale(1)" }}
    >
      <div className="bubble-frame" style={{ width: size }}>
        {["tl","tr","bl","br"].map(pos => (
          <div key={pos} className={`bubble-corner ${pos}`} style={{ borderColor: hovered ? char.accentColor : `${char.accentColor}66` }} />
        ))}
        <div className="bubble-image-box" style={{ width: size, height: size, border: `1px solid ${hovered ? char.accentColor + "88" : "#ffffff14"}` }}>
          <CharImage src={char.src} name={char.name} accentColor={char.accentColor} />
          {hovered && <div className="bubble-hover-overlay" style={{ background: `linear-gradient(to top, ${char.accentColor}22 0%, transparent 60%)` }} />}
        </div>
        <div className="bubble-name-strip" style={{ background: hovered ? char.accentColor : "#0a0a12", borderTop: `1px solid ${hovered ? char.accentColor : "#ffffff18"}` }}>
          <div className="bubble-name-text" style={{ color: hovered ? "#000" : char.accentColor }}>{char.name}</div>
          {hovered && <div className="bubble-quote-text">{char.quote}</div>}
        </div>
      </div>
      {hovered && <div className="bubble-click-hint" style={{ color: char.accentColor }}>— click —</div>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MOBILE CARD
   ═══════════════════════════════════════════════════════════════════════════ */
function MobileCard({ char, onClick }) {
  const [pressed, setPressed] = useState(false);
  return (
    <div
      className={`mobile-card${pressed ? " pressed" : ""}`}
      onClick={() => onClick(char)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      style={{ background: pressed ? `${char.accentColor}14` : "rgba(255,255,255,0.03)", border: `1px solid ${pressed ? char.accentColor + "88" : "#ffffff12"}` }}
    >
      <div className="mobile-card-accent-bar" style={{ background: char.accentColor }} />
      <div className="mobile-card-avatar" style={{ border: `1px solid ${char.accentColor}55` }}>
        <CharImage src={char.src} name={char.name} accentColor={char.accentColor} fontSize="13px" />
      </div>
      <div className="mobile-card-info">
        <div className="mobile-card-name" style={{ color: char.accentColor }}>{char.name}</div>
        <div className="mobile-card-series">{char.series}</div>
        <div className="mobile-card-quote" style={{ color: `${char.accentColor}99` }}>"{char.quote}"</div>
      </div>
      <div className="mobile-card-arrow" style={{ color: `${char.accentColor}88` }}>›</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   POPUP
   ═══════════════════════════════════════════════════════════════════════════ */
function CharPopup({ char, onClose, isMobile, userName, userAge }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { requestAnimationFrame(() => setVisible(true)); }, []);
  const close = () => { setVisible(false); setTimeout(onClose, 350); };
  const m = isMobile ? "mobile" : "desktop";

  return (
    <div className={`popup-overlay ${m}`} onClick={close}
      style={{ background: `rgba(0,0,2,${visible ? 0.92 : 0})` }}>
      <div className="popup-hatch" />
      <div
        className={`popup-card ${m}`}
        onClick={e => e.stopPropagation()}
        style={{
          border: isMobile ? "none" : `1px solid ${char.accentColor}66`,
          borderTop: `1px solid ${char.accentColor}66`,
          transform: visible ? "scale(1) translateY(0)" : isMobile ? "translateY(100%)" : "scale(0.9) translateY(20px)",
          opacity: visible ? 1 : 0,
        }}
      >
        {isMobile && (
          <div className="popup-drag-handle">
            <div className="popup-drag-handle-bar" />
          </div>
        )}

        <div className={`popup-top-bar ${m}`} style={{ background: char.accentColor }}>
          <div className="popup-series-label">{char.series}</div>
          <button className={`popup-close-btn ${m}`} onClick={close}>✕</button>
        </div>

        <div className={`popup-body ${m}`}>
          <div className={`popup-avatar ${m}`} style={{ border: `1px solid ${char.accentColor}55` }}>
            <div className="char-image-scanlines-dark" />
            <CharImage src={char.src} name={char.name} accentColor={char.accentColor} fontSize="18px" />
          </div>
          <div className="popup-info">
            <div className={`popup-char-name ${m}`} style={{ color: char.accentColor }}>{char.name}</div>
            <div className="popup-wishes-label">wishes you a happy birthday</div>
            <div className={`popup-quote ${m}`} style={{ borderLeft: `2px solid ${char.accentColor}`, color: `${char.accentColor}cc` }}>
              "{char.quote}"
            </div>
          </div>
        </div>

        <div className={`popup-divider ${m}`} style={{ background: `linear-gradient(90deg, ${char.accentColor}44, transparent)` }} />
        <p className={`popup-message ${m}`}>{char.getMessage(userName, userAge)}</p>
        <div className="popup-bottom-line" style={{ background: `linear-gradient(90deg, transparent, ${char.accentColor}, transparent)` }} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   DATE INPUT VIEW
   ═══════════════════════════════════════════════════════════════════════════ */
function DateInputView({ onSubmit }) {
  const [name, setName]   = useState("");
  const [day, setDay]     = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear]   = useState("");
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  const valid = name.trim() && day && month && year;
  const handleGo = () => {
    if (!valid) return;
    const d = parseInt(day), m = parseInt(month), y = parseInt(year);
    if (d < 1 || d > 31 || m < 1 || m > 12 || y < 1900 || y > 2025) return;
    onSubmit({ name: name.trim(), day: d, month: m, year: y });
  };

  const anim = (delay) => loaded ? { animation: `fadeUp 0.6s ease ${delay}s both` } : { opacity: 0 };

  return (
    <div className="date-input-view">
      <div style={loaded ? { animation: "fadeUp 0.7s ease 0.2s both" } : { opacity: 0 }}>
        <h1 className="title-main" style={{ fontSize: "clamp(36px,10vw,80px)", lineHeight: 1, marginBottom: "4px" }}>Anime</h1>
      </div>
      <div style={loaded ? { animation: "slashIn 0.8s ease 0.4s both", marginBottom: "16px" } : { opacity: 0, marginBottom: "16px" }}>
        <h1 className="title-main title-birthday-gradient" style={{ fontSize: "clamp(36px,10vw,80px)", lineHeight: 1 }}>Birthday</h1>
      </div>

      <div className="hr-line" style={{ marginBottom: "16px", ...anim(0.55) }} />

      <p className="date-input-subtitle" style={anim(0.6)}>
        Enter your name and birthday to receive personalized wishes from your favorite anime characters
      </p>

      <div style={{ marginBottom: "16px", width: "100%", maxWidth: "300px", ...anim(0.7) }}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="date-input-field"
        />
      </div>

      <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "8px", ...anim(0.8) }}>
        {[
          { l: "Day",   ph: "DD",   v: day,   s: setDay,   w: "80px"  },
          { l: "Month", ph: "MM",   v: month, s: setMonth, w: "80px"  },
          { l: "Year",  ph: "YYYY", v: year,  s: setYear,  w: "100px" },
        ].map(f => (
          <div key={f.l} style={{ width: f.w }}>
            <div className="date-field-label">{f.l}</div>
            <input
              type="number"
              placeholder={f.ph}
              value={f.v}
              onChange={e => f.s(e.target.value)}
              className="date-input-field"
            />
          </div>
        ))}
      </div>

      <div style={{ marginTop: "24px", ...anim(0.95) }}>
        <button className="reveal-btn" onClick={handleGo} disabled={!valid}>
          Reveal My Wishes
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   BIRTHDAY VIEW
   ═══════════════════════════════════════════════════════════════════════════ */
function BirthdayView({ userData, onReset }) {
  const [activeChar, setActiveChar] = useState(null);
  const [loaded, setLoaded]         = useState(false);
  const [displayChars, setDisplayChars] = useState([]);
  const isMobile = useIsMobile();
  const { name, day, month, year } = userData;
  const today = new Date();
  const age = today.getFullYear() - year - (today < new Date(today.getFullYear(), month - 1, day) ? 1 : 0);
  const pad = n => String(n).padStart(2, "0");
  const m = isMobile ? "mobile" : "desktop";

  const shuffle = () => setDisplayChars([...CHARACTERS].sort(() => Math.random() - 0.5).slice(0, 6));
  useEffect(() => { shuffle(); setTimeout(() => setLoaded(true), 80); }, []);

  const anim = (delay) => loaded ? { animation: `fadeUp 0.6s ease ${delay}s both` } : { opacity: 0 };

  const CORNERS = [
    { top: 0, left: 0 }, { top: 0, right: 0 },
    { bottom: 0, left: 0 }, { bottom: 0, right: 0 },
  ];

  return (
    <>
      {!isMobile && displayChars.map((c, i) => (
        <DesktopBubble key={c.id} char={c} pos={DESKTOP_POS[i]} onClick={setActiveChar} />
      ))}

      <div className={`birthday-view-center ${m}`}>
        <div style={{ pointerEvents: "auto", marginBottom: "16px", ...anim(0.1) }}>
          <button className="ghost-btn" onClick={onReset}>← New Birthday</button>
        </div>

        <div className="date-display" style={{ fontSize: isMobile ? "10px" : "11px", marginBottom: isMobile ? "16px" : "24px", ...anim(0.2) }}>
          {pad(day)} · {pad(month)} · {year} &nbsp;—&nbsp; {pad(today.getDate())} · {pad(today.getMonth() + 1)} · {today.getFullYear()}
        </div>

        <div style={{ overflow: "hidden", marginBottom: "4px", ...anim(0.3) }}>
          <h1 className="title-main" style={{ fontSize: isMobile ? "clamp(44px,14vw,72px)" : "clamp(52px,11vw,120px)", lineHeight: 1 }}>Happy</h1>
        </div>
        <div style={{ overflow: "hidden", marginBottom: "16px", ...(loaded ? { animation: "slashIn 0.8s ease 0.5s both" } : { opacity: 0 }) }}>
          <h1 className="title-main title-birthday-gradient" style={{ fontSize: isMobile ? "clamp(44px,14vw,72px)" : "clamp(52px,11vw,120px)", lineHeight: 1 }}>Birthday</h1>
        </div>

        <div className="hr-line" style={{ marginBottom: "16px", ...anim(0.65) }} />

        <div className="title-name" style={{ fontSize: isMobile ? "clamp(26px,8vw,42px)" : "clamp(30px,5.5vw,58px)", marginBottom: "20px", ...anim(0.75) }}>
          {name}
        </div>

        <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: isMobile ? "20px" : "28px", ...anim(0.9) }}>
          {String(age).split("").map((d, i) => (
            <div key={i} className={`age-digit ${m}`}>
              {CORNERS.map((p, j) => (
                <div key={j} className="age-digit-corner" style={{
                  ...p,
                  borderTop:    p.top    === 0 ? "1px solid rgba(255,255,255,0.31)" : undefined,
                  borderBottom: p.bottom === 0 ? "1px solid rgba(255,255,255,0.31)" : undefined,
                  borderLeft:   p.left   === 0 ? "1px solid rgba(255,255,255,0.31)" : undefined,
                  borderRight:  p.right  === 0 ? "1px solid rgba(255,255,255,0.31)" : undefined,
                }} />
              ))}
              {d}
            </div>
          ))}
        </div>

        <div className="hint-text" style={{ letterSpacing: isMobile ? "0.15em" : "0.3em", ...anim(1.1) }}>
          {isMobile ? "— tap a character below —" : "— click on the characters around you —"}
        </div>
        <div style={{ pointerEvents: "auto", marginTop: "16px", ...anim(1.2) }}>
          <button className="ghost-btn" onClick={shuffle}>↻ Shuffle Characters</button>
        </div>
      </div>

      {isMobile && (
        <div className="mobile-char-list">
          <div className="mobile-char-list-label" style={anim(1.2)}>Characters</div>
          {displayChars.map((c, i) => (
            <div key={c.id} style={loaded ? { animation: `cardSlideUp 0.5s ease ${1.3 + i * 0.1}s both` } : { opacity: 0 }}>
              <MobileCard char={c} onClick={setActiveChar} />
            </div>
          ))}
        </div>
      )}

      {activeChar && (
        <CharPopup char={activeChar} onClose={() => setActiveChar(null)} isMobile={isMobile} userName={name} userAge={age} />
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [userData, setUserData] = useState(null);

  return (
    <div className="app-root">
      <div className="scanlines" />
      <Environment />
      {!userData
        ? <DateInputView onSubmit={setUserData} />
        : <BirthdayView userData={userData} onReset={() => setUserData(null)} />
      }
    </div>
  );
}