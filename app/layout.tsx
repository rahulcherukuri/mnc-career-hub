import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MNC Career Hub | Official Career Portals",
  description:
    "Find official career portals of leading MNCs in India. Search companies, filter by technology and location, and apply directly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
