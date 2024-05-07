import { ReportModal } from '../report-modal';

import Link from 'next/link';
import styles from '@/public/styles/modal.module.scss';
import report from '@/public/styles/report.module.scss';

export default function ModalReport() {
  return (
    <ReportModal>
      <div className={report['inner-text']}>
        <h1 className={report['sub-title']}>리포트</h1>
        <div>평균 수명: 8일</div>
        <div>최장 생존 시간: 13일</div>
        <div>총 획득 시간: 1282시간</div>
        <div>평균 체형: 보통</div>
        <div>환생한 횟수: 9회</div>
        <div>출석 횟수: 83일</div>
      </div>
    </ReportModal>
  );
}
