import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#080B09",
};

export const metadata: Metadata = {
  title: "Ishaan Aras, embedded systems and robotics",
  description:
    "Mechatronics engineering at the University of Waterloo. Embedded systems, robotics, and edge AI, from schematic to deployment. Open to W2027 co-op.",
  openGraph: {
    title: "Ishaan Aras, embedded systems and robotics",
    description:
      "Mechatronics engineering at the University of Waterloo. Embedded systems, robotics, and edge AI, from schematic to deployment.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
