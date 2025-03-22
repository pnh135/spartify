"use client";
// 마이페이지에서 사용자와의 상호작용이 필요하니 클라이언트 컴포넌트로 구현

import React, { useState } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import { FaPen } from "react-icons/fa";
import { RiFileCopyLine } from "react-icons/ri";
import { HiMiniUser } from "react-icons/hi2";
import AlbumList from "../../../components/AlbumList";
import type { album } from "../../../types/album";
import { AlertInfo } from "@/common/Alert";

//   주석달기
// 앨범 컴포넌트 Link태그로 감싸서 디테일 창으로 넘기기

export const catData: album[] = [
  {
    title: "cat",
    artist: "Dog",
    image: "/../../public/cat.jpeg",
  },
  {
    title: "dog",
    artist: "Cat",
    image: "/../../public/dog.jpeg",
  },
  {
    title: "bird",
    artist: "Parrow",
    image: "/../../public/cat.jpeg",
  },
  {
    title: "cat",
    artist: "Dog",
    image: "/../../public/cat.jpeg",
  },
  {
    title: "dog",
    artist: "Cat",
    image: "/../../public/cat.jpeg",
  },
  {
    title: "cat",
    artist: "Dog",
    image: "/../../public/cat.jpeg",
  },
  {
    title: "dog",
    artist: "Cat",
    image: "/../../public/cat.jpeg",
  },
];

function ProfilePage() {
  const [toggle, setToggle] = useState(false);

  const handleSettingToggle = () => {
    AlertInfo("확인용 코드");
    setToggle(!toggle);
  };

  return (
    <main className=" bg-zinc-950 rounded-2xl m-6 min-h-screen pb-10">
      <section className="w-full h-[250px] bg-gradient-to-b from-zinc-600 to-zinc-800 rounded-t-2xl flex flex-row items-center mb-8">
        <figure className="w-[200px] h-[200px] flex justify-center items-center text-7xl text-zinc-500 bg-zinc-800 drop-shadow-md rounded-full ml-10">
          <HiMiniUser />{" "}
          {/* 여기에 useState를 사용해서 사용자 프로필 사진 반환 */}
        </figure>
        <section className="text-white ml-10">
          <p className="text-[14px]">프로필</p>
          <h1 className="text-7xl font-black mt-3">sm</h1>
          <p className="text-[14px] font-normal mt-2">좋아요한 앨범 수 개</p>
        </section>
      </section>
      <button
        type="button"
        onClick={handleSettingToggle}
        className=" hover:cursor-pointer"
      >
        <AiOutlineEllipsis className="text-zinc-400 text-4xl ml-10 hover:text-zinc-100" />
      </button>
      {toggle ? (
        <section className="absolute z-10 w-[160px] h-[100px] bg-zinc-800 rounded-md ml-10 text-left text-white p-1">
          <p className="h-1/2 flex items-center pl-3 gap-3 hover:bg-zinc-700">
            <FaPen />
            프로필 수정
          </p>
          <p className="h-1/2 flex items-center pl-3 gap-3 hover:bg-zinc-700">
            <RiFileCopyLine />
            프로필 링크 복사
          </p>
        </section>
      ) : null}
      <AlbumList albumData={catData} albumListName={"좋아요한 곡"} />
      <AlbumList albumData={catData} albumListName={"나만의 플레이리스트"} />
    </main>
  );
}

export default ProfilePage;
