# Zira Frontend

Production React app (Vite) for the Zira men's luxury cosmetics store. Talks to the
`zira-backend` Express + MongoDB API shared earlier — this is the "real deployment"
version of the `zira.jsx` artifact demo.

## Setup

1. Make sure `zira-backend` is running (see its README) — default `cl`.
2. `npm install`
3. Copy `.env.example` to `.env` and set `VITE_API_URL` if your API isn't on localhost.
4. `npm run dev` → open the printed local URL (default `http://localhost:5173`).

Demo logins (after running `npm run seed` on the backend):
- Admin — `Pragadheesh` / `AdminPraga`
- Customer — `karthikeyan0` / `customer123`

## Structure

```
src/
  api/client.js       — axios instance + all API calls, attaches JWT automatically
  context/AuthContext.jsx — session state, login/signup/logout
  routes/guards.jsx   — RequireAuth / RequireAdmin / RedirectIfLoggedIn route wrappers
  components/         — Logo, Field, Modal, StatusPill, TopNav, AdminShell, CrudTable
  pages/              — Login, Signup, Shop, Cart, MyOrders, Profile
  pages/admin/        — Dashboard, Categories, Products, Blogs, Users, Orders, MyOrdersAdmin
```

Unlike the Claude-artifact demo, this is a normal browser app, so the JWT is stored in
real `localStorage` (see `api/client.js`) — that's safe here since it isn't running
inside the sandboxed artifact environment.

## Building for production

```
npm run build
```
Outputs static files to `dist/` — deploy to Vercel, Netlify, or any static host. Set
`VITE_API_URL` to your deployed backend's URL as an environment variable on the host.
