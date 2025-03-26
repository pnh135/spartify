"use client";

import React from "react";
import AlbumList from "./AlbumList";
import { getAlbum, getPublicAccessToken } from "@/app/api/spotify/route";
import { SpotifyAlbum } from "@/types/album";
import useLikeAlbum from "@/hooks/useLikeAlbum";

function LikeAlbumList() {
  const token: string = getPublicAccessToken();
  const sortString = useLikeAlbum();
  const albums: SpotifyAlbum[] = getAlbum(sortString);

  console.log(sortString);
  console.log(albums);
  return <AlbumList albumData={albums} albumListName="좋아요 순위" />;
}

export default LikeAlbumList;
