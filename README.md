# 🧩 Mini To-Do (React + Vite + TypeScript)

Un piccolo progetto didattico per rientrare nel flusso di sviluppo **React moderno**, con:
- Vite + TypeScript
- gestione stato locale e remoto (MockAPI)
- test con Vitest + React Testing Library
- tema light/dark (Context)
- routing (Home / About / 404)
- CI/CD completa (GitHub Actions + Vercel)

---

## 🚀 Stack Tecnologico

| Area | Tecnologia |
|------|-------------|
| Build | [Vite](https://vitejs.dev) + TypeScript |
| UI | React 18 + JSX + CSS custom |
| Routing | react-router-dom |
| State / Persistenza | useState + fetch + MockAPI.io |
| Test | Vitest + @testing-library/react |
| Deploy | Vercel (Preview + Production) |
| CI | GitHub Actions (lint, typecheck, test, build, deploy hooks) |

---

## 📂 Struttura progetto

```
mini-todo/
├─ src/
│  ├─ components/          # AddTodoForm, TodoItem
│  ├─ context/             # ThemeProvider, ThemeContext
│  ├─ hooks/               # useLocalStorage (per versioni offline)
│  ├─ pages/               # Home, About
│  ├─ services/            # API client (MockAPI)
│  ├─ types.ts             # Tipi TypeScript
│  ├─ App.tsx              # Layout principale
│  ├─ main.tsx             # Entrypoint Vite
│  └─ index.css            # Stili globali
├─ public/
├─ db.json                 # API mock locale (json-server)
├─ vercel.json             # Rewrite per routing SPA
└─ .github/workflows/ci.yml # CI/CD pipeline (Actions)
```

---

## ⚙️ Setup locale

### 1️⃣ Requisiti
- Node.js ≥ 18
- npm o pnpm

### 2️⃣ Installazione
```bash
npm install
```

### 3️⃣ Avvio locale con MockAPI
Crea un file `.env.local`:
```
VITE_API_URL=https://<tuo-progetto>.mockapi.io
```

Esegui:
```bash
npm run dev
```
App → http://localhost:5173  
API → MockAPI.io

> Puoi anche usare `npm run api` per json-server locale (usa `db.json`).

---

## 🧪 Test

I test usano **Vitest** + **React Testing Library**.

Esegui tutti i test:
```bash
npm run test
```

> Il test principale (`App.test.tsx`) verifica il flusso: caricamento → aggiunta → completamento task.

---

## ☁️ Deploy (Vercel + GitHub Actions)

### Pipeline
1. **Push / PR** → GitHub Actions
   - Lint, Typecheck, Test, Build
2. **Se CI ok** → chiama i **Deploy Hook** di Vercel
   - PR → Preview URL
   - `main` → Production URL

### Env in Vercel
- `VITE_API_URL` → endpoint MockAPI
- (opzionale) variabili diverse per Preview e Production

### Rewrite SPA
`vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

---

## 🌓 Tema e Context

Il tema (light/dark) è gestito tramite un `ThemeProvider` React con `useContext`.  
Il valore viene applicato come attributo `data-theme` su `<html>` e i colori CSS cambiano dinamicamente.

---

## 🧱 API

Attualmente basata su **MockAPI.io**.

Esempio endpoint:
```
GET    /todos
POST   /todos
PUT    /todos/:id
DELETE /todos/:id
```

Esempio record:
```json
{
  "id": "1",
  "text": "Buy milk",
  "done": false,
  "createdAt": 1730546400000,
  "priority": "medium"
}
```

---

## 📜 License

MIT — libero utilizzo e modifica per scopi didattici o personali.

---

## 👤 Autore

**Alessandro Bonatti**  
Full Stack Web Developer  
[alessandrobonatti.dev](https://alessandrobonatti.dev)
