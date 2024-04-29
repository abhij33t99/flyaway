import { currentUser } from "@/lib/auth";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const user = await currentUser();

  if (!user) {
    return NextResponse.error();
  }

  const body = await req.json();

  const { listingId, startDate, endDate, totalPrice } = body;

  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }

  const listingAndReservations = await db.listing.update({
    where: { id: listingId },
    data: {
      reservations: {
        create: {
          userId: user.id,
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  });

  return listingAndReservations;
};
