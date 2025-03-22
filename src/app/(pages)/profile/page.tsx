// import Image from "next/image";
import React from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import AlbumList from "../../../components/AlbumList";
import type { album } from "../../../types/album";

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
  return (
    <main className=" bg-zinc-950 rounded-2xl m-6 min-h-screen pb-10">
      <section className="w-full h-[200px] bg-gradient-to-b from-zinc-600 to-zinc-800 rounded-t-2xl flex flex-row items-center mb-8">
        <div className="w-[150px] h-[150px] bg-zinc-800 drop-shadow-md rounded-full ml-10"></div>
        <div className="text-white ml-10">
          <p className="text-[14px]">프로필</p>
          <h1 className="text-7xl font-black mt-3">sm</h1>
          <p className="text-[14px] font-normal mt-2">좋아요한 앨범 수 개</p>
        </div>
      </section>
      <AiOutlineEllipsis className="text-zinc-400 text-4xl ml-10" />{" "}
      <AlbumList albumdata={catData} />
      <AlbumList albumdata={catData} />
    </main>
  );
}

export default ProfilePage;
