import Registration from '../models/Registration.js';
import { google } from 'googleapis';
import { sendRegistrationEmail } from '../utils/emailService.js';

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
};

/**
 * COMBINED EVENTS → separate UG / PG tabs
 * These events have two sheet tabs each, resolved by the category
 * the user selects on the frontend (UG or PG)
 */
const COMBINED_EVENT_SHEET_MAP = {
  "Bids Sabha":        { UG: "Bids Sabha(UG&PG)",         PG: "Bids Sabha(UG&PG)" },
  "Nidhi 404":         { UG: "Nidhi 404(UG&PG)",          PG: "Nidhi 404(UG&PG)" },
  "Ranabhoomi Arena":  { UG: "Ranabhoomi Arena(UG&PG)",   PG: "Ranabhoomi Arena(UG&PG)" },
  "Drishti POV":       { UG: "Drishti Pov(UG&PG)",     PG: "Drishti Pov(UG&PG)" },
  "Rahasya Mintz":     { UG: "RahasyaMintz(UG&PG)",       PG: "RahasyaMintz(UG&PG)" },
  "Shastrartha Vada":  { UG: "Shastrartha Vada(UG&PG)",   PG: "Shastrartha Vada(UG&PG)" },
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
    // Check fixed map first, then combined map with category
    let sheetName = EVENT_SHEET_MAP[eventName];
    if (!sheetName && COMBINED_EVENT_SHEET_MAP[eventName]) {
      sheetName = COMBINED_EVENT_SHEET_MAP[eventName][category];
    }

    if (!sheetName) {
      return res.status(400).json({
        success: false,
        message: `No Google Sheet mapped for event: ${eventName} (${category})`,
      });
    }

    // ================= DUPLICATE CHECKS =================
    // For combined events, check duplicates per category (same college can register separately for UG and PG)
    const existingRegistrations = await Registration.countDocuments({
      eventName,
      category,
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
    // ================= GENERATE TEAM ID =================
    // Format: EventInitials + Category + "-" + Random 3-digit number
    // e.g., Code Kurukshetra + UG → CKUG-482
    const eventInitials = eventName
      .split(/\s+/)
      .map(word => word.charAt(0).toUpperCase())
      .join('');
    
    const prefix = `${eventInitials}${category}`;

    // Generate unique team ID (retry if collision)
    let teamId;
    let isUnique = false;
    while (!isUnique) {
      const randomNum = Math.floor(100 + Math.random() * 900); // 100–999
      teamId = `${prefix}-${randomNum}`;
      const existing = await Registration.findOne({ teamId });
      if (!existing) isUnique = true;
    }

    // ================= DATABASE =================
    const registration = await Registration.create({
      teamId,
      eventName,
      category,
      registrationFee,
      collegeName: normalizedCollegeName,
      teamName,
      participants,
      teamSize: teamSize || participants.length,
    });

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
      range: `'${sheetName}'!A1`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [
          [
            registration.teamId,
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

    // Send confirmation email to captain (first participant) only
    try {
      const captain = participants[0];
      const emailData = {
        eventName,
        category,
        teamName,
        teamId: registration.teamId,
        collegeName,
        registrationFee,
        participants,
      };

      await sendRegistrationEmail(captain.email, emailData);
      console.log(`✅ Confirmation email sent to captain: ${captain.email}`);
    } catch (emailError) {
      console.error('⚠️ Failed to send confirmation email:', emailError.message);
      // Email failure does NOT affect registration response
    }

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
