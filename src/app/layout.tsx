import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import LoadingAnimation from "@/components/LoadingAnimation";
import Footer from "@/components/Footer";
import MouseFollower from "../components/MouseFollower";

export const metadata: Metadata = {
  title: "TriggerX - Homepage",
  description: "TriggerX homepage with modern typography and responsive design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <MouseFollower /> */}
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
