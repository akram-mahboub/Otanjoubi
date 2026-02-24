import { useState, useEffect, useRef } from "react";

/* ─── Character data ─────────────────────────────────────────────────────── */
const CHARACTERS = [
  {
    id: "oikawa",
    name: "Oikawa Tōru",
    series: "Haikyuu!!",
    src: "/images/oikawa.jpg",
    placeholder: "🏐",
    accentColor: "#7ecef4",
    quote: "The greatest miracle is your existence.",
    message:
      "Oya oya? Is it really your birthday, Nousseiba-chan? *flips hair* Even someone as talented as me takes a moment to bow for you today. You're a true setter — always making everyone around you shine. Happy 25th! Don't forget, the greatest miracle is your existence. ✨🏐",
  },
  {
    id: "levi",
    name: "Levi Ackerman",
    series: "Attack on Titan",
    src: "/images/levi.jpg",
    placeholder: "⚔️",
    accentColor: "#c8d8e0",
    quote: "Tch. Don't waste this year.",
    message:
      "Tch. Don't get all teary-eyed just because it's your birthday. But... I'll say this once — you've made it 25 years and you're still standing. That takes real strength. In this world full of titans, you fight on. So happy birthday, brat. Don't waste this year. ⚔️",
  },
  {
    id: "eren",
    name: "Eren Yeager",
    series: "Attack on Titan",
    src: "/images/eren.jpg",
    placeholder: "🔑",
    accentColor: "#a8d8a8",
    quote: "Keep moving forward.",
    message:
      "You were born free, Nousseiba. And 25 years later you're still out there, fighting for your dreams. I see the fire in you — that same freedom-hungry flame. Keep moving forward. No matter what walls they build around you, you'll break through. Happy Birthday! 🔑🌊",
  },
  {
    id: "sasuke",
    name: "Sasuke Uchiha",
    series: "Naruto",
    src: "/images/sasuke.jpg",
    placeholder: "🌀",
    accentColor: "#d4a8e8",
    quote: "A new power is awakening.",
    message:
      "...I don't usually say these things. But you've walked your own path and that demands respect. 25 is not the end — it's a new power awakening. Don't rely on others for your strength. You already have everything you need inside you. Happy Birthday. 🌀⚡",
  },
  {
    id: "naruto",
    name: "Naruto Uzumaki",
    series: "Naruto",
    src: "/images/naruto.jpg",
    placeholder: "🍜",
    accentColor: "#ffe066",
    quote: "Believe it, dattebayo!",
    message:
      "HAPPY BIRTHDAY NOUSSEIBA!! BELIEVE IT!! 🎉 Dattebayo! You're 25 and you're absolutely AWESOME! I know sometimes the path is hard and you feel alone but I promise — your ninja way is worth it! You've got so much nindo in you! Ramen's on me today! 🍜🍥🌀",
  },
];

/* ─── Desktop positions (used only on large screens) ─────────────────────── */
const DESKTOP_POS = [
  { floatX: "6%",  floatY: "52%" },
  { floatX: "78%", floatY: "14%" },
  { floatX: "18%", floatY: "14%" },
  { floatX: "74%", floatY: "62%" },
  { floatX: "44%", floatY: "76%" },
];

/* ─── Static seeds ───────────────────────────────────────────────────────── */
const STARS = Array.from({ length: 90 }, (_, i) => ({
  id: i,
  x: (i * 37.3 + 13) % 100,
  y: (i * 61.7 + 27) % 100,
  size: 1 + (i % 3) * 0.8,
  delay: (i * 0.23) % 5,
  dur: 2 + (i % 4),
}));

const RAIN = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  x: (i * 1.87) % 100,
  delay: (i * 0.13) % 3,
  dur: 0.6 + (i % 5) * 0.15,
  len: 18 + (i % 4) * 10,
  opacity: 0.06 + (i % 5) * 0.04,
}));

const LILIES = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  x: 5 + i * 12.5,
  scale: 0.5 + (i % 3) * 0.35,
  delay: i * 0.7,
}));

/* ─── Hook: is mobile ────────────────────────────────────────────────────── */
function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return mobile;
}

