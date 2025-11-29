# 🚀 Vercel Deployment Guide

## Overview

This guide covers deploying both your **Next.js frontend** and **Express backend** to Vercel for production.

---

## 📋 Prerequisites

- ✅ GitHub repository created and pushed
- ✅ Vercel account (free at vercel.com)
- ✅ `vercel.json` files created for both Client and Server
- ✅ Environment variables ready

---

## 🏗️ Part 1: Deploy Backend to Vercel

### Step 1: Prepare Backend for Vercel

The backend requires modifications to run on Vercel's serverless platform:

#### 1a. Update `Server/src/index.ts`

Convert your Express app to serverless format:

```typescript
import express, { Request, Response } from 'express';
import cors from 'cors';
import dbConnect from './config/database.js';
import authRoutes from './routes/auth.js';
import restaurantRoutes from './routes/restaurants.js';
import menuRoutes from './routes/menu.js';
import orderRoutes from './routes/orders.js';
import userRoutes from './routes/users.js';
import { authMiddleware } from './middleware/auth.js';

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
dbConnect();

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

// Error handling
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
```

#### 1b. Create `Server/vercel.json`

Already created with serverless configuration.

#### 1c. Update `Server/package.json`

Ensure your build script compiles TypeScript:

```json
{
  "scripts": {
    "build": "tsc",
    "dev": "ts-node src/index.ts",
    "start": "node dist/index.js"
  }
}
```

### Step 2: Deploy Backend to Vercel

#### 2a. Push changes to GitHub

```powershell
git add Server/
git commit -m "Add Vercel configuration for backend"
git push
```

#### 2b. Import in Vercel

1. Go to **vercel.com** → Dashboard
2. Click **"Add New..."** → **"Project"**
3. Select your GitHub repository
4. **Root Directory**: Select `Server`
5. Click **"Deploy"**

#### 2c. Set Environment Variables

In Vercel Dashboard:

1. Go to your backend project
2. **Settings** → **Environment Variables**
3. Add:
   - `MONGODB_URI` = Your MongoDB connection string (encrypted)
   - `JWT_SECRET` = Your JWT secret key (encrypted)
   - `CORS_ORIGIN` = Your frontend URL (will update after frontend deploy)

```
MONGODB_URI: mongodb+srv://username:password@cluster.mongodb.net/food-delivery
JWT_SECRET: your-super-secret-jwt-key-here
CORS_ORIGIN: (leave empty for now, update after frontend deployment)
NODE_ENV: production
```

#### 2d. Wait for Deployment

Vercel will:
1. ✅ Build your TypeScript code
2. ✅ Create optimized backend
3. ✅ Deploy to serverless functions

**Your backend URL will be:** `https://your-project-name.vercel.app/api`

---

## 🎨 Part 2: Deploy Frontend to Vercel

### Step 1: Update Client Configuration

#### 1a. Update `Client/lib/api.ts`

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// API Client will automatically use NEXT_PUBLIC_API_URL
export const authAPI = { /* ... */ };
```

#### 1b. Create `Client/.env.production`

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app/api
```

### Step 2: Deploy Frontend to Vercel

#### 2a. Push changes to GitHub

```powershell
git add Client/
git commit -m "Add Vercel configuration for frontend"
git push
```

#### 2b. Import in Vercel

1. Go to **vercel.com** → Dashboard
2. Click **"Add New..."** → **"Project"**
3. Select your GitHub repository
4. **Root Directory**: Select `Client`
5. Click **"Deploy"**

#### 2c. Set Environment Variables

In Vercel Dashboard:

1. Go to your frontend project
2. **Settings** → **Environment Variables**
3. Add:
   - `NEXT_PUBLIC_API_URL` = Your backend URL

```
NEXT_PUBLIC_API_URL: https://your-backend-project.vercel.app/api
```

#### 2d. Wait for Deployment

Vercel will:
1. ✅ Build your Next.js app
2. ✅ Optimize images and assets
3. ✅ Deploy to CDN globally

**Your frontend URL will be:** `https://your-project-name.vercel.app`

---

## 🔄 Part 3: Connect Frontend to Backend

After both are deployed:

### Step 1: Update Backend CORS

1. Go to **Backend Vercel Project** → **Settings** → **Environment Variables**
2. Update `CORS_ORIGIN`:
   ```
   CORS_ORIGIN=https://your-frontend-url.vercel.app
   ```
3. Click **"Save"** → Vercel auto-redeploys

### Step 2: Update Frontend API URL

