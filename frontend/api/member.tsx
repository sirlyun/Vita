import { localAxios } from "@/util/axios";

async function modifyMember(
  gender: string,
  birth: number,
  chronic: string | null
) {
  const requestBody = {
    gender,
    birth,
    chronic,
  };
  return localAxios
    .patch("/member", requestBody)
    .then((response) => response.data)
    .catch((error) => {
      console.log("회원정보 수정 실패! ", error);
    });
}

export { modifyMember };
