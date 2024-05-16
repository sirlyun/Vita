import React, { useState, useEffect } from "react";
import DamagochiHistoryDetail from "./DamagochiHistoryDetail";
import Image from "next/image";
import images, { getUserCharacterImagePath } from "@/util/images.js";
import report from "@/public/styles/report.module.scss";
import { getDeadCharacterList } from "@/api/report";
import { CharacterList, Character } from "@/interfaces/report-interface";

export default function DamagochiHistory() {
  // 캐릭터 목록을 저장할 상태 변수
  const [characterList, setCharacterList] = useState<CharacterList>([]);
  const [showDetail, setShowDetail] = useState(false);
  // const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );

  // API로부터 캐릭터 목록 가져오기
  useEffect(() => {
    async function fetchCharacterList() {
      const data = await getDeadCharacterList();
      console.log("Received data:", data);
      // setCharacterList([data]);
      // setCharacterList(data);
      setCharacterList(data.character_report); // character_report 배열을 상태로 설정
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

  // 캐릭터 목록 표시
  return (
    <div className={report["damagochi-history"]}>
      {characterList &&
        characterList.length > 0 &&
        characterList.map((character, index) => (
          <button key={index} onClick={() => handleButtonClick(character)}>
            <Image
              src={getUserCharacterImagePath(
                character.gender,
                character.body_shape,
                "idle",
                0
              )}
              width={40}
              height={80}
              alt={`Character ${character.nickname}`}
            />
            <span>{character.nickname}</span>
          </button>
        ))}
    </div>
  );
}