/* ─── Spider lily ────────────────────────────────────────────────────────── */
function SpiderLily({ x, scale, delay }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "0px",
        left: `${x}%`,
        transform: `scale(${scale})`,
        transformOrigin: "bottom center",
        animation: `lilyWay ${5 + delay}s ease-in-out ${delay}s infinite`,
        pointerEvents: "none",
        zIndex: 1,
        opacity: 0.55 + scale * 0.25,
      }}
    >
      <svg width="90" height="160" viewBox="0 0 90 160" fill="none">
        <line x1="45" y1="160" x2="45" y2="80" stroke="#c8c8d8" strokeWidth="2.5" />
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const ex = 45 + Math.sin(rad) * 36;
          const ey = 80 - Math.cos(rad) * 36;
          const cx1 = 45 + Math.sin(rad - 0.5) * 18;
          const cy1 = 80 - Math.cos(rad - 0.5) * 10;
          const cx2 = 45 + Math.sin(rad + 0.3) * 30;
          const cy2 = 80 - Math.cos(rad + 0.3) * 28;
          return (
            <path key={i} d={`M45,80 C${cx1},${cy1} ${cx2},${cy2} ${ex},${ey}`}
              stroke="#e8e8f8" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          );
        })}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const len = i % 2 === 0 ? 28 : 22;
          const ex = 45 + Math.sin(rad) * len;
          const ey = 80 - Math.cos(rad) * len;
          return (
            <g key={i}>
              <line x1="45" y1="80" x2={ex} y2={ey} stroke="#d0d0e8" strokeWidth="0.8" />
              <circle cx={ex} cy={ey} r="1.2" fill="#e8e8f8" />
            </g>
          );
        })}
        <circle cx="45" cy="80" r="4" fill="#f0f0ff" opacity="0.7" />
      </svg>
    </div>
  );
}

