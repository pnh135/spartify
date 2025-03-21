import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
// import SideBar from "@/components/SideBar";

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
      <body className="bg-bg-primary text-white">
        <header className="fixed top-0 left-0 w-full h-16 bg-container-bg-primary">
          <nav className="flex h-full justify-between items-center px-4">
            <section>
              <Link href="/" className="flex flex-row justify-center">
                <div className="bg-accent border border-transparent w-10 h-10 rounded-full" />
                {/* 로고가 들어갈 곳 */}
                <p className="p-2">Spartify</p>
              </Link>
            </section>
            <section>
              <input
                placeholder="What do you want to play?"
                className="hidden md:block"
              />
            </section>
            <section className="flex gap-7">
              <Link href="/login">
                <p>로그인</p>
              </Link>
              {/* 로그인 */}
              <Link href="/profile">
                <p>프로필</p>
              </Link>
              {/* 프로필 이미지 */}
            </section>
          </nav>
        </header>

        <aside className="fixed top-16 left-0 w-[240px] h-[calc(100vh-4rem)] bg-purple-500"></aside>

        <div className="ml-[240px] mt-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <main className="bg-container-bg-primary m-4 border border-transparent rounded-lg">
            {children}
          </main>
          <footer className="bg-green-500 relative">footer</footer>
        </div>
      </body>
    </html>
  );
}
