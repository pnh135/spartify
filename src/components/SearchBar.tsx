"use client";

// components/SearchBar.tsx
import { SpotifySearch } from "@/types/album";
// import Image from "next/image";
import { useState } from "react";

const SearchBar = () => {
  const [searchData, setSearchData] = useState("");
  const [results, setResults] = useState<SpotifySearch[]>([]);
  const [loading, setLoading] = useState(false);

  const getSearch = async e => {
    e.preventDefault();
    if (!searchData) return;

    setLoading(true);

    try {
      const res = await fetch(
        `https://api.spotify.com/v1/search?q=${searchData}&type=album`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + `${token}`,
          },
        },
      );
      const data = await res.json();
      setResults(data);
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch search results", error);
    }

    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={e => getSearch(e)}>
        <input
          type="text"
          value={searchData}
          onChange={e => setSearchData(e.target.value)}
          placeholder="What do you want to play?"
          className="bg-gunmetal border border-transparent rounded-full h-10 px-10 focus:ring-2 focus:ring-inset focus:ring-gray-600 focus:outline-none hidden md:block"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      <ul>
        <div>결과가 나올 페이지</div>
        {/* {results.map(item => (
          <li key={item.id}>
            <Image
              src={item.album.images[0]?.url}
              alt={item.name}
              width={50}
              height={50}
            />
            <span>
              {item.name} - {item.artists[0]?.name}
            </span>
          </li>
        ))} */}
      </ul>
    </div>
  );
};

export default SearchBar;
