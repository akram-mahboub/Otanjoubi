# 📖 Code Documentation

A full walkthrough of every part of the project — `App.jsx`, `App.css`, and `characters.json`.

---

## 📁 Project Structure

```
src/
  App.jsx           ← all React components and logic
  App.css           ← all styles and animations
  characters.json   ← character data (edit here to add/remove characters)
public/
  images/
    oikawa.jpg      ← character photos (filename must match "id" in JSON)
    levi.jpg
    ...
```

---

## 🧩 `characters.json` — How it works

Each character is an object in the JSON array. Here's the full structure:

```json
{
  "id": "levi",
  "name": "Levi Ackerman",
  "series": "Attack on Titan",
  "src": "/images/levi.jpg",
  "accentColor": "#c8d8e0",
  "quote": "Tch. Don't waste this year.",
  "messageTemplate": "Tch. Don't get all teary-eyed just because it's your birthday. But... I'll say this once — you've made it {age} years and you're still standing. So happy birthday, {name}. Don't waste this year. ⚔️"
}
```

| Field             | Purpose |
|-------------------|---------|
| `id`              | Unique key. Also used as the image filename — `levi` → `/images/levi.jpg` |
| `name`            | Display name shown on cards and popups |
| `series`          | Anime series shown in the popup top bar |
| `src`             | Path to the character image in `/public/images/` |
| `accentColor`     | Hex color used for borders, name text, highlights — unique per character |
| `quote`           | Short quote shown on hover (desktop) and in card (mobile) |
| `messageTemplate` | The birthday message. Use `{name}`, `{NAME}` (uppercase), `{age}` as dynamic placeholders |

### Adding a new character

1. Add their image to `public/images/yourcharacter.jpg`
2. Add a new object to `characters.json`:

```json
{
  "id": "yourcharacter",
  "name": "Character Name",
  "series": "Anime Series",
  "src": "/images/yourcharacter.jpg",
  "accentColor": "#hex",
  "quote": "A short iconic quote.",
  "messageTemplate": "Happy Birthday, {name}! You're {age} and amazing! 🎉"
}
```

That's it — no changes to `App.jsx` needed.

---

## ⚙️ `App.jsx` — Section by Section

### 1. `buildMessage()` + `CHARACTERS`

```js
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
```

**What it does:**
- `buildMessage` takes a raw template string from the JSON and fills in the real values at runtime. `{name}` → the user's name, `{NAME}` → uppercased version, `{age}` → their calculated age.
- `CHARACTERS` takes the raw JSON array and attaches a `getMessage(name, age)` function to each character object, so the rest of the code can call `char.getMessage("Nousseiba", 25)` anywhere.

---

### 2. `DESKTOP_POS`

```js
const DESKTOP_POS = [
  { floatX: "3%",  floatY: "16%" }, // left  top
  { floatX: "3%",  floatY: "56%" }, // left  bottom
  { floatX: "80%", floatY: "16%" }, // right top
  { floatX: "80%", floatY: "56%" }, // right bottom
];
```

**What it does:**  
Defines the screen positions of the 4 floating character cards on desktop. `floatX` = horizontal position from the left edge, `floatY` = vertical position from the top. These are `fixed` positions so they don't scroll with the page.

---

### 3. `STARS`, `RAIN`, `LILIES` — Particle seeds

```js
const STARS  = Array.from({ length: 90 }, (_, i) => ({ ... }));
const RAIN   = Array.from({ length: 55 }, (_, i) => ({ ... }));
const LILIES = Array.from({ length: 8  }, (_, i) => ({ ... }));
```

**What it does:**  
Creates arrays of random-looking but *deterministic* particle data (positions, sizes, animation delays) using math formulas based on the index `i`. This is done at module level (outside any component) so the values never change between renders — no flickering or jumping.

- `STARS` → 90 twinkling white dots scattered across the sky
- `RAIN` → 55 falling vertical lines at slight angle
- `LILIES` → 8 spider lily SVGs spread along the bottom

---

### 4. `useIsMobile()` — Responsive hook

```js
function useIsMobile() {
  const [m, setM] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setM(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return m;
}
```

**What it does:**  
A custom React hook that returns `true` when the screen is narrower than 768px (phone/small tablet), `false` otherwise. It also listens for window resize events and updates automatically. Used throughout the app to switch between the floating character layout (desktop) and the list card layout (mobile).

