import nodemailer from 'nodemailer';

// Lazy transporter — created on first use so env vars are loaded
let transporter;
function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  return transporter;
}

/**
 * Escape HTML special characters to prevent XSS in email bodies
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Send registration confirmation email to a participant
 * @param {string} to - Recipient email address
 * @param {Object} data - Registration details
 */
export const sendRegistrationEmail = async (to, data) => {
  const { eventName, category, teamName, teamId, collegeName, registrationFee, participants } = data;
  const captainName = participants[0]?.name || '';

  // Escape all user-provided values before inserting into HTML
  const safeEventName = escapeHtml(eventName);
  const safeCategory = escapeHtml(category);
  const safeTeamName = escapeHtml(teamName);
  const safeTeamId = escapeHtml(teamId);
  const safeCollegeName = escapeHtml(collegeName);
  const safeCaptainName = escapeHtml(captainName);
  const safeFee = escapeHtml(String(registrationFee));

  // Build pre-filled Google Form URL
  const formBaseUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSd475mrbrrFWLOTk50WyeLJBboyYweTI-Sn2IJbJEqMDTXTJw/viewform';
  const formParams = new URLSearchParams({
    'usp': 'pp_url',
    'entry.585924015': teamId,
    'entry.595885113': captainName,
    'entry.916098520': collegeName,
  });
  const formUrl = `${formBaseUrl}?${formParams.toString()}`;

  const participantRows = participants
    .map(
      (p, i) =>
        `<tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #d4a84b15; color: #6b6050;">${i + 1}</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #d4a84b15; color: #e8dcc8; font-weight: 600;">${escapeHtml(p.name)}</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #d4a84b15; color: #8a7e6b;">${escapeHtml(p.email)}</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #d4a84b15; color: #8a7e6b;">${escapeHtml(p.mobile)}</td>
        </tr>`
    )
    .join('');

  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 620px; margin: 0 auto; background: #0a0a0f; border: 2px solid #d4a84b; border-radius: 0;">
      
      <!-- ═══ TOP SACRED BORDER ═══ -->
      <div style="background: linear-gradient(90deg, transparent, #d4a84b, #f3cf7a, #d4a84b, transparent); height: 3px;"></div>

      <!-- ═══ HEADER — DIVINE SANCTUM ═══ -->
      <div style="background: linear-gradient(180deg, #1a1505 0%, #0f0d08 50%, #0a0a0f 100%); padding: 40px 24px 30px; text-align: center; border-bottom: 1px solid #d4a84b33;">
        
        <!-- Sanskrit ornament -->
        <p style="color: #d4a84b; font-size: 14px; letter-spacing: 8px; margin: 0 0 8px;">॥ ⚔ ॥</p>
        
        <!-- Main title -->
        <h1 style="color: #f3cf7a; margin: 0; font-size: 28px; font-weight: 900; letter-spacing: 6px; text-transform: uppercase; text-shadow: 0 0 20px rgba(243,207,122,0.3);">
          ADVAYA 2026
        </h1>
        
        <!-- Divider line -->
        <div style="width: 120px; height: 1px; background: linear-gradient(90deg, transparent, #d4a84b, transparent); margin: 16px auto;"></div>
        
        <p style="color: #d4a84b; font-size: 11px; letter-spacing: 5px; text-transform: uppercase; margin: 0;">
          🏛️ Registration Confirmed 🏛️
        </p>
      </div>

      <!-- ═══ BODY ═══ -->
      <div style="padding: 32px 28px;">
        
        <!-- Greeting -->
        <p style="color: #c9b89e; font-size: 15px; margin: 0 0 8px; line-height: 1.6;">
          Greetings, Warrior! 🙏
        </p>
        <p style="color: #8a7e6b; font-size: 14px; margin: 0 0 28px; line-height: 1.6;">
          Your team has been enrolled in the grand arena. The battlefield awaits — prepare for glory!
        </p>

        <!-- ═══ REGISTRATION SCROLL ═══ -->
        <div style="border: 1px solid #d4a84b44; background: #0e0d0a; padding: 0; margin-bottom: 28px;">
          
          <!-- Scroll header -->
          <div style="background: #d4a84b15; border-bottom: 1px solid #d4a84b33; padding: 10px 20px;">
            <p style="color: #d4a84b; font-size: 10px; letter-spacing: 4px; text-transform: uppercase; margin: 0; font-weight: 700;">
              ⚔ Sacred Scroll of Enrollment
            </p>
          </div>
          
          <div style="padding: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b6050; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; width: 140px; vertical-align: top;">Team ID</td>
                <td style="padding: 8px 0; color: #f3cf7a; font-size: 15px; font-weight: 700; font-family: 'Courier New', monospace; letter-spacing: 1px;">${safeTeamId}</td>
              </tr>
              <tr><td colspan="2" style="padding: 0;"><div style="height: 1px; background: #d4a84b15;"></div></td></tr>
              <tr>
                <td style="padding: 8px 0; color: #6b6050; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; vertical-align: top;">Event</td>
                <td style="padding: 8px 0; color: #e8dcc8; font-size: 14px; font-weight: 600;">${safeEventName}</td>
              </tr>
              <tr><td colspan="2" style="padding: 0;"><div style="height: 1px; background: #d4a84b15;"></div></td></tr>
              <tr>
                <td style="padding: 8px 0; color: #6b6050; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; vertical-align: top;">Category</td>
                <td style="padding: 8px 0; color: #e8dcc8; font-size: 14px; font-weight: 600;">${safeCategory}</td>
              </tr>
              <tr><td colspan="2" style="padding: 0;"><div style="height: 1px; background: #d4a84b15;"></div></td></tr>
              <tr>
                <td style="padding: 8px 0; color: #6b6050; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; vertical-align: top;">Team Name</td>
                <td style="padding: 8px 0; color: #e8dcc8; font-size: 14px; font-weight: 600;">${safeTeamName}</td>
              </tr>
              <tr><td colspan="2" style="padding: 0;"><div style="height: 1px; background: #d4a84b15;"></div></td></tr>
              <tr>
                <td style="padding: 8px 0; color: #6b6050; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; vertical-align: top;">College</td>
                <td style="padding: 8px 0; color: #e8dcc8; font-size: 14px; font-weight: 600;">${safeCollegeName}</td>
              </tr>
              <tr><td colspan="2" style="padding: 0;"><div style="height: 1px; background: #d4a84b15;"></div></td></tr>
              <tr>
                <td style="padding: 8px 0; color: #6b6050; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; vertical-align: top;">Dakshina</td>
                <td style="padding: 8px 0; color: #f3cf7a; font-size: 16px; font-weight: 700;">₹${safeFee}</td>
              </tr>
            </table>
          </div>
        </div>

        <!-- ═══ WARRIORS TABLE ═══ -->
        <div style="border: 1px solid #d4a84b44; background: #0e0d0a; margin-bottom: 28px;">
          
          <!-- Warriors header -->
          <div style="background: #d4a84b15; border-bottom: 1px solid #d4a84b33; padding: 10px 20px;">
            <p style="color: #d4a84b; font-size: 10px; letter-spacing: 4px; text-transform: uppercase; margin: 0; font-weight: 700;">
              🛡️ Warriors of the Arena
            </p>
          </div>

          <div style="padding: 16px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <thead>
                <tr>
                  <th style="padding: 10px 12px; border-bottom: 1px solid #d4a84b33; text-align: left; color: #6b6050; font-size: 10px; letter-spacing: 2px; text-transform: uppercase;">#</th>
                  <th style="padding: 10px 12px; border-bottom: 1px solid #d4a84b33; text-align: left; color: #6b6050; font-size: 10px; letter-spacing: 2px; text-transform: uppercase;">Name</th>
                  <th style="padding: 10px 12px; border-bottom: 1px solid #d4a84b33; text-align: left; color: #6b6050; font-size: 10px; letter-spacing: 2px; text-transform: uppercase;">Email</th>
                  <th style="padding: 10px 12px; border-bottom: 1px solid #d4a84b33; text-align: left; color: #6b6050; font-size: 10px; letter-spacing: 2px; text-transform: uppercase;">Mobile</th>
                </tr>
              </thead>
              <tbody>
                ${participantRows}
              </tbody>
            </table>
          </div>
        </div>

        <!-- ═══ IMPORTANT NOTE ═══ -->
        <div style="border-left: 3px solid #d4a84b; background: #d4a84b08; padding: 16px 20px; margin-bottom: 28px;">
          <p style="color: #c9b89e; font-size: 13px; margin: 0; line-height: 1.7;">
            🕉️ Guard your <strong style="color: #f3cf7a;">${safeTeamId}</strong> as a sacred mantra — you shall need it on the day of battle. For any queries, reach out to the organizing committee.
          </p>
        </div>

        <!-- ═══ PAYMENT CTA ═══ -->
        <div style="border: 1px solid #d4a84b66; background: linear-gradient(180deg, #1a1505, #0e0d0a); padding: 28px 24px; text-align: center; margin-bottom: 8px;">
          <p style="color: #d4a84b; font-size: 10px; letter-spacing: 4px; text-transform: uppercase; margin: 0 0 8px; font-weight: 700;">
            💰 Complete Your Dakshina
          </p>
          <p style="color: #8a7e6b; font-size: 13px; margin: 0 0 20px; line-height: 1.6;">
            Your enrollment is confirmed, but the offering must be made to seal your place in the arena.
          </p>
          <a href="https://wds-prd.rvei.edu.in:4430/sap/bc/ui5_ui5/sap/zeventregister/#/scode/ADVAYA-2026"
             style="display: inline-block; background: linear-gradient(135deg, #d4a84b, #f3cf7a); color: #0a0a0f; text-decoration: none; padding: 14px 36px; font-size: 12px; font-weight: 900; letter-spacing: 3px; text-transform: uppercase; border: none;">
            ⚔ PAY NOW ⚔
          </a>
          <p style="color: #4a4535; font-size: 11px; margin: 16px 0 0;">
            Registration Fee: <strong style="color: #f3cf7a;">₹${safeFee}</strong>
          </p>

          <!-- Divider -->
          <div style="width: 80px; height: 1px; background: #d4a84b33; margin: 20px auto;"></div>

          <p style="color: #8a7e6b; font-size: 12px; margin: 0 0 16px; line-height: 1.6;">
            After payment, fill the confirmation form with your transaction details:
          </p>
          <a href="${formUrl}"
             style="display: inline-block; background: transparent; color: #f3cf7a; text-decoration: none; padding: 12px 32px; font-size: 11px; font-weight: 900; letter-spacing: 3px; text-transform: uppercase; border: 2px solid #d4a84b;">
            📜 FILL PAYMENT FORM
          </a>
          <p style="color: #4a4535; font-size: 10px; margin: 12px 0 0; font-style: italic;">
            Team ID, Team Head & College Name will be auto-filled
          </p>
        </div>
      </div>

      <!-- ═══ FOOTER ═══ -->
      <div style="border-top: 1px solid #d4a84b33; padding: 20px 24px; text-align: center; background: #08080c;">
        <p style="color: #d4a84b; font-size: 12px; letter-spacing: 3px; margin: 0 0 4px;">॥ धर्मो रक्षति रक्षितः ॥</p>
        <p style="color: #4a4535; font-size: 10px; letter-spacing: 2px; margin: 0;">© 2026 ADVAYA · RV INSTITUTE OF TECHNOLOGY AND MANAGEMENT</p>
      </div>

      <!-- ═══ BOTTOM SACRED BORDER ═══ -->
      <div style="background: linear-gradient(90deg, transparent, #d4a84b, #f3cf7a, #d4a84b, transparent); height: 3px;"></div>
    </div>
  `;

  const mailOptions = {
    from: `"⚔ Advaya 2026" <${process.env.EMAIL_USER}>`,
    to,
    subject: `⚔ ${safeEventName} — Registration Confirmed | Advaya 2026`,
    html,
  };

  return getTransporter().sendMail(mailOptions);
};
