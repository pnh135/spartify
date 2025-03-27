import { googleLogin } from "@/app/api/supabase/userAuth";
import React from "react";
import Swal from "sweetalert2";

const ThirdPartyLoginButton = () => {

  const handleThirdPartyLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {

    const target = e.target as HTMLElement;
    const button = target.closest("button");
    const provider = button?.getAttribute("data-provider");
    
    if (provider === "google") {
      try {
        googleLogin();
      } catch (error) {
        console.error("구글 로그인 에러:", error);
        Swal.fire({
          title: "로그인 실패",
          text: "구글 로그인 중 오류가 발생했습니다.",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "확인",
        });
      }
    }
  };

  return (
    <div>
      <button
        type="button"
        data-provider="google"
        onClick={(e) => handleThirdPartyLogin(e)}
        className="w-full bg-gunmetal text-offwhite border border-gray-600 hover:border-gray-400 rounded-full py-2 px-4 flex items-center justify-center text-sm"
      >
        Google로 로그인
      </button>
    </div>
  );
};

export default ThirdPartyLoginButton;
