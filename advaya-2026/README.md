# Advaya 2026 - Technical & Cultural Festival

A modern full-stack web application for managing technical and cultural festival events with 3D visualizations and mythology-inspired design.

## 🏗️ Project Structure

```
advaya-2026/
├── client/                      # React + Vite + Tailwind + Three.js
├── server/                      # Node.js + Express + MongoDB
└── .env                         # Environment configuration
```

## 🚀 Features

- **3D Interactive UI**: Three.js powered 3D visualizations
- **Mythology Theme**: Indian mythology-inspired design
- **Error Tracking**: Frontend-to-backend error logging system
- **Event Management**: Registration system for multiple event categories
- **Team Collaboration**: Separate folders for PG, UG, and Non-technical teams
- **Responsive Design**: Mobile-first Tailwind CSS styling
- **Modern Stack**: React 18, Express, MongoDB

## 📦 Installation

### Prerequisites
- Node.js (v18+)
- MongoDB
- npm or yarn

### Client Setup
```bash
cd client
npm install
npm run dev
```

### Server Setup
```bash
cd server
npm install
npm run dev
```

### Environment Variables
Configure the `.env` file in the root directory:
```
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/advaya2026
JWT_SECRET=your_jwt_secret_key
```

## 👥 Team Structure

### PG Technical
- Vyasa Data (Data Science)
- Code Kurukshetra (Competitive Programming)

### UG Technical
- Web Shilpa Chakra (Web Development & 3D)
- Bits Vedha (Coding Challenge)

### Non-Technical
- Drishti POV (Photography)
- Bids Sabha (Debate)
- Gupta Leela (Treasure Hunt)

## 🎨 Tech Stack

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- Three.js
- GSAP
- React Router
- Axios

**Backend:**
- Node.js
- Express
- MongoDB
- Winston (Logging)
- JWT Authentication

## 📝 API Endpoints

- `POST /api/registration` - Register for event
- `GET /api/registration` - Get all registrations
- `POST /api/logs` - Create log entry
- `GET /api/logs` - Get all logs
- `GET /api/logs/errors` - Get error logs

## 🛠️ Development

Each team member should work in their designated feature folder:
- `/client/src/features/pg-technical/`
- `/client/src/features/ug-technical/`
- `/client/src/features/non-technical/`

## 📄 License

MIT License - feel free to use this project for your events!

## 🤝 Contributing

1. Create your feature branch
2. Work in your designated team folder
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

**Advaya 2026** - Where Technology Meets Tradition
