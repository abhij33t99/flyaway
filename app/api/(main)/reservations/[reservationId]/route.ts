import { currentUser } from "@/lib/auth";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export const DELETE = async ({ reservationId }: { reservationId: string }) => {
  const user = await currentUser();

  if (!user) {
    return NextResponse.error();
  }

  if (!reservationId || typeof reservationId !== "string") {
    throw new Error("Invalid Id");
  }

  const reservations = await db.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [{ userId: user.id }, { listing: { userId: user.id } }],
    },
  });

  return NextResponse.json(reservations);
};
