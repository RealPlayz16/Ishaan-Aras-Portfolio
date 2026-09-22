import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ishaan Aras — Mechatronics & Hardware Engineering",
  description: "Portfolio of Ishaan Aras — embedded systems, robotics, hardware design. Seeking Winter 2027 co-op.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
