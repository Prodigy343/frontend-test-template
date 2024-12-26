import { Archivo } from "next/font/google";
import { MainHeader } from "@/components/header/MainHeader";
import { MainFooter } from "@/components/footer/MainFooter";
import type { Metadata } from "next";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "GamerShop",
  description: "Online game store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${archivo.variable}`}>
        <MainHeader/>
        {children}
        <MainFooter/>
      </body>
    </html>
  );
}
