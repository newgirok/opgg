import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Rank.css";

const Rank = () => {
  const { region, name, tag } = useParams();
  const [rankStatus, setStatus] = useState(null);
  const [rankData, setRankData] = useState(null);

  const getRankInfo = () => {
    axios
      .get("http://localhost:8080/user/rank", {
        params: {
          region,
          name,
          tag,
        },
      })
      .then((res) => {
        setStatus(res.status);
        setRankData(res.data);
      })
      .catch(console.error);
  };

  useEffect(() => {
    setStatus(null);
    setRankData(null);
    getRankInfo();
  }, [region, name, tag]);

  if (rankStatus === 200 && !rankData) {
    return <div className="rank-box"> 랭크 정보가 존재하지 않습니다. </div>;
  }

  if (!rankData) {
    return <div className="rank-box"> 랭크 정보를 불러오는 중...</div>;
  }

  return (
    <div className="rank-box">
      <div className="rank-player">
        {name}#{tag}
      </div>
      <h3>랭크 정보</h3>
      <div className="rank-tier">
        {rankData.tier} {rankData.rank}
      </div>
      <div>LP: {rankData.leaguePoints}</div>
      <div>
        승: {rankData.wins} / 패: {rankData.lose}
      </div>
    </div>
  );
};

export default Rank;
