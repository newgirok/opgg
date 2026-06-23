import React, { useState } from "react";
import "./MatchDetail.css";

const spellIdToName = {
  1: "SummonerBoost", 3: "SummonerExhaust", 4: "SummonerFlash",
  6: "SummonerHaste", 7: "SummonerHeal", 11: "SummonerSmite",
  12: "SummonerTeleport", 13: "SummonerMana", 14: "SummonerDot",
  21: "SummonerBarrier", 30: "SummonerPoroRecall", 31: "SummonerPoroThrow",
  32: "SummonerSnowball", 39: "SummonerMark",
  54: "Summoner_UltBookPlaceholder", 55: "Summoner_UltBookSmitePlaceholder",
};

const CDN = "https://ddragon.leagueoflegends.com/cdn/15.8.1/img";
const getSpellImg = (id) => {
  const name = spellIdToName[id];
  return name ? `${CDN}/spell/${name}.png` : "";
};
const getItemImg = (id) => `${CDN}/item/${id}.png`;
const getChampImg = (name) => `${CDN}/champion/${name}.png`;

const getQueueName = (queueId) => {
  const map = { 420: "솔로랭크", 430: "일반", 440: "자유랭크", 450: "칼바람", 1700: "아레나" };
  return map[queueId] ?? "기타";
};

const formatDuration = (sec) => `${Math.floor(sec / 60)}분 ${sec % 60}초`;

const MatchDetail = ({ match }) => {
  const [showDetail, setShowDetail] = useState(false);
  if (!match || !match.champion) return null;

  const kdaParts = match.kda.split("/");
  const kills = kdaParts[0], deaths = kdaParts[1], assists = kdaParts[2];
  const kdaRatio = deaths === "0" ? "Perfect" : ((Number(kills) + Number(assists)) / Number(deaths)).toFixed(2);

  const renderTeamTable = (team) => {
    const maxDamage = Math.max(...team.map((p) => p.damage));
    return (
      <table className="team-table">
        <thead>
          <tr>
            <th>소환사</th><th>챔피언</th><th>스펠</th>
            <th>KDA</th><th>피해량</th><th>와드</th><th>CS</th><th>아이템</th>
          </tr>
        </thead>
        <tbody>
          {team.map((p, idx) => (
            <tr key={idx} className={p.name === match.name ? "highlight-player" : ""}>
              <td className="td-name">{p.name}</td>
              <td>
                <div className="champion-cell">
                  <img src={getChampImg(p.champion)} alt={p.champion} className="champ-icon-sm" />
                  <span>{p.champion}</span>
                </div>
              </td>
              <td className="td-spells">
                {p.spells?.spell1Id && <img src={getSpellImg(p.spells.spell1Id)} alt="" className="spell-icon-sm" />}
                {p.spells?.spell2Id && <img src={getSpellImg(p.spells.spell2Id)} alt="" className="spell-icon-sm" />}
              </td>
              <td>{p.kda}</td>
              <td>
                <div className="damage-cell">
                  <span>{p.damage.toLocaleString()}</span>
                  <div className="damage-bar-bg">
                    <div className="damage-bar-fill" style={{ width: `${(p.damage / maxDamage) * 100}%` }} />
                  </div>
                </div>
              </td>
              <td>{p.vision}</td>
              <td>{p.cs}</td>
              <td className="td-items">
                {p.items.map((item, i) =>
                  item !== 0 ? (
                    <img key={i} src={getItemImg(item)} alt="" className="item-icon-sm" />
                  ) : (
                    <div key={i} className="item-empty" />
                  )
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className={`match-card ${match.win ? "match-win" : "match-lose"}`}>
      <div className="match-summary" onClick={() => setShowDetail(!showDetail)}>
        <div className="match-meta">
          <div className="match-queue">{getQueueName(match.queueId)}</div>
          <div className={`match-result ${match.win ? "win" : "lose"}`}>{match.win ? "승리" : "패배"}</div>
          <div className="match-duration">{formatDuration(match.duration)}</div>
        </div>

        <div className="match-champ-wrap">
          <div className="champ-icon-wrap">
            <img src={getChampImg(match.champion)} alt={match.champion} className="champ-icon-lg" />
            <span className="champ-level">{match.level}</span>
          </div>
          <div className="match-spells">
            {match.spells?.spell1Id && <img src={getSpellImg(match.spells.spell1Id)} alt="" className="spell-icon-md" />}
            {match.spells?.spell2Id && <img src={getSpellImg(match.spells.spell2Id)} alt="" className="spell-icon-md" />}
          </div>
        </div>

        <div className="match-kda-wrap">
          <div className="match-kda">{kills} / <span className="kda-deaths">{deaths}</span> / {assists}</div>
          <div className="match-kda-ratio">{kdaRatio} {kdaRatio !== "Perfect" && "KDA"}</div>
        </div>

        <div className="match-stats">
          <div>CS {match.cs}</div>
          <div>피해 {match.damage?.toLocaleString()}</div>
          <div>와드 {match.vision}</div>
        </div>

        <div className="match-items">
          {match.items?.map((item, i) =>
            item !== 0 ? (
              <img key={i} src={getItemImg(item)} alt="" className="item-icon-md" />
            ) : (
              <div key={i} className="item-empty item-icon-md" />
            )
          )}
        </div>

        <div className="match-toggle">{showDetail ? "▲" : "▼"}</div>
      </div>

      {showDetail && (
        <div className="match-detail">
          <div className="detail-teams">
            <div>
              <div className="team-label team-label--ally">아군 팀</div>
              {renderTeamTable(match.teams.ally)}
            </div>
            <div>
              <div className="team-label team-label--enemy">적군 팀</div>
              {renderTeamTable(match.teams.enemy)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchDetail;
