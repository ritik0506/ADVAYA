import express from 'express';
import {
  registerParticipant,
  getAllRegistrations,
  getRegistrationById,
  getRegistrationsByEvent,
  getRegistrationsByCollege,
} from '../controllers/registrationController.js';

const router = express.Router();

router.route('/').post(registerParticipant);
router.route('/all').get(getAllRegistrations);
router.route('/event/:eventName').get(getRegistrationsByEvent);
router.route('/college/:collegeName').get(getRegistrationsByCollege);
router.route('/:teamId').get(getRegistrationById);

export default router;
