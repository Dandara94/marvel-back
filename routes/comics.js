require("dotenv").config();
const express = require("express"); // Import express 
const router = express.Router(); // Creation de route dans un autre fichier que index.js
const cors = require("cors");
const axios = require("axios");

router.use(cors());
router.use(express.json());

router.get("/comics", async (req, res) => {
  try {
   
    const title = req.query.title || "";
    const skip = req.query.skip || "0";
    const limit = req.query.limit || "100";

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}&title=${title}&skip=${skip}&limit=${limit}`
    );
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/comics/:characterId", async (req, res) => {
  try {
    const characterId = req.params.characterId
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${process.env.API_KEY}`
    );
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/comic/:comicId", async (req, res) => {
  try {
    const comicId = req.params.comicId
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${comicId}?apiKey=${process.env.API_KEY}`
    );
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

