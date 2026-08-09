# 🛍️ Prisma & PostgreSQL — Frontend

A modern, responsive e-commerce storefront built with **React 18**, **Vite**, **Tailwind CSS**, and **Axios**. Consumes the SCIC/EJP-13 backend REST API to deliver a full shopping experience — browse, search, wishlist, checkout, and admin management.

> 🔗 **Live App:** [https://postgre-sql-test-client.vercel.app](https://postgre-sql-test-client.vercel.app)
> 🛠️ **Live API:** [https://postgresql-test-server.onrender.com](https://postgresql-test-server.onrender.com)
> 📦 **Repo Backend:** [github.com/fahim3101/PostgreSQL-Test-server](https://github.com/fahim3101/PostgreSQL-Test-server)

---

## ✨ Features

### 👤 Customer
- 🔐 **Register & Login** with JWT auth (stored in localStorage)
- 🛍️ **Browse products** with search + category filter + pagination
- 📄 **Product details** with reviews, ratings, and stock info
- ❤️ **Wishlist** — save products for later (protected route)
- 🛒 **Place orders** — direct checkout with stock validation
- ⭐ **Submit reviews** — 1-5 stars + comment, one per product per user
- 📦 **My Orders** — track order history & status (protected route)

### 🛡️ Admin
- 🏷️ **Manage Categories** — full CRUD interface (protected, ADMIN only)
- 📦 **Manage Products** — full CRUD interface with category linking (protected, ADMIN only)
- 🔀 **Role-based routing** — admins see extra navigation & routes

### 🎨 UX
- ⚡ **Lightning fast** with Vite HMR
- 📱 **Fully responsive** with Tailwind CSS
- 🛣️ **Client-side routing** with React Router v6
- 🔄 **Centralized API client** (Axios with auth interceptor)
- 🧠 **AuthContext** for global user state
- 🛡️ **ProtectedRoute** & **AdminRoute** guards

---

## 🧰 Tech Stack

| Layer          | Technology              |
| -------------- | ----------------------- |
| Framework      | React 18                |
| Build Tool     | Vite 5                  |
| Styling        | Tailwind CSS 3          |
| Routing        | React Router v6         |
| HTTP Client    | Axios                   |
| State          | React Context API       |
| Deployment     | Vercel                  |

---

## 📁 Project Structure

```
client/
├── public/                       # Static assets
├── src/
│   ├── api/
│   │   └── axios.js              # Axios instance + request/response interceptors
│   ├── components/
│   │   ├── Navbar.jsx            # Top navigation with auth-aware menu
│   │   ├── ProductCard.jsx       # Reusable product card
│   │   ├── ProtectedRoute.jsx    # Auth-required route guard
│   │   └── AdminRoute.jsx        # ADMIN-role-only route guard
│   ├── context/
│   │   └── AuthContext.jsx       # Global auth state (user, token, login, logout)
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Products.jsx          # Listing + filters + pagination
│   │   ├── ProductDetails.jsx    # Buy now + wishlist + reviews
│   │   ├── Orders.jsx            # My orders
│   │   ├── Wishlist.jsx          # My wishlist
│   │   └── admin/
│   │       ├── AdminCategories.jsx
│   │       └── AdminProducts.jsx
│   ├── App.jsx                   # Router + layout
│   ├── main.jsx                  # Entry — renders <App />
│   └── index.css                 # Tailwind directives
├── .env.example
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

---

## 🚀 Quick Start — Local Development

### 1. Install dependencies
```bash
cd client
npm install
```

### 2. Configure environment variables
```bash
cp .env.example .env
```
Edit `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```
> When you deploy the backend, point this to your live API URL instead.

### 3. Start the dev server
```bash
npm run dev
```
Opens at **http://localhost:5173**.

Make sure the [backend server](https://github.com/fahim3101/PostgreSQL-Test-server) is running locally (or you can use the live API).

---

## ⚙️ Environment Variables

| Variable        | Example                                          | Description                          |
| --------------- | ------------------------------------------------ | ------------------------------------ |
| `VITE_API_URL`  | `http://localhost:5000/api`                      | Backend API base URL                 |
|                 | `https://postgresql-test-server.onrender.com/api` | (for deployed / production usage)    |

Vite only exposes variables prefixed with `VITE_` to the client bundle.

---

## 🧭 Pages & Routes

| Route                   | Page              | Access        |
| ----------------------- | ----------------- | ------------- |
| `/`                     | Home              | Public        |
| `/login`                | Login             | Public        |
| `/register`             | Register          | Public        |
| `/products`             | Product listing   | Public        |
| `/products/:id`         | Product details   | Public        |
| `/orders`               | My Orders         | User / Admin  |
| `/wishlist`             | My Wishlist       | User / Admin  |
| `/admin/categories`     | Manage Categories | Admin only    |
| `/admin/products`       | Manage Products   | Admin only    |

Guards: `ProtectedRoute` (login required) · `AdminRoute` (ADMIN role required).

---

## 🔌 API Integration

All HTTP calls go through a single configured Axios instance at `src/api/axios.js`. It automatically:

- Reads `VITE_API_URL` from `.env`
- Attaches `Authorization: Bearer <token>` from localStorage on every request
- Centralizes error handling

Every API method returns `{ success, message, data }` matching the backend contract — see the [Backend API Docs](https://github.com/fahim3101/PostgreSQL-Test-server#-api-documentation) for the full schema.

---

## 🧪 Scripts

| Command          | Purpose                                  |
| ---------------- | ---------------------------------------- |
| `npm run dev`    | Start Vite dev server with HMR           |
| `npm run build`  | Production build → `dist/`               |
| `npm run preview`| Preview the production build locally     |

---

## ☁️ Deployment (Vercel)

This frontend is deployed on **Vercel** (free tier, ideal for Vite/React).

1. Push this `client/` folder to a GitHub repo.
2. On [vercel.com](https://vercel.com) → **New Project** → import the repo.
3. Framework preset: **Vite** (auto-detected).
4. Build command: `npm run build`
5. Output directory: `dist`
6. Add environment variable:
   ```
   VITE_API_URL = https://postgresql-test-server.onrender.com/api
   ```
7. **Deploy** → Vercel gives you a live URL like `https://your-app.vercel.app`.

---

## 🧪 Demo Credentials

The seeded admin from the backend:

| Field    | Value                |
| -------- | -------------------- |
| Email    | `admin@scic.com`     |
| Password | `Admin123!`          |

Use these to access `/admin/categories` and `/admin/products`. You can also register a new normal user to test the customer flow.

> ⚠️ Change this password before any production use.

---

## 🔗 Related

- 🛠️ **Backend repo** → [github.com/fahim3101/PostgreSQL-Test-server](https://github.com/fahim3101/PostgreSQL-Test-server)
- 🔌 **Live API** → [postgresql-test-server.onrender.com](https://postgresql-test-server.onrender.com)

---

## 📝 License

MIT — free for personal and commercial use.

---

## 👤 Author

**fahim3101** · [GitHub](https://github.com/fahim3101)

> ⭐ If this project helped you, consider giving the repo a star!