/* ─── Desktop floating bubble ────────────────────────────────────────────── */
function DesktopBubble({ char, pos, onClick }) {
  const [hovered, setHovered] = useState(false);
  const size = 145;
  const floatDur = 4 + (char.id.length % 3);
  const floatDel = CHARACTERS.indexOf(char) * 0.8;

  return (
    <div
      onClick={() => onClick(char)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed",
        left: pos.floatX,
        top: pos.floatY,
        zIndex: 20,
        cursor: "crosshair",
        animation: `charFloat ${floatDur}s ease-in-out ${floatDel}s infinite`,
        transition: "transform 0.25s ease",
        transform: hovered ? "scale(1.1) translateY(-4px)" : "scale(1)",
      }}
    >
      <div style={{ width: size, position: "relative" }}>
        {/* Corner accents */}
        {[
          { top: 0, left: 0, borderTop: "2px solid", borderLeft: "2px solid" },
          { top: 0, right: 0, borderTop: "2px solid", borderRight: "2px solid" },
          { bottom: 0, left: 0, borderBottom: "2px solid", borderLeft: "2px solid" },
          { bottom: 0, right: 0, borderBottom: "2px solid", borderRight: "2px solid" },
        ].map((s, i) => (
          <div key={i} style={{
            position: "absolute", ...s,
            width: "14px", height: "14px",
            borderColor: hovered ? char.accentColor : `${char.accentColor}66`,
            transition: "border-color 0.25s", zIndex: 2,
          }} />
        ))}

        <div style={{
          width: size, height: size,
          overflow: "hidden", background: "#050508",
          border: `1px solid ${hovered ? char.accentColor + "88" : "#ffffff14"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", transition: "border-color 0.25s",
        }}>
          <div style={{
            position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px)",
          }} />
          {char.src
            ? <img src={char.src} alt={char.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", filter: "contrast(1.1) brightness(0.95)" }} />
            : <span style={{ fontSize: size * 0.38, zIndex: 2, position: "relative" }}>{char.placeholder}</span>
          }
          {hovered && (
            <div style={{
              position: "absolute", inset: 0, zIndex: 2,
              background: `linear-gradient(to top, ${char.accentColor}22 0%, transparent 60%)`,
            }} />
          )}
        </div>

        <div style={{
          background: hovered ? char.accentColor : "#0a0a12",
          borderTop: `1px solid ${hovered ? char.accentColor : "#ffffff18"}`,
          padding: "5px 10px", transition: "background 0.25s",
        }}>
          <div style={{
            fontFamily: "'Rajdhani','Quicksand',sans-serif",
            fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em",
            color: hovered ? "#000" : char.accentColor,
            textTransform: "uppercase", transition: "color 0.25s",
          }}>{char.name}</div>
          {hovered && (
            <div style={{
              fontFamily: "'Quicksand',sans-serif", fontSize: "9px",
              color: "#00000099", fontStyle: "italic", marginTop: "1px", letterSpacing: "0.05em",
            }}>{char.quote}</div>
          )}
        </div>
      </div>
      {hovered && (
        <div style={{
          position: "absolute", bottom: "-22px", left: "50%",
          transform: "translateX(-50%)", fontSize: "9px",
          color: char.accentColor, fontFamily: "'Quicksand',sans-serif",
          letterSpacing: "0.2em", textTransform: "uppercase", whiteSpace: "nowrap",
        }}>— click —</div>
      )}
    </div>
  );
}

/* ─── Mobile character row card ──────────────────────────────────────────── */
function MobileCard({ char, onClick }) {
  const [pressed, setPressed] = useState(false);
  return (
    <div
      onClick={() => onClick(char)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "10px 12px",
        background: pressed ? `${char.accentColor}14` : "rgba(255,255,255,0.03)",
        border: `1px solid ${pressed ? char.accentColor + "88" : "#ffffff12"}`,
        cursor: "pointer",
        transition: "all 0.2s ease",
        transform: pressed ? "scale(0.98)" : "scale(1)",
        position: "relative",
      }}
    >
      {/* Left accent bar */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "2px", background: char.accentColor, opacity: 0.7 }} />

      {/* Avatar */}
      <div style={{
        width: "52px", height: "58px", flexShrink: 0,
        border: `1px solid ${char.accentColor}55`,
        overflow: "hidden", background: "#080810",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.18) 3px, rgba(0,0,0,0.18) 4px)",
          zIndex: 1,
        }} />
        {char.src
          ? <img src={char.src} alt={char.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", filter: "contrast(1.08)" }} />
          : <span style={{ fontSize: "26px", position: "relative", zIndex: 2 }}>{char.placeholder}</span>
        }
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "'Rajdhani','Quicksand',sans-serif",
          fontSize: "13px", fontWeight: 700, letterSpacing: "0.12em",
          color: char.accentColor, textTransform: "uppercase",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>{char.name}</div>
        <div style={{
          fontFamily: "'Quicksand',sans-serif", fontSize: "10px",
          color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em",
          marginTop: "2px",
        }}>{char.series}</div>
        <div style={{
          fontFamily: "'Quicksand',sans-serif", fontSize: "10px",
          fontStyle: "italic", color: `${char.accentColor}99`,
          marginTop: "4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>"{char.quote}"</div>
      </div>

      {/* Arrow */}
      <div style={{
        fontSize: "14px", color: `${char.accentColor}88`,
        fontFamily: "monospace", flexShrink: 0,
      }}>›</div>
    </div>
  );
}

/* ─── Popup ──────────────────────────────────────────────────────────────── */
function CharacterPopup({ char, onClose, isMobile }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { requestAnimationFrame(() => setVisible(true)); }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 350);
  };

  return (
    <div
      onClick={handleClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        display: "flex", alignItems: isMobile ? "flex-end" : "center",
        justifyContent: "center",
        background: `rgba(0,0,2,${visible ? 0.92 : 0})`,
        transition: "background 0.35s ease",
        padding: isMobile ? "0" : "20px",
      }}
    >
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 30px, rgba(255,255,255,0.012) 30px, rgba(255,255,255,0.012) 31px)`,
      }} />

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: isMobile ? "100%" : "500px",
          maxWidth: isMobile ? "100%" : "500px",
          background: "#04040c",
          border: isMobile ? "none" : `1px solid ${char.accentColor}66`,
          borderTop: `1px solid ${char.accentColor}66`,
          position: "relative",
          transform: visible
            ? "scale(1) translateY(0)"
            : isMobile ? "translateY(100%)" : "scale(0.9) translateY(20px)",
          opacity: visible ? 1 : 0,
          transition: "all 0.35s cubic-bezier(0.34,1.4,0.64,1)",
          maxHeight: isMobile ? "88vh" : "none",
          overflowY: isMobile ? "auto" : "visible",
          borderRadius: isMobile ? "20px 20px 0 0" : "0",
        }}
      >
        {/* Drag handle on mobile */}
        {isMobile && (
          <div style={{ display: "flex", justifyContent: "center", paddingTop: "12px", paddingBottom: "4px" }}>
            <div style={{ width: "36px", height: "4px", borderRadius: "2px", background: "rgba(255,255,255,0.15)" }} />
          </div>
        )}

        {/* Top bar */}
        <div style={{
          background: char.accentColor,
          padding: isMobile ? "10px 16px" : "10px 20px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div style={{
            fontFamily: "'Rajdhani','Quicksand',sans-serif",
            fontWeight: 700, fontSize: "13px", letterSpacing: "0.2em",
            color: "#000", textTransform: "uppercase",
          }}>{char.series}</div>
          <button onClick={handleClose} style={{
            background: "none", border: "1px solid #00000033", color: "#000",
            width: "28px", height: "28px", fontSize: "13px", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 700, borderRadius: isMobile ? "4px" : "0",
          }}>✕</button>
        </div>

        {/* Body */}
        <div style={{
          padding: isMobile ? "20px 16px 16px" : "32px 32px 28px",
          display: "flex", gap: isMobile ? "14px" : "24px", alignItems: "flex-start",
        }}>
          {/* Avatar */}
          <div style={{
            flexShrink: 0,
            width: isMobile ? "80px" : "110px",
            height: isMobile ? "96px" : "130px",
            border: `1px solid ${char.accentColor}55`,
            overflow: "hidden", background: "#080810",
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative",
          }}>
            <div style={{
              position: "absolute", inset: 0, zIndex: 1,
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.2) 3px, rgba(0,0,0,0.2) 4px)",
            }} />
            {char.src
              ? <img src={char.src} alt={char.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", filter: "contrast(1.08)" }} />
              : <span style={{ fontSize: "42px", position: "relative", zIndex: 2 }}>{char.placeholder}</span>
            }
          </div>

          {/* Text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: "'Rajdhani','Quicksand',sans-serif",
              fontSize: isMobile ? "18px" : "22px", fontWeight: 700,
              color: char.accentColor, letterSpacing: "0.06em", lineHeight: 1, marginBottom: "4px",
            }}>{char.name}</div>
            <div style={{
              fontSize: "10px", color: "#ffffff44", letterSpacing: "0.18em",
              textTransform: "uppercase", fontFamily: "'Quicksand',sans-serif", marginBottom: "12px",
            }}>wishes you a happy birthday</div>
            <div style={{
              borderLeft: `2px solid ${char.accentColor}`,
              paddingLeft: "10px", fontFamily: "'Quicksand',sans-serif",
              fontSize: isMobile ? "11px" : "12px", fontStyle: "italic",
              color: char.accentColor + "cc",
            }}>"{char.quote}"</div>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: "1px",
          background: `linear-gradient(90deg, ${char.accentColor}44, transparent)`,
          margin: isMobile ? "0 16px" : "0 32px",
        }} />

        {/* Message */}
        <div style={{ padding: isMobile ? "16px 16px 24px" : "24px 32px 32px" }}>
          <p style={{
            fontFamily: "'Quicksand',sans-serif",
            fontSize: isMobile ? "13px" : "14px",
            lineHeight: 1.9, color: "rgba(220,220,240,0.82)", margin: 0,
          }}>{char.message}</p>
        </div>

        {/* Bottom accent */}
        <div style={{ height: "3px", background: `linear-gradient(90deg, transparent, ${char.accentColor}, transparent)` }} />
      </div>
    </div>
  );
}

