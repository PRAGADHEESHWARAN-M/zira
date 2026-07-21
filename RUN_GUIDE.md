# ZIRA Project — Complete Run Guide

## 🚀 Architecture Overview

```
[User Browser] 
        │
        ▼
🌐 Netlify (Frontend)                ☁️ Render (Backend API)
https://zira-luxury-men-grooming     https://zira-0fhn.onrender.com
       .netlify.app                         │
        │                                    │
        │  (Axios API calls)                 ▼
        └──────────────────────────► /api/* ──► 🗄️ MongoDB Atlas
```

---

## 1️⃣ Local Development Setup

### Prerequisites
- **Node.js** (v18+)
- **MongoDB** account (free at [mongodb.com/atlas](https://mongodb.com/atlas))
- **Git** installed

### Step 1: Clone & Install
```bash
# Clone the repo
git clone https://github.com/PRAGADHEESHWARAN-M/zira.git
cd zira-project

# Install backend dependencies
cd zira-backend
npm install

# Install frontend dependencies
cd ../zira-frontend
npm install
```

### Step 2: Configure Backend Environment
Create `zira-backend/.env`:
```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster.xxxxx.mongodb.net/zira?retryWrites=true&w=majority
JWT_SECRET=any_random_secret_string_here
CLIENT_ORIGIN=http://localhost:5173
PORT=5000
# Optional (for Google OAuth):
# GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
# GOOGLE_CLIENT_SECRET=xxx
# GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

### Step 3: Seed the Database
```bash
cd zira-backend
npm run seed
```
✅ This creates:
| Role | Username | Password |
|------|----------|----------|
| Admin | `admin` | `admin123` |
| Customer | `karthikeyan0` | `customer123` |

### Step 4: Start Backend
```bash
cd zira-backend
npm run dev
```
Backend runs at **http://localhost:5000**  
Health check: http://localhost:5000/api/health

### Step 5: Start Frontend
Open a **new terminal**:
```bash
cd zira-frontend
npm run dev
```
Frontend runs at **http://localhost:5173**

### Step 6: Login
- Open http://localhost:5173/login
- Use `admin` / `admin123` (admin dashboard)
- Use `karthikeyan0` / `customer123` (shop)

---

## 2️⃣ Deployed Version (Netlify + Render)

Your URLs:
- **Frontend:** https://zira-luxury-men-grooming.netlify.app
- **Backend API:** https://zira-0fhn.onrender.com

### How Frontend ↔ Backend Connect

The **frontend** sends all API requests to the **backend** using Axios.

**File:** `zira-frontend/src/api/client.js`
```js
const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://zira-0fhn.onrender.com/api",
});
```

The **backend** accepts requests only from allowed origins (CORS).

**File:** `zira-backend/server.js`
```js
app.use(cors({ origin: (process.env.CLIENT_ORIGIN || "*").split(",") }));
```

### Critical Environment Variables

| Variable | Where to Set | Value | Purpose |
|----------|-------------|-------|---------|
| `VITE_API_URL` | **Netlify** → Site settings → Environment variables | `https://zira-0fhn.onrender.com/api` | Tells frontend where to send API calls |
| `CLIENT_ORIGIN` | **Render** → Dashboard → Environment | `https://zira-luxury-men-grooming.netlify.app` | Tells backend which domains are allowed (CORS) |
| `MONGO_URI` | **Render** → Dashboard → Environment | Your Atlas connection string | Database connection |
| `JWT_SECRET` | **Render** → Dashboard → Environment | Auto-generated (or set manually) | Token signing |

### How to Set Them

#### On Netlify:
1. Go to https://app.netlify.com/sites/zira-luxury-men-grooming
2. **Site configuration** → **Environment variables**
3. Add: `VITE_API_URL = https://zira-0fhn.onrender.com/api`
4. **Deploy** → **Trigger deploy** → **Deploy site** (re-builds with the variable)

#### On Render:
1. Go to https://dashboard.render.com → your API service (`zira-api`)
2. **Environment** → **Environment Variables**
3. Set: `CLIENT_ORIGIN = https://zira-luxury-men-grooming.netlify.app`
4. **Manual Deploy** → **Deploy latest commit**

---

## 3️⃣ Login Flow Explained

