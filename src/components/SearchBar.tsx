// "use client";

// import { getPublicAccessToken } from "@/app/api/spotify/route";
// import { SpotifySearch } from "@/types/album";
// // import Image from "next/image";
// import { useEffect, useState } from "react";

// const SearchBar = () => {
//   const [searchData, setSearchData] = useState("");
//   const [results, setResults] = useState<SpotifySearch[]>([]);
//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.value === null) {
//       return;
//     }
//     setSearchData(e.target.value);
//   };

//   return (
//     <div>
//       <form onSubmit={getResults}>
//         <input
//           type="text"
//           value={searchData}
//           onChange={e => handleInputChange(e)}
//           placeholder="What do you want to play?"
//           className="bg-gunmetal border border-transparent rounded-full h-10 px-10 focus:ring-2 focus:ring-inset focus:ring-gray-600 focus:outline-none hidden md:block"
//         />
//         <button type="submit" disabled={loading}>
//           {loading ? "검색중..." : "검색"}
//         </button>
//       </form>

//       <ul>
//         <div>결과가 나올 페이지</div>
//         {/* {results.map(item => (
//           <li key={item.id}>
//             <Image
//               src={item.album.images[0]?.url}
//               alt={item.name}
//               width={50}
//               height={50}
//             />
//             <span>
//               {item.name} - {item.artists[0]?.name}
//             </span>
//           </li>
//         ))} */}
//       </ul>
//     </div>
//   );
// };

// export default SearchBar;

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
    <form onSubmit={handleSearch} className="flex gap-2 mb-6 p-4">
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="아티스트 또는 앨범 검색"
        className="w-full md:w-96 p-2 rounded-md border border-gray-600 text-black"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded-md"
      >
        검색
      </button>
    </form>
  );
}
