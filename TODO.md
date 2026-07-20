# TODO

## Scope: Pexels images + Google/Apple OAuth Login

### Step 1 — Product images (Pexels)
- [ ] Update `zira-frontend/src/pages/Shop.jsx` to render `product.imageUrl` on product cards + modal.

### Step 2 — Admin product image editing (optional but recommended)
- [ ] Update `zira-frontend/src/pages/admin/Products.jsx` to add fields for `imageUrl` (and possibly `icon`).
- [ ] Ensure `save()` sends `imageUrl` to backend.

### Step 3 — Backend: OAuth-ready user model
- [ ] Update `zira-backend/models/User.js` to add `googleId` and `appleId` fields.
- [ ] Adjust uniqueness rules/logic for username/email for OAuth-created users.

### Step 4 — Backend: OAuth endpoints
- [ ] Update `zira-backend/routes/auth.js` to add:
  - [ ] `GET /api/auth/google` (start OAuth)
  - [ ] `GET /api/auth/google/callback` (handle callback)
  - [ ] `GET /api/auth/apple` (start OAuth)
  - [ ] `GET /api/auth/apple/callback` (handle callback)
- [ ] On first login, auto-create the user and then issue existing JWT.

### Step 5 — Frontend: OAuth login buttons + callback handling
- [ ] Update `zira-frontend/src/pages/Login.jsx` to add Google/Apple buttons.
- [ ] Add frontend handling to store JWT returned from backend after callback.

### Step 6 — Config & docs
- [ ] Update README/DEPLOYMENT docs with required env vars for Google/Apple.
- [ ] Add missing dependencies to `zira-backend/package.json` (OAuth client libs).

### Step 7 — Testing
- [ ] Run backend and seed; verify products show images.
- [ ] Verify Google and Apple login flows create/login user and redirect properly.

