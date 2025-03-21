import Image from "next/image";
import React from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import cat from "../../../public/cat.jpeg";
import dog from "../../../public/dog.jpeg";
import parrow from "../../../public/parrow.jpeg";

function ProfilePage() {
  const catData = [
    {
      title: "cat",
      artist: "Dog",
      image: cat,
    },
    {
      title: "dog",
      artist: "Cat",
      image: dog,
    },
    {
      title: "bird",
      artist: "Parrow",
      image: parrow,
    },
    {
      title: "cat",
      artist: "Dog",
      image: cat,
    },
    {
      title: "dog",
      artist: "Cat",
      image: dog,
    },
  ];

  return (
    <div className="w-[800px] h-[1000px] bg-zinc-950 rounded-2xl">
      <div className="w-full h-[200px] bg-gradient-to-b from-zinc-600 to-zinc-800 rounded-t-2xl flex flex-row items-center mb-8">
        <div className="w-[150px] h-[150px] bg-zinc-800 drop-shadow-md rounded-full ml-5"></div>
        <div className="text-white ml-10">
          <p className="text-[10px]">프로필</p>
          <h1 className="text-7xl font-black mt-3">sm</h1>
          <p className="text-sm font-light mt-2">좋아요한 앨범 수 개</p>
        </div>
      </div>
      <AiOutlineEllipsis className="text-zinc-400 text-4xl ml-5" />
      <div className="my-16">
        <h2 className="text-white text-[26px] font-bold mb-5">좋아요한 앨범</h2>
        <div className="flex flex-row gap-10">
          {catData.map(data => {
            return (
              <div key={data.title} className="text-white">
                <div className="w-[150px] h-[150px] overflow-hidden">
                  <Image
                    src={data.image}
                    alt={"ImageAlt"}
                    width={400}
                    height={400}
                    className="w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-bold">{data.title}</h3>
                <p className="text-sm font-thin">{data.artist}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-24">
        <h2 className="text-white text-[26px] font-bold mb-5">좋아요한 앨범</h2>
        <div className="flex flex-row gap-10">
          {catData.map(data => {
            return (
              <div key={data.title} className="text-white">
                <div className="w-[150px] h-[150px] overflow-hidden">
                  <Image
                    src={data.image}
                    alt={"ImageAlt"}
                    width={400}
                    height={400}
                    className="w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-bold">{data.title}</h3>
                <p className="text-sm font-thin">{data.artist}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
