// A migraine log entry, as it already exists in your app's state/DB
const exampleEntry = {
  date: '2026-08-14',
  painLevel: 7, // 1-10
  sleepHours: 5.5,
  stressLevel: 6, // 1-10, self-reported
  weather: 'low pressure system, storm',
  triggersNoted: ['skipped breakfast', 'bright screens'],
  medicationTaken: 'sumatriptan',
};

// Turn a raw array of entries into a compact block of text the model can
// reason over. Keep it dense (no giant JSON with repeated keys) - fewer
// tokens means a faster, cheaper call, and a smaller haystack to search.
function formatEntriesForPrompt(entries) {
  return entries
    .map((e) =>
      [
        `Date: ${e.date}`,
        `Pain: ${e.painLevel}/10`,
        `Sleep: ${e.sleepHours}h`,
        `Stress: ${e.stressLevel}/10`,
        `Weather: ${e.weather || 'n/a'}`,
        `Triggers noted: ${e.triggersNoted?.join(', ') || 'none'}`,
        `Medication: ${e.medicationTaken || 'none'}`,
      ].join(' | '),
    )
    .join('\n');
}

export { formatEntriesForPrompt };
