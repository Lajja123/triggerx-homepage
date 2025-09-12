import type { Metadata } from "next";
import "./globals.css";
import ContextProvider from "@/context";

export const metadata: Metadata = {
  title: "TriggerX - Homepage",
  description: "TriggerX homepage with modern typography and responsive design",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative min-h-screen overflow-hidden">{children}</body>
    </html>
  );
}
