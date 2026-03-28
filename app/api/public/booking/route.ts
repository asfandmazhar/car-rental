import { connectDB } from "@/config/dbConfig";
import Booking from "@/models/bookingModel";
import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
export const dynamic = "force-dynamic";

interface BookingRequestBody {
  fullName: string;
  email: string;
  phoneNumber: string;
  numOfPassengers: number;
  carId: string;
  pickUpLocation: string;
  pickUpDateAndTime: string;
  dropOffLocation: string;
  dropOffDateAndTime?: string;
  note?: string;
  price: number;
  childSeat: "yes" | "no";
  paymentMethod: "cash" | "card";
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body: BookingRequestBody = await request.json();

    const {
      fullName,
      email,
      phoneNumber,
      numOfPassengers,
      carId,
      pickUpLocation,
      pickUpDateAndTime,
      dropOffLocation,
      dropOffDateAndTime,
      note,
      price,
      childSeat,
      paymentMethod,
    } = body;

    // --- 1. PRE-SAVE VALIDATION LOGIC ---
    const errors: string[] = [];

    // Email Regex
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!fullName || fullName.trim().length < 2)
      errors.push("Full name is too short.");
    if (!email || !emailRegex.test(email))
      errors.push("Please provide a valid email address.");
    if (!phoneNumber || phoneNumber.trim().length < 10)
      errors.push("Valid phone number is required.");
    if (!carId) errors.push("Please select a valid vehicle.");
    if (numOfPassengers < 1) errors.push("At least 1 passenger is required.");
    if (!price || price <= 0) errors.push("Invalid price calculation.");

    // Date Validation
    const pickupDate = new Date(pickUpDateAndTime);
    const now = new Date();

    if (isNaN(pickupDate.getTime())) {
      errors.push("Invalid pickup date format.");
    } else if (pickupDate < now) {
      errors.push("Pickup time cannot be in the past.");
    }

    // Return Trip Date Validation
    if (dropOffDateAndTime) {
      const returnDate = new Date(dropOffDateAndTime);
      if (isNaN(returnDate.getTime())) {
        errors.push("Invalid return date format.");
      } else if (returnDate <= pickupDate) {
        errors.push("Return time must be after the pickup time.");
      }
    }

    // Return Early if Errors Exist
    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, message: errors[0], allErrors: errors },
        { status: 400 },
      );
    }

    // --- 2. DATABASE PERSISTENCE ---
    const newBooking = new Booking({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phoneNumber: phoneNumber.trim(),
      numOfPassengers,
      carId,
      pickUpLocation: pickUpLocation.trim(),
      pickUpDateAndTime: pickupDate,
      dropOffLocation: dropOffLocation.trim(),
      dropOffDateAndTime: dropOffDateAndTime
        ? new Date(dropOffDateAndTime)
        : null,
      note: note?.trim() || "",
      price,
      childSeat: childSeat || "no",
      paymentMethod: paymentMethod || "cash",
      status: "pending",
    });

    await newBooking.save();

    if (body.paymentMethod === "card") {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd", // or your currency
              product_data: {
                name: `Car Booking: ${body.pickUpLocation} to ${body.dropOffLocation}`,
              },
              unit_amount: Math.round(body.price * 100), // Stripe expects cents
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        // The URL Stripe redirects to after success
        success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/success?bookingId=${newBooking._id}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/booking`,
        metadata: {
          bookingId: newBooking._id.toString(),
        },
      });

      // Update the booking with the session ID for tracking
      newBooking.stripeSessionId = session.id;
      await newBooking.save();

      return NextResponse.json({
        success: true,
        url: session.url, // Send this URL back to the frontend
        bookingId: newBooking._id,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Booking confirmed successfully!",
        bookingId: newBooking._id,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Booking Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later." },
      { status: 500 },
    );
  }
}