/* ─── Main App ───────────────────────────────────────────────────────────── */
export default function App() {
  const [activeChar, setActiveChar] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#010108", position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Quicksand:wght@400;600;700&family=Satisfy&family=Rajdhani:wght@600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; }

        @keyframes twinkle {
          0%,100% { opacity: 0.1; } 50% { opacity: 0.9; }
        }
        @keyframes rainFall {
          0%   { transform: translateY(-20px); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.6; }
          100% { transform: translateY(105vh); opacity: 0; }
        }
        @keyframes lilyWay {
          0%,100% { transform: scale(var(--ls,1)) rotate(-1.5deg); }
          50%      { transform: scale(var(--ls,1)) rotate(1.5deg) translateX(4px); }
        }
        @keyframes charFloat {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-16px); }
        }
        @keyframes titleFlicker {
          0%,100% { opacity: 1; }
          92% { opacity: 1; } 93% { opacity: 0.85; }
          94% { opacity: 1; } 97% { opacity: 0.9; } 98% { opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slashIn {
          from { clip-path: inset(0 100% 0 0); }
          to   { clip-path: inset(0 0% 0 0); }
        }
        @keyframes ringGlow {
          0%,100% { box-shadow: 0 0 8px 2px #fff2; }
          50%      { box-shadow: 0 0 20px 4px #fff4; }
        }
        @keyframes cardSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .title-main {
          font-family: 'Rajdhani','Quicksand',sans-serif;
          font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em;
          color: #ffffff;
          animation: titleFlicker 6s ease-in-out infinite;
          text-shadow: 0 0 1px #fff, 0 0 30px rgba(200,210,255,0.4);
        }
        .title-name {
          font-family: 'Satisfy', cursive;
          color: #e8e0ff;
          text-shadow: 0 0 20px rgba(200,180,255,0.5);
        }
      `}</style>

      {/* Scanlines */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 50,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.018) 3px, rgba(255,255,255,0.018) 4px)",
      }} />

      {/* Stars */}
      {STARS.map((s) => (
        <div key={s.id} style={{
          position: "fixed", left: `${s.x}vw`, top: `${s.y}vh`,
          width: s.size, height: s.size, borderRadius: "50%", background: "#fff",
          animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
          pointerEvents: "none", zIndex: 0,
        }} />
      ))}

      {/* Rain */}
      {RAIN.map((r) => (
        <div key={r.id} style={{
          position: "fixed", left: `${r.x}vw`, top: "-20px",
          width: "1px", height: r.len,
          background: `linear-gradient(to bottom, transparent, rgba(200,210,255,${r.opacity}), transparent)`,
          animation: `rainFall ${r.dur}s linear ${r.delay}s infinite`,
          pointerEvents: "none", zIndex: 1, transform: "skewX(-8deg)",
        }} />
      ))}

      {/* Lilies */}
      {LILIES.map((l) => (
        <SpiderLily key={l.id} x={l.x} scale={l.scale} delay={l.delay} />
      ))}

      {/* Desktop: floating characters */}
      {!isMobile && CHARACTERS.map((c, i) => (
        <DesktopBubble key={c.id} char={c} pos={DESKTOP_POS[i]} onClick={setActiveChar} />
      ))}

      {/* Center content */}
      <div style={{
        position: "relative", zIndex: 10,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        minHeight: isMobile ? "auto" : "100vh",
        padding: isMobile ? "60px 20px 20px" : "40px 20px 200px",
        textAlign: "center",
        pointerEvents: "none",
      }}>
        {/* Date */}
        <div style={{
          fontFamily: "'Rajdhani','Quicksand',sans-serif",
          fontSize: isMobile ? "10px" : "11px", letterSpacing: "0.3em",
          color: "rgba(255,255,255,0.3)", textTransform: "uppercase",
          marginBottom: isMobile ? "16px" : "24px",
          animation: loaded ? "fadeUp 0.6s ease 0.2s both" : "none",
          opacity: loaded ? undefined : 0,
        }}>
          24 · 02 · 2001 &nbsp;—&nbsp; 24 · 02 · 2026
        </div>

        {/* Title */}
        <div style={{
          overflow: "hidden", marginBottom: "4px",
          animation: loaded ? "fadeUp 0.7s ease 0.3s both" : "none",
          opacity: loaded ? undefined : 0,
        }}>
          <h1 className="title-main" style={{ fontSize: isMobile ? "clamp(44px,14vw,72px)" : "clamp(52px,11vw,120px)", lineHeight: 1 }}>
            Happy
          </h1>
        </div>
        <div style={{
          overflow: "hidden", marginBottom: "16px",
          animation: loaded ? "slashIn 0.8s ease 0.5s both" : "none",
          opacity: loaded ? undefined : 0,
        }}>
          <h1 className="title-main" style={{
            fontSize: isMobile ? "clamp(44px,14vw,72px)" : "clamp(52px,11vw,120px)",
            lineHeight: 1,
            background: "linear-gradient(90deg, #fff 30%, rgba(200,200,255,0.7) 70%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            Birthday
          </h1>
        </div>

        {/* Rule */}
        <div style={{
          width: "80px", height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
          marginBottom: "16px",
          animation: loaded ? "fadeUp 0.6s ease 0.65s both" : "none",
          opacity: loaded ? undefined : 0,
        }} />

        {/* Name */}
        <div className="title-name" style={{
          fontSize: isMobile ? "clamp(26px,8vw,42px)" : "clamp(30px,5.5vw,58px)",
          marginBottom: "20px",
          animation: loaded ? "fadeUp 0.7s ease 0.75s both" : "none",
          opacity: loaded ? undefined : 0,
        }}>
          Nousseiba
        </div>

        {/* Age */}
        <div style={{
          display: "flex", gap: "10px", justifyContent: "center",
          marginBottom: isMobile ? "20px" : "28px",
          animation: loaded ? "fadeUp 0.7s ease 0.9s both" : "none",
          opacity: loaded ? undefined : 0,
        }}>
          {["2", "5"].map((d, i) => (
            <div key={i} style={{
              width: isMobile ? "58px" : "72px",
              height: isMobile ? "72px" : "90px",
              border: "1px solid rgba(255,255,255,0.18)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: isMobile ? "40px" : "52px",
              fontFamily: "'Rajdhani','Quicksand',sans-serif", fontWeight: 700,
              color: "#fff", background: "rgba(255,255,255,0.03)",
              textShadow: "0 0 20px rgba(255,255,255,0.3)",
              position: "relative", animation: "ringGlow 3s ease-in-out infinite",
            }}>
              {[{top:0,left:0},{top:0,right:0},{bottom:0,left:0},{bottom:0,right:0}].map((p,j)=>(
                <div key={j} style={{
                  position:"absolute",...p, width:"8px", height:"8px",
                  borderTop:p.top===0?"1px solid #fff5":undefined,
                  borderBottom:p.bottom===0?"1px solid #fff5":undefined,
                  borderLeft:p.left===0?"1px solid #fff5":undefined,
                  borderRight:p.right===0?"1px solid #fff5":undefined,
                }} />
              ))}
              {d}
            </div>
          ))}
        </div>

        {/* Hint */}
        <div style={{
          fontFamily: "'Rajdhani','Quicksand',sans-serif",
          fontSize: "10px", color: "rgba(255,255,255,0.22)",
          letterSpacing: isMobile ? "0.15em" : "0.3em", textTransform: "uppercase",
          animation: loaded ? "fadeUp 0.6s ease 1.1s both" : "none",
          opacity: loaded ? undefined : 0,
        }}>
          {isMobile ? "— tap a character below —" : "— click on the characters around you —"}
        </div>
      </div>

      {/* Mobile: character list */}
      {isMobile && (
        <div style={{
          position: "relative", zIndex: 10,
          padding: "0 16px 160px",
          display: "flex", flexDirection: "column", gap: "8px",
        }}>
          {/* Section label */}
          <div style={{
            fontFamily: "'Rajdhani','Quicksand',sans-serif",
            fontSize: "9px", letterSpacing: "0.3em", color: "rgba(255,255,255,0.2)",
            textTransform: "uppercase", marginBottom: "4px",
            animation: loaded ? "fadeUp 0.6s ease 1.2s both" : "none",
            opacity: loaded ? undefined : 0,
          }}>
            Characters
          </div>
          {CHARACTERS.map((c, i) => (
            <div key={c.id} style={{
              animation: loaded ? `cardSlideUp 0.5s ease ${1.3 + i * 0.1}s both` : "none",
              opacity: loaded ? undefined : 0,
            }}>
              <MobileCard char={c} onClick={setActiveChar} />
            </div>
          ))}
        </div>
      )}

      {/* Popup */}
      {activeChar && (
        <CharacterPopup char={activeChar} onClose={() => setActiveChar(null)} isMobile={isMobile} />
      )}
    </div>
  );
}