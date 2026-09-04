function buildUserPrompt(entries) {
  return `Here is the migraine log, one entry per line:\n\n${formatEntriesForPrompt(
    entries,
  )}\n\nFind any patterns worth flagging.`;
}

app.post('/api/migraines/analyze', async (req, res) => {
  const { entries } = req.body;

  if (!Array.isArray(entries) || entries.length === 0) {
    return res.status(400).json({ error: 'entries must be a non-empty array' });
  }

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-5', // check docs.claude.com for the current model ID - these change over time
    max_tokens: 1000,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: buildUserPrompt(entries) }],
  });

  // Handled in the next step.
  res.json({ raw: message });
});
