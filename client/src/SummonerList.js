import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MatchDetail from "./MatchDetail";
import Home from "./Home";
import Rank from "./Rank";
import "./SummonerList.css";

let SummonersList = () => {
  const { region, name, tag } = useParams();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMatchList = () => {
    setLoading(true);
    axios
      .get("http://localhost:8080/user/matches", {
        params: { region, name, tag },
      })
      .then((res) => {
        setMatches(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("매치 리스트 불러오기 실패:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getMatchList();
  }, [region, name, tag]);

  return (
    <div className="summoner-page">
      <Home className="home-top" />
      <div className="summoner-content">
        <div className="summoner-layout">
          <aside className="summoner-aside">
            <Rank />
          </aside>
          <main className="summoner-main">
            {loading ? (
              <div className="match-loading">전적을 불러오는 중...</div>
            ) : matches.length > 0 ? (
              matches.map((match, idx) => (
                <MatchDetail key={idx} match={match} />
              ))
            ) : (
              <div className="match-loading">전적 정보가 없습니다.</div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default SummonersList;
