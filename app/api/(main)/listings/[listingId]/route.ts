import { currentUser } from "@/lib/auth";
import db from "@/lib/db";
import { NextResponse } from "next/server";
import { string } from "zod";

interface IParams {
  listingId?: string;
}

export const DELETE = async (req: Request, { params }: { params: IParams }) => {
  const user = await currentUser();
  if (!user) {
    return NextResponse.error();
  }

  const { listingId } = params;
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid Id");
  }

  const listing = await db.listing.deleteMany({
    where: {
      id: listingId,
      userId: user.id,
    },
  });

  return NextResponse.json(listing);
};
