import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ishaan Aras",
  description: "Mechatronics engineering, embedded systems, robotics, and hardware design. University of Waterloo.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
