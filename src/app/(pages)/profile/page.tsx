"use client";
// 마이페이지에서 사용자와의 상호작용이 필요하니 클라이언트 컴포넌트로 구현

import React, { useEffect, useRef, useState } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import { HiMiniUser, HiOutlinePencil } from "react-icons/hi2";
import { RiFileCopyLine } from "react-icons/ri";
import AlbumList from "../../../components/AlbumList";
import { getNewRelease } from "@/utils/fetchNewRelease";
import { supabase } from "@/app/api/supabase/supabase";
import useUserStore from "@/store/useUserstore";
import UserSettingModal from "@/components/UserSettingModal";
import type { SpotifyAlbum } from "@/types/album";
import { getUserInfo } from "@/utils/getUserData";

//useEffect 최대한 없애고 tanstackQuery하기!!! 무조건!!!!!!!!!!!!!!무조건!!!!!!!!!!!!!
export interface userType {
  email: string;
  email_verified: boolean;
  name: string;
  phone_verified: boolean;
  sub: string;
}

function ProfilePage() {
  const [optionToggle, setOptionToggle] = useState<boolean>(false);
  const [newRelease, setNewRelease] = useState<SpotifyAlbum[]>([]);
  const [userName, setUserName] = useState<string>("");
  const [profileSettingModal, setProfileSettingModal] =
    useState<boolean>(false);

  useEffect(() => {
    // useEffect 최대한 없애고 tanstackQuery하기!!! 무조건!!!!!!!!!!!!!!무조건!!!!!!!!!!!!!
    const gotfetchApiData = async () => {
      const data = await getNewRelease();
      setNewRelease(data);
    };
    gotfetchApiData();
  }, []);

  // // useUserStore에서 user 가져오기
  // const { user } = useUserStore();
  // // const email = user.user_metadata.email || ""; // optional chaining이 있어야 하나?????? 고민 고고!
  // const name = user.user_metadata.name || "";
  // console.log("현재 세션 유저:", user);

  // 수퍼베이스 유저 정보 갸져오기
  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await getUserInfo();
      console.log("this this the userInfoooooooo", userInfo.name);
      setUserName(userInfo.name);
    };

    fetchUser();
  }, []);

  // 유저 상세 설정 버튼 토글 함수 (점 세개))
  const handleOptionToggle = () => {
    setOptionToggle(!optionToggle); // 함수형 업데이트 활용 (prev 쓰는거!!)
  };

  // 유저 상세 설정 모달 토글 함수
  const handleProfileSetting = () => {
    setProfileSettingModal(!profileSettingModal);
    setOptionToggle(false);
  };

  return (
    // 색깔 통일 필요!!!!!!
    <main className="bg-zinc-950 rounded-2xl m-6 min-h-screen pb-10">
      <section className="w-full h-[250px] bg-gradient-to-b from-zinc-600 to-zinc-800 rounded-t-2xl flex flex-row items-center mb-8">
        <figure className="relative group w-[200px] h-[200px] flex justify-center items-center text-7xl text-zinc-500 bg-zinc-800 shadow-zinc-900 shadow-lg rounded-full ml-10">
          <HiMiniUser className="opacity-100 group-hover:opacity-0" />
          <button
            type="button"
            onClick={handleProfileSetting}
            className="flex flex-col justify-center absolute opacity-0 group-hover:opacity-100 text-white"
          >
            <HiOutlinePencil className="text-6xl" />
            <p className="text-base">사진 선택</p>
          </button>
          {/* 여기에 useState를 사용해서 사용자 프로필 사진 반환 */}
        </figure>
        <section className="text-white ml-10">
          <p className="text-[14px]">프로필</p>
          <h1 className="text-7xl font-black mt-3">{userName}</h1>
          <p className="text-[14px] font-normal mt-2">좋아요한 앨범 수 개</p>
        </section>
      </section>
      <section className="relative">
        <button
          type="button"
          onClick={handleOptionToggle}
          className=" hover:cursor-pointer"
        >
          <AiOutlineEllipsis className="text-zinc-400 text-4xl ml-10 hover:text-zinc-100" />
        </button>
        {optionToggle ? (
          <section className="absolute z-10 w-[160px] h-[100px] bg-zinc-800 rounded-md ml-10 text-left text-white p-1">
            <button
              type="button"
              onClick={handleProfileSetting}
              className="h-1/2 flex w-full items-center pl-3 gap-3 hover:bg-zinc-700"
            >
              <HiOutlinePencil />
              프로필 수정
            </button>
            <button className="h-1/2 flex w-full items-center pl-3 gap-3 hover:bg-zinc-700">
              <RiFileCopyLine />
              프로필 링크 복사
            </button>
          </section>
        ) : null}
      </section>
      {/** html요소가 많이 보이면 좋은 리액트 코드가 아니다!!!!  컴포넌트화 필요!!!!!!!!!!!!!!!!!!!!!!!! */}

      {/* 프로필 수정 모달창 */}
      <UserSettingModal
        profileSettingModal={profileSettingModal}
        setProfileSettingModal={setProfileSettingModal}
      />
      <article>
        <AlbumList albumListName={"최신 앨범"} albumData={newRelease} />
      </article>
    </main>
  );
}

export default ProfilePage;
