import { useState } from "react";
import CodeBlock from "../../CodeBlock";

function AuthDemo() {
  const [token, setToken] = useState(null);
  const [log, setLog] = useState([]);

  const login = () => {
    const fakeToken = "eyJhbGciOi...demo-jwt";
    setToken(fakeToken);
    setLog((l) => [
      ...l,
      `POST /login { "user": "ada", "password": "•••••" } → 200 OK`,
      `Response body: { "token": "${fakeToken}" }`,
    ]);
  };

  const logout = () => {
    setToken(null);
    setLog((l) => [...l, "Token discarded client-side - logged out"]);
  };

  const callProtected = () => {
    if (token) {
      setLog((l) => [
        ...l,
        `GET /me  Authorization: Bearer ${token} → 200 OK`,
        `Response body: { "user": "ada", "role": "admin" }`,
      ]);
    } else {
      setLog((l) => [
        ...l,
        "GET /me  (no Authorization header) → 401 Unauthorized",
      ]);
    }
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Log in to receive a token, then use it to reach a protected route.
        Without a valid <code>Authorization</code> header the same route
        responds with <code>401 Unauthorized</code> instead of the data.
      </p>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        {!token ? (
          <button
            onClick={login}
            className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
          >
            Log in
          </button>
        ) : (
          <button
            onClick={logout}
            className="bg-surface border border-line text-heading px-4 py-2 rounded hover:border-accent transition-colors"
          >
            Log out
          </button>
        )}
        <button
          onClick={callProtected}
          className="bg-surface border border-line text-heading px-4 py-2 rounded hover:border-accent transition-colors"
        >
          Call GET /me
        </button>
        <span className="text-sm text-muted">
          {token ? "Signed in ✓" : "Not signed in"}
        </span>
        <button
          onClick={() => setLog([])}
          className="text-sm text-subtle hover:text-accent transition-colors ml-auto"
        >
          Clear
        </button>
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-xs min-h-[120px] overflow-x-auto">
        {log.length === 0 && (
          <p className="text-subtle">Requests will appear here...</p>
        )}
        {log.map((entry, i) => (
          <p key={i} className="text-heading-alt whitespace-pre-wrap mb-1">
            {entry}
          </p>
        ))}
      </div>

      <CodeBlock>{`const { token } = await login(username, password);
localStorage.setItem("token", token); // kept for next requests, cleared on logout

fetch("/me", {
  headers: { Authorization: \`Bearer \${token}\` },
});`}</CodeBlock>
    </div>
  );
}

export default AuthDemo;
