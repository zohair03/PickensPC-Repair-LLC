const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const companyName = 'Pickens Repair LLC';
const companyAddress = '19809 County Hwy 48, Ardmore, AL 73401';

function baseLayout(title, content) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f5f7; font-family: Arial, Helvetica, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f5f7; padding: 24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; max-width:600px; width:100%;">

          <!-- Header -->
          <tr>
            <td style="background-color:#1e1e1e; padding:20px 32px;">
              <span style="color:#ffffff; font-size:18px; font-weight:600; font-family: Arial, Helvetica, sans-serif;">
                ${companyName}
              </span>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px; background-color:#f8f9fa; border-top:1px solid #e9ecef;">
              <p style="margin:0 0 8px 0; font-family: Arial, Helvetica, sans-serif; font-size:12px; color:#868e96; line-height:1.5;">
                This is a transactional message sent because you have an appointment with ${companyName}.
              </p>
              <p style="margin:0; font-family: Arial, Helvetica, sans-serif; font-size:12px; color:#868e96; line-height:1.5;">
                ${companyName}, ${companyAddress}<br />
                <a href="${siteUrl}" style="color:#868e96;">Unsubscribe from these emails</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function heading(text) {
  return `<h2 style="margin:0 0 16px 0; font-family: Arial, Helvetica, sans-serif; font-size:20px; color:#1a1a1a;">${text}</h2>`;
}

function paragraph(text) {
  return `<p style="margin:0 0 16px 0; font-family: Arial, Helvetica, sans-serif; font-size:14px; color:#3c3c3c; line-height:1.6;">${text}</p>`;
}

