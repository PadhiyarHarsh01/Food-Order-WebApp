# Backend API is Ready! 🎉

Your Food Delivery App backend is now fully functional and running on **http://localhost:5000**

## 🔗 Connect Frontend to Backend

### Step 1: Update Client Environment Variables

Create a `.env.local` file in the `Client` folder:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Step 2: Use API in Frontend Components

Example - Login component:

```typescript
import { authAPI } from '@/lib/api';

export default function LoginPage() {
  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await authAPI.login({ email, password });
      localStorage.setItem('token', response.token);
      // Redirect to home or dashboard
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      handleLogin(
        formData.get('email') as string,
        formData.get('password') as string
      );
    }}>
      {/* form fields */}
    </form>
  );
}
```

Example - Get Restaurants:

```typescript
import { restaurantsAPI } from '@/lib/api';
import { useEffect, useState } from 'react';

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    restaurantsAPI.getAll()
      .then(setRestaurants)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {restaurants.map(restaurant => (
        <div key={restaurant._id} className="border p-4 rounded">
          <h2>{restaurant.name}</h2>
          <p>{restaurant.description}</p>
          <p>Delivery: {restaurant.deliveryTime} mins</p>
          <p>Rating: {restaurant.rating} ⭐</p>
        </div>
      ))}
    </div>
  );
}
```

Example - Place Order:

```typescript
import { ordersAPI } from '@/lib/api';

const handlePlaceOrder = async (orderData: any) => {
  try {
    const response = await ordersAPI.create(orderData);
    console.log('Order placed:', response.order);
    // Handle success
  } catch (error) {
    console.error('Failed to place order:', error);
  }
};
```

## 🚀 Backend Features Available

### Authentication
- ✅ User Registration
- ✅ User Login with JWT
- ✅ Token-based authentication

### Restaurants
- ✅ List all restaurants
- ✅ Get restaurant details
- ✅ Create restaurant (restaurant owner)
- ✅ Update restaurant
- ✅ Delete restaurant

### Menu
- ✅ Get all menu items
- ✅ Get menu by restaurant
- ✅ Add menu items
- ✅ Update menu items
- ✅ Delete menu items

### Orders
- ✅ Create orders
- ✅ View user orders
- ✅ Track order status
- ✅ Update payment status
- ✅ Cancel orders

### Users
- ✅ Get user profile
- ✅ Update user profile
- ✅ Admin user management

## 📦 Order Data Structure

When creating an order, send data like this:

```json
{
  "restaurant": "restaurant_id_here",
  "items": [
    {
      "menuItem": "menu_item_id",
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
  "specialInstructions": "No onions please"
}
```

## 🔐 Authorization

For protected endpoints, always include the JWT token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

The `api.ts` file automatically handles this if token is stored in localStorage with key `token`.

## 📡 API Response Format

All successful responses:
```json
{
  "data": {...},
  "message": "Success message"
}
```

Error responses:
```json
{
  "error": "Error message"
}
```

## 🛠️ Troubleshooting

### API Connection Issues
1. Make sure backend is running: `node dist/index.js` in Server folder
2. Check backend is on port 5000
3. Verify `NEXT_PUBLIC_API_URL` is correct in `.env.local`

### CORS Issues
- Backend already has CORS enabled
- Make sure frontend is on different port (usually 3000)

### Authentication Issues
- Save token after login: `localStorage.setItem('token', response.token)`
- Include token in requests (api.ts does this automatically)

### MongoDB Connection
- Ensure MongoDB is running locally
- Or update `MONGODB_URI` in backend `.env`

## 📚 Example Integration

See the updated `Client/lib/api.ts` for complete API integration layer.

## ✅ What's Ready

- ✅ Backend server running on port 5000
- ✅ MongoDB connected
- ✅ All API endpoints functional
- ✅ JWT authentication ready
- ✅ Frontend API layer configured (`lib/api.ts`)
- ✅ CORS enabled for frontend

## 🚀 Next Steps

1. Update frontend components to use the API functions
2. Test login/registration flow
3. Test restaurant listing
4. Test order creation
5. Add payment gateway integration
6. Deploy both frontend and backend

## 💡 Tips

- Use browser DevTools Network tab to debug API calls
- Check browser console for errors
- Check backend terminal for server logs
- Store JWT token in localStorage after login
- Always include token in Authorization header for protected routes

---

Your complete backend API is ready to power your food delivery application! 🍕🚀
