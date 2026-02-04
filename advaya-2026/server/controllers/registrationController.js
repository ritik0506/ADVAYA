import Participant from '../models/Participant.js';
import Event from '../models/Event.js';

// @desc    Register for an event
// @route   POST /api/registration
// @access  Public
export const registerParticipant = async (req, res, next) => {
  try {
    const { name, email, phone, college, eventId, teamMembers } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !eventId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    // Check if already registered
    const existingParticipant = await Participant.findOne({
      email,
      event: eventId,
    });

    if (existingParticipant) {
      return res.status(400).json({
        success: false,
        message: 'Already registered for this event',
      });
    }

    // Create participant
    const participant = await Participant.create({
      name,
      email,
      phone,
      college,
      event: eventId,
      teamMembers: teamMembers || [],
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: participant,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all registrations
// @route   GET /api/registration
// @access  Private/Admin
export const getAllRegistrations = async (req, res, next) => {
  try {
    const participants = await Participant.find().populate('event');
    
    res.status(200).json({
      success: true,
      count: participants.length,
      data: participants,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get registration by ID
// @route   GET /api/registration/:id
// @access  Public
export const getRegistrationById = async (req, res, next) => {
  try {
    const participant = await Participant.findById(req.params.id).populate('event');

    if (!participant) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found',
      });
    }

    res.status(200).json({
      success: true,
      data: participant,
    });
  } catch (error) {
    next(error);
  }
};
