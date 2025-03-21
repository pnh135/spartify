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
    <main className=" bg-zinc-950 rounded-2xl m-6 min-h-screen pb-10">
      <section className="w-full h-[200px] bg-gradient-to-b from-zinc-600 to-zinc-800 rounded-t-2xl flex flex-row items-center mb-8">
        <div className="w-[150px] h-[150px] bg-zinc-800 drop-shadow-md rounded-full ml-10"></div>
        <div className="text-white ml-10">
          <p className="text-sm">프로필</p>
          <h1 className="text-7xl font-black mt-3">sm</h1>
          <p className="text-sm font-normal mt-2">좋아요한 앨범 수 개</p>
        </div>
      </section>
      <AiOutlineEllipsis className="text-zinc-400 text-4xl ml-10" />
      <section className="ml-10">
        <div className="my-16">
          <h2 className="text-white text-[26px] font-bold mb-5">
            좋아요한 앨범
          </h2>
          <div className="flex flex-row gap-10 overflow-x-scroll flex-nowrap">
            {catData.map(data => {
              return (
                <div key={data.title} className="text-white">
                  <div className="w-[180px] h-[180px] overflow-hidden">
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
      </section>
      <section className="ml-10">
        <div className="mt-20">
          <h2 className="text-white text-[26px] font-bold mb-5">
            좋아요한 앨범
          </h2>
          <div className="flex flex-row gap-10 overflow-x-scroll flex-nowrap">
            {catData.map(data => {
              return (
                <div key={data.title} className="text-white">
                  <div className="w-[180px] h-[180px] overflow-hidden">
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
      </section>
    </main>
  );
}

export default ProfilePage;
