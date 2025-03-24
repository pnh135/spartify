import React from "react";
import AlbumList from "@/components/AlbumList";
import { album } from "@/types/album";
import Image from "next/image";

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

function AlbumDetailPage() {
  return (
    <main className=" bg-zinc-950 rounded-2xl m-6 min-h-screen pb-10">
      <section className=" flex flex-col from-zinc-600 to-zinc-800 rounded-t-2xl  items-center mb-8 mx-8">
        <Image
          src="/dog.jpeg"
          alt="Artist Image"
          width={800}
          height={300}
          className=" bg-gray-500"
        />
        <div className="flex flex-row justify-between text-white w-full p-4 ">
          <h1 className="text-7xl font-black mt-3">Artist</h1>
          <p className="text-[14px] font-normal mt-2">발매일</p>
        </div>
      </section>
      <section className="flex flex-col space-y-4 p-4 mx-8 text-center">
        <li className="flex flex-row items-center bg-gray-300">
          <div>
            <Image
              src="/dog.jpeg"
              alt={"Song Image"}
              width={100}
              height={40}
              className="object-contain bg-gray-500 m-2"
            />
          </div>
          <p className="mx-auto">song 1</p>
        </li>
        <li className="flex flex-row items-center bg-gray-300">
          <div>
            <Image
              src="/dog.jpeg"
              alt={"Song Image"}
              width={100}
              height={40}
              className="object-contain bg-gray-500 m-2"
            />
          </div>
          <p className="mx-auto">song 2</p>
        </li>
        <li className="flex flex-row items-center bg-gray-300">
          <div>
            <Image
              src="/dog.jpeg"
              alt={"Song Image"}
              width={100}
              height={40}
              className="object-contain bg-gray-500 m-2"
            />
          </div>
          <p className="mx-auto">song 3</p>
        </li>
        <li className="flex flex-row items-center bg-gray-300">
          <div>
            <Image
              src="/dog.jpeg"
              alt={"Song Image"}
              width={100}
              height={40}
              className="object-contain bg-gray-500 m-2"
            />
          </div>
          <p className="mx-auto">song 4</p>
        </li>
        <li className="flex flex-row items-center bg-gray-300">
          <div>
            <Image
              src="/dog.jpeg"
              alt={"Song Image"}
              width={100}
              height={40}
              className="object-contain bg-gray-500 m-2"
            />
          </div>
          <p className="mx-auto">song 5</p>
        </li>
      </section>
      <AlbumList albumData={catData} />
    </main>
  );
}

export default AlbumDetailPage;
