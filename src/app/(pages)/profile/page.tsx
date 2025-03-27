"use client";

import React, { useEffect, useState } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import { HiMiniUser, HiOutlinePencil } from "react-icons/hi2";
import { RiFileCopyLine } from "react-icons/ri";
import AlbumList from "@/components/AlbumList";
import { getNewRelease } from "@/utils/fetchNewRelease";
import UserSettingModal from "@/components/UserSettingModal";
import type { SpotifyAlbum } from "@/types/album";
import { getUserInfo } from "@/utils/getUserData";
// import { handleUpdateUserData } from "@/utils/updateUserData";
// import Image from "next/image";

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
  const [userName, setUserName] = useState<string | null>(null);
  // const [userImage, setUserImage] = useState<string>("");
  const [profileSettingModal, setProfileSettingModal] =
    useState<boolean>(false);

  // interface UserMetadata {
  //   name?: string;
  // }

  // interface User {
  //   user_metadata: UserMetadata;
  // }

  // const { user } = useUserStore() as { user: User | null };
  // const name = user?.user_metadata?.name || "";

  useEffect(() => {
    const fetchData = async () => {
      const data = await getNewRelease();
      setNewRelease(data);
    };
    fetchData();
  }, []);

  // 수퍼베이스 유저 정보 갸져오기
  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await getUserInfo();
      // console.log("this is userInfo======> ", userInfo);
      // console.log("thsi is urser_img=!!==>", userInfo.profile_img);

      if (!userInfo) {
        console.error("유저 정보를 불러오지 못했습니다.");
        return;
      }
      setUserName(userInfo.name);
      // setUserImage(userInfo.profile_img);
    };
    fetchUser();
  }, [userName]);

  // 유저 상세 설정 버튼 토글 함수 (점 세개))
  const handleOptionToggle = () => {
    setOptionToggle(prev => !prev); // 함수형 업데이트 활용 (prev 쓰는거!!)
  };

  const handleProfileSetting = () => {
    setProfileSettingModal(prev => !prev);
    setOptionToggle(false);
  };

  return (
    <main className="bg-zinc-950 rounded-2xl m-6 min-h-screen pb-10">
      <section className="w-full h-[250px] bg-gradient-to-b from-zinc-600 to-zinc-800 rounded-t-2xl flex flex-row items-center mb-8">
        <figure className="relative group w-[200px] h-[200px] flex justify-center items-center text-7xl text-zinc-500 bg-zinc-800 shadow-zinc-900 shadow-lg rounded-full ml-10">
          {/* <HiMiniUser className="opacity-100 group-hover:opacity-0" /> */}
          <HiMiniUser className="absolute opacity-100 group-hover:opacity-0" />
          <button
            type="button"
            onClick={handleProfileSetting}
            className="flex flex-col justify-center absolute opacity-0 group-hover:opacity-100 text-white"
          >
            <HiOutlinePencil className="text-6xl" />
            <p className="text-base">사진 선택</p>
          </button>
        </figure>
        <section className="text-white ml-10">
          <p className="text-[14px]">프로필</p>
          <h1 className="text-7xl h-20 font-black mt-3">{userName}</h1>
          <p className="text-[14px] font-normal mt-3">좋아요한 앨범 수 개</p>
        </section>
      </section>

      <section className="relative">
        <button
          type="button"
          onClick={handleOptionToggle}
          className="hover:cursor-pointer"
        >
          <AiOutlineEllipsis className="text-zinc-400 text-4xl ml-10 hover:text-zinc-100" />
        </button>
        {optionToggle && (
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
        )}
        ad
      </section>

      {/* 프로필 수정 모달창 */}
      {profileSettingModal && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-70 z-20"
            onClick={() => setProfileSettingModal(false)} // 배경 클릭 시 모달 닫기
          ></div>
          <UserSettingModal
            profileSettingModal={profileSettingModal}
            setProfileSettingModal={setProfileSettingModal}
          />
        </>
      )}

      <article>
        <AlbumList albumListName="최신 앨범" albumData={newRelease} />
      </article>
    </main>
  );
}

export default ProfilePage;
