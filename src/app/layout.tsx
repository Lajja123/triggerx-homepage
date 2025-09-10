import type { Metadata } from "next";
import "./globals.css";
import ContextProvider from "@/context";
import { headers } from "next/headers"; // added

export const metadata: Metadata = {
  title: "TriggerX - Homepage",
  description: "TriggerX homepage with modern typography and responsive design",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersObj = await headers();

  const cookies = headersObj.get("cookie");

  return (
    <html lang="en">
      <body className="relative min-h-screen overflow-hidden">
        <ContextProvider cookies={cookies}>{children}</ContextProvider>
      </body>
    </html>
  );
}
