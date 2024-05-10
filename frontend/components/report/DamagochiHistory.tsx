import React, { useState, useEffect } from 'react';
import DamagochiHistoryDetail from './DamagochiHistoryDetail';
import Image from 'next/image';
import images from '@/util/images.js';
import report from '@/public/styles/report.module.scss';
import { getCharacterList } from '@/api/character';

export default function DamagochiHistory() {
  // 캐릭터 목록을 저장할 상태 변수
  const [characterList, setCharacterList] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  // API로부터 캐릭터 목록 가져오기
  useEffect(() => {
    async function fetchCharacterList() {
      const data = await getCharacterList();
      console.log('Received data:', data); // 데이터 확인
      setCharacterList([data]); // 단일 객체를 배열로 변환하여 저장
    }

    fetchCharacterList();
  }, []);

  const handleButtonClick = (character: any) => {
    setSelectedCharacter(character);
    setShowDetail(true);
  };

  if (showDetail && selectedCharacter) {
    return <DamagochiHistoryDetail character={selectedCharacter} />;
  }

  return (
    <div className={report['damagochi-history']}>
      {characterList.length > 0 &&
        characterList.map((character, index) => (
          <button key={index} onClick={() => handleButtonClick(character)}>
            <Image
              src={images.character1} // 캐릭터 이미지에 대한 올바른 경로 설정 필요
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
