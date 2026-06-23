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

router.get("/", async (req, res) => {
  let userInfo = await getSummonerInfo(res.locals.name, res.locals.tag);
  res.json(userInfo);
});

module.exports = router;
