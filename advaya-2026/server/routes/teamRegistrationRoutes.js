import express from "express";
import {
  createTeamRegistration,
  getAllTeamRegistrations,
  getTeamRegistrationById,
  getTeamRegistrationByCollege,
} from "../controllers/teamRegistrationController.js";

const router = express.Router();

// Create & Get All
router.route("/")
  .post(createTeamRegistration)
  .get(getAllTeamRegistrations);

// Get by College Name
router.route("/college/:collegeName")
  .get(getTeamRegistrationByCollege);

// Get by Registration ID
router.route("/:id")
  .get(getTeamRegistrationById);

export default router;
