import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import db from "@/lib/db";
import authConfig from "@/auth.config";
import { getUserById } from "./data/user";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    callbacks: {
        session: async ({ session, token }) => {
            if (token.sub)
                session.user.id = token.sub;
            if (token.name)
                session.user.name = token.name;
            if (token.email)
                session.user.email = token.email;
            // if(token.favouriteIds)
            //     session.user.favouriteIds = token.favouriteIds;
            return session;

        },
        jwt: async ({ token }) => {
            if (!token.sub) return null;
            const user = await getUserById(token.sub);
            if (!user) {
                return null;
            }
            token.name = user.name;
            token.email = user.email;
            // token.favouriteIds = user.favouriteIds;
            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    secret: process.env.NEXT_AUTH_SECRET,
    ...authConfig
}
)