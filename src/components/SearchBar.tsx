"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [input, setInput] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    router.push(`/search?q=${encodeURIComponent(input.trim())}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex mt-4 gap-2 items-center ">
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="아티스트 또는 앨범 검색"
        className="w-full  h-12 md:w-96 p-2 rounded-md border border-gunmetal text-offwhite bg-gunmetal"
      />
      <button
        type="submit"
        className="bg-gunmetal text-white px-4 py-2 rounded-md"
      >
        검색
      </button>
    </form>
  );
}
