// server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

app.post('/api/migraines/analyze', async (req, res) => {
  // Steps 4-7 fill this handler in - for now just prove the wiring works.
  res.json({ received: Array.isArray(req.body.entries) });
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`Proxy listening on :${process.env.PORT || 3001}`);
});
