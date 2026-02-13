import Registration from '../models/Registration.js';
import { google } from 'googleapis';

// @desc    Register for an event
// @route   POST /api/registration
// @access  Public
export const registerParticipant = async (req, res, next) => {
  try {
    const { 
      eventName, 
      category, 
      registrationFee, 
      collegeName, 
      teamName, 
      participants,
      teamSize 
    } = req.body;

   
    // Normalize college name to lowercase to prevent case-sensitive duplicates
    const normalizedCollegeName = collegeName.trim().toLowerCase();

    // Validate required fields
    if (!eventName || !category || !collegeName || !teamName || !participants || participants.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Validate participants data
    for (let i = 0; i < participants.length; i++) {
      const participant = participants[i];
      if (!participant.name || !participant.mobile || !participant.email) {
        return res.status(400).json({
          success: false,
          message: `Participant ${i + 1}: All fields (name, mobile, email) are required`,
        });
      }
    }

    // Check college registration limit for this event (max 2 registrations per college per event)
    const existingRegistrations = await Registration.countDocuments({
      eventName: eventName,
      collegeName: normalizedCollegeName,
    });

    if (existingRegistrations >= 1) {
      return res.status(400).json({
        success: false,
        message: `Registration limit reached: ${collegeName} has already registered 1 teams for ${eventName}`,
      });
    }

    // Check for duplicate team name for the same event
    const existingTeam = await Registration.findOne({
      eventName: eventName,
      teamName: teamName,
    });

    if (existingTeam) {
      return res.status(400).json({
        success: false,
        message: 'Team name already exists for this event',
      });
    }
     console.log(req.body);
//google sheet integration code

      const auth = new google.auth.GoogleAuth({ 
        keyFile: './credentials.json', 
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],

  });

  //create client instance for auth
      const client = await auth.getClient();

  //instance of google sheets api
  const googleSheets = google.sheets({ version: 'v4', auth: client });
  const spreadsheetId = "1XV5FcKDoA4mhk46auDANnh68yf0c_G9nOJ91XLANPVs";

const metadata = await googleSheets.spreadsheets.get({
  auth,
  spreadsheetId,
});
console.log(metadata);


//get rows from google sheet
const getRows = await googleSheets.spreadsheets.values.get({
  auth,
  spreadsheetId,
  range: "Sheet1",
});
console.log(getRows.data);


//write rows to google sheet
await googleSheets.spreadsheets.values.append({
  auth,
  spreadsheetId,
  range: "Sheet1!A:E",
  valueInputOption: "USER_ENTERED",
  resource: {
    values: [
      [eventName, category, registrationFee, teamName,collegeName,teamSize, JSON.stringify(participants), teamSize || participants.length]
    ],
  },
});

    // Create registration
    const registration = await Registration.create({
      eventName,
      category,
      registrationFee,
      collegeName: normalizedCollegeName,
      teamName,
      participants,
      teamSize: teamSize || participants.length,
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      teamId: registration.teamId,
      data: registration,
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }
    next(error);
  }
};

// @desc    Get all registrations
// @route   GET /api/registration
// @access  Private/Admin
export const getAllRegistrations = async (req, res, next) => {
  try {
    const { eventName, collegeName } = req.query;
    
    // Build filter
    const filter = {};
    if (eventName) filter.eventName = eventName;
    if (collegeName) filter.collegeName = collegeName;

    const registrations = await Registration.find(filter).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get registration by Team ID
// @route   GET /api/registration/:teamId
// @access  Public
export const getRegistrationById = async (req, res, next) => {
  try {
    const registration = await Registration.findOne({ teamId: req.params.teamId });

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found',
      });
    }

    res.status(200).json({
      success: true,
      data: registration,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get registrations by event
// @route   GET /api/registration/event/:eventName
// @access  Public
export const getRegistrationsByEvent = async (req, res, next) => {
  try {
    const registrations = await Registration.find({ 
      eventName: req.params.eventName 
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get registrations by college
// @route   GET /api/registration/college/:collegeName
// @access  Public
export const getRegistrationsByCollege = async (req, res, next) => {
  try {
    const registrations = await Registration.find({ 
      collegeName: req.params.collegeName 
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations,
    });
  } catch (error) {
    next(error);
  }
};
