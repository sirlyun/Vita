import report from '@/public/styles/report.module.scss';
import Image from 'next/image';
import images from '@/util/images.js';
import React, { useState } from 'react';

type Character = {
  character_id: number;
  nickname: string;
  vita_point: number;
  is_dead: boolean;
  gender: 'MALE' | 'FEMALE';
  body_shape: string;
  character_item: any[];
  de_buff: any[];
};

type Props = {
  character: Character;
};

// 기본 정보
const BasicInfo = ({ character }: { character: Character }) => (
  <div>
    <p>이름: {character.nickname}</p>
    <p>체력: {character.vita_point}</p>
    <p>상태: {character.is_dead ? '사망' : '생존'}</p>
    <p>성별: {character.gender}</p>
    <p>체형: {character.body_shape}</p>
  </div>
);

// 인벤토리
const Inventory = ({ character }: { character: Character }) => (
  <div>
    <p>인벤토리 아이템 수: {character.character_item.length}</p>
  </div>
);

// PvP전적 컴포넌트
const PvpRecord = () => (
  <div>
    <p>플레이 횟수: </p>
    <p>승 / 패 (%): </p>
    <p>얻은 수명: </p>
    <p>잃은 수명: </p>
  </div>
);

const DamagochiHistoryDetail: React.FC<Props> = ({ character }) => {
  const [activeTab, setActiveTab] = useState('basicInfo');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basicInfo':
        return <BasicInfo character={character} />;
      case 'inventory':
        return <Inventory character={character} />;
      case 'pvpRecord':
        return <PvpRecord />;
      default:
        return <div>선택된 탭이 없습니다.</div>;
    }
  };

  return (
    <div className={`${report['inner-text']} ${report['inner-background']}`}>
      <div className={report['inner-image-block']}>
        <Image
          src={images.character1} // 캐릭터 이미지는 prop에 따라 동적으로 변경될 수 있습니다.
          width={100}
          height={100}
          alt='Character Image'
        />
        <span>{character.nickname}</span>
      </div>
      <div className={report['damagochi-history-detail']}>
        <div className={report['tabs']}>
          <span
            className={activeTab === 'basicInfo' ? 'active' : ''}
            onClick={() => setActiveTab('basicInfo')}
          >
            기본정보
          </span>
          <span
            className={activeTab === 'inventory' ? 'active' : ''}
            onClick={() => setActiveTab('inventory')}
          >
            인벤토리
          </span>
          <span
            className={activeTab === 'pvpRecord' ? 'active' : ''}
            onClick={() => setActiveTab('pvpRecord')}
          >
            PvP전적
          </span>
        </div>
        <div>{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default DamagochiHistoryDetail;
