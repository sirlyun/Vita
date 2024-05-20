import { localAxios, getCharacterId } from "@/util/axios";

// 캐릭터 리스트 조회
async function getCharacterList() {
  return localAxios
    .get("/character")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

// 건강 리포트 조회
async function getHealthReport() {
  return localAxios
    .get("/health")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

// 건강 종합 리포트 리스트 조회
async function getHealthReportList() {
  return localAxios
    .get("/health/list")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

// 건강 단일 리포트 조회
async function getHealthReportDetail(id: number) {
  return localAxios
    .get("/health/detail")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

// 캐릭터 리포트 조회
async function getCharacterReport() {
  return localAxios
    .get("/character/report")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

// 캐릭터 종합리포트 리스트 조회
async function getCharacterReportList() {
  return localAxios
    .get("/character/reports")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

//캐릭터 단일 리포트 조회
async function getCharacterReportDetail() {
  return localAxios
    .get("/character/${getCharacterId()}/reports/${character_report_id}")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

// 상점 보유한 목록 조회
async function getItemList() {
  return localAxios
    .get(`/character/${getCharacterId()}/item`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

// 죽은 캐릭터 전체 조회
async function getDeadCharacterList() {
  return localAxios
    .get("/character/reports")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

export {
  getCharacterList,
  getHealthReport,
  getHealthReportList,
  getHealthReportDetail,
  getCharacterReport,
  getCharacterReportList,
  getCharacterReportDetail,
  getItemList,
  getDeadCharacterList,
};
