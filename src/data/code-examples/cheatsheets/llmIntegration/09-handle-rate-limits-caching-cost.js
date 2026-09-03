import crypto from 'node:crypto';

// Cache by a hash of the data being analyzed, not by user id - if nothing
// in the log changed, the answer wouldn't either, so don't pay for (or
// wait on) a repeat call.
const cache = new Map(); // swap for Redis/your DB in production
const CACHE_TTL_MS = 1000 * 60 * 30;

function cacheKeyFor(entries) {
  return crypto.createHash('sha256').update(JSON.stringify(entries)).digest('hex');
}

app.post('/api/migraines/analyze', async (req, res) => {
  const { entries } = req.body;
  const key = cacheKeyFor(entries);
  const cached = cache.get(key);
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) {
    return res.json(cached.result);
  }

  try {
    const result = await analyzeWithRetry(entries);
    cache.set(key, { result, at: Date.now() });
    res.json(result);
  } catch (err) {
    if (err.status === 429) {
      return res.status(429).json({ error: 'Rate limited - try again in a minute' });
    }
    throw err;
  }
});

// The SDK throws on 429s/5xxs - retry once with backoff instead of
// failing the whole request on a transient blip.
async function analyzeWithRetry(entries, attempt = 1) {
  try {
    return await callModel(entries);
  } catch (err) {
    if (attempt < 3 && (err.status === 429 || err.status >= 500)) {
      await new Promise((r) => setTimeout(r, attempt * 500));
      return analyzeWithRetry(entries, attempt + 1);
    }
    throw err;
  }
}
