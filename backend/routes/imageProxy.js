const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const imageUrl = req.query.url;

    if (!imageUrl) {
      return res.status(400).send("Image URL required");
    }

    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
      maxRedirects: 5,
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
        "Referer": imageUrl
      }
    });

    res.set("Content-Type", response.headers["content-type"]);
    res.send(response.data);

  } catch (error) {
    console.log("Image Proxy Error:", error.message);
    res.status(500).send("Image load failed");
  }
});

module.exports = router;