import TeamRegistration from "../models/TeamRegistration.js";

/* ================= CREATE ================= */

export const createTeamRegistration = async (req, res) => {
  try {
    let {
      collegeName,
      category,
      coordinatorName,
      coordinatorEmail,
      coordinatorPhone,
      totalParticipants,
      totalEvents,
    } = req.body;

    // Convert to number (important)
    totalParticipants = Number(totalParticipants);
    totalEvents = Number(totalEvents);

    if (!totalParticipants || totalParticipants < 10 || totalParticipants > 14) {
      return res.status(400).json({
        message: "Team must have 10 to 14 participants.",
      });
    }

    if (!totalEvents || totalEvents < 8) {
      return res.status(400).json({
        message: "Minimum 8 event participation required.",
      });
    }

    const existing = await TeamRegistration.findOne({
      collegeName,
      category,
    });

    if (existing) {
      return res.status(400).json({
        message: `This college already registered for ${category}.`,
      });
    }

    const registration = await TeamRegistration.create({
      collegeName,
      category,
      coordinatorName,
      coordinatorEmail,
      coordinatorPhone,
      totalParticipants,
      totalEvents,
      amountPaid: 2499,
    });

    res.status(201).json({
      message: "Team Registration Successful",
      registration,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET ALL ================= */

export const getAllTeamRegistrations = async (req, res) => {
  try {
    const registrations = await TeamRegistration.find().sort({
      createdAt: -1,
    });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* ================= GET BY ID ================= */

export const getTeamRegistrationById = async (req, res) => {
  try {
    const registration = await TeamRegistration.findById(req.params.id);

    if (!registration)
      return res.status(404).json({ message: "Registration not found" });

    res.json(registration);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* ================= GET BY COLLEGE ================= */

export const getTeamRegistrationByCollege = async (req, res) => {
  try {
    const registrations = await TeamRegistration.find({
      collegeName: req.params.collegeName,
    });

    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