---

### 5. `SpiderLily` — SVG flower component

```jsx
function SpiderLily({ x, scale, delay }) { ... }
```

**What it does:**  
Renders a single SVG spider lily (higanbana flower) at the bottom of the screen. Each lily has:
- A vertical stem line
- 6 curved petals drawn with `<path>` bezier curves
- 12 thin stamen lines radiating out with a dot at each tip
- A gentle swaying animation (`lilyWay` keyframe)

The `scale` prop makes some lilies larger/smaller to create depth. `x` positions it horizontally. `delay` staggers the animation start.

---

### 6. `Environment` — Background scene

```jsx
function Environment() {
  return <>
    {STARS.map(...)}
    {RAIN.map(...)}
    {LILIES.map(...)}
  </>;
}
```

**What it does:**  
Renders all background visual elements in one place — stars, rain, and lilies — by mapping over the pre-computed seed arrays. All elements use `position: fixed` so they stay in place while the page scrolls. This component is rendered once in `App` and never changes.

---

### 7. `CharImage` — Image with fallback

```jsx
function CharImage({ src, name, accentColor, fontSize }) {
  const [err, setErr] = useState(false);
  return (
    <div className="char-image-wrap">
      <div className="char-image-scanlines" />
      {!err
        ? <img src={src} onError={() => setErr(true)} ... />
        : <span>{name.split(" ")[0]}</span>
      }
    </div>
  );
}
```

**What it does:**  
Tries to load the character's `.jpg` image. If the image fails (file not found, wrong path, etc.) the `onError` callback sets `err = true` and shows the character's first name in their accent color as a fallback. The scanline overlay `div` sits on top of the image to give it that manga/screen texture feel.

---

### 8. `DesktopBubble` — Floating character card (desktop only)

```jsx
function DesktopBubble({ char, pos, onClick }) { ... }
```

**What it does:**  
Renders one floating character panel on desktop. Each panel has:
- **Corner bracket accents** — 4 `div`s with partial borders that form manga-style corner ticks
- **Image box** — contains `CharImage` with a scanline overlay and a gradient overlay on hover
- **Name strip** — flips to the character's accent color on hover, shows the short quote
- **Click hint** — a small `— click —` label that appears below on hover
- **Float animation** — gently bobs up and down using the `charFloat` keyframe
- **Hover state** — scales up slightly and shows more info when the mouse enters

---

### 9. `MobileCard` — Character list card (mobile only)

```jsx
function MobileCard({ char, onClick }) { ... }
```

**What it does:**  
A horizontal card for the mobile character list. Contains a small avatar image, the character name, series, and quote. Has a colored left accent bar and highlights when pressed (touch feedback via `onTouchStart`/`onTouchEnd`). Clicking opens the popup.

---

### 10. `CharPopup` — Birthday message popup

```jsx
function CharPopup({ char, onClose, isMobile, userName, userAge }) { ... }
```

**What it does:**  
A full-screen overlay that slides in when a character is clicked. Contains:
- **Overlay** — dark semi-transparent background with diagonal hatch lines
- **Top bar** — filled with the character's accent color, shows the series name
- **Avatar + info** — character image, name, "wishes you a happy birthday", and italic quote
- **Message** — the personalized birthday message generated from the template
- **Bottom accent line** — a thin gradient line in the character's color

On **desktop**: slides up from center with a scale animation.  
On **mobile**: slides up from the bottom as a sheet with rounded top corners and a drag handle.

The `visible` state is set with `requestAnimationFrame` after mount to trigger the CSS transition — this is a trick to ensure the element is in the DOM before the animation starts.

---

### 11. `DateInputView` — Name & birthday form

```jsx
function DateInputView({ onSubmit }) { ... }
```

**What it does:**  
The landing screen. Shows the "Anime Birthday" title and a form with:
- A text input for the user's name
- Three number inputs for day, month, year
- A "Reveal My Wishes" button that activates only when all fields are filled and valid

On submit it calls `onSubmit({ name, day, month, year })` which stores the data in `App`'s state and switches to `BirthdayView`.

The `anim(delay)` helper function returns the right animation style object based on whether the component has loaded yet — avoids code repetition.

---

### 12. `BirthdayView` — Main birthday page

```jsx
function BirthdayView({ userData, onReset }) { ... }
```

