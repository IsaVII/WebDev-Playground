import { useState } from "react";
import CodeBlock from "../../CodeBlock";

function SessionsDemo() {
  const [store, setStore] = useState({});
  const [cookie, setCookie] = useState(null);
  const [log, setLog] = useState([]);

  const login = () => {
    const sid = "sess_" + Math.random().toString(36).slice(2, 8);
    setStore((s) => ({
      ...s,
      [sid]: { userId: 42, email: "ada@example.com" },
    }));
    setCookie(sid);
    setLog((l) => [
      ...l,
      `Server creates session ${sid} → { userId: 42 }`,
      `Response: Set-Cookie: sid=${sid}; HttpOnly`,
      `Browser stores the cookie, sends it automatically on future requests`,
    ]);
  };

  const request = () => {
    if (!cookie) {
      setLog((l) => [...l, "No cookie set - request is anonymous"]);
      return;
    }
    const session = store[cookie];
    if (session) {
      setLog((l) => [
        ...l,
        `GET /profile  Cookie: sid=${cookie}`,
        `Server looks up ${cookie} in the session store → found`,
        `✓ req.session.userId = ${session.userId}`,
      ]);
    } else {
      setLog((l) => [
        ...l,
        `GET /profile  Cookie: sid=${cookie}`,
        `Server looks up ${cookie} → not found (expired or destroyed)`,
        `✗ 401 - treated as logged out`,
      ]);
    }
  };

  const logout = () => {
    if (!cookie) return;
    setStore((s) => {
      const copy = { ...s };
      delete copy[cookie];
      return copy;
    });
    setLog((l) => [...l, `Server deletes session ${cookie} from the store`]);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        A session's actual data - who's logged in, what's in their cart - lives
        on the server. The browser only ever holds an opaque ID in a cookie;
        destroy the server-side record and that ID becomes meaningless, which is
        what makes server-side logout instant.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={login}
          className="bg-accent text-white px-3 py-2 rounded text-xs hover:opacity-90 transition-opacity"
        >
          Log in
        </button>
        <button
          onClick={request}
          className="bg-surface border border-line rounded px-3 py-2 text-xs text-heading-alt hover:border-accent transition-colors"
        >
          Send GET /profile
        </button>
        <button
          onClick={logout}
          className="bg-surface border border-line rounded px-3 py-2 text-xs text-heading-alt hover:border-accent transition-colors"
        >
          Log out (destroy session)
        </button>
        <button
          onClick={() => setLog([])}
          className="text-sm text-subtle hover:text-accent transition-colors ml-auto"
        >
          Clear
        </button>
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-sm min-h-[130px]">
        {log.length === 0 && (
          <p className="text-subtle text-xs">Log in to start a session...</p>
        )}
        {log.map((entry, i) => (
          <p key={i} className="text-xs text-heading-alt mb-1">
            {entry}
          </p>
        ))}
      </div>

      <CodeBlock>{`const session = require("express-session");

app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 },
}));

app.post("/login", (req, res) => {
  req.session.userId = user.id;   // stored server-side, keyed by the cookie
  res.sendStatus(200);
});

app.post("/logout", (req, res) => {
  req.session.destroy();          // session is gone - cookie is now meaningless
  res.sendStatus(200);
});`}</CodeBlock>
    </div>
  );
}

export default SessionsDemo;
