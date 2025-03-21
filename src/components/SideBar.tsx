import React from "react";

function SideBar() {
  return (
    // 모든 내용은 로그인 전제
    <section className="m-2 mt-4 p-4 bg-container-bg-primary border border-transparent rounded-2xl h-full">
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
            <p className="text-bg-primary font-semibold">Liked Songs</p>
            <p className="text-bg-primary text-sm">Playlist - 120songs</p>
          </div>
        </div>
        <div className="flex w-full bg-slate-200 p-2">
          <div className="bg-gray-500 w-1/4 h-10">
            <p className="text-xs p-2">image</p>
          </div>
          <div>
            <p className="text-bg-primary font-semibold">설레는 노래</p>
            <p className="text-bg-primary text-sm">Playlist - 30songs</p>
          </div>
        </div>
      </article>
    </section>
  );
}

export default SideBar;