function button(text, url) {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:8px;">
      <tr>
        <td style="border-radius:6px; background-color:#2563eb;">
          <a href="${url}" style="display:inline-block; padding:12px 24px; color:#ffffff; text-decoration:none; font-family: Arial, Helvetica, sans-serif; font-size:14px; font-weight:600; border-radius:6px;">
            ${text}
          </a>
        </td>
      </tr>
    </table>
  `;
}

function statusBadge(text, type) {
  const colors = {
    confirmed: { bg: '#d1fae5', color: '#065f46' },
    cancelled: { bg: '#fee2e2', color: '#991b1b' },
    rescheduled: { bg: '#fef3c7', color: '#92400e' },
  };
  const c = colors[type] || colors.confirmed;
  return `
    <span style="display:inline-block; padding:4px 12px; border-radius:12px; font-size:12px; font-weight:600; font-family: Arial, Helvetica, sans-serif; background-color:${c.bg}; color:${c.color};">
      ${text}
    </span>
  `;
}

function appointmentDetails(appt) {
  const row = (label, value) => `
    <tr>
      <td style="padding:10px 16px; background-color:#f8f9fa; border-bottom:1px solid #e9ecef; font-family: Arial, Helvetica, sans-serif; font-size:13px; color:#6c757d; font-weight:600; width:140px; vertical-align:top;">
        ${label}
      </td>
      <td style="padding:10px 16px; background-color:#ffffff; border-bottom:1px solid #e9ecef; font-family: Arial, Helvetica, sans-serif; font-size:14px; color:#212529; vertical-align:top;">
        ${value}
      </td>
    </tr>
  `;

  return `
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse; border:1px solid #e9ecef; border-radius:6px; overflow:hidden; margin-bottom:16px;">
      ${row('Name', appt.user_name)}
      ${row('Email', appt.user_email)}
      ${row('Phone', appt.user_phone)}
      ${row('Date', appt.appointment_date)}
      ${row('Time', appt.appointment_time)}
      ${appt.notes ? row('Notes', appt.notes) : ''}
    </table>
  `;
}

// Simple plain-text fallback generator (strip tags, collapse whitespace)
function toPlainText(html) {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// ---- Booking Confirmed ----

export function bookingConfirmedUser(appt) {
  const manageUrl = `${siteUrl}/appointment/${appt.id}`;
  const html = baseLayout('Appointment Confirmed', `
    ${heading('Your appointment is confirmed')}
    ${paragraph(`Hi ${appt.user_name}, thank you for booking with us. Your appointment is confirmed — details are below.`)}
    ${appointmentDetails(appt)}
    ${paragraph('If you need to make changes, you can reschedule or cancel using the button below.')}
    ${button('Manage My Appointment', manageUrl)}
  `);
  return {
    subject: `Appointment confirmed for ${appt.appointment_date}`,
    html,
    text: toPlainText(html),
  };
}

export function bookingConfirmedAdmin(appt) {
  const adminUrl = `${siteUrl}/admin/appointments/${appt.id}`;
  const html = baseLayout('New Appointment', `
    ${heading('New appointment booked')}
    ${paragraph('A new appointment has just been scheduled. Details below.')}
    ${appointmentDetails(appt)}
    ${button('View in Dashboard', adminUrl)}
  `);
  return {
    subject: `New appointment: ${appt.user_name} on ${appt.appointment_date}`,
    html,
    text: toPlainText(html),
  };
}

// ---- Rescheduled ----

export function rescheduledUser(appt) {
  const manageUrl = `${siteUrl}/appointment/${appt.id}`;
  const html = baseLayout('Appointment Rescheduled', `
    ${heading('Your appointment has been rescheduled')}
    ${statusBadge('Rescheduled', 'rescheduled')}
    ${paragraph(`Hi ${appt.user_name}, your appointment has been moved to a new date and time. Updated details are below.`)}
    ${appointmentDetails(appt)}
    ${button('Manage My Appointment', manageUrl)}
  `);
  return {
    subject: `Your appointment has been rescheduled to ${appt.appointment_date}`,
    html,
    text: toPlainText(html),
  };
}

export function rescheduledAdmin(appt) {
  const adminUrl = `${siteUrl}/admin/appointments/${appt.id}`;
  const html = baseLayout('Appointment Rescheduled', `
    ${heading('Appointment rescheduled')}
    ${paragraph('An appointment has been rescheduled by an admin.')}
    ${appointmentDetails(appt)}
    ${button('View in Dashboard', adminUrl)}
  `);
  return {
    subject: `Rescheduled: ${appt.user_name} → ${appt.appointment_date} ${appt.appointment_time}`,
    html,
    text: toPlainText(html),
  };
}

// ---- Cancelled ----

export function cancelledUser(appt) {
  const html = baseLayout('Appointment Cancelled', `
    ${heading('Your appointment has been cancelled')}
    ${statusBadge('Cancelled', 'cancelled')}
    ${paragraph(`Hi ${appt.user_name}, your appointment on <strong>${appt.appointment_date}</strong> at <strong>${appt.appointment_time}</strong> has been cancelled.`)}
    ${appt.cancellation_reason ? `
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse; border:1px solid #e9ecef; border-radius:6px; overflow:hidden; margin-bottom:16px;">
        <tr>
          <td style="padding:10px 16px; background-color:#f8f9fa; font-family: Arial, Helvetica, sans-serif; font-size:13px; color:#6c757d; font-weight:600; width:140px;">Reason</td>
          <td style="padding:10px 16px; background-color:#ffffff; font-family: Arial, Helvetica, sans-serif; font-size:14px; color:#212529;">${appt.cancellation_reason}</td>
        </tr>
      </table>
    ` : ''}
    ${paragraph('If you\'d like to book a new appointment, we\'d be happy to help.')}
    ${button('Book a New Appointment', siteUrl)}
  `);
  return {
    subject: `Your appointment on ${appt.appointment_date} has been cancelled`,
    html,
    text: toPlainText(html),
  };
}

export function cancelledAdmin(appt) {
  const html = baseLayout('Appointment Cancelled', `
    ${heading('Appointment cancelled')}
    ${paragraph('An appointment has been cancelled by an admin.')}
    ${appointmentDetails(appt)}
    ${appt.cancellation_reason ? `
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse; border:1px solid #e9ecef; border-radius:6px; overflow:hidden;">
        <tr>
          <td style="padding:10px 16px; background-color:#f8f9fa; font-family: Arial, Helvetica, sans-serif; font-size:13px; color:#6c757d; font-weight:600; width:140px;">Reason</td>
          <td style="padding:10px 16px; background-color:#ffffff; font-family: Arial, Helvetica, sans-serif; font-size:14px; color:#212529;">${appt.cancellation_reason}</td>
        </tr>
      </table>
    ` : ''}
  `);
  return {
    subject: `Cancelled: ${appt.user_name} on ${appt.appointment_date}`,
    html,
    text: toPlainText(html),
  };
}