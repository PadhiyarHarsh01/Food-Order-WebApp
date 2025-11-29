# Quick Start Guide - Backend API

## 🚀 Start Server (30 seconds)

```bash
cd Server
npm run build
node dist/index.js
```

✅ Server running at: **http://localhost:5000**

## 📡 Quick API Test

### 1. Health Check
```bash
curl http://localhost:5000/api/health
```

### 2. Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"pass123","phone":"9999999999"}'
```

**Response:** `{ "token": "...", "user": {...} }`

### 3. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"pass123"}'
```

**Copy the token for next requests!**

### 4. Get All Restaurants
```bash
curl http://localhost:5000/api/restaurants
```

## 💻 Use in Frontend

### Install & Setup
1. In `Client` folder, create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

2. The `Client/lib/api.ts` file is ready to use!

### Example: Login in React
```typescript
import { authAPI } from '@/lib/api';

const handleLogin = async (email, password) => {
  const response = await authAPI.login({ email, password });
  localStorage.setItem('token', response.token);
};
```

### Example: Get Restaurants
```typescript
import { restaurantsAPI } from '@/lib/api';

const data = await restaurantsAPI.getAll();
// data is an array of restaurants
```

## 🔑 Key Files

| File | Purpose |
|------|---------|
| `Server/package.json` | Dependencies |
| `Server/src/index.ts` | Main server |
| `Server/.env` | Config |
| `Client/lib/api.ts` | API layer |

## 🔐 Authentication Header

After login, send token with every protected request:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

The `api.ts` handles this automatically!

## 📊 Database Models

- **Users** - Email, password, address, role
- **Restaurants** - Name, cuisines, delivery time, rating
- **MenuItems** - Name, price, category, restaurant
- **Orders** - Items, total, status, user, restaurant

## ⚡ Features Ready

✅ User auth (register/login)
✅ Restaurant CRUD
✅ Menu items management
✅ Order creation & tracking
✅ User profile management
✅ Role-based access
✅ JWT security
✅ MongoDB persistence

## 🛠️ Troubleshoot

**Server won't start?**
- Check MongoDB is running
- Try different port: edit `.env`, change PORT

**API won't connect?**
- Check `NEXT_PUBLIC_API_URL` in Client `.env.local`
- Verify backend is running

**Get 401 error?**
- Make sure token is in localStorage
- Re-login to get new token

## 📚 API Reference

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/restaurants
POST   /api/restaurants
GET    /api/menu
POST   /api/menu
POST   /api/orders
GET    /api/orders/user/my-orders
GET    /api/users/profile
PUT    /api/users/profile
```

## 🎯 Next: Connect Frontend

1. ✅ Backend setup done
2. Update frontend components
3. Use `Client/lib/api.ts` for API calls
4. Test login flow
5. Test restaurant listing
6. Test order creation

---

**Everything ready! Start building! 🚀**