1. Go to **Frontend Vercel Project** → **Settings** → **Environment Variables**
2. Verify `NEXT_PUBLIC_API_URL`:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app/api
   ```
3. If changed, click **"Save"** → Vercel auto-redeploys

### Step 3: Test Connection

Visit your frontend URL and test:
- ✅ Restaurant list loads
- ✅ Login works
- ✅ API calls succeed
- ✅ Cart functions properly

---

## 📁 Deployment Structure

```
Your GitHub Repository
├── Server/
│   ├── vercel.json ..................... ✅ Backend config
│   ├── package.json
│   ├── tsconfig.json
│   ├── src/
│   │   └── index.ts ................... ✅ Updated for serverless
│   └── dist/
│       └── index.js ................... ✅ Compiled output
│
├── Client/
│   ├── vercel.json ..................... ✅ Frontend config
│   ├── package.json
│   ├── next.config.mjs
│   ├── .env.production ................. ✅ Production env
│   ├── app/
│   ├── components/
│   └── lib/
│       └── api.ts ..................... ✅ Uses API_URL env
│
└── Root
    ├── .gitignore ...................... ✅ Excludes secrets
    └── .env.example .................... ✅ Templates only
```

---

## 🔐 Security Checklist

- ✅ `.env` files NOT in GitHub (excluded by .gitignore)
- ✅ Secrets stored in Vercel Dashboard (encrypted)
- ✅ CORS properly configured for frontend domain
- ✅ JWT_SECRET protected in Vercel (encrypted variable)
- ✅ MONGODB_URI protected in Vercel (encrypted variable)
- ✅ Environment variables never logged or exposed

---

## 🚨 Common Issues & Solutions

### Issue 1: Backend API 404 Errors

**Problem:** Frontend can't reach backend
**Solution:**
1. Verify `NEXT_PUBLIC_API_URL` in Frontend environment
2. Verify `CORS_ORIGIN` in Backend environment matches frontend URL
3. Both must be full URLs: `https://...vercel.app`

### Issue 2: CORS Errors

**Problem:** Browser blocks API calls
**Solution:**
1. Check Backend `vercel.json` has CORS headers
2. Update `CORS_ORIGIN` environment variable
3. Restart frontend deployment (Vercel auto-redeploys when env changes)

### Issue 3: Login Not Working

**Problem:** JWT tokens not being accepted
**Solution:**
1. Verify `JWT_SECRET` is same in Backend
2. Check tokens are stored in localStorage
3. Verify `Authorization` header is sent with token

### Issue 4: Slow First Request

**Problem:** Cold start delay (5-10 seconds)
**Solution:**
- This is normal for Vercel's serverless functions
- Second and subsequent requests are faster
- Upgrade to Pro for guaranteed resources

### Issue 5: Database Connection Fails

**Problem:** Can't connect to MongoDB from Vercel
**Solution:**
1. Whitelist Vercel IPs in MongoDB Atlas: `0.0.0.0/0` (allow all)
2. Verify `MONGODB_URI` is correct
3. Connection string must be complete: `mongodb+srv://user:password@...`

---

## 📊 Vercel Performance Tips

### For Backend (Express)

```typescript
// 1. Connection pooling
// MongoDB connection is reused across invocations

// 2. Keep functions warm
// Add periodic health checks

// 3. Optimize queries
// Use indexes on frequently queried fields
```

### For Frontend (Next.js)

```typescript
// 1. Image optimization - Automatic with Next.js
// 2. Code splitting - Automatic with Next.js
// 3. API routes - Use for serverless functions
// 4. Static generation - Use for static pages
```

---

## 🎯 Deployment Checklist

### Before Deployment
- ✅ All tests passing locally
- ✅ `.env` files properly excluded from git
- ✅ `vercel.json` files created for both projects
- ✅ MongoDB Atlas account with connection string
- ✅ JWT secret key generated
- ✅ GitHub repository updated and pushed

### After Backend Deployment
- ✅ Backend URL available: `https://...vercel.app/api`
- ✅ Environment variables set in Vercel
- ✅ Health check endpoint responds
- ✅ Test database connection with `/api/health`

### After Frontend Deployment
- ✅ Frontend URL available: `https://...vercel.app`
- ✅ Environment variables updated with backend URL
- ✅ Page loads without errors
- ✅ API calls successful
- ✅ Login/Register works

### Final Verification
- ✅ Restaurant list loads from backend
- ✅ Login creates JWT token
- ✅ Cart stores items
- ✅ Orders can be placed
- ✅ Admin panel accessible

---

## 📚 Resources

- **Vercel Docs:** https://vercel.com/docs
- **Next.js on Vercel:** https://vercel.com/guides/nextjs
- **Express on Vercel:** https://vercel.com/guides/nodejs
- **MongoDB Atlas:** https://www.mongodb.com/cloud/atlas
- **Environment Variables:** https://vercel.com/docs/concepts/projects/environment-variables

---

## 🎉 Success Criteria

Your deployment is successful when:

1. ✅ Frontend URL is publicly accessible
2. ✅ Backend API responds to requests
3. ✅ Frontend communicates with backend
4. ✅ User can login and register
5. ✅ Restaurants and menus display
6. ✅ Orders can be created
7. ✅ No errors in browser console
8. ✅ No errors in Vercel logs

---

## 🚀 Next Steps

1. Deploy backend first (slower setup)
2. Get backend URL from Vercel
3. Deploy frontend with backend URL
4. Test all features
5. Share live URL with friends!

---

**Document:** Vercel Deployment Guide
**Created:** November 29, 2025
**Status:** ✅ Ready to Deploy

