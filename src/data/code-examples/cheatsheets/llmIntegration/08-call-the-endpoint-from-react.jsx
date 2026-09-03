function MigrainePatternInsights({ entries }) {
  const [status, setStatus] = useState('idle'); // idle | loading | done | error
  const [result, setResult] = useState(null);

  async function runAnalysis() {
    setStatus('loading');
    try {
      const res = await fetch('/api/migraines/analyze', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ entries }),
      });
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      setResult(await res.json());
      setStatus('done');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div>
      <button onClick={runAnalysis} disabled={status === 'loading' || entries.length < 5}>
        {status === 'loading' ? 'Analyzing…' : 'Find patterns'}
      </button>

      {status === 'error' && <p>Something went wrong - try again shortly.</p>}

      {status === 'done' && (
        <ul>
          {result.patterns.map((p) => (
            <li key={p.factor}>
              <strong>{p.factor}</strong> ({p.confidence} confidence) - {p.note}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
