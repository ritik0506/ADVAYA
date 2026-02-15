import express from 'express';
import { getEvents } from '../controllers/eventcontroller.js';

const router = express.Router();

router.get('/all', (req, res, next) => {
  res.set('Cache-Control', 'public, max-age=300');
  next();
}, getEvents);

export default router;
