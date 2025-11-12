# MBank / Igicupuri — Frontend

MBank (also branded in places as Igicupuri) is a lightweight web platform for students to browse and share past exam copies and marks. This repository is the frontend built with Next.js (App Router), TypeScript and Tailwind CSS.

The frontend communicates with a backend API (default base URL configured in `app/utils/axiosInstance.ts`).

---

## ✨ Features

- 🧭 Browse and search past copies (landing page & browse)
- � Upload a copy (uploading page)
- 🔍 Browse categories and previews
- 🔐 Basic login/signup helpers (via API)
- � Responsive, accessible UI styled with Tailwind CSS

---

## 📁 Folder Structure

```

frontside/
├── app/
│   ├── layout.tsx         # Root layout & global fonts
│   ├── page.tsx           # App entry -> renders `app/home/pages.tsx`
│   ├── home/pages.tsx     # Landing page UI and CTAs
│   ├── browse/page.tsx    # Browse copies
│   ├── uploading/page.tsx # Upload form
│   ├── login/page.tsx     # Login page
│   ├── signup/page.tsx    # Signup page
│   └── components/
│       └── NavBar.tsx     # Top navigation component
├── app/utils/
│   ├── axiosInstance.ts   # Axios client (baseURL)
│   └── api.ts             # Helpers: signup, login, googleLogin
├── public/                # Static assets (icons, emojis, images)
├── globals.css
├── tailwind.config.ts
├── package.json
└── README.md

```

---

## 🚀 Quick Start (local)

1. Install dependencies

```bash
npm install
```

2. Run development server

```bash
npm run dev
```

Open http://localhost:3000

---

## ⚙️ Configuration / Env

Currently the Axios instance in `app/utils/axiosInstance.ts` is configured with a default base URL:

```ts
baseURL: "https://mbank-d.onrender.com",
```

To use a local backend or change the API host, create a `.env.local` and set a variable (then update the file to read from it):

```env
NEXT_PUBLIC_API_BASE=http://localhost:8000
```

Tip: I can wire this repo to read `NEXT_PUBLIC_API_BASE` from env and default to the current URL if you want.

---

## 🧠 API & Auth

- `app/utils/api.ts` exports `signup`, `login`, and `googleLogin` helpers.
- The Axios instance sets Content-Type to `application/json` and points to the Render deployment by default.
- Note: endpoint naming in `api.ts` appears inconsistent (`/students/signup` vs `/student/login` vs `/api/students/google-login`) — confirm the backend routes if you get 404s.
- `login` currently returns `response.data.token` though its declared return type is `Promise<LoginResponse>` (type mismatch). I can fix that typing and persist tokens to `localStorage` and attach them to Axios.

---

## 🧪 Development notes & conventions

- App Router conventions: pages live under `app/` and use React server/client components.
- Client components opt-in with `"use client"` (see `NavBar.tsx` and many pages).
- Styling via Tailwind; animations use Framer Motion.

---

## ❗ Potential improvements (I can implement)

1. Add environment variable support for Axios (read `NEXT_PUBLIC_API_BASE`).
2. Fix API helper types and implement token storage (AuthContext + localStorage) and Axios interceptor.
3. Add basic tests for API helpers and critical components.

---

## 👨‍💻 Author

**Mr-Ndi**