import Link from 'next/link';
import icons from '@/util/icons';
import Image from 'next/image';
import styles from '@/public/styles/game.module.scss';
import RankingBoard from '@/components/game/RankingBoard';

export default async function SinglePlayPage() {
  return (
    <div className={`${styles.main} bg`}>
      <div className={styles.title}>
        <h1>RANKING</h1>
      </div>
      <RankingBoard />
      <div className={styles['btn-container']}>
        <Link href='/game/single/running'>
          <button className={'bg'}>
            <Image
              src={icons.running}
              width={60}
              height={60}
              alt='running icon'
            ></Image>
          </button>
        </Link>
        <Link href='/game/single/workout'>
          <button className={'bg'}>
            <Image
              src={icons.gym}
              width={60}
              height={60}
              alt='gym icon'
            ></Image>
          </button>
        </Link>
      </div>
    </div>
  );
}
