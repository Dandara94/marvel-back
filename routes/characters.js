require("dotenv").config();
const express = require("express"); // Import express 
const router = express.Router(); // Creation de route dans un autre fichier que index.js
const cors = require("cors");
const axios = require("axios");

router.use(cors());
router.use(express.json());

router.get("/characters", async (req, res) => {
  // console.log(req.query)
  try {
    // let name = "";
    // if (req.query.name) {
    //   name = req.query.name;
    // }

    const name = req.query.name || "";
    const skip = req.query.skip || "0";
    const limit = req.query.limit || "100";

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}&name=${name}&skip=${skip}&limit=${limit}`
    );
    // console.log(response.data);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/character/:characterId", async (req, res) => {
  console.log(req.params)
  try {

  const characterId = req.params.characterId
  console.log(characterId)

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${characterId}?apiKey=${process.env.API_KEY}`
    );
    // console.log(response.data);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;