# Food Delivery App - Backend

This is the backend API for the Food Delivery Application built with Node.js, Express, and MongoDB.

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or pnpm

### Installation

1. Navigate to the Server directory:
```bash
cd Server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/food-delivery
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
```

4. Build the TypeScript:
```bash
npm run build
```

### Running the Server

**Development mode (with watch):**
```bash
npm run dev
```

**Production mode:**
```bash
npm run start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Restaurants
- `GET /api/restaurants` - Get all restaurants (with filters)
- `GET /api/restaurants/:id` - Get restaurant details
- `POST /api/restaurants` - Create restaurant (restaurant owner)
- `PUT /api/restaurants/:id` - Update restaurant (restaurant owner)
- `DELETE /api/restaurants/:id` - Delete restaurant (restaurant owner)

### Menu Items
- `GET /api/menu` - Get all menu items (with filters)
- `GET /api/menu/restaurant/:restaurantId` - Get restaurant menu items
- `POST /api/menu` - Add menu item (restaurant owner)
- `PUT /api/menu/:id` - Update menu item (restaurant owner)
- `DELETE /api/menu/:id` - Delete menu item (restaurant owner)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/user/my-orders` - Get user's orders
- `GET /api/orders/restaurant/:restaurantId` - Get restaurant orders (restaurant owner)
- `GET /api/orders/:id` - Get order details
- `PATCH /api/orders/:id/status` - Update order status
- `PATCH /api/orders/:id/payment` - Update payment status
- `PATCH /api/orders/:id/cancel` - Cancel order

### Users
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users` - Get all users (admin)
- `GET /api/users/:id` - Get user by ID (admin)
- `DELETE /api/users/:id` - Delete user (admin)

### Health Check
- `GET /api/health` - Check server status

## User Roles
- `user` - Regular customer
- `restaurant_owner` - Restaurant owner
- `admin` - Administrator

## Project Structure
```
src/
  ├── config/
  │   └── database.ts
  ├── middleware/
  │   └── auth.ts
  ├── models/
  │   ├── User.ts
  │   ├── Restaurant.ts
  │   ├── MenuItem.ts
  │   └── Order.ts
  ├── routes/
  │   ├── auth.ts
  │   ├── restaurants.ts
  │   ├── menu.ts
  │   ├── orders.ts
  │   └── users.ts
  └── index.ts
```

## Key Features
- ✅ User authentication with JWT
- ✅ Password hashing with bcrypt
- ✅ Restaurant management
- ✅ Menu item management
- ✅ Order management
- ✅ Role-based access control
- ✅ MongoDB integration
- ✅ CORS enabled for frontend integration

## Notes
- Make sure MongoDB is running before starting the server
- Update `JWT_SECRET` in production environment
- Update `MONGODB_URI` if using MongoDB Atlas
