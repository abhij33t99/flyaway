import { currentUser } from "@/lib/auth"
import db from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    const user = await currentUser();
    if (!user){
        return NextResponse.error()
    }

    const body = await req.json();

    const {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        location,
        price
    } = body;

    const listing = await db.listing.create({
        data : {
            title,
            description,
            imageSrc,
            category,
            roomCount,
            bathroomCount,
            guestCount,
            locationValue: location.value,
            price: parseInt(price, 10),
            userId: user.id as string
        }
    });

    return NextResponse.json(listing);

}