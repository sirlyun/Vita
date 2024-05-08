import report from '@/public/styles/report.module.scss';
import Image from 'next/image';
import images from '@/util/images.js';

export default function DamagochiHistoryDetail() {
  return (
    <div className={`${report['inner-text']} ${report['inner-background']}`}>
      <h1 className={report['sub-title']}>다마고치 히스토리</h1>
      <div className={report['sub-content']}>
        <div className={report['inner-image']}>
          <Image
            src={images.character1}
            // layout='responsive'
            width={100}
            height={100}
            alt='option'
          ></Image>
        </div>
        <div>
          <span>이름: 캐릭터 1</span>
          <p>생존: 30일</p>
        </div>
      </div>
    </div>
  );
}
