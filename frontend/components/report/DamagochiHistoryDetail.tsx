import report from '@/public/styles/report.module.scss';
import Image from 'next/image';
import images from '@/util/images.js';

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

const DamagochiHistoryDetail: React.FC<Props> = ({ character }) => {
  return (
    <div className={`${report['inner-text']} ${report['inner-background']}`}>
      <h1 className={report['sub-title']}>다마고치 히스토리</h1>
      <div className={report['sub-content']}>
        <div className={report['inner-image']}>
          <Image
            src={images.character1} // 캐릭터 이미지는 prop에 따라 동적으로 변경될 수 있습니다.
            width={100}
            height={100}
            alt='Character Image'
          />
        </div>
        <div>
          <span>이름: {character.nickname}</span>
          <p>생존: {character.vita_point} 포인트</p>
        </div>
      </div>
    </div>
  );
};

export default DamagochiHistoryDetail;
