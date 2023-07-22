import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "app/components/header/Header";
import Footer from "app/components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather",
  description: "Axon network test assignment",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="max-w-screen-xl mx-auto p-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
