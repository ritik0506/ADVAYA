import TeamRegistration from "../models/TeamRegistration.js";

export const createTeamRegistration = async (req, res, next) => {
  try {
    let {
      collegeName, category, coordinatorName, coordinatorEmail,
      coordinatorPhone, totalParticipants, totalEvents,
    } = req.body;

    totalParticipants = Number(totalParticipants);
    totalEvents = Number(totalEvents);

    if (!totalParticipants || totalParticipants < 10 || totalParticipants > 14) {
      return res.status(400).json({ success: false, message: "Team must have 10 to 14 participants." });
    }

    if (!totalEvents || totalEvents < 8) {
      return res.status(400).json({ success: false, message: "Minimum 8 event participation required." });
    }

    const existing = await TeamRegistration.findOne({
      collegeName: collegeName?.trim().toLowerCase(),
      category,
    });

    if (existing) {
      return res.status(400).json({ success: false, message: `This college already registered for ${category}.` });
    }

    const registration = await TeamRegistration.create({
      collegeName, category, coordinatorName, coordinatorEmail,
      coordinatorPhone, totalParticipants, totalEvents, amountPaid: 2499,
    });

    res.status(201).json({ success: true, message: "Team Registration Successful", data: registration });
  } catch (error) {
    next(error);
  }
};

export const getAllTeamRegistrations = async (req, res, next) => {
  try {
    const registrations = await TeamRegistration.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: registrations.length, data: registrations });
  } catch (error) {
    next(error);
  }
};

export const getTeamRegistrationById = async (req, res, next) => {
  try {
    const registration = await TeamRegistration.findById(req.params.id);
    if (!registration) return res.status(404).json({ success: false, message: "Registration not found" });
    res.status(200).json({ success: true, data: registration });
  } catch (error) {
    next(error);
  }
};

export const getTeamRegistrationByCollege = async (req, res, next) => {
  try {
    const registrations = await TeamRegistration.find({ collegeName: req.params.collegeName });
    res.status(200).json({ success: true, count: registrations.length, data: registrations });
  } catch (error) {
    next(error);
  }
};
