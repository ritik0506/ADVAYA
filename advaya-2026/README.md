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
- MongoDB (running locally or MongoDB Atlas)
- npm
- Google Cloud service account credentials (for Google Sheets integration)
- Gmail account with App Password (for email notifications)

---

### Client Setup
```bash
cd client
npm install
npm run dev
```
Client runs on `http://localhost:5173`

---

### Server Setup

#### 1. Install Dependencies
```bash
cd server
npm install
```

#### 2. Setup Environment Variables
Create a `.env` file in the `server/` directory:
```env
# Email Service (Gmail SMTP)
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-char-app-password
```

> **How to get the Gmail App Password:**
> 1. Go to [Google Account Security](https://myaccount.google.com/security)
> 2. Enable **2-Step Verification** if not already enabled
> 3. Go to **App Passwords** (search "App Passwords" in the security page)
> 4. Generate a new app password for "Mail"
> 5. Copy the 16-character password (no spaces) into `EMAIL_PASS`

#### 3. Google Sheets Credentials
The server uses Google Sheets API to log registrations. A `credentials.json` file (Google Cloud service account key) must exist in the `server/` directory.

> **How to set up:**
> 1. Go to [Google Cloud Console](https://console.cloud.google.com/)
> 2. Create a project → Enable **Google Sheets API**
> 3. Create a **Service Account** → Generate a JSON key
> 4. Save the key as `server/credentials.json`
> 5. Share your Google Sheet with the service account email (found in the JSON key)

#### 4. MongoDB
The server connects to MongoDB at `mongodb://localhost:27017/advaya`. Make sure MongoDB is running locally:
```bash
# Windows (if installed as a service, it runs automatically)
# Otherwise start manually:
mongod
```

#### 5. Seed Events Data
Populate the database with event data:
```bash
cd server
npm run seed
```

#### 6. Start the Server
```bash
npm run dev
```
Server runs on `http://localhost:5001`

---

## 🗂️ Server Architecture

```
server/
├── config/
│   └── db.js                    # MongoDB connection
├── controllers/
│   └── registrationController.js # Registration logic + Google Sheets + Email
├── middleware/
│   ├── logger.js                # Winston request logging
│   └── errorMiddleware.js       # Error handling
├── models/
│   ├── Event.js                 # Event schema (seeded data)
│   └── Registration.js          # Registration schema with Team ID
├── routes/
│   ├── Eventroutes.js           # GET /api/events
│   └── registrationRoutes.js    # POST /api/registration
├── utils/
│   └── emailService.js          # Nodemailer email templates
├── credentials.json             # Google Sheets service account key (not in git)
├── .env                         # Environment variables (not in git)
└── index.js                     # Express app entry point
```

## 📧 Email Service

On successful registration, a confirmation email is sent to the **captain** (first participant) with:
- Team ID (e.g., `CKUG-482`)
- Event details, team members table
- **Payment link** → RVEI payment portal
- **Google Form link** → Pre-filled with Team ID, Captain Name, College Name

## 🆔 Team ID Format

Team IDs are auto-generated from the event name initials + category:

| Event | Category | Team ID |
|---|---|---|
| Code Kurukshetra | PG | `CKPG-XXX` |
| Maya Loop | UG | `MLUG-XXX` |
| Shastrartha Vāda | UG/PG | `SVUG-XXX` or `SVPG-XXX` |

Format: `[Event Initials][Category]-[Random 3-digit number]`

## 📝 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/events/all` | Get all events |
| `POST` | `/api/registration` | Register a team for an event |
| `GET` | `/api/registration` | Get all registrations |
| `POST` | `/api/logs` | Create a log entry |
| `GET` | `/api/logs` | Get all logs |
| `GET` | `/api/logs/errors` | Get error logs |

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
