import React, { useState, useEffect } from "react";
import DamagochiHistoryDetail from "./DamagochiHistoryDetail";
import Image from "next/image";
import images, { getUserCharacterImagePath } from "@/util/images.js";
import report from "@/public/styles/report.module.scss";
import { getCharacterList } from "@/api/report";
import { CharacterList } from "@/interfaces/report-interface";

export default function DamagochiHistory() {
  // 캐릭터 목록을 저장할 상태 변수
  const [characterList, setCharacterList] = useState<CharacterList>([]);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  // API로부터 캐릭터 목록 가져오기
  useEffect(() => {
    async function fetchCharacterList() {
      const data = await getCharacterList();
      console.log("Received data:", data);
      setCharacterList([data]);
    }

    fetchCharacterList();
  }, []);

  // 캐릭터 클릭 시 상세 정보 표시
  const handleButtonClick = (character: any) => {
    setSelectedCharacter(character);
    setShowDetail(true);
  };

  // 상세 정보 표시 여부에 따라 상세 정보 또는 캐릭터 목록 표시
  if (showDetail && selectedCharacter) {
    return <DamagochiHistoryDetail character={selectedCharacter} />;
  }

  // 캐릭터 이미지 이미지 가져오기
  const characterImage = getUserCharacterImagePath(
    "female",
    "normal",
    "walking",
    1
  );

  // 캐릭터 목록 표시
  return (
    <div className={report["damagochi-history"]}>
      {characterList &&
        characterList.length > 0 &&
        characterList.map((character, index) => (
          <button key={index} onClick={() => handleButtonClick(character)}>
            <Image
              src={characterImage} // 캐릭터 이미지에 대한 올바른 경로 설정 필요
              width={40}
              height={80}
              alt={`Character ${character.nickname}`} // `nickname` 필드 사용
            />
            <span>{character.nickname}</span>
          </button>
        ))}
    </div>
  );
}
