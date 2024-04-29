import { auth } from "@/auth";
import db from "@/lib/db";
import { SafeUser } from "@/types";

export const currentUser  = async ()  => {
    const session = await auth();
    if (!session?.user?.email) {
        return null;
    }

    const user = await db.user.findUnique({
        where: {
            email: session.user.email as string
        }
    });

    if (!user) {
        return null;
    }

    return {
        ...user,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
        emailVerified: user.emailVerified?.toISOString() || null,
    };
}

// export const currentUserRole = async () => {
//     const session = await auth();
//     return session?.user.role;
// }