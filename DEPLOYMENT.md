# Deploying Zira

Two paths: run everything locally with Docker in one command, or deploy to real hosting
(Atlas + Render + Vercel), which is also free at this scale.

## Option A — Local development

1. Install dependencies in both packages:

```bash
cd zira-backend && npm install
cd ../zira-frontend && npm install
```

2. Start the backend:

```bash
cd ../zira-backend && npm run dev
```

3. Start the frontend:

```bash
cd ../zira-frontend && npm run dev
```

Then open the URL printed by Vite (usually `http://localhost:5173`).

Seed the database once the backend is running:

```bash
cd zira-backend && npm run seed
```

Then log in with `admin` / `admin123` or `karthikeyan0` / `customer123`.

## Option B — Real hosting (production)

### 1. Database — MongoDB Atlas
1. Create a free cluster at mongodb.com/atlas (M0 tier).
2. Database Access → add a user with a password.
3. Network Access → allow access from anywhere (`0.0.0.0/0`) for simplicity, or your
   host's specific IP range.
4. Database → Connect → Drivers → copy the connection string. This is your `MONGO_URI`.

### 2. Backend — Render
1. Push `zira-backend` to a GitHub repo (it already has `render.yaml`).
2. In Render: New → Blueprint → select the repo.
3. Render reads `render.yaml` and creates the service. Fill in the two `sync: false`
   variables in the dashboard:
   - `MONGO_URI` — your Atlas connection string
   - `CLIENT_ORIGIN` — leave blank for now, you'll fill it in after step 3
4. Deploy. Once live, note the URL, e.g. `https://zira-api.onrender.com`.
5. Run the seed script once, from the Render shell tab (or locally against the Atlas
   URI): `npm run seed`.

### 3. Frontend — Vercel
1. Push `zira-frontend` to a GitHub repo (it already has `vercel.json`).
2. In Vercel: New Project → import the repo.
3. Set the environment variable `VITE_API_URL` to your Render API URL + `/api`,
   e.g. `https://zira-api.onrender.com/api`.
4. Deploy. Vercel gives you a URL, e.g. `https://zira.vercel.app`.

### 4. Close the loop
Go back to Render → your API service → Environment → set `CLIENT_ORIGIN` to your
Vercel URL (`https://zira.vercel.app`) so the API's CORS policy allows the deployed
frontend to call it. Redeploy the API for the change to take effect.

That's it — a live storefront and admin panel on a real domain, backed by MongoDB Atlas.

## Notes
- Render's free tier spins down after inactivity, so the first request after idle time
  can take ~30 seconds. Fine for a demo/portfolio project; upgrade the plan for
  production traffic.
- Netlify (`netlify.toml`) works as a drop-in alternative to Vercel if you prefer it.
- The Dockerfiles in each folder are also usable independently on Fly.io, Railway, or
  any other container host, if you'd rather not use Render/Vercel specifically.
