import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Ivan Ozerets",
  description: "ML Engineer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${dmMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <head>
        <style>{`
          .glass {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(12px) !important;
            -webkit-backdrop-filter: blur(12px) !important;
            border: 0.5px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
          }

          .glass-card {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(12px) !important;
            -webkit-backdrop-filter: blur(12px) !important;
            border: 0.5px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            transition: background 0.3s, border-color 0.3s;
          }

          .glass-card:hover {
            background: #151515;
            border-color: rgba(0, 255, 200, 0.2);
          }

          .glass-card-course:hover {
            background: #151515;
            border-color: rgba(167, 139, 250, 0.2);
          }

          .glass-card-app:hover {
            background: #151515;
            border-color: rgba(96, 165, 250, 0.2);
          }

          .glass-card-book:hover {
            background: #151515;
            border-color: rgba(251, 146, 60, 0.2);
          }
        `}</style>
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
