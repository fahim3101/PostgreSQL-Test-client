# SCIC/EJP-13 Frontend

React + Vite + Tailwind CSS frontend that consumes the SCIC/EJP-13 backend API.

## Features
- Register / Login (JWT stored in localStorage)
- Browse products with search + category filter
- Product details — buy now (creates an order), add to wishlist, submit a review
- My Orders, My Wishlist (protected — requires login)
- Admin: manage categories and products (protected — requires ADMIN role)

## Setup

```bash
npm install
cp .env.example .env
```

In `.env`, set `VITE_API_URL` to your backend URL:
```
VITE_API_URL=http://localhost:5000/api
```
(When you deploy the backend, change this to your live backend URL, e.g. `https://your-app.onrender.com/api`.)

Run it:
```bash
npm run dev
```
Opens at `http://localhost:5173`.

## Deploying
Push to GitHub, then deploy on **Vercel** or **Netlify**:
- Build command: `npm run build`
- Output directory: `dist`
- Add environment variable `VITE_API_URL` pointing to your deployed backend

## Notes
- Login as the seeded admin (`admin@scic.com` / `Admin123!`) to access `/admin/categories` and `/admin/products`.
- CORS on the backend currently allows all origins during development — restrict it to your deployed frontend URL before final submission.
