import React, { useState } from 'react';
import DamagochiHistoryDetail from './DamagochiHistoryDetail';
import Image from 'next/image';
import images from '@/util/images.js';
import report from '@/public/styles/report.module.scss';

export default function DamagochiHistory() {
  const [showDetail, setShowDetail] = useState(false);

  const handleButtonClick = () => {
    setShowDetail(true);
  };

  if (showDetail) {
    return <DamagochiHistoryDetail />;
  }

  return (
    <div className={report['damagochi-history']}>
      <button onClick={handleButtonClick}>
        <Image src={images.character1} width={40} height={80} alt='option' />
        <span>캐릭터 1</span>
      </button>
      <button onClick={handleButtonClick}>
        <Image src={images.character2} width={40} height={80} alt='option' />
        <span>캐릭터 2</span>
      </button>
      <button onClick={handleButtonClick}>
        <Image src={images.character3} width={40} height={80} alt='option' />
        <span>캐릭터 3</span>
      </button>
      <button onClick={handleButtonClick}>
        <Image src={images.character3} width={40} height={80} alt='option' />
        <span>캐릭터 3</span>
      </button>
      <button onClick={handleButtonClick}>
        <Image src={images.character3} width={40} height={80} alt='option' />
        <span>캐릭터 3</span>
      </button>
      <button onClick={handleButtonClick}>
        <Image src={images.character3} width={40} height={80} alt='option' />
        <span>캐릭터 3</span>
      </button>
      <button onClick={handleButtonClick}>
        <Image src={images.character3} width={40} height={80} alt='option' />
        <span>캐릭터 3</span>
      </button>
      <button onClick={handleButtonClick}>
        <Image src={images.character3} width={40} height={80} alt='option' />
        <span>캐릭터 3</span>
      </button>
      <button onClick={handleButtonClick}>
        <Image src={images.character3} width={40} height={80} alt='option' />
        <span>캐릭터 3</span>
      </button>
    </div>
  );
}
