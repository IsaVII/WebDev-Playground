import { useState } from "react";
import CodeBlock from "../../CodeBlock";

function AuthFlowDemo() {
  const [strategy, setStrategy] = useState("session");
  const [log, setLog] = useState([]);
  const [running, setRunning] = useState(false);

  const run = () => {
    setLog([]);
    setRunning(true);

    const sessionSteps = [
      "POST /login { email, password }",
      "Server checks password hash → valid",
      "Server creates a session record: { id: 'sess_9f2', userId: 42 } (stored server-side)",
      "Response: Set-Cookie: sid=sess_9f2; HttpOnly",
      "— later —",
      "GET /profile  Cookie: sid=sess_9f2",
      "Server looks up sess_9f2 in its session store → finds userId 42",
      "✓ Request treated as user 42",
    ];

    const jwtSteps = [
      "POST /login { email, password }",
      "Server checks password hash → valid",
      "Server signs a token: jwt.sign({ sub: 42, role: 'user' }, SECRET)",
      "Response: { token: 'eyJhbGciOi...' }  (nothing stored server-side)",
      "— later —",
      "GET /profile  Authorization: Bearer eyJhbGciOi...",
      "Server verifies the signature with SECRET → valid, decodes { sub: 42 }",
      "✓ Request treated as user 42 (no database lookup needed)",
    ];

    const steps = strategy === "session" ? sessionSteps : jwtSteps;
    steps.forEach((line, i) => {
      setTimeout(() => {
        setLog((l) => [...l, line]);
        if (i === steps.length - 1) setRunning(false);
      }, i * 400);
    });
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Login always ends with the server handing the browser something to prove
        identity on future requests. The two dominant approaches differ in where
        that proof lives: <strong>sessions</strong> keep state on the server and
        hand out a lookup key; <strong>JWTs</strong> put the state in the token
        itself, signed so it can't be forged.
      </p>

      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => setStrategy("session")}
          className={`px-3 py-1 rounded text-sm transition-colors ${
            strategy === "session"
              ? "bg-accent text-white"
              : "bg-surface-alt text-muted hover:text-heading"
          }`}
        >
          Sessions
        </button>
        <button
          onClick={() => setStrategy("jwt")}
          className={`px-3 py-1 rounded text-sm transition-colors ${
            strategy === "jwt"
              ? "bg-accent text-white"
              : "bg-surface-alt text-muted hover:text-heading"
          }`}
        >
          JWTs
        </button>
        <button
          onClick={run}
          disabled={running}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50 ml-auto"
        >
          {running ? "Running..." : "Walk through login"}
        </button>
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-sm min-h-[190px]">
        {log.length === 0 && (
          <p className="text-subtle text-xs">
            Pick a strategy and walk through it...
          </p>
        )}
        {log.map((entry, i) => (
          <p
            key={i}
            className={`text-xs mb-1 ${
              entry.startsWith("—") ? "text-subtle" : "text-heading-alt"
            }`}
          >
            {entry}
          </p>
        ))}
      </div>

      <CodeBlock>
        {strategy === "session"
          ? `// Server keeps the session; browser just holds a cookie
req.session.userId = user.id;             // express-session writes this
res.cookie("sid", req.sessionID, { httpOnly: true });

// Every later request: Express reads the cookie, looks up the session
console.log(req.session.userId);          // 42 - no re-login needed`
          : `// Server stores nothing; the token itself is the proof
const token = jwt.sign({ sub: user.id, role: user.role }, SECRET, {
  expiresIn: "1h",
});

// Every later request: verify the signature, decode the payload
const payload = jwt.verify(token, SECRET); // { sub: 42, role: "user" }`}
      </CodeBlock>
    </div>
  );
}

export default AuthFlowDemo;
