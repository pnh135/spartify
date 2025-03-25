"use client";
// 마이페이지에서 사용자와의 상호작용이 필요하니 클라이언트 컴포넌트로 구현

import React, { useEffect, useState } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import { HiOutlinePencil, HiMiniUser } from "react-icons/hi2";
import { RiFileCopyLine } from "react-icons/ri";
import { IoIosClose } from "react-icons/io";
import AlbumList from "../../../components/AlbumList";
import { getNewRelease } from "@/utils/fetchNewRelease";
//   주석달기

function ProfilePage() {
  const [optionToggle, setOptionToggle] = useState(false);
  const [profileSettingModal, setProfileSettingModal] = useState(false);
  const [newRelease, setNewRelease] = useState([]);
  const [user, setUser] = useState({});

  interface userType {
    email: string;
    email_verified: boolean;
    name: string;
    phone_verified: boolean;
    sub: string;
  }

  useEffect(() => {
    const gotfetchApiData = async () => {
      const data = await getNewRelease();
      setNewRelease(data);
    };
    gotfetchApiData();
  }, []);

  // 유저 상세 설정 버튼 토글 함수 (점 세개))
  const handleOptionToggle = () => {
    setOptionToggle(!optionToggle);
  };

  // 유저 상세 설정 모달 토글 함수
  const handleProfileSetting = () => {
    setProfileSettingModal(!profileSettingModal);
    setOptionToggle(false);
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user-storage"));
    if (userData.state.user.user_metadata) {
      const data: userType = userData.state.user.user_metadata;
      console.log("User ID:", data);
      setUser(data);
    }
  }, []);

  return (
    <main className="bg-zinc-950 rounded-2xl m-6 min-h-screen pb-10">
      <section className="w-full h-[250px] bg-gradient-to-b from-zinc-600 to-zinc-800 rounded-t-2xl flex flex-row items-center mb-8">
        <figure className="relative group w-[200px] h-[200px] flex justify-center items-center text-7xl text-zinc-500 bg-zinc-800 shadow-zinc-900 shadow-lg rounded-full ml-10">
          <HiMiniUser className=" opacity-100 group-hover:opacity-0" />
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
          <h1 className="text-7xl font-black mt-3">{user.name}</h1>
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

      {/* 프로필 수정 모달창 */}
      {profileSettingModal ? (
        <section className="fixed inset-0 z-20 min-h-screen min-w-screen flex justify-center items-center">
          <article className="bg-zinc-800 p-6 flex flex-col gap-5 rounded-lg pb-10">
            <article className="flex flex-row justify-between">
              <h2 className="text-lg ">프로필 세부 정보</h2>
              <button
                type="button"
                onClick={() => setProfileSettingModal(false)}
                className="text-2xl"
              >
                <IoIosClose />
              </button>
            </article>
            <article className="w-full flex flex-row items-center gap-5">
              <figure className="group w-[180px] h-[180px] flex justify-center items-center text-7xl text-zinc-500 bg-zinc-800 shadow-zinc-900 shadow-lg rounded-full">
                <HiMiniUser className="absolute" />
                <article className="absolute flex flex-col justify-center opacity-100 group-hover:opacity-100 text-white text-sm gap-2">
                  <label>
                    사진 선택
                    <input type="file" />
                  </label>
                  <HiOutlinePencil className="text-5xl" />
                  <span>사진 삭제</span>
                </article>
              </figure>
              <article className="w-[220px]flex flex-col justify-center">
                <form className="flex flex-col justify-end items-end gap-2">
                  <input
                    type="text"
                    className="bg-zinc-700 w-[280px] py-2 rounded-sm"
                  />
                  <button className="bg-white py-3 px-8 rounded-full text-charcoal font-bold">
                    저장하기
                  </button>
                </form>
              </article>
            </article>
          </article>
        </section>
      ) : null}
      <article>
        <AlbumList albumListName={"최신 앨범"} albumData={newRelease} />
      </article>
    </main>
  );
}

export default ProfilePage;
