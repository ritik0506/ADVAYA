import express from 'express';
import dotenv from 'dotenv';
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

// Get directory path for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`Server running on port ${PORT}`);
});

