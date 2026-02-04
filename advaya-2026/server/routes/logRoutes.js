import express from 'express';
import {
  createLog,
  getAllLogs,
  getErrorLogs,
} from '../controllers/logController.js';

const router = express.Router();

router.route('/')
  .post(createLog)
  .get(getAllLogs);

router.route('/errors')
  .get(getErrorLogs);

export default router;
