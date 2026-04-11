# 🔐 Authentication System (Node.js)

A **production-ready authentication system** built using Node.js, Express, and MongoDB. Designed with real-world practices like JWT authentication, token rotation, OTP verification, and session management.

---

## 🚀 Features

- User Registration  
- User Login  
- JWT Authentication (Access + Refresh Tokens)  
- Secure Refresh Token Storage (DB-based sessions)  
- Token Rotation  
- OTP-based Email Verification (Nodemailer)  
- Logout (single device)  
- Logout from all devices  
- Protected Routes (auth middleware)  
- Password hashing using bcrypt  

---

## 🛠️ Tech Stack

- Node.js  
- Express.js  
- MongoDB (Mongoose)  
- JWT (jsonwebtoken)  
- bcrypt  
- Nodemailer  
- dotenv  
- cookie-parser  
- morgan  

---

## 📦 Installation

git clone <your-repo-link>  
cd authentication-system  
npm install  

---

## ⚙️ Environment Variables

Create a `.env` file in root:

MONGO_URI=mongodb+srv://  
PORT=3000  

JWT_SECRET=your_jwt_secret  

GOOGLE_CLIENT_ID=  
GOOGLE_CLIENT_SECRET=  
GOOGLE_REFRESH_TOKEN=  
GOOGLE_USER=your_email@gmail.com  

---

## ▶️ Run the Project

npm run dev  

---

## 📌 API Endpoints (RESTful)

### 🔑 Auth

POST /api/user/register → Register user  
POST /api/user/login → Login user  

### 👤 User

GET /api/user/profile → Get logged-in user (Protected)  

### 🔁 Token

POST /api/user/token/refresh → Refresh access token  

### 🚪 Logout

POST /api/user/logout → Logout current session (Protected)  
POST /api/user/logout-all → Logout from all devices (Protected)  

### 📧 Email Verification

POST /api/user/verify-email → Verify email using OTP  

---

## 🔐 Authentication Flow

1. User registers → OTP sent to email  
2. User verifies email via OTP  
3. Login → Access + Refresh tokens issued  
4. Access token used for protected routes  
5. Refresh token used for token rotation  
6. Logout removes session(s)  

---

## 🧠 Security Highlights

- Passwords hashed using bcrypt  
- OTP stored in hashed format  
- Refresh tokens stored in DB (session model)  
- Token rotation prevents reuse attacks  
- Protected routes using middleware  
- Logout from all devices supported  

---

## 📂 Project Structure

src/  
 ├── config/  
 ├── controllers/  
 │    └── user.controller.js  
 ├── db/  
 │    └── db.js  
 ├── middlewares/  
 │    └── auth.middleware.js  
 ├── models/  
 │    ├── user.model.js  
 │    ├── session.model.js  
 │    └── otp.model.js  
 ├── routes/  
 │    └── user.route.js  
 ├── services/  
 │    └── email.service.js  
 ├── utils/  
 │    ├── ApiError.js  
 │    ├── ApiResponse.js  
 │    ├── AsyncHandler.js  
 │    └── OTP.js  
 ├── app.js  
 └── server.js  

---

## 💡 Future Improvements

- Rate limiting (prevent brute force)  
- Account lockout after failed attempts  
- OAuth (Google login)  
- Redis for session/token storage  


---

## 🤝 Contribution

Feel free to fork and improve this project.

---
