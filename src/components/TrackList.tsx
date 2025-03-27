"use client";
import { useRef } from "react";

import Swal from "sweetalert2";
import { SpotifyTrack } from "@/types/track";

interface TrackListProps {
  tracks: SpotifyTrack[];
}

export default function TrackList({ tracks }: TrackListProps) {
  const audioSource = useRef<HTMLAudioElement>(null);

  const handlePlay = (track: SpotifyTrack) => {
    if (track.preview_url === null) {
      Swal.fire({
        title: "지원되지 않는 음원입니다!",
        text: `미리 듣기가 지원되지 않는 음원입니다`,
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
      return;
    }

    if (audioSource.current) {
      audioSource.current.src = track.preview_url;
      audioSource.current.play().catch(error => {
        Swal.fire({
          title: "로그인 성공!",
          text: `${error},재생오류`,
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "확인",
        });
      });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">수록곡</h2>
      <ul className="space-y-2">
        {tracks.map((track, index) => (
          <li
            key={track.id}
            className="border-b pb-2 flex justify-between items-center cursor-pointer hover:bg-zinc-800 p-2 rounded"
            onClick={() => handlePlay(track)}
          >
            <span>
              {index + 1}. {track.name}
            </span>
            <span className="text-gray-400 text-sm">
              {Math.floor(track.duration_ms / 60000)}:
              {String(Math.floor((track.duration_ms % 60000) / 1000)).padStart(
                2,
                "0",
              )}
              분
            </span>
          </li>
        ))}
      </ul>

      {/* <audio ref={audioSource} controls className="w-full mt-6" /> */}
    </div>
  );
}
