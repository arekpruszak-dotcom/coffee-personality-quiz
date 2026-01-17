import type { Metadata } from "next";
import { Libre_Baskerville, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const libreBaskerville = Libre_Baskerville({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: "--font-libre-baskerville",
});

const sourceSans = Source_Sans_3({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-source-sans",
});

export const metadata: Metadata = {
  title: "Quiz Kawowej Osobowości | Basecamp Coffee",
  description: "Odkryj swoją kawową osobowość! Odpowiedz na 5 pytań i dowiedz się, jaki typ kawosza w Tobie drzemie.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${libreBaskerville.variable} ${sourceSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
