import Swal from "sweetalert2";

export const AlertSuccess = (title = "Success", text = "") => {
  Swal.fire({
    icon: "success",
    title,
    text,
    customClass: {
      popup: "swal-custom",
      icon: "swal-icon",
    },
  });
};

export const AlertError = (title = "Error", text = "") => {
  Swal.fire({
    icon: "error",
    title,
    text,
  });
};

export const AlertInfo = (title = "Info", text = "") => {
  Swal.fire({
    icon: "info",
    title,
    text,
  });
};

export const AlertConfirm = () => {
  Swal.fire({
    title: "정말로 삭제하시겠습니까?",
    text: "삭제한 후에는 복구가 불가능합니다",
    icon: "warning",

    showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
    confirmButtonColor: "#d33", //빨간색
    cancelButtonColor: "#3085d6", //파란색
    confirmButtonText: "삭제",
    cancelButtonText: "취소",
    reverseButtons: true, // 버튼 순서 거꾸로
  }).then(result => {
    if (result.isConfirmed) {
      Swal.fire("삭제가 완료되었습니다.", "", "success");
    }
  });
};
