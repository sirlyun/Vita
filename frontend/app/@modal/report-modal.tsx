'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import style from '@/public/styles/modal.module.scss';
import styles from '@/public/styles/main.module.scss';
import report from '@/public/styles/report.module.scss';
import useUserStore from '@/store/user-store';
import Image from 'next/image';
import Link from 'next/link';
import images from '@/util/images.js';

export function ReportModal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<React.ElementRef<'dialog'>>(null);
  const userStore = useUserStore();

  // 메뉴 활성화 변수
  const [activeMenu, setActiveMenu] = useState('damagochi-report');

  const handleClick = (menuName: string) => {
    setActiveMenu(menuName);
  };

  // 현재 페이지의 경로
  const pathname = usePathname();
  console.log(pathname);

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, []);

  // 모달 외부 클릭 시 종료
  // const closeModal = (e: React.MouseEvent<HTMLDialogElement, MouseEvent>) =>
  //   e.target === dialogRef.current && router.back();

  // 홈으로 이동하면서 모달 닫기
  const gameModalClose = () => {
    dialogRef.current?.close(); // 모달 닫기
    userStore.isNewBestRecord = false;
    router.back();
  };

  const modalClose = () => {
    router.back();
  };

  return (
    <dialog
      ref={dialogRef}
      // onClick={closeModal}
      onClose={router.back}
      className={style['modal-outer']}
    >
      <div className={report['modal-container']}>
        <div className={`${styles.item} bg ${report.title}`}>
          <p>Report</p>
        </div>
        <div className={report['menu-container']}>
          <button
            className={`${
              activeMenu === 'damagochi-report' ? '' : report.inactive
            }`}
            onClick={() => handleClick('damagochi-report')}
          >
            <Link href={`/`}>
              <Image
                src={images.routine_icon}
                width={60}
                height={60}
                alt='option'
              ></Image>
            </Link>
          </button>
          <button
            className={`${activeMenu === 'user-report' ? '' : report.inactive}`}
            onClick={() => handleClick('user-report')}
          >
            <Link href={`/`}>
              <Image
                src={images.stastitic_icon}
                width={60}
                height={60}
                alt='option'
              ></Image>
            </Link>
          </button>
          <button
            className={`${report['button-blue']} ${
              activeMenu === 'damagochi-history' ? '' : report.inactive
            }`}
            onClick={() => handleClick('damagochi-history')}
          >
            <Link href={`/`}>
              <Image
                src={images.routine_icon}
                width={60}
                height={60}
                alt='option'
              ></Image>
            </Link>
          </button>
          <button
            className={`${report['button-blue']} ${
              activeMenu === 'user-history' ? '' : report.inactive
            }`}
            onClick={() => handleClick('user-history')}
          >
            <Link href={`/`}>
              <Image
                src={images.stastitic_icon}
                width={60}
                height={60}
                alt='option'
              ></Image>
            </Link>
          </button>
        </div>
        <div className={`${report['modal-inner']} bg`}>{children}</div>
      </div>
    </dialog>
  );
}
