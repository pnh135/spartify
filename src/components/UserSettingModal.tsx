"use client";

import { useState, useRef, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import Image from "next/image";
import { HiMiniUser, HiOutlinePencil } from "react-icons/hi2";
import { supabase } from "@/app/api/supabase/supabase";
import { handleUpdateUserData } from "@/utils/updateUserData";

interface UserSettingModalProps {
  profileSettingModal: boolean;
  setProfileSettingModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserSettingModal({
  profileSettingModal,
  setProfileSettingModal,
}: UserSettingModalProps) {
  // 지금 초기값으로 타입이 자동 지정되어있지만 직접 꺽쇠<>와 함꼐 타입 지정 해주기!!!(가독성 높아짐)
  const [imagePreview, setImagePreview] = useState<string>(""); // img 파일이 imgPreview 상태에 Base64 문자열로 들어갈 것이기 때문에 기본값이 ""임
  const [nickname, setNickname] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<File | null>(null);
  const [thisUploadImgUrl, setThisUploadImgUrl] = useState<string>("");
  const imgRef = useRef<HTMLInputElement | null>(null); // useRef는 컴포넌트 안에서 DOM 요소나 값을 직접 참조!! ==> useState()를 사용할 때와 달리 input태그의 값에 직접 접근할 수 있어 불필요한 리렌더링을 줄일 수 있음

  useEffect(() => {
    if (!imageUrl) return; // imageUrl이 없을 경우 실행하지 않도록 방어 코드 추가
    const fetchImageUrl = async () => {
      await handleImgUpload();
    };
    fetchImageUrl();
  }, [imageUrl]);

  const handleResetImgPreview = () => {
    setImagePreview("");
  };

  // 사용자가 파일을 선택하면 호출되는 함수
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //onchange 됬ㅇ르 때 실행되도록 하기
    if (!e.target.files?.length) return; // 파일이 없으면 함수 중지
    setImageUrl(e.target.files[0]);
  };

  // Image업로드 함수 // 이런 함수는 유틸리티 함수로 따로 작성하고 가져오는 게 나음!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 공통화 할 수 있도록!!!!!!!!!!!!!!!!
  const handleImgUpload = async () => {
    // 만약 이미지가 선택되지 않았다면 함수를 종료
    if (!imageUrl) return;

    const file = imageUrl as File;
    const imageExt = file.name.split(".").pop(); // 확장자 추출
    let baseName = file.name.replace(`.${imageExt}`, ""); // 확장자 제거한 파일명
    // 1️⃣ 특수문자, 공백, 한글을 안전한 문자(_)로 변환
    baseName = baseName.replace(/[^a-zA-Z0-9._-]/g, "_");
    baseName = baseName.replace(/_+/g, "_"); // 연속된 _ 제거
    baseName = baseName.substring(0, 50); // 너무 긴 파일명 제한
    // supabase의 스토리지에 이미지를 업로드
    const { data, error } = await supabase.storage
      .from("user-image") // user-image 버킷에 업로드
      .upload(`public/${baseName}.${imageExt}`, file); // `public`폴더에 이미지 이름으로 저장 ==> 이 "이미지 이름이라는 건 뭐지??? 뽀로로대장.jpeg같은걸까???"
    // 업로드 중 오류 발생 시 콘솔에 오류 메시지 출력
    if (error) {
      console.error("이미지 업로드 실패. 에러 발생 ==> ", error.message);
    } else {
      console.log("이미지 업로드 성공:", data); // 업로드 성공 시 자축 메시지 콘솔에 출력
    }
    const postImgUrl = `https://wbbxeuloxzmatnfryegy.supabase.co/storage/v1/object/public/user-image/${data?.path}`; // 변수화!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 아니면 .env에 넣어놔도 굿
    setThisUploadImgUrl(postImgUrl);
  };

  // 이미지 미리보기 함수
  const handleImgPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return; // 파일이 없으면 함수 중지
    const imgFile = e.target.files[0]; // 1) imgRef.current는 input요소를 참조 => files는 그 input에서 선택한 파일들 => files[0]는 선택된 첫 번째 파일(preview용)

    if (!imgFile) {
      // 이미지 파일이 없으면 함수를 종료
      return;
    }

    const imgUrl = URL.createObjectURL(imgFile);
    setImagePreview(imgUrl);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProfileSettingModal(false);
    handleImgUpload();
    handleResetImgPreview();
    handleUpdateUserData({
      //이름 바꾸고
      name: nickname,
      email: userEmail,
      imageUrl: thisUploadImgUrl ? thisUploadImgUrl : "이미지 없음", // imageUrl이 null일 경우를 고려
    });
  };

  //----------------------------------------------------------------------------------------------------------------------------------------------

  return (
    //html너무 많다!!!!! 컴포넌트화 급함!!!!!!!!!!
    <>
      {profileSettingModal ? (
        <section className="fixed inset-0 z-20 min-h-screen min-w-screen flex justify-center items-center">
          <article className="bg-zinc-800 p-10 flex flex-col gap-5 rounded-lg pb-10">
            <article className="flex flex-row justify-between">
              <h2 className="text-lg ">프로필 세부 정보</h2>
              <button
                type="button"
                onClick={() => {
                  setProfileSettingModal(false);
                  handleResetImgPreview();
                }}
                className="text-2xl"
              >
                <IoIosClose />
              </button>
            </article>
            <form // 함수로 하나로 묶기!!!
              onSubmit={e => {
                handleSubmit(e);
              }}
              className="flex flex-col justify-end items-end gap-3"
            >
              <article className="w-full flex flex-row items-center gap-10">
                {/** figure같은 것도 공통 컴포넌트 가능!! */}
                <figure className="relative group w-[180px] h-[180px] flex justify-center items-center text-7xl text-zinc-500 bg-zinc-800 shadow-zinc-900 shadow-lg rounded-full">
                  {imagePreview === "" ? (
                    <HiMiniUser className="absolute" />
                  ) : (
                    <Image
                      src={imagePreview || "/default-image.png"}
                      alt={""}
                      width={300}
                      height={300}
                      className="w-[180px] h-[180px] rounded-full text-sm group-hover:opacity-20"
                    />
                  )}

                  <article className="absolute flex flex-col justify-center items-center opacity-100 group-hover:opacity-100 text-white text-sm gap-5">
                    <label htmlFor="file-upload" className="hover:underline">
                      이미지 추가
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => {
                        handleImageChange(e);
                        handleImgPreview(e);
                      }}
                      ref={imgRef}
                      id="file-upload"
                      className="hidden"
                    />
                    <HiOutlinePencil className="text-5xl" />
                    <button
                      type="button"
                      onClick={() => handleResetImgPreview()}
                      className="hover:underline"
                    >
                      이미지 삭제
                    </button>
                  </article>
                </figure>
                <article className="w-[250px] flex flex-col justify-center gap-5">
                  <label className="flex flex-col">
                    아이디
                    <input
                      type="text"
                      value={nickname}
                      onChange={e => setNickname(e.target.value)}
                      className="bg-zinc-700 py-2 px-5 rounded-sm"
                    />
                  </label>
                  <label className="flex flex-col">
                    이메일
                    <input
                      type="text"
                      value={userEmail}
                      onChange={e => setUserEmail(e.target.value)}
                      className="bg-zinc-700 py-2 px-5 rounded-sm"
                    />
                  </label>
                  <button
                    type="submit"
                    className="bg-white py-2 px-8 rounded-full text-charcoal font-bold"
                  >
                    저장하기
                  </button>
                </article>
              </article>
            </form>
          </article>
        </section>
      ) : null}
    </>
  );
}
