# IMF Gadget API 🚀

A **secure** REST API built with **Node.js, Express, Prisma, PostgreSQL, and TypeScript** for managing **IMF gadgets**.

## 🌟 Features

- 🔑 JWT Authentication (Signup & Login)
- 🔐 Middleware-protected Routes
- 📦 Gadget Inventory Management (CRUD)
- 🔥 Self-Destruct API for Gadgets
- 🚀 Prisma ORM with PostgreSQL
- 📡 Deployed on Vercel
- 📑 Postman API Documentation

## ⚙️ Tech Stack

- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL, Prisma ORM
- **Auth**: JWT Authentication
- **Security**: Helmet, CORS, Compression

## 🛠 Setup Instructions

### 1️⃣ Clone Repo

```bash
git clone https://github.com/amitdhiman5086/imf-gadget-api.git
cd imf-gadget-api
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Environment Setup

1. Create a `.env` file in the root directory
2. Add the following environment variables:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/imf_gadgets"
JWT_SECRET="your-super-secret-key"
PORT=3000
```

### 4️⃣ Database Setup

```bash
# Run Prisma migrations
npx prisma migrate dev

# Seed the database (optional)
npm run seed
```

### 5️⃣ Start the Server

```bash
# Development mode
npm run dev

# Production mode
npm run build
npm start
```

The API will be available at `http://localhost:3000`
