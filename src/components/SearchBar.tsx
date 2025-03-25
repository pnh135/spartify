"use client";

// components/SearchBar.tsx
import { SpotifySearch } from "@/types/album";
// import Image from "next/image";
import { useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SpotifySearch[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/spotifySearch?query=${query}`);
      const data = await res.json();
      setResults(data);
      console.log(data); // 검색 결과 중 트랙을 추출
    } catch (error) {
      console.error("Failed to fetch search results", error);
    }

    setLoading(false);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search for music..."
        className="text-slate-950"
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>

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
