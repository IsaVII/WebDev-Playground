import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const HEADER = { alg: "HS256", typ: "JWT" };
const PAYLOAD = { sub: 42, role: "user", exp: 1735689600 };

function b64url(obj) {
  return btoa(JSON.stringify(obj)).replace(/=+$/, "");
}

// Illustrative signature only - real JWTs use HMAC-SHA256, not this.
function fakeSignature(header, payload, secret) {
  const input = `${header}.${payload}.${secret}`;
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (Math.imul(31, h) + input.charCodeAt(i)) | 0;
  }
  return (h >>> 0).toString(16);
}

function JwtDemo() {
  const [tampered, setTampered] = useState(false);
  const [checked, setChecked] = useState(false);

  const headerB64 = b64url(HEADER);
  const payload = tampered ? { ...PAYLOAD, role: "admin" } : PAYLOAD;
  const payloadB64 = b64url(payload);
  const secret = "SERVER_ONLY_SECRET";
  // The signature is always computed from the ORIGINAL payload the server
  // signed - a tampered payload won't match it, which is the whole point.
  const originalSignature = fakeSignature(headerB64, b64url(PAYLOAD), secret);
  const recomputed = fakeSignature(headerB64, payloadB64, secret);
  const valid = recomputed === originalSignature;

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        A JWT is three base64url parts joined by dots:{" "}
        <code>header.payload.signature</code>. The header and payload are just
        base64 - anyone can decode and read them, no secret required. What makes
        a JWT trustworthy is the signature: it's computed from the header and
        payload using a secret only the server knows, so changing the payload
        without the secret breaks the signature.
      </p>

      <div className="bg-surface rounded p-3 mb-4 border border-line font-mono text-xs break-all">
        <span className="text-red-400">{headerB64}</span>.
        <span className="text-yellow-400">{payloadB64}</span>.
        <span className="text-green-400">{originalSignature}</span>
      </div>

      <div className="grid md:grid-cols-3 gap-3 mb-4 text-xs font-mono">
        <div className="bg-surface border border-line rounded p-3">
          <p className="text-red-400 mb-1">header</p>
          <pre className="text-heading-alt whitespace-pre-wrap">
            {JSON.stringify(HEADER, null, 2)}
          </pre>
        </div>
        <div className="bg-surface border border-line rounded p-3">
          <p className="text-yellow-400 mb-1">payload</p>
          <pre className="text-heading-alt whitespace-pre-wrap">
            {JSON.stringify(payload, null, 2)}
          </pre>
        </div>
        <div className="bg-surface border border-line rounded p-3">
          <p className="text-green-400 mb-1">signature</p>
          <p className="text-subtle">
            HMAC(header + payload, SECRET) - only the server can produce a valid
            one
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <button
          onClick={() => {
            setTampered((t) => !t);
            setChecked(false);
          }}
          className={`px-3 py-2 rounded text-xs transition-colors ${
            tampered
              ? "bg-red-500/20 text-red-400 border border-red-500/40"
              : "bg-surface border border-line text-heading-alt"
          }`}
        >
          {tampered
            ? "Payload tampered: role → admin"
            : "Tamper with payload (edit role client-side)"}
        </button>
        <button
          onClick={() => setChecked(true)}
          className="bg-accent text-white px-4 py-2 rounded text-xs hover:opacity-90 transition-opacity"
        >
          jwt.verify(token, SECRET)
        </button>
      </div>

      {checked && (
        <p
          className={`text-xs font-mono mb-4 ${valid ? "text-green-400" : "text-red-400"}`}
        >
          {valid
            ? "✓ Signature matches - token accepted"
            : "✗ Signature mismatch - JsonWebTokenError: invalid signature"}
        </p>
      )}

      <CodeBlock>{`// Anyone can decode a JWT without the secret:
JSON.parse(atob(token.split(".")[1])); // { sub: 42, role: "user", exp: ... }
// -> never put secrets in a JWT payload, it's readable, not encrypted

// Only the server can produce a valid signature for a given payload:
jwt.verify(token, SECRET); // throws if the signature doesn't match
                            // (tampered payload, wrong secret, or expired)`}</CodeBlock>
    </div>
  );
}

export default JwtDemo;
