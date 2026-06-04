🚀 Advaya 2026 – Technical & Cultural Festival Platform

Where Technology Meets Tradition

Advaya 2026 is the official event management and registration platform developed for the annual Technical & Cultural Festival. The platform streamlines participant registration, enquiry management, event discovery, team formation, and organizer workflows through a modern full-stack architecture.

Built with a mythology-inspired design language and immersive 3D experiences, the platform combines aesthetics with functionality to deliver a seamless user experience for thousands of student participants.

✨ Key Features
🎭 Mythology Inspired User Interface
Indian mythology-inspired visual identity
Modern animations and transitions
Unique festival branding
Immersive event presentation
🎮 Interactive 3D Experience
Three.js powered 3D visualizations
Dynamic user interactions
Modern web graphics
Enhanced participant engagement
📝 Smart Registration System
Team-based event registration
Multi-member team support
Automated Team ID generation
Category-based participant management
Real-time form validation
📧 Automated Email Notifications

Upon successful registration:

Confirmation email sent automatically
Team details summary included
Team ID generated and shared
Payment portal link provided
Event information attached
📊 Centralized Data Management
Registration records stored securely
Google Sheets integration for organizer access
Easy filtering and reporting
Export-friendly data structure
🔍 Error Monitoring System
Frontend error tracking
Backend logging infrastructure
Request monitoring
Production debugging support
📱 Responsive Design
Mobile-first development approach
Tablet compatibility
Desktop optimized layouts
Cross-browser support


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


🔄 Registration Workflow

The registration system is designed to automate the complete participant onboarding process.

Step 1: Event Selection

Participants browse available events and select their preferred competition.

Step 2: Team Registration

The team captain fills in:

Team information
Participant details
College details
Contact information
Step 3: Validation

The system validates:

Required fields
Team size constraints
Email formats
Event-specific rules
Step 4: Team ID Generation

A unique Team ID is generated automatically based on:

[Event Initials][Category]-[Random Number]

Example:

CKUG-482
MLPG-173
SVUG-291
Step 5: Data Persistence

Registration details are:

Stored in MongoDB
Logged into Google Sheets
Available for organizer review
Step 6: Email Confirmation

The captain receives an automated confirmation email containing:

Team ID
Event details
Team member information
Payment instructions
Important event links
🆔 Team ID Generation Logic

Each registered team receives a unique identifier.

Event	Category	Example Team ID
Code Kurukshetra	UG	CKUG-482
Code Kurukshetra	PG	CKPG-173
Maya Loop	UG	MLUG-382
Shastrartha Vāda	PG	SVPG-719

Benefits:

Easy participant tracking
Faster organizer management
Reduced duplicate registrations
Simplified verification process

## 📝 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/events/all` | Get all events |
| `POST` | `/api/registration` | Register a team for an event |
| `GET` | `/api/registration` | Get all registrations |
| `POST` | `/api/logs` | Create a log entry |
| `GET` | `/api/logs` | Get all logs |
| `GET` | `/api/logs/errors` | Get error logs |

🚀 Future Enhancements
Admin Dashboard
Registration Analytics
QR-based Check-In System
Event Attendance Tracking
Certificate Generation
Real-time Registration Statistics
Payment Verification Automation
Role-Based Access Control
🤝 Team Collaboration

The project follows a structured development workflow where contributors work independently within designated event or feature modules, ensuring efficient collaboration and maintainable code.

📄 License

MIT License

This project may be used and modified for educational institutions, technical festivals, hackathons, and event management platforms.

👨‍💻 Developed For

Advaya 2026 – Technical & Cultural Festival

A digital platform designed to simplify event management, automate registrations, and enhance participant engagement through modern web technologies.
