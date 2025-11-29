# API Testing Guide

## Prerequisites
Make sure MongoDB is running locally or update the `MONGODB_URI` in `.env`

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Build the project:
```bash
npm run build
```

3. Start the server in development mode:
```bash
npm run dev
```

The server will start on `http://localhost:5000`

## Testing with cURL or Postman

### 1. Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "9876543210"
  }'
```

### 2. Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 3. Get All Restaurants
```bash
curl -X GET http://localhost:5000/api/restaurants
```

### 4. Create a Restaurant (requires token)
```bash
curl -X POST http://localhost:5000/api/restaurants \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Pizza House",
    "description": "Amazing Italian pizza",
    "image": "https://example.com/image.jpg",
    "address": "123 Main St",
    "city": "New York",
    "cuisines": ["Italian", "Pizza"],
    "deliveryTime": 30,
    "minimumOrder": 100
  }'
```

### 5. Add Menu Item
```bash
curl -X POST http://localhost:5000/api/menu \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Margherita Pizza",
    "description": "Classic Italian pizza",
    "price": 299,
    "image": "https://example.com/pizza.jpg",
    "category": "Pizza",
    "cuisine": "Italian",
    "isVegetarian": true,
    "restaurant": "RESTAURANT_ID_HERE"
  }'
```

### 6. Create Order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "restaurant": "RESTAURANT_ID_HERE",
    "items": [
      {
        "menuItem": "MENU_ITEM_ID_HERE",
        "quantity": 2,
        "price": 299
      }
    ],
    "totalAmount": 598,
    "deliveryAddress": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001"
    },
    "specialInstructions": "Extra cheese please"
  }'
```

### 7. Get User Profile
```bash
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 8. Health Check
```bash
curl -X GET http://localhost:5000/api/health
```

## Environment Variables

Update `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/food-delivery
JWT_SECRET=change_this_in_production
NODE_ENV=development
```

## Database Setup

For MongoDB:

### Local MongoDB:
```bash
# Windows (if MongoDB is installed)
mongod

# Or use MongoDB Atlas (cloud)
```

### Create Initial Admin User (Optional)

Connect to MongoDB and create an admin user:
```javascript
db.users.insertOne({
  name: "Admin",
  email: "admin@example.com",
  password: "hashedPassword",
  phone: "9876543210",
  role: "admin",
  isVerified: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

## Troubleshooting

1. **MongoDB Connection Error**: Make sure MongoDB is running
2. **Port Already in Use**: Change PORT in .env file
3. **JWT Token Expired**: Get a new token by logging in again
4. **CORS Error**: Check that frontend URL is allowed in CORS configuration

## Next Steps

- Add authentication middleware to protected routes
- Implement payment gateway integration
- Add file upload for images
- Add real-time notifications
- Add email notifications
- Add ratings and reviews
- Add advanced filtering and search
