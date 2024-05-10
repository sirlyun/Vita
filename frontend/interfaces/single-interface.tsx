// 최상위 랭킹 리스트 인터페이스
interface RankingListProps {
  running: RankingCategory;
  training: RankingCategory;
}

// 각 카테고리(달리기, 트레이닝)에 대한 인터페이스
interface RankingCategory {
  requester_ranking: RequesterRanking;
  total_ranking: TotalRankingItem[];
}

// 요청자 랭킹 정보 인터페이스
interface RequesterRanking {
  nickname: string;
  ranking: number;
  score: number;
}

// 전체 랭킹 목록 아이템 인터페이스
interface TotalRankingItem {
  nickname: string;
  score: number;
}

interface SinglePlayPageProps {
  rankingList: RankingListProps;
}

interface RankingListPageProps {
  rankingList: RankingListProps;
  activeMenu: string;
}
