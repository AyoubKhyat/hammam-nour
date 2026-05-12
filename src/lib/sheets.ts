import { google } from "googleapis";

export interface BookingData {
  id: string;
  treatment: string;
  treatmentName: string;
  date: string;
  time: string;
  duration: string;
  name: string;
  email: string;
  phone: string;
  requests: string;
  price: number;
}

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!email || !key) return null;

  return new google.auth.GoogleAuth({
    credentials: { client_email: email, private_key: key },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

function getSheetId() {
  return process.env.GOOGLE_SHEET_ID || null;
}

export async function addBooking(booking: BookingData): Promise<boolean> {
  const auth = getAuth();
  const sheetId = getSheetId();
  if (!auth || !sheetId) return false;

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "Bookings!A:K",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          booking.id,
          booking.treatmentName,
          booking.date,
          booking.time,
          booking.duration,
          booking.name,
          booking.email,
          booking.phone,
          booking.requests,
          booking.price,
          new Date().toISOString(),
        ],
      ],
    },
  });

  return true;
}

export async function getBookedSlots(): Promise<
  { date: string; time: string }[]
> {
  const auth = getAuth();
  const sheetId = getSheetId();
  if (!auth || !sheetId) return [];

  const sheets = google.sheets({ version: "v4", auth });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: "Bookings!C:D",
  });

  const rows = res.data.values || [];
  return rows
    .filter((row) => row[0] && row[1])
    .map(([date, time]) => ({ date, time }));
}
