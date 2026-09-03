// ❌ DON'T: calling the LLM directly from the browser
// Anyone can open devtools → Network tab and steal this key, then run up
// your bill (or worse) using your account.

const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'x-api-key': 'sk-ant-...', // shipped to every visitor's browser
    'content-type': 'application/json',
  },
  body: JSON.stringify({
    model: 'claude-sonnet-4-6',
    max_tokens: 1000,
    messages: [{ role: 'user', content: 'Find patterns in my migraine log' }],
  }),
});

// ✅ DO: the browser only ever talks to YOUR backend, over a route you
// control. Your backend holds the API key and forwards the request.
const analysis = await fetch('/api/migraines/analyze', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ entries: myMigraineLog }),
});
