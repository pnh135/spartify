import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
// import SideBar from "@/components/SideBar";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Documents",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="fixed top-0 left-0 w-full h-16 bg-orange-500">
          <nav className="flex h-full items-center px-4">
            <Link href="/">메인</Link>
            <Link href="/login">로그인</Link>
            <Link href="/profile">프로필</Link>
          </nav>
        </header>

        <aside className="fixed top-16 left-0 w-[240px] h-[calc(100vh-4rem)] bg-purple-500"></aside>

        <div className="ml-[240px] mt-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <main>{children}</main>
          <footer className="bg-green-500">footer</footer>
        </div>
      </body>
    </html>
  );
}
