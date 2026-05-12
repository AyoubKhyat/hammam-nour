import { NextResponse } from "next/server";
import { getBookedSlots } from "@/lib/sheets";

export async function GET() {
  try {
    const booked = await getBookedSlots();
    return NextResponse.json({ booked });
  } catch (error) {
    console.error("Availability error:", error);
    return NextResponse.json({ booked: [] });
  }
}
