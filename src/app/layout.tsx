import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TriggerX - Homepage",
  description: "Automate Tasks Effortlessly",

  openGraph: {
    title: "TriggerX - Homepage",
    description: "Automate Tasks Effortlessly",
    url: `https://triggerx-homepage.vercel.app/`,
    siteName: "TriggerX - Homepage",
    images: [
      {
        url: `https://triggerx-homepage.vercel.app/OGImages/triggerx.png`,
        width: 1200,
        height: 630,
        alt: "TriggerX",
        type: "image/png",
      },
    ],
    type: "website",
  },
  alternates: {
    canonical: `https://triggerx-homepage.vercel.app/`,
  },
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
