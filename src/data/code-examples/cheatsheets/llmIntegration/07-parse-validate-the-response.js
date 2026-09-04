function extractJson(text) {
  // Models sometimes wrap JSON in ```json fences even when asked not to -
  // strip those before parsing rather than trusting the raw string.
  const cleaned = text.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
  return JSON.parse(cleaned);
}

app.post('/api/migraines/analyze', async (req, res) => {
  const { entries } = req.body;
  if (!Array.isArray(entries) || entries.length === 0) {
    return res.status(400).json({ error: 'entries must be a non-empty array' });
  }

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-5', // check docs.claude.com for the current model ID - these change over time
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: [
        { role: 'user', content: buildUserPrompt(entries) },
      ],
    });

    const textBlock = message.content.find((block) => block.type === 'text');
    const result = extractJson(textBlock?.text ?? '');

    if (!Array.isArray(result.patterns) || typeof result.summary !== 'string') {
      throw new Error('Response did not match the expected shape');
    }

    res.json(result);
  } catch (err) {
    console.error('LLM analysis failed:', err);
    res.status(502).json({ error: 'Analysis is temporarily unavailable' });
  }
});
