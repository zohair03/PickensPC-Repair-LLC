import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * @param {{ to: string, subject: string, html: string }} options
 */
export async function sendEmail({ to, subject, html }) {
  // Collect all recipients. We send to the customer's email and copy testing/admin emails.
  const recipients = [];
  if (to) {
    if (Array.isArray(to)) {
      recipients.push(...to);
    } else {
      recipients.push(to);
    }
  }

  const testEmails = [];
  testEmails.forEach((email) => {
    if (!recipients.includes(email)) {
      recipients.push(email);
    }
  });

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM,
    to: recipients,
    subject: subject,
    html: html,
  });

  if (error) {
    throw new Error(error.message);
  }
}