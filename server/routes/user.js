const express = require("express");
const router = express.Router();
const axios = require("axios");

const RIOT_API_KEY = process.env.RIOT_API_KEY; // .env

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

router.use((req, res, next) => {
  const { region, name, tag } = req.query;
  res.locals = { region, name, tag };
  next();
});

const getSummonerInfo = async (gameName, tagLine) => {
  try {
    const accountResponse = await axios.get(
      `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
      {
        headers: {
          "X-Riot-Token": RIOT_API_KEY,
        },
      }
    );

    const puuid = accountResponse.data.puuid;

    const summonerResponse = await axios.get(
      `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
      {
        headers: {
          "X-Riot-Token": RIOT_API_KEY,
        },
      }
    );

    return summonerResponse.data;
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response ? error.response.data : error.message
    );
  }
};

const getUserRank = async (puuid) => {
  try {
    const getRank = await axios.get(
      `https://kr.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`,
      {
        headers: {
          "X-Riot-Token": RIOT_API_KEY,
        },
      }
    );

    return getRank.data[0];
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response ? error.response.data : error.message
    );
  }
};

const getMatchIds = async (puuid, start, count) => {
  try {
    const ids_res = await axios.get(
      `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}`,
      {
        headers: {
          "X-Riot-Token": RIOT_API_KEY,
        },
      }
    );

    return ids_res.data;
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response ? error.response.data : error.message
    );
  }
};

router.get("/", async (req, res) => {
  let userInfo = await getSummonerInfo(res.locals.name, res.locals.tag);
  res.json(userInfo);
});

router.get("/rank", async (req, res) => {
  let userInfo = await getSummonerInfo(res.locals.name, res.locals.tag);
  res.json(await getUserRank(userInfo.puuid));
});

router.get("/matches", async (req, res) => {
  let userInfo = await getSummonerInfo(res.locals.name, res.locals.tag);
  const ids = await getMatchIds(userInfo.puuid, 0, 20);
  res.json(ids);
});

module.exports = router;
