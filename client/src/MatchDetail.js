//MatchDetail.js
import React from "react";
import "./MatchDetail.css";

const spellIdToName = {
  1: "SummonerBoost",
  3: "SummonerExhaust",
  4: "SummonerFlash",
  6: "SummonerHaste",
  7: "SummonerHeal",
  11: "SummonerSmite",
  12: "SummonerTeleport",
  13: "SummonerMana",
  14: "SummonerDot",
  21: "SummonerBarrier",
  30: "SummonerPoroRecall",
  31: "SummonerPoroThrow",
  32: "SummonerSnowball",
  39: "SummonerMark",
  54: "Summoner_UltBookPlaceholder",
  55: "Summoner_UltBookSmitePlaceholder",
};

const getSpellImg = (id) => {
  const name = spellIdToName[id];
  return name
    ? `https://ddragon.leagueoflegends.com/cdn/15.8.1/img/spell/${name}.png`
    : "";
};

const getItemImg = (id) =>
  `https://ddragon.leagueoflegends.com/cdn/15.8.1/img/item/${id}.png`;
const getChampImg = (name) =>
  `https://ddragon.leagueoflegends.com/cdn/15.8.1/img/champion/${name}.png`;

const getQueueName = (queueId) => {
  switch (queueId) {
    case 420:
      return "솔로랭크";
    case 430:
      return "일반";
    case 440:
      return "자유랭크";
    case 450:
      return "칼바람 나락";
    case 1700:
      return "아레나";
    default:
      return "기타";
  }
};

const MatchDetail = ({ match }) => {
  if (!match || !match.champion) return null;

  return (
    <div>
      <div className={`match-summary ${match.win ? "win" : "lose"}`}>
        <div className="champion-wrap">
          <img
            src={getChampImg(match.champion)}
            alt={match.champion}
            width="48"
            className="champion-icon"
          />
          <div className="champion-level">{match.level}</div>
        </div>
        <div className="summary-content">
          <div className="champion-name">
            {match.champion} <span>{match.kda}</span>
          </div>
          <div>
            {match.name}#{match.tag}
          </div>
          <div>
            CS: {match.cs} / 피해량: {match.damage}
          </div>
        </div>
        <div className="spells-box">
          {match.spells?.spell1Id && (
            <img
              src={getSpellImg(match.spells.spell1Id)}
              alt="spell1"
              width="24"
              className="spell-icon"
            />
          )}
          {match.spells?.spell2Id && (
            <img
              src={getSpellImg(match.spells.spell2Id)}
              alt="spell2"
              width="24"
              className="spell-icon"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchDetail;
