"use client";

import { useState } from "react";

export default function TokenTestPage() {
  const [token, setToken] = useState("");
  const [expires, setExpires] = useState(0);
  console.log(token);
  console.log(expires);
  const handleGetToken = async () => {
    try {
      const res = await fetch("/api/spotify/");
      console.log(res);
      const data = await res.json();
      console.log("🔐 새 토큰:", data);
      setToken(data.access_token);
      setExpires(data.expires_in);
    } catch (error) {
      console.error("🚨 토큰 요청 실패:", error);
    }
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">🎧 Spotify 토큰 테스트</h1>
      <button
        onClick={handleGetToken}
        className="bg-black text-white px-4 py-2 rounded"
      >
        새 토큰 발급받기
      </button>

      {token && (
        <div className="mt-6">
          <p className="font-mono text-sm break-all">
            <strong>토큰:</strong> {token}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            <strong>만료까지:</strong> {expires}초
          </p>
        </div>
      )}
    </main>
  );
}
