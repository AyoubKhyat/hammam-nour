import { Resend } from "resend";
import type { BookingData } from "./sheets";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

function confirmationHtml(b: BookingData) {
  return `
<div style="max-width:600px;margin:0 auto;font-family:Georgia,'Times New Roman',serif;background:#f5efe6;padding:0;">
  <div style="background:#1a1410;padding:32px 24px;text-align:center;">
    <h1 style="font-size:24px;letter-spacing:0.2em;color:#faf7f2;margin:0;font-weight:400;">HAMMAM NOUR</h1>
  </div>

  <div style="padding:40px 32px;">
    <h2 style="font-size:28px;color:#1a1410;text-align:center;margin:0 0 8px;font-weight:400;">Your Ritual is Confirmed</h2>
    <p style="color:#1a1410;opacity:0.5;text-align:center;font-size:14px;margin:0 0 32px;">
      Booking ref: ${b.id}
    </p>

    <p style="color:#1a1410;opacity:0.7;text-align:center;line-height:1.8;font-size:15px;margin:0 0 32px;">
      Dear ${b.name}, we look forward to welcoming you to Hammam Nour.
    </p>

    <div style="background:#faf7f2;border:1px solid #e8d5b7;padding:24px;margin:0 0 32px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="color:#1a1410;opacity:0.5;padding:10px 0;font-size:14px;">Treatment</td>
          <td style="text-align:right;color:#1a1410;font-size:14px;">${b.treatmentName}</td>
        </tr>
        <tr>
          <td style="color:#1a1410;opacity:0.5;padding:10px 0;font-size:14px;">Date</td>
          <td style="text-align:right;color:#1a1410;font-size:14px;">${b.date}</td>
        </tr>
        <tr>
          <td style="color:#1a1410;opacity:0.5;padding:10px 0;font-size:14px;">Time</td>
          <td style="text-align:right;color:#1a1410;font-size:14px;">${b.time}</td>
        </tr>
        <tr>
          <td style="color:#1a1410;opacity:0.5;padding:10px 0;font-size:14px;">Duration</td>
          <td style="text-align:right;color:#1a1410;font-size:14px;">${b.duration}</td>
        </tr>
        <tr style="border-top:1px solid #e8d5b7;">
          <td style="color:#1a1410;font-weight:bold;padding:14px 0 8px;font-size:14px;">Total</td>
          <td style="text-align:right;color:#c4532a;font-size:22px;font-family:Georgia,serif;">${b.price} MAD</td>
        </tr>
      </table>
    </div>

    ${b.requests ? `<p style="color:#1a1410;opacity:0.6;font-size:13px;"><strong>Special requests:</strong> ${b.requests}</p>` : ""}

    <div style="text-align:center;margin:32px 0 0;padding:24px 0 0;border-top:1px solid #e8d5b7;">
      <p style="color:#1a1410;opacity:0.4;font-size:12px;line-height:1.8;margin:0;">
        42 Derb El Hammam, Medina, Marrakesh &bull; +212 524 389 100<br>
        Please arrive 15 minutes before your appointment.
      </p>
    </div>
  </div>
</div>`;
}

function notificationHtml(b: BookingData) {
  return `
<div style="font-family:Arial,sans-serif;max-width:500px;padding:24px;">
  <h2 style="margin:0 0 16px;">New Booking — ${b.id}</h2>
  <table style="width:100%;font-size:14px;border-collapse:collapse;">
    <tr><td style="padding:6px 0;color:#666;">Guest</td><td>${b.name}</td></tr>
    <tr><td style="padding:6px 0;color:#666;">Email</td><td>${b.email}</td></tr>
    <tr><td style="padding:6px 0;color:#666;">Phone</td><td>${b.phone || "—"}</td></tr>
    <tr><td style="padding:6px 0;color:#666;">Treatment</td><td>${b.treatmentName}</td></tr>
    <tr><td style="padding:6px 0;color:#666;">Date</td><td>${b.date}</td></tr>
    <tr><td style="padding:6px 0;color:#666;">Time</td><td>${b.time}</td></tr>
    <tr><td style="padding:6px 0;color:#666;">Duration</td><td>${b.duration}</td></tr>
    <tr><td style="padding:6px 0;color:#666;">Price</td><td style="font-weight:bold;">${b.price} MAD</td></tr>
    ${b.requests ? `<tr><td style="padding:6px 0;color:#666;">Requests</td><td>${b.requests}</td></tr>` : ""}
  </table>
</div>`;
}

export async function sendBookingEmails(booking: BookingData) {
  const resend = getResend();
  if (!resend) return false;

  const from = process.env.RESEND_FROM_EMAIL || "Hammam Nour <onboarding@resend.dev>";

  await resend.emails.send({
    from,
    to: booking.email,
    subject: `Booking Confirmed — ${booking.treatmentName} | Hammam Nour`,
    html: confirmationHtml(booking),
  });

  const notifyEmail = process.env.BOOKING_NOTIFICATION_EMAIL;
  if (notifyEmail) {
    await resend.emails.send({
      from,
      to: notifyEmail,
      subject: `New Booking: ${booking.treatmentName} — ${booking.name}`,
      html: notificationHtml(booking),
    });
  }

  return true;
}
