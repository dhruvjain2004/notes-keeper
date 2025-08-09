# 📝 Notes Keeper (MERN Stack)

A **full-stack notes management app** built with **MongoDB, Express, React, Node.js**.

---

## 🚀 Features

- **User Authentication** (JWT)
- **Create / Read / Update / Delete** notes
- **Tags support** for notes
- **Profile management**
  - View profile
  - Edit name/email
  - Change password
- **Responsive UI** (Vite + React)
- **Secure API** with token-based authentication

---

## 📂 Project Structure

```
notes-keeper/
├── client/            # React frontend (Vite)
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
├── server/            # Express backend
│   ├── config/        # Database config
│   ├── middleware/    # Auth middleware
│   ├── models/        # Mongoose schemas
│   ├── routes/        # API routes
│   ├── package.json
│   └── .env.example
├── README.md          # This file
└── .gitignore
```

---

## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- React Router DOM
- Axios
- CSS

**Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt.js (password hashing)
- dotenv, cors

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/notes-keeper.git
cd notes-keeper
```

### 2️⃣ Backend setup
```bash
cd server
npm install
```
Create a `.env` file in `server/` using `.env.example`:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
```

Run backend:
```bash
npm run dev
```
Backend will start at `http://localhost:5000`

---

### 3️⃣ Frontend setup
```bash
cd ../client
npm install
```
Create a `.env` file in `client/` using `.env.example`:
```env
VITE_API_BASE=http://localhost:5000/api
```

Run frontend:
```bash
npm run dev
```
Frontend will start at `http://localhost:5173`

---

## 🔑 API Endpoints

### Auth
| Method | Endpoint          | Description |
|--------|-------------------|-------------|
| POST   | `/api/auth/register` | Register new user |
| POST   | `/api/auth/login`    | Login user |
| GET    | `/api/auth/me`       | Get current user profile |
| PUT    | `/api/auth/me`       | Update profile (name/email) |
| PUT    | `/api/auth/me/password` | Change password |

### Notes
| Method | Endpoint       | Description |
|--------|---------------|-------------|
| GET    | `/api/notes`  | Get all notes of logged-in user |
| POST   | `/api/notes`  | Create a new note |
| PUT    | `/api/notes/:id` | Update a note |
| DELETE | `/api/notes/:id` | Delete a note |

---

## 🖥️ Usage Flow

1. **Register** → Create account  
2. **Login** → Get JWT token (stored in browser)  
3. **Create notes** with title, content, and tags  
4. **Edit/Delete** your notes anytime  
5. **View profile** → Edit name/email, change password  
6. **Logout** clears the token

---

## 🌍 Deployment

### Frontend (Vercel)
1. Push `client/` to GitHub
2. Import repo in [Vercel](https://vercel.com)
3. Set `VITE_API_BASE` to your backend URL in environment variables
4. Deploy

### Backend (Render)
1. Push `server/` to GitHub
2. Create new **Web Service** on [Render](https://render.com)
3. Set environment variables from `.env`
4. Deploy

### MongoDB
- Use [MongoDB Atlas](https://www.mongodb.com/atlas)  
- Copy your connection string into `MONGO_URI`

---

## 📸 Screenshots (example placeholders)

### Login Page
![Login](screenshots/login.png)

### Notes Page
![Notes](screenshots/notes.png)

### Profile Page
![Profile](screenshots/profile.png)

---

## 🧑‍💻 Author
**Your Name**  
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your@email.com

---

## 📜 License
MIT License — free to use and modify.
