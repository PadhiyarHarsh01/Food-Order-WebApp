# Frontend-Backend Integration Guide

## ✅ Integration Complete

Your Food Delivery App has been successfully integrated! The frontend is now connected to the backend API.

---

## 🚀 Quick Start

### Step 1: Backend Server
The backend is already running on `http://localhost:5000`

To verify it's running, check that you see:
```
Server running on http://localhost:5000
MongoDB connected successfully
```

### Step 2: Frontend Server
Run the frontend development server:

```bash
cd Client
npm run dev
```

The frontend will be available at `http://localhost:3000`

---

## 📋 Configuration

### Frontend Environment Variables
**File:** `Client/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

This tells the frontend where to find the backend API.

---

## 🔌 API Integration Points

### 1. Authentication (`lib/api.ts` → Backend `/api/auth`)

**Register:**
```typescript
authAPI.register({ name, email, password })
```

**Login:**
```typescript
authAPI.login({ email, password })
```

JWT token is automatically stored in `localStorage` and sent with all requests.

### 2. Restaurants (`lib/api.ts` → Backend `/api/restaurants`)

**Get All Restaurants:**
```typescript
restaurantsAPI.getAll(params)
```

**Get Restaurant Details:**
```typescript
restaurantsAPI.getById(id)
```

### 3. Menu Items (`lib/api.ts` → Backend `/api/menu`)

**Get Menu by Restaurant:**
```typescript
menuAPI.getByRestaurant(restaurantId)
```

**Get All Menu Items:**
```typescript
menuAPI.getAll(params)
```

### 4. Orders (`lib/api.ts` → Backend `/api/orders`)

**Create Order:**
```typescript
ordersAPI.create(orderData)
```

**Get User Orders:**
```typescript
ordersAPI.getMyOrders()
```

**Update Order Status:**
```typescript
ordersAPI.updateStatus(orderId, status)
```

### 5. User Profile (`lib/api.ts` → Backend `/api/users`)

**Get Profile:**
```typescript
usersAPI.getProfile()
```

**Update Profile:**
```typescript
usersAPI.updateProfile(data)
```

---

## 🔐 Authentication Flow

1. **User Registers/Logs In:**
   - Frontend sends credentials to `POST /api/auth/register` or `POST /api/auth/login`
   - Backend returns JWT token and user data
   - Token is stored in `localStorage`

2. **Authenticated Requests:**
   - All API requests automatically include `Authorization: Bearer <token>` header
   - Backend middleware validates token on protected routes
   - User information is extracted and attached to request

3. **Session Persistence:**
   - On page reload, the frontend checks for stored token
   - If token exists, user profile is restored automatically
   - If token is invalid, it's cleared and user must log in again

---

## 📱 Key Pages & Components

### Modified Pages (Now Using API):

1. **Login Page** (`app/login/page.tsx`)
   - Uses `authAPI.login()` and `authAPI.register()`
   - Stores JWT token in localStorage
   - Handles authentication errors

2. **Restaurants Page** (`app/restaurants/page.tsx`)
   - Fetches restaurants from `restaurantsAPI.getAll()`
   - Displays loading state while fetching
   - Shows error state if request fails

3. **Restaurant Detail** (`app/restaurant/[id]/page.tsx`)
   - Fetches restaurant data: `restaurantsAPI.getById(id)`
   - Fetches menu items: `menuAPI.getByRestaurant(id)`
   - Maps API response data to component props

---

## 🧪 Testing the Integration

### Test 1: Register New User
1. Navigate to `http://localhost:3000/login`
2. Click "Sign Up" tab
3. Enter name, email, password
4. Click "Create Account"
5. Should redirect to home page

### Test 2: Login
1. Navigate to `http://localhost:3000/login`
2. Enter email and password
3. Click "Login"
4. Should redirect to home page

### Test 3: View Restaurants
1. Navigate to `http://localhost:3000/restaurants`
2. Page should load restaurants from backend
3. You should see loading spinner while fetching
4. Search and filter should work (filtering is client-side)

### Test 4: View Restaurant Menu
1. Click on a restaurant
2. Page should load restaurant details and menu items
3. Menu items should be organized by category
4. Add items to cart

### Test 5: Orders
1. After adding items to cart and checking out
2. Navigate to `http://localhost:3000/orders`
3. Should show user's orders from backend

---

## 🐛 Debugging Tips

### Check Browser Console
1. Open DevTools (F12)
2. Go to Console tab
3. Look for any error messages
4. Check Network tab to see API requests

### Check Backend Logs
The backend terminal should show:
- Incoming requests: `POST /api/auth/login`, etc.
- Database operations
- Any errors during request processing

### Common Issues:

**Issue: "Cannot find module" errors**
- Make sure backend is running
- Check that `NEXT_PUBLIC_API_URL` is set correctly in `.env.local`
- Restart frontend dev server after changing .env

**Issue: 401 Unauthorized**
- JWT token may be expired
- Try logging in again
- Check that token is being sent in Authorization header

**Issue: Network errors**
- Verify backend is running on port 5000
- Check that frontend .env.local has correct API URL
- Check firewall/network connectivity

---

## 📁 File Structure

```
Client/
├── .env.local                 # API configuration
├── lib/
│   ├── api.ts                # API client functions
│   ├── auth-context.tsx      # Authentication context (now with backend)
│   ├── cart-context.tsx      # Cart state management
│   └── types.ts              # TypeScript types
├── app/
│   ├── login/page.tsx        # Auth page (updated)
│   ├── restaurants/page.tsx  # Restaurants list (updated)
│   ├── restaurant/[id]/      # Restaurant detail (updated)
│   └── ...
└── components/
    └── ...

Server/
├── src/
│   ├── index.ts              # Express server entry point
│   ├── config/
│   │   └── database.ts       # MongoDB connection
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API endpoints
│   ├── middleware/           # Auth and other middleware
│   └── ...
└── dist/                     # Compiled JavaScript
```

---

## 🔄 Data Flow Example: Login

```
User Form Input
    ↓
authAPI.login({ email, password })
    ↓
POST http://localhost:5000/api/auth/login
    ↓
Backend validates credentials
    ↓
Backend returns { token, user }
    ↓
Frontend stores token in localStorage
    ↓
Frontend updates auth context
    ↓
User redirected to home page
```

---

## 📝 Next Steps

1. **Test all features** - Use the testing guide above
2. **Add more restaurants/menu items** - Use your app's functionality
3. **Customize UI** - Modify components as needed
4. **Deploy** - When ready, deploy to production

---

## 🆘 Need Help?

Check the backend logs for detailed error messages:
```bash
# Terminal running the backend
# Should show error details and stack traces
```

Review the API endpoints in `Server/README.md` for full endpoint documentation.

---

**Backend Status:** ✅ Running on http://localhost:5000
**Frontend Integration:** ✅ Complete
**Ready to Test:** ✅ Yes

Happy coding! 🍕