**What it does:**  
The main page shown after the form is submitted. It:
- Calculates the user's exact age from their birthday
- Picks 4 random characters from `CHARACTERS` (via `shuffle()`)
- Shows floating bubbles on desktop, a card list on mobile
- Renders the "Happy Birthday + name" title and age digit blocks
- Provides a **← New Birthday** button to go back and a **↻ Shuffle Characters** button to re-randomize the 4 displayed characters

The age is displayed as individual digit blocks (so "25" renders as two separate `div`s, one for "2" and one for "5") each with animated corner ticks and a glow effect.

---

### 13. `App` — Root component

```jsx
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
```

**What it does:**  
The top-level shell. Holds `userData` — the object submitted from the form. When it's `null`, shows the input form. When it has a value, shows the birthday page. The `Environment` and `scanlines` overlay are always rendered regardless of which view is active.

---

## 🎨 `App.css` — Overview by section

| Section | What it covers |
|---|---|
| `@import` | Loads Google Fonts: Rajdhani (bold titles), Quicksand (body/UI), Satisfy (cursive name), Pacifico |
| Reset | `box-sizing`, zero margin/padding, hides number input spinners |
| `@keyframes twinkle` | Star opacity pulse — fades in and out slowly |
| `@keyframes rainFall` | Rain drop falls from top to bottom of viewport |
| `@keyframes lilyWay` | Lily sways left/right slightly |
| `@keyframes charFloat` | Character bubble floats up and down smoothly |
| `@keyframes titleFlicker` | Title text flickers like an old screen |
| `@keyframes fadeUp` | Elements fade in while sliding up — used on page load |
| `@keyframes slashIn` | Text reveals left-to-right using `clip-path` — used on "Birthday" word |
| `@keyframes ringGlow` | Age digit boxes pulse with a white box-shadow glow |
| `@keyframes cardSlideUp` | Mobile character cards slide up on reveal |
| `.title-main` | Main heading style — Rajdhani bold, uppercase, flicker animation |
| `.title-name` | Cursive name display — Satisfy font, soft purple glow |
| `.title-birthday-gradient` | Gradient text on "Birthday" word — fades from white to soft blue |
| `.app-root` | Full height dark background, relative + overflow hidden |
| `.scanlines` | Fixed full-screen scanline texture overlay (repeating gradient) |
| `.star` / `.rain-drop` / `.spider-lily` | Particle element base styles |
| `.char-image-wrap` / `.char-img` | Image container and the `<img>` tag styling |
| `.char-image-scanlines` | Scanline overlay sitting above the image (z-index 2) |
| `.desktop-bubble` / `.bubble-*` | All floating card styles — frame, corners, image box, name strip |
| `.mobile-card` / `.mobile-card-*` | Mobile list card styles — avatar, name, series, quote, arrow |
| `.popup-overlay` / `.popup-card` / `.popup-*` | Modal overlay and card styles, `.desktop` / `.mobile` modifiers |
| `.date-input-view` / `.date-input-field` | Landing form layout and input field styles |
| `.reveal-btn` | Submit button — active vs disabled states |
| `.birthday-view-center` | Birthday page center column layout |
| `.ghost-btn` | Small transparent border buttons |
| `.action-btn` | Modifier on top of `.ghost-btn` — makes New Birthday and Shuffle bigger and brighter |
| `.age-digit` / `.age-digit-corner` | Individual digit block with corner tick marks |
| `.mobile-char-list` | Container for the mobile character list |

---

## 💡 Quick Reference — Common Edits

**Change how many characters float on desktop:**
```js
// In BirthdayView:
const shuffle = () => setDisplayChars([...CHARACTERS].sort(() => Math.random() - 0.5).slice(0, 4));
// Change 4 to however many you want (must match DESKTOP_POS length)
```

**Change character positions:**
```js
const DESKTOP_POS = [
  { floatX: "3%",  floatY: "16%" }, // left  top
  { floatX: "3%",  floatY: "56%" }, // left  bottom
  { floatX: "80%", floatY: "16%" }, // right top
  { floatX: "80%", floatY: "56%" }, // right bottom
];
```

**Change a character's color:**  
Edit `accentColor` in `characters.json`. One hex value controls borders, name text, quote color, popup header, and bottom line.

**Add more rain / stars:**  
Change `length: 55` in the `RAIN` seed or `length: 90` in `STARS`.