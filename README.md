# 🛒 Bazaar Dreams – Full-Stack E-commerce Platform

**Bazaar Dreams** is a full-stack e-commerce application designed to provide a seamless shopping experience. It combines a modern React frontend with a backend API, offering product browsing, user authentication, and order management capabilities.

---

## 🌟 Project Overview

* 🛍️ User-friendly storefront built with **React** and **shadcn/ui**
* ⚡ Powered by **Vite** for fast development and hot reload
* 🎨 Styled with **Tailwind CSS** for a sleek and responsive design
* 🔗 Backend API with Node.js/Express handling routes, models, and middleware
* 🔐 Supports user authentication, product management, and secure checkout flows
* 💻 Designed to be extendable for integration with payment gateways and inventory systems

---

## 🧰 Tech Stack

| Layer     | Technologies                                     |
| --------- | ------------------------------------------------ |
| Frontend  | React, TypeScript, Vite, Tailwind CSS, shadcn/ui |
| Backend   | Node.js, Express, MongoDB (or your DB of choice) |
| Dev Tools | Bun, ESLint, PostCSS                             |

---

## 🚀 Getting Started

### Clone and Run Locally

1. **Clone the repo**

```bash
git clone https://github.com/rxymitchy/bazaar-dreams.git
cd bazaar-dreams
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up your environment variables**

Create a `.env` file in the root directory (refer to `.env.example` if provided) for backend configuration.

4. **Start the development server**

```bash
npm run dev
```

---

## 🗂️ Project Structure

```
bazaar-dreams/
├── backend/               # Backend API code (routes, models, middleware)
├── frontend/              # React frontend app (components, pages)
├── public/                # Static assets
├── .env                   # Environment variables
├── package.json
├── vite.config.js         # Frontend build config
├── tailwind.config.js     # Styling config
└── README.md
```

---

## 🔧 Development Tips

* Frontend hot reload available via Vite on `http://localhost:5173`
* Backend server restarts automatically on changes
* Use Postman or similar tools to test API endpoints during backend development

---

## 📦 Deployment

* Use **Lovable.dev** for quick cloud deployment and live editing
* For custom domains and full production setups, use **Netlify**, **Vercel**, or your preferred platform

---

## 👨‍💻 Author

Built and maintained by [@rxymitchy](https://github.com/rxymitchy)

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).

---
