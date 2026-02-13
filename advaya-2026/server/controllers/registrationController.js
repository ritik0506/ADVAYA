import Registration from '../models/Registration.js';
import { google } from 'googleapis';

/**
 * EVENT NAME  →  GOOGLE SHEET TAB NAME
 * ⚠️ Sheet names MUST match exactly
 */
const EVENT_SHEET_MAP = {
  "Code Kurukshetra": "Code Kurukshetra(PG)",
  "Web Astra": "Web Astra(PG)",
  "Data Vishleshana": "Data Vishleshana(PG)",
  "Brahma Bits": "Brahma BIts(PG)",

  "Gandhari Mode": "Gandhari Mode(UG)",
  "Web Shilpa Chakra": "Web ShilpaChakra(UG)",
  "Bits Vedha": "Bits Vedha(UG)",
  "Maya Loop": "Maya Loop(UG)",

  "Bids Sabha": "Bids Sabha(UG&PG)",
  "Nidhi 404": "Nidhi 404(UG&PG)",
  "Ranabhoomi Arena": "Ranabhoomi Arena(UG&PG)",
  "Drishti POV": "Drishti Pov(UG&PG)",
  "Rahasya Mintz": "RahasyaMintz(UG&PG)",
  "Shastrartha Vada": "Shastrartha Vada(UG&PG)"
};

// =====================================================
// REGISTER PARTICIPANT
// =====================================================
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

    // Normalize college name
    const normalizedCollegeName = collegeName.trim().toLowerCase();

    // ================= VALIDATION =================
    if (
      !eventName ||
      !category ||
      !collegeName ||
      !teamName ||
      !participants ||
      participants.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    for (let i = 0; i < participants.length; i++) {
      const { name, mobile, email } = participants[i];
      if (!name || !mobile || !email) {
        return res.status(400).json({
          success: false,
          message: `Participant ${i + 1}: name, mobile and email are required`,
        });
      }
    }

    // ================= SHEET RESOLUTION =================
    const sheetName = EVENT_SHEET_MAP[eventName];

    if (!sheetName) {
      return res.status(400).json({
        success: false,
        message: `No Google Sheet mapped for event: ${eventName}`,
      });
    }

    // ================= DUPLICATE CHECKS =================
    const existingRegistrations = await Registration.countDocuments({
      eventName,
      collegeName: normalizedCollegeName,
    });

    if (existingRegistrations >= 1) {
      return res.status(400).json({
        success: false,
        message: `${collegeName} has already registered for ${eventName}`,
      });
    }

    const existingTeam = await Registration.findOne({
      eventName,
      teamName,
    });

    if (existingTeam) {
      return res.status(400).json({
        success: false,
        message: 'Team name already exists for this event',
      });
    }

    // ================= PARTICIPANTS → COLUMNS =================
    // [P1 Name, P1 Mobile, P1 Email, P2 Name, ...]
    const participantColumns = participants.flatMap(p => [
      p.name,
      p.mobile,
      p.email
    ]);

    // ================= GOOGLE SHEETS =================
    const auth = new google.auth.GoogleAuth({
      keyFile: './credentials.json',
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client });

    const spreadsheetId = '1XV5FcKDoA4mhk46auDANnh68yf0c_G9nOJ91XLANPVs';

    await googleSheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A1`, // ✅ always start from column A
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [
          [
            eventName,
            category,
            registrationFee,
            teamName,
            collegeName,
            teamSize || participants.length,
            ...participantColumns
          ],
        ],
      },
    });

    // ================= DATABASE =================
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

// =====================================================
// GET ALL REGISTRATIONS
// =====================================================
export const getAllRegistrations = async (req, res, next) => {
  try {
    const { eventName, collegeName } = req.query;
    const filter = {};
    if (eventName) filter.eventName = eventName;
    if (collegeName) filter.collegeName = collegeName;

    const registrations = await Registration
      .find(filter)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations,
    });
  } catch (error) {
    next(error);
  }
};

// =====================================================
// GET REGISTRATION BY TEAM ID
// =====================================================
export const getRegistrationById = async (req, res, next) => {
  try {
    const registration = await Registration.findOne({
      teamId: req.params.teamId,
    });

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

// =====================================================
// GET REGISTRATIONS BY EVENT
// =====================================================
export const getRegistrationsByEvent = async (req, res, next) => {
  try {
    const registrations = await Registration
      .find({ eventName: req.params.eventName })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations,
    });
  } catch (error) {
    next(error);
  }
};

// =====================================================
// GET REGISTRATIONS BY COLLEGE
// =====================================================
export const getRegistrationsByCollege = async (req, res, next) => {
  try {
    const registrations = await Registration
      .find({ collegeName: req.params.collegeName })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations,
    });
  } catch (error) {
    next(error);
  }
};
