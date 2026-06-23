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

module.exports = router;
