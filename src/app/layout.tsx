import type { Metadata } from "next";
import { Roboto, Work_Sans } from "next/font/google";
import { VisualEditingWrapper } from "@/components/VisualEditingWrapper";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Finndoff",
  description: "Finndoff.no",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <body
        className={`${roboto.variable} ${workSans.variable} antialiased`}
      >
        {children}
        <VisualEditingWrapper />
      </body>
    </html>
  );
}
