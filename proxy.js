// proxy.js
import express from "express";
import fetch from "node-fetch";

const app = express();

// Endpoint pour Stooq
app.get("/stooq", async (req, res) => {
  try {
    const symbol = req.query.symbol;
    if (!symbol) {
      return res.status(400).send({ error: "Le paramètre 'symbol' est requis." });
    }

    const stooqUrl = `https://stooq.com/q/d/l/?s=${symbol}&f=sd2t2ohlcvn&e=csv`;
    const response = await fetch(stooqUrl);
    const text = await response.text();

    // Autoriser toutes les origines (CORS)
    res.set("Access-Control-Allow-Origin", "*");
    res.send(text);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy Stooq en ligne sur le port ${PORT}`));
