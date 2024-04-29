import { currentUser } from "@/lib/auth"
import db from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request, { params }: { params: { listingId: string | null } }) => {
    const user = await currentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId) {
        throw new Error('Invalid ID');
    }

    let favouriteIds = [...(user?.favouriteIds || [])];

    favouriteIds.push(listingId);

    const updatedUser = await db.user.update({
        where: {
            id: user?.id
        },
        data: {
            favouriteIds
        }
    });

    return NextResponse.json(updatedUser);
}

export const DELETE = async (req: Request, { params }: { params: { listingId: string | null } }) => {
    const user = await currentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId) {
        throw new Error('Invalid ID');
    }

    let favouriteIds = [...(user?.favouriteIds || [])];
    
    favouriteIds = favouriteIds.filter(id => id !== listingId);

    const updatedUser = await db.user.update({
        where: {
            id: user?.id
        },
        data: {
            favouriteIds
        }
    });

    return NextResponse.json(updatedUser);
}