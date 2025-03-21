import React from "react";

function SearchPage() {
  return (
    <div className="flex flex-col rounded-xl bg-container-bg-primary m-6 h-screen ">
      <span className=" text-2xl font-bold p-4">검색 결과</span>
      <div className="flex justify-center  gap-32 mt-10">
        <div className="bg-bg-primary w-[400px] h-[250px] rounded-xl flex flex-col  p-4 items-center justify-center gap-6">
          <div className="w-[150px] h-[150px] rounded-full bg-white"></div>
          <span>검색한 그룹 또는 아티스트</span>
        </div>
        <div className="flex flex-col bg-bg-primary w-[400px] h-[250px] rounded-xl p-4 justify-between">
          <div className="w-full h-[36px] rounded-md bg-white"></div>
          <div className="w-full h-[36px] rounded-md bg-white"></div>
          <div className="w-full h-[36px] rounded-md bg-white"></div>
          <div className="w-full h-[36px] rounded-md bg-white"></div>
        </div>
      </div>
      <section>
        <span className="font-bold text-2xl p-4 overflow-x-auto whitespace-nowrap scroll-smooth">
          앨범 리스트
        </span>
        <div className="w-[100px] h-[100px] bg-white text-black">앨범 1</div>
      </section>
      <section>
        <span className="font-bold text-2xl p-4">연관 앨범</span>
        <div></div>
      </section>
    </div>
  );
}

export default SearchPage;
