import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import logger from './middleware/logger.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Routes
import eventRoutes from './routes/Eventroutes.js'; 
import registrationRoutes from './routes/registrationRoutes.js';
import logRoutes from './routes/logRoutes.js';
import teamRegistrationRoutes from "./routes/teamRegistrationRoutes.js";

// Get directory path for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// CORS — restrict to allowed origins
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map(o => o.trim());

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Body parsing with size limits
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Simple in-memory rate limiter (per IP, 60 requests/min)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 60;

app.use((req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.start > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { start: now, count: 1 });
    return next();
  }

  entry.count++;
  if (entry.count > RATE_LIMIT_MAX) {
    return res.status(429).json({
      success: false,
      message: 'Too many requests. Please try again later.',
    });
  }
  next();
});

// Periodic cleanup of rate limit map (every 5 min)
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now - entry.start > RATE_LIMIT_WINDOW_MS) {
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get('user-agent'),
  });
  next();
});

// Health check route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Advaya 2026 API is running',
    timestamp: new Date().toISOString(),
  });
});


// API Routes
app.use('/api/registration', registrationRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/events', eventRoutes); 
app.use("/api/team-registration", teamRegistrationRoutes);
// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`Server running on port ${PORT}`);
});
