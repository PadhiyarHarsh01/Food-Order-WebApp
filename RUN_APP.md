# 🚀 Running Your Integrated Food App

## ✅ Current Status

Both servers are **already running**:
- ✅ **Backend:** http://localhost:5000
- ✅ **Frontend:** http://localhost:3000

## 🎯 Access Your App

**Visit:** http://localhost:3000

---

## 🔄 If You Need to Restart

### Terminal 1 - Backend
```powershell
cd c:\Users\harsh\Downloads\Food\Server
npm start
```

Expected output:
```
Server running on http://localhost:5000
MongoDB connected successfully
```

### Terminal 2 - Frontend
```powershell
cd c:\Users\harsh\Downloads\Food\Client
npm run dev
```

Expected output:
```
Next.js 16.0.3
✓ Ready in 1621ms
Local: http://localhost:3000
```

---

## 🧪 Quick Test Checklist

- [ ] Visit http://localhost:3000
- [ ] See home page load
- [ ] Go to /login page
- [ ] Try signing up with test email
- [ ] Login with your credentials
- [ ] Click Restaurants
- [ ] See restaurants load from API
- [ ] Click a restaurant
- [ ] See menu items load
- [ ] Verify everything works!

---

## 🐛 Troubleshooting

**Backend won't start:**
```powershell
# Kill process on port 5000
Stop-Process -Name node -Force
# Restart
cd Server; npm start
```

**Frontend won't start:**
```powershell
# Kill all node processes
Get-Process node | Stop-Process -Force
# Restart
cd Client; npm run dev
```

**API not responding:**
- Check backend terminal for errors
- Verify .env.local exists in Client folder
- Check NEXT_PUBLIC_API_URL=http://localhost:5000/api

---

## 📚 Full Documentation

- **INTEGRATION_GUIDE.md** - Complete integration details
- **INTEGRATION_COMPLETE.md** - Full setup guide
- **INTEGRATION_CHANGES.md** - Code changes made
- **Server/README.md** - Backend API docs

---

**You're ready! Open http://localhost:3000 now! 🍕**

