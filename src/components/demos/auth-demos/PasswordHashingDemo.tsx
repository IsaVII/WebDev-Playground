import { useState } from "react";
import CodeBlock from "../../CodeBlock";

// A tiny illustrative hash - NOT bcrypt, just enough to show "same input
// always produces the same fixed-length, unreadable output" for the demo.
function fakeHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  const hex = (h >>> 0).toString(16).padStart(8, "0");
  return `$2b$10$${hex}${hex.split("").reverse().join("")}`;
}

function PasswordHashingDemo() {
  const [password, setPassword] = useState("correct horse");
  const [stored, setStored] = useState(null);
  const [attempt, setAttempt] = useState("");
  const [result, setResult] = useState(null);

  const register = () => {
    setStored(fakeHash(password));
    setResult(null);
    setAttempt("");
  };

  const login = () => {
    if (!stored) return;
    const match = fakeHash(attempt) === stored;
    setResult(match);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        <code>bcrypt.hash()</code> turns a password into a one-way, salted hash
        - the same password hashed twice even produces different output because
        of the random salt, and there's no way to reverse a hash back into the
        original password. Login re-hashes the submitted password and compares
        hashes, never plain text.
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="bg-surface border border-line rounded p-3">
          <p className="text-xs text-muted mb-2">1. Register</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-surface-alt border border-line rounded px-2 py-1 text-sm mb-2 text-heading-alt"
            placeholder="Choose a password"
          />
          <button
            onClick={register}
            className="bg-accent text-white px-3 py-1 rounded text-sm hover:opacity-90 transition-opacity"
          >
            bcrypt.hash() &amp; store
          </button>
          {stored && (
            <p className="text-xs font-mono text-heading-alt mt-2 break-all">
              stored: {stored}
            </p>
          )}
        </div>

        <div className="bg-surface border border-line rounded p-3">
          <p className="text-xs text-muted mb-2">2. Log in</p>
          <input
            value={attempt}
            onChange={(e) => setAttempt(e.target.value)}
            className="w-full bg-surface-alt border border-line rounded px-2 py-1 text-sm mb-2 text-heading-alt"
            placeholder="Enter password to try"
            disabled={!stored}
          />
          <button
            onClick={login}
            disabled={!stored}
            className="bg-accent text-white px-3 py-1 rounded text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            bcrypt.compare()
          </button>
          {result !== null && (
            <p
              className={`text-xs mt-2 ${result ? "text-green-400" : "text-red-400"}`}
            >
              {result ? "✓ Match - login succeeds" : "✗ No match - 401"}
            </p>
          )}
        </div>
      </div>

      <CodeBlock>{`const bcrypt = require("bcrypt");

// Register: hash before storing, never store the raw password
const passwordHash = await bcrypt.hash(password, 10); // 10 = cost factor

// Login: compare the submitted password against the stored hash
const valid = await bcrypt.compare(submittedPassword, storedHash);
if (!valid) return res.status(401).json({ error: "Invalid credentials" });`}</CodeBlock>
    </div>
  );
}

export default PasswordHashingDemo;
