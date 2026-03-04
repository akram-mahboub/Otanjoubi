# 🎌 Anime Birthday

An interactive anime-themed birthday web app. Enter a name and birthday — get personalized wishes from your favorite anime characters.

![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react) ![Vite](https://img.shields.io/badge/Vite-5-646cff?style=flat-square&logo=vite) ![CSS](https://img.shields.io/badge/CSS-custom-1572b6?style=flat-square)

---

## ✨ Features

- Name & birthday input screen — calculates exact age automatically
- Personalized birthday messages from 14 anime characters
- Floating character panels on desktop, card list on mobile
- Click any character to open their message popup
- Shuffle button to randomize which 4 characters appear
- Dark anime aesthetic — spider lilies, falling rain, twinkling stars, scanlines
- Fully responsive (desktop + mobile)

---

## 🚀 Getting Started

```bash
git clone https://github.com/your-username/anime-birthday.git
cd anime-birthday
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 🖼️ Character Images

Place character images in `public/images/`. The filename must match the character's `id` in `characters.json`:

```
public/
  images/
    oikawa.jpg
    levi.jpg
    eren.jpg
    ...
```

If an image is missing the app falls back to the character's first name in their accent color.

---

## ✏️ Adding or Editing Characters

All character data lives in `src/characters.json`. No changes to source code needed.

```json
{
  "id": "levi",
  "name": "Levi Ackerman",
  "series": "Attack on Titan",
  "src": "/images/levi.jpg",
  "accentColor": "#c8d8e0",
  "quote": "Tch. Don't waste this year.",
  "messageTemplate": "Tch. Happy birthday, {name}. You've made it {age} years. Don't waste this one. ⚔️"
}
```

Use `{name}`, `{NAME}` (uppercase), and `{age}` as dynamic placeholders in `messageTemplate`.

---

## 📁 Project Structure

```
src/
  App.jsx           ← components and logic
  App.css           ← all styles and animations
  characters.json   ← character data
public/
  images/           ← character photos
```

---

## 🛠️ Built With

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- Google Fonts — Rajdhani, Satisfy, Quicksand
- Pure CSS animations — no external animation librariesgit