import express from 'express';
import { getEvents } from '../controllers/eventcontroller.js';

const router = express.Router();

router.get('/all', getEvents);

export default router;