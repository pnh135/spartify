"use client";

import { getPublicAccessToken } from "@/app/api/spotify/route";
import { SpotifySearch } from "@/types/album";
// import Image from "next/image";
import { useEffect, useState } from "react";

const SearchBar = () => {
  const [searchData, setSearchData] = useState("");
  const [results, setResults] = useState<SpotifySearch[]>([]);
  const [loading, setLoading] = useState(false);

  const getResults = async () => {
    const accessToken = await getPublicAccessToken();
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${searchData}&type=album&limit=10&offset=0`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + `${accessToken}`,
        },
      },
    );
    if (!res.ok) {
      throw new Error("불러오기 오류");
    }

    const data: SpotifySearch[] = await res.json();
    setResults(data);
  };

  useEffect(() => {
    if (!searchData) {
      return;
    }
    getResults();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "0") {
      return;
    }
    setSearchData(e.target.value);
  };

  return (
    <div>
      <form onSubmit={getResults}>
        <input
          type="text"
          value={searchData}
          onChange={e => handleInputChange(e)}
          placeholder="What do you want to play?"
          className="bg-gunmetal border border-transparent rounded-full h-10 px-10 focus:ring-2 focus:ring-inset focus:ring-gray-600 focus:outline-none hidden md:block"
        />
        <button type="submit" disabled={loading}>
          {loading ? "검색중..." : "검색"}
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
