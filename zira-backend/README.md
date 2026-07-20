# Zira API

Express + MongoDB backend for the Zira men's luxury cosmetics store. Pairs with the
`zira.jsx` React frontend shared earlier in this conversation.

## Setup

1. `npm install`
2. Copy `.env.example` to `.env` and fill in:
   - `MONGO_URI` — from MongoDB Atlas (free tier is enough): Database → Connect → Drivers
   - `JWT_SECRET` — any long random string
3. `npm run seed` — creates the admin account, five Tamil Nadu–named demo customers,
   categories, products and blog posts.
4. `npm run dev` (or `npm start`) — runs the API on `http://localhost:5000`.

Demo logins after seeding:
- Admin — `admin` / `admin123`
- Customer — `karthikeyan0` / `customer123`

## API overview

| Area       | Route                          | Access          |
|------------|---------------------------------|-----------------|
| Auth       | `POST /api/auth/signup`         | public          |
|            | `POST /api/auth/login`          | public          |
|            | `GET  /api/auth/me`             | logged in       |
| Users      | `GET  /api/users`               | admin           |
|            | `PUT  /api/users/me`            | logged in       |
|            | `DELETE /api/users/:id`         | admin           |
| Categories | `GET  /api/categories`          | public          |
|            | `POST/PUT/DELETE /api/categories` | admin         |
| Products   | `GET  /api/products`            | public          |
|            | `POST/PUT/DELETE /api/products` | admin           |
| Blogs      | `GET  /api/blogs`               | public          |
|            | `POST/PUT/DELETE /api/blogs`    | admin           |
| Orders     | `GET  /api/orders/mine`         | logged in       |
|            | `POST /api/orders`              | logged in (checkout) |
|            | `GET  /api/orders`               | admin (all orders) |
|            | `PUT  /api/orders/:id/status`   | admin           |

Auth uses a JWT bearer token: send `Authorization: Bearer <token>` on protected routes.
The token comes back from `/api/auth/login` and `/api/auth/signup`.

## Connecting the React frontend

In `zira.jsx`, replace `loadDB()` / `saveDB()` with calls to these endpoints — everything
else in the component tree already expects the same
`{ users, categories, products, blogs, orders }` shape, so no other file needs to change.
A minimal swap looks like:

```js
const API = "http://localhost:5000/api";

async function apiLogin(username, password) {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error((await res.json()).message);
  return res.json(); // { token, user }
}
```

Store the returned `token` in React state (not localStorage, since artifacts block it —
in a real deployed app outside Claude, localStorage is fine) and attach it to every
admin-only request as an `Authorization: Bearer <token>` header.

## Deploying

- API: Render, Railway, or Fly.io all have free/cheap tiers that work well with Express.
- Database: MongoDB Atlas free tier (M0) is enough for a project like this.
- Frontend: once you eject `zira.jsx` into a real Vite/CRA project, Vercel or Netlify
  are the simplest hosts, and localStorage/cookies work normally there.
