import report from "@/public/styles/report.module.scss";

// 사용자 건강 리포트 컴포넌트
export default function UserHealth() {
  return (
    <div className={`${report["inner-text"]} ${report["inner-background"]}`}>
      <h1 className={report["sub-title"]}>사용자 주간 리포트</h1>
      <div className={report["sub-content"]}>
        <div className={report["info"]}>
          <span className={report["info-title"]}>획득한 생명력</span>
          <span> 0년</span>
        </div>
        <div>건강 점수: 8일</div>
        <div>음주 습관: 13일</div>
        <div>흡연 습관: 1282시간</div>
        <div>식습관: 보통</div>
        <div>
          BMI: 29.6<span>(과체중)</span>
        </div>
        <div>위험군: 고혈압, 당뇨, 통풍 악화</div>
        <div>
          <span>개선 방안</span>
          <ul>
            <li>체중 관리를 위한 식습관 조절 및 규칙적인 운동</li>
            <li>통풍 관리를 위한 음주 및 고기류의 섭취 줄이기</li>
            <li>고혈압 관리를 위한 소금 섭취 줄이기</li>
          </ul>
          <span>종합 평</span>
          <ul>
            <li>건강한 생활 습관을 유지하고 있음</li>
            <li>음주 및 흡연 습관에 주의가 필요</li>
            <li>식습관 및 체중 관리에 신경 써야 함</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
