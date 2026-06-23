# OP.GG Clone

소환사 이름과 태그 입력으로 랭크 정보 조회 → 최근 20게임 전적 열람 → 아군/적군 팀 상세 확인까지 가능한 OP.GG 클론.

## 기술 스택

| 영역 | 스택 |
|------|------|
| 클라이언트 | React 19, React Router v7, Axios |
| 서버 | Node.js, Express 5, Axios, dotenv, nodemon |
| API | Riot Games API (Account v1, Summoner v4, League v4, Match v5) |

## 구조

```
소환사 검색 (이름#태그)
  → GET /user          (puuid → summoner 정보)
  → GET /user/rank     (솔로/자유랭크 티어, LP, 승/패)
  → GET /user/matches  (최근 20게임 match ID 조회
                         → 5개 단위 병렬 파싱
                         → kda, 아이템, 스펠, 룬, 아군/적군 팀 정보)
```

## 프로젝트 구조

```
opgg/
├── client/          # React 앱
│   ├── public/
│   └── src/
│       ├── App.js
│       ├── Home.js          # 소환사 검색 화면
│       ├── SummonerList.js  # 전적 목록 페이지
│       ├── Rank.js          # 랭크 정보 컴포넌트
│       └── MatchDetail.js   # 전적 상세 카드
└── server/          # Express 서버
    ├── index.js
    └── routes/
        └── user.js  # Riot API 연동 라우터
```

## 빠른 시작

```bash
# 의존성 설치
npm install

# 환경변수 설정
echo "RIOT_API_KEY=your_api_key_here" > server/.env

# 실행
npm run server   # 서버 (port 8080)
npm run client   # 클라이언트 (port 3000)
```

## 라이선스

MIT
