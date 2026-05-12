import { NextResponse } from "next/server";
import { addBooking, type BookingData } from "@/lib/sheets";
import { sendBookingEmails } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const booking: BookingData = {
      id: `HN-${Date.now().toString(36).toUpperCase()}`,
      treatment: body.treatment,
      treatmentName: body.treatmentName,
      date: body.date,
      time: body.time,
      duration: body.duration,
      name: body.name,
      email: body.email,
      phone: body.phone || "",
      requests: body.requests || "",
      price: body.price,
    };

    const [sheetSaved, emailSent] = await Promise.allSettled([
      addBooking(booking),
      sendBookingEmails(booking),
    ]);

    return NextResponse.json({
      success: true,
      bookingId: booking.id,
      sheetSaved: sheetSaved.status === "fulfilled" && sheetSaved.value,
      emailSent: emailSent.status === "fulfilled" && emailSent.value,
    });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process booking" },
      { status: 500 }
    );
  }
}
