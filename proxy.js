import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

// ✅ Route Yahoo Finance
app.get("/yahoo", async (req, res) => {
  try {
    const symbol = req.query.symbol;
    if (!symbol) return res.status(400).json({ error: "Symbole manquant" });

    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Erreur Yahoo:", err);
    res.status(500).json({ error: "Erreur lors de la récupération Yahoo" });
  }
});

// ✅ Route Finnhub (si tu veux la garder)
app.get("/quote", async (req, res) => {
  try {
    const symbol = req.query.symbol;
    const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=d47squhr01qk80bicmq0d47squhr01qk80bicmqg`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Erreur Finnhub" });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Proxy actif sur le port ${PORT}`));
