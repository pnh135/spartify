"use client";

import useUserStore from "@/store/useUserstore";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SideBar() {
  const { isLogin } = useUserStore();
  const pathname: string = usePathname();

  if (pathname === "/login" || pathname === "/signup") return <></>;

  return (
    <aside className="fixed top-16 left-0 w-[240px] h-[calc(100vh-4rem)]">
      <section className="m-2 mt-4 p-4 text-center bg-gunmetal border border-transparent rounded-2xl h-full">
        {!isLogin && (
          <div className="p-2 rounded-md">
            <p className="text-2xl p-1">Make Your Own PlayList</p>
            <p className="text-base m-2 pb-2">
              나만의 플레이 리스트를 바로 만들어 보세요.
            </p>
            <Link
              href={"/login"}
              className="bg-offwhite text-gunmetal font-medium p-2 rounded-full"
            >
              플레이리스트 만들기
            </Link>
          </div>
        )}
        {isLogin && (
          <>
            <div className="flex flex-row justify-between">
              <p className="text-2xl">My Playlists</p>
              {/* 버튼의 경우 추후 삭제될 가능성 존재 */}
              <button className="border border-transparent bg-gray-500 rounded-md">
                Create
              </button>
            </div>
            <article className="flex flex-col mt-2 text-center gap-3">
              <div className="flex w-full bg-slate-200 p-2">
                <div className="bg-gray-500 w-1/4 h-10">
                  <p className="text-xs p-2">image</p>
                </div>
                <div>
                  <p className="text-charcoal font-semibold">Liked Songs</p>
                  <p className="text-charcoal text-sm">Playlist - 120songs</p>
                </div>
              </div>
            </article>
          </>
        )}
      </section>
    </aside>
  );
}

export default SideBar;
