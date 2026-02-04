import express from 'express';
import {
  registerParticipant,
  getAllRegistrations,
  getRegistrationById,
} from '../controllers/registrationController.js';

const router = express.Router();

router.route('/')
  .post(registerParticipant)
  .get(getAllRegistrations);

router.route('/:id')
  .get(getRegistrationById);

export default router;
