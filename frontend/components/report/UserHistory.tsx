import report from '@/public/styles/report.module.scss';

// 사용자 건강 히스토리 컴포넌트
export default function Fourth() {
  return (
    <div className={`${report['inner-text']} ${report['inner-background']}`}>
      <h1 className={report['sub-title']}>사용자 건강 히스토리</h1>
      <div className={report['sub-content']}>
        <div>평균 수명: 8일</div>
        <div>최장 생존 시간: 13일</div>
        <div>총 획득 시간: 1282시간</div>
        <div>평균 체형: 보통</div>
        <div>환생한 횟수: 9회</div>
        <div>출석 횟수: 83일</div>
      </div>
    </div>
  );
}
