import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Rank.css";

const TIER_COLORS = {
  IRON: "#6b6b6b",
  BRONZE: "#8c5a2b",
  SILVER: "#7e9aa8",
  GOLD: "#c89b3c",
  PLATINUM: "#4a9e8e",
  EMERALD: "#2ecc71",
  DIAMOND: "#5b9bd5",
  MASTER: "#9d4dc0",
  GRANDMASTER: "#e84057",
  CHALLENGER: "#f4c874",
};

const Rank = () => {
  const { region, name, tag } = useParams();
  const [rankData, setRankData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setRankData(null);
    setLoading(true);
    axios
      .get("http://localhost:8080/user/rank", { params: { region, name, tag } })
      .then((res) => { setRankData(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [region, name, tag]);

  const winRate = rankData
    ? Math.round((rankData.wins / (rankData.wins + rankData.losses)) * 100)
    : null;

  const tierColor = rankData ? TIER_COLORS[rankData.tier] ?? "#9099a1" : "#9099a1";

  return (
    <div className="rank-card">
      <div className="rank-name">{name}<span className="rank-tag">#{tag}</span></div>

      {loading && <div className="rank-loading">불러오는 중...</div>}

      {!loading && !rankData && (
        <div className="rank-unranked">
          <div className="rank-tier-badge" style={{ color: "#9099a1" }}>UNRANKED</div>
        </div>
      )}

      {!loading && rankData && (
        <>
          <div className="rank-tier-badge" style={{ color: tierColor }}>
            {rankData.tier} {rankData.rank}
          </div>
          <div className="rank-lp">{rankData.leaguePoints} LP</div>
          <div className="rank-record">
            <span className="rank-wins">{rankData.wins}W</span>
            <span className="rank-losses">{rankData.losses}L</span>
            <span className="rank-winrate">{winRate}%</span>
          </div>
        </>
      )}
    </div>
  );
};

export default Rank;
