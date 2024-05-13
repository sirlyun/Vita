import report from '@/public/styles/report.module.scss';
import { dummyData } from '@/api/report';

// 다마고치 종합 리포트 컴포넌트
export default function DamagochiHealth() {
  return (
    <div className={`${report['inner-text']} ${report['inner-background']}`}>
      <h1 className={report['sub-title']}>다마고치 종합 리포트</h1>
      <div className={report['sub-content']}>
        <div>평균 수명: {dummyData[0].lifetime}일</div>
        <div>최장 생존 시간: {dummyData[0].time1}일</div>
        <div>총 획득 시간: {dummyData[0].time2}시간</div>
        <div>평균 체형: {dummyData[0].body_shape}</div>
        <div>환생한 횟수: {dummyData[0].rebirth}회</div>
        <div>출석 횟수: {dummyData[0].attendance}일</div>
      </div>
    </div>
  );
}
