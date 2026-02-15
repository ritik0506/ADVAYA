import TeamRegistration from "../models/TeamRegistration.js";
import { google } from 'googleapis';
import { sendCollegeRegistrationEmail } from '../utils/emailService.js';

// =====================================================
// GOOGLE SHEETS — SINGLETON AUTH (shared with registrationController)
// =====================================================
let sheetsClient = null;

async function getGoogleSheetsClient() {
  if (sheetsClient) return sheetsClient;

  const auth = new google.auth.GoogleAuth({
    keyFile: './credentials.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const client = await auth.getClient();
  sheetsClient = google.sheets({ version: 'v4', auth: client });
  return sheetsClient;
}

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

    // Respond immediately
    res.status(201).json({ success: true, message: "Team Registration Successful", data: registration });

    // ================= GOOGLE SHEETS (async, non-blocking) =================
    (async () => {
      try {
        const spreadsheetId = process.env.SPREADSHEET_ID;
        if (!spreadsheetId) {
          console.warn('⚠️ SPREADSHEET_ID not set — skipping sheet append');
          return;
        }

        const googleSheets = await getGoogleSheetsClient();
        const SHEET_TAB = 'College Registration';

        // Try to append; if the tab doesn't exist yet, create it first
        const appendRow = async () => {
          await googleSheets.spreadsheets.values.append({
            spreadsheetId,
            range: `'${SHEET_TAB}'!A1`,
            valueInputOption: 'USER_ENTERED',
            insertDataOption: 'INSERT_ROWS',
            resource: {
              values: [
                [
                  registration.collegeName,
                  registration.category,
                  registration.coordinatorName,
                  registration.coordinatorEmail,
                  registration.coordinatorPhone,
                  registration.totalParticipants,
                  registration.totalEvents,
                  registration.amountPaid,
                  registration.status,
                  new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
                ],
              ],
            },
          });
        };

        try {
          await appendRow();
        } catch (appendErr) {
          // If the tab doesn't exist, create it and retry
          if (appendErr.message?.includes('Unable to parse range') || appendErr.code === 400) {
            console.log(`📝 Creating '${SHEET_TAB}' tab in spreadsheet...`);
            await googleSheets.spreadsheets.batchUpdate({
              spreadsheetId,
              resource: {
                requests: [{
                  addSheet: { properties: { title: SHEET_TAB } }
                }],
              },
            });

            // Add header row
            await googleSheets.spreadsheets.values.update({
              spreadsheetId,
              range: `'${SHEET_TAB}'!A1`,
              valueInputOption: 'USER_ENTERED',
              resource: {
                values: [['College Name', 'Category', 'Coordinator', 'Email', 'Phone', 'Participants', 'Events', 'Amount', 'Status', 'Registered At']],
              },
            });

            // Retry the append
            await appendRow();
          } else {
            throw appendErr;
          }
        }

        console.log(`✅ College registration appended to sheet: ${registration.collegeName}`);
      } catch (sheetError) {
        console.error('⚠️ Failed to write college registration to Google Sheets:', sheetError.message);
      }
    })();

    // ================= EMAIL (async, non-blocking) =================
    (async () => {
      try {
        await sendCollegeRegistrationEmail(registration.coordinatorEmail, {
          collegeName: registration.collegeName,
          category: registration.category,
          coordinatorName: registration.coordinatorName,
          coordinatorEmail: registration.coordinatorEmail,
          coordinatorPhone: registration.coordinatorPhone,
          totalParticipants: registration.totalParticipants,
          totalEvents: registration.totalEvents,
          amountPaid: registration.amountPaid,
        });
        console.log(`✅ College registration email sent to: ${registration.coordinatorEmail}`);
      } catch (emailError) {
        console.error('⚠️ Failed to send college registration email:', emailError.message);
      }
    })();

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
