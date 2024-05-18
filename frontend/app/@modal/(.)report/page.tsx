"use client";

import { ReportModal } from "../report-modal";
import { useState, useEffect } from "react";
import { CharacterList } from "@/interfaces/report-interface";
import { getCharacterList } from "@/api/report";
import DamagochiHealth from "@/components/report/DamagochiHealth";
import DamagochiHistory from "@/components/report/DamagochiHistory";
import UserHealth from "@/components/report/UserHealth";
import UserHistory from "@/components/report/UserHistory";

export default function ModalReport() {
  const [activeMenu, setActiveMenu] = useState("damagochi-report");
  const [character, setCharacterList] = useState<CharacterList>([]);

  useEffect(() => {
    async function fetchCharacter() {
      const data = await getCharacterList();
      setCharacterList([data]); // 첫 번째 캐릭터 설정
    }

    fetchCharacter();
  }, []);

  const getReportComponent = () => {
    switch (activeMenu) {
      case "damagochi-report":
        return character ? (
          <DamagochiHealth character={character[0]} />
        ) : (
          <div>Loading...</div>
        ); // 다마고치 종합 리포트
      case "user-report":
        return <DamagochiHistory />; // 다마고치 히스토리
      case "damagochi-history":
        return <UserHealth />; // 사용자 주간 건강 리포트
      case "user-history":
        return <UserHistory />; // 사용자 종합 건강 히스토리
      default:
        return null;
    }
  };

  return (
    <ReportModal activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
      {getReportComponent()}
    </ReportModal>
  );
}
