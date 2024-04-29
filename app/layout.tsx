import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import ClientOnly from "@/components/ClientOnly";
import RegisterModal from "@/components/modals/RegisterModal";
import LoginModal from "@/components/modals/LoginModal";
import ToasterProvider from "@/providers/ToastProvider";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import RentModal from "@/components/modals/RentModal";
import { currentUser } from "@/lib/auth";
import { SafeUser } from "@/types";
import SearchModal from "@/components/modals/SearchModal";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flyaway",
  description: "Airbnb clone created using NextJs and Spring Webflux!",
  icons: {
    icon: "/favicon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const user = (await currentUser()) as SafeUser;
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={nunito.className}>
          <ClientOnly>
            <ToasterProvider />
            <RegisterModal />
            <LoginModal />
            <RentModal />
            <SearchModal />
            <Navbar currentUser={user} />
          </ClientOnly>
          <div className="pb-20 pt-28">{children}</div>
        </body>
      </html>
    </SessionProvider>
  );
}
