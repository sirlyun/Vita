import { localAxios, getCharacterId } from "@/util/axios";

async function login(code: string) {
  const requestBody = { code: code };

  return localAxios
    .post("/member/login", requestBody)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

async function logout() {
  return localAxios.post("/member/logout").catch((error) => {
    throw error;
  });
}

async function reissue() {
  return localAxios.get("/reissue").catch((error) => {
    throw error;
  });
}

async function attendance() {
  return localAxios
    .get(`/character/${getCharacterId()}/attendance`)
    .catch((error) => {
      throw error;
    });
}

export { login, logout, reissue, attendance };
