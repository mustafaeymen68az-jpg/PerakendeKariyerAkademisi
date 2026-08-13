import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: {
    default: "Perakende Kariyer Akademisi – Perakendecilikte Kariyer Yolculuğunuzun Adresi",
    template: "%s | Perakende Kariyer Akademisi",
  },
  description: "Mağaza çalışanından CEO ve Genel Müdüre kadar perakende sektöründeki tüm pozisyonlar için yapılandırılmış dijital eğitim, yetkinlik ve kariyer gelişim platformu.",
  keywords: ["perakende kariyer akademisi", "perakende eğitimi", "market zinciri akademisi", "taze gıda akademisi", "kasiyer eğitimi", "mağaza müdürü eğitimi", "yapay zeka perakende"],
  authors: [{ name: "Perakende Kariyer Akademisi" }],
  metadataBase: new URL("https://www.perakendekariyer.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} ${montserrat.variable} scroll-smooth`}>
      <body className="bg-[#F4F7F9] text-[#1D2A38] font-sans antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
