import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { AUTH_ROUTES_PREFIX, PUBLIC_ROUTES } from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  //   const { nextUrl } = req;
  //   const isLoggedIn = !!req.auth;
  //   if (nextUrl.pathname.startsWith(AUTH_ROUTES_PREFIX)) return;
  //   if (nextUrl.pathname.startsWith(PUBLIC_ROUTES[1])) return;
  //   if (nextUrl.pathname === PUBLIC_ROUTES[0]) return;
  //   if (!isLoggedIn) return Response.redirect(new URL("/", nextUrl));
  //   return;
});

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