```
1. User enters username + password on https://zira-luxury-men-grooming.netlify.app/login
2. Frontend calls POST https://zira-0fhn.onrender.com/api/auth/login
3. Backend checks MongoDB for the user
4. If credentials match → Backend returns a JWT token
5. Frontend stores token in localStorage and redirects to /shop or /admin
```

### Why Login Might Fail

| Symptom | Cause | Fix |
|---------|-------|-----|
| ❌ "Invalid username or password" | Wrong credentials | Use `admin` / `admin123` |
| ❌ CORS error in browser console | `CLIENT_ORIGIN` not set in Render | Set it to `https://zira-luxury-men-grooming.netlify.app` and redeploy |
| ❌ "Network Error" | Variable not baked into frontend build | Set `VITE_API_URL` in Netlify and trigger a new deploy |
| ❌ "Something went wrong" | Backend error (check Render logs) | Run seed endpoint: `GET https://zira-0fhn.onrender.com/api/seed` |
| ❌ 401 after login | Token expired or missing | Clear localStorage → re-login |

**✅ After fixing, verify:**
```bash
curl -X POST https://zira-0fhn.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```
Should return a `token` and `user` object.

---

## 4️⃣ Google OAuth Setup (Optional)

### Backend (already coded)
- File: `zira-backend/config/passport.js` ✓
- Routes: `/api/auth/google` and `/api/auth/google/callback` ✓
- Requires: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_CALLBACK_URL`

### To enable:
1. Go to https://console.cloud.google.com → **APIs & Services** → **Credentials**
2. Create an **OAuth 2.0 Client ID** (Web application)
3. Add to **Authorized redirect URIs**:
   - `https://zira-0fhn.onrender.com/api/auth/google/callback`
4. Set the generated `Client ID` and `Client Secret` in Render:
   - `GOOGLE_CLIENT_ID = your_id.apps.googleusercontent.com`
   - `GOOGLE_CLIENT_SECRET = your_secret`
   - `GOOGLE_CALLBACK_URL = https://zira-0fhn.onrender.com/api/auth/google/callback`

### Frontend flow (already coded):
1. User clicks "Continue with Google" → redirected to backend `/api/auth/google`
2. Backend handles OAuth with Google
3. After success → redirects back to frontend at `/auth/callback?token=xxx`
4. `AuthCallback.jsx` reads token from URL and logs user in

---

## 5️⃣ Apple Sign-In (Placeholder)

**Current status:** The Apple button shows a JavaScript alert ("Apple Sign-In coming soon.")

### To implement:
1. Get an **Apple Developer** account ($99/year)
2. Create a **Services ID** with Sign In with Apple
3. Add `passport-apple` npm package to backend:
   ```bash
   cd zira-backend && npm install passport-apple
   ```
4. Create a new Apple strategy similar to Google's in `config/apple-passport.js`
5. Add route `/api/auth/apple` and `/api/auth/apple/callback`
6. Update `SocialAuth.jsx` and `AuthContext.jsx` to handle Apple callback

---

## 6️⃣ Quick Troubleshooting

```bash
# 1. Check if backend is alive
curl https://zira-0fhn.onrender.com/api/health

# 2. Test login directly via API
curl -X POST "https://zira-0fhn.onrender.com/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# 3. Seed database (if products/users missing)
curl https://zira-0fhn.onrender.com/api/seed

# 4. Check if frontend is serving correctly
curl -s https://zira-luxury-men-grooming.netlify.app/login | head -20
```

---

## 7️⃣ Commit & Deploy Updates

```bash
cd zira-project
git add -A
git commit -m "describe your changes"
git push origin main
```

- **Netlify** auto-deploys when it detects changes on your GitHub repo
- **Render** auto-deploys from `main` branch (or you can click **Manual Deploy**)

---

## Summary Checklist

- [ ] Backend running on Render ✅ (`https://zira-0fhn.onrender.com`)
- [ ] Frontend deployed on Netlify ✅ (`https://zira-luxury-men-grooming.netlify.app`)
- [ ] `VITE_API_URL` set in Netlify env variables ✅
- [ ] `CLIENT_ORIGIN` set in Render env variables ✅
- [ ] Database seeded (users + products + categories + blogs) ✅
- [ ] Login works with `admin` / `admin123` ✅
- [ ] Google OAuth: Need Client ID + Secret from Google Cloud Console
- [ ] Apple Sign-In: Need Apple Developer account + `passport-apple` package
