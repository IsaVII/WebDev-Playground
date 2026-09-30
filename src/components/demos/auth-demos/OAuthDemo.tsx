import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const STEPS = [
  {
    actor: "Your app",
    text: "Redirect the user to Google: /o/oauth2/auth?client_id=...&redirect_uri=...",
  },
  {
    actor: "Google",
    text: "User logs in to Google and approves the requested permissions",
  },
  {
    actor: "Google",
    text: "Redirects back to your redirect_uri with a one-time code: ?code=abc123",
  },
  {
    actor: "Your app",
    text: "Server exchanges the code for tokens (server-to-server, code never touches the browser again): POST /token",
  },
  {
    actor: "Google",
    text: "Responds with an access_token (and often an id_token with the user's identity)",
  },
  {
    actor: "Your app",
    text: "Uses the access_token to fetch the user's profile, creates/finds a local user record, issues your own session or JWT",
  },
];

function OAuthDemo() {
  const [step, setStep] = useState(0);

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length));
  const reset = () => setStep(0);

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        "Sign in with Google" doesn't hand your app the user's Google password -
        it hands your server a short-lived code that proves the user approved
        your app, which your server then exchanges for a token. Your app never
        sees the user's real credentials at any point.
      </p>

      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={next}
          disabled={step >= STEPS.length}
          className="bg-accent text-white px-4 py-2 rounded text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {step >= STEPS.length
            ? "Flow complete"
            : `Next step (${step + 1}/${STEPS.length})`}
        </button>
        <button
          onClick={reset}
          className="text-sm text-subtle hover:text-accent transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-sm min-h-[180px]">
        {step === 0 && (
          <p className="text-subtle text-xs">
            Click "Next step" to start the flow...
          </p>
        )}
        {STEPS.slice(0, step).map((s, i) => (
          <p key={i} className="text-xs mb-2">
            <span
              className={`font-semibold ${
                s.actor === "Your app" ? "text-accent" : "text-yellow-400"
              }`}
            >
              {s.actor}:
            </span>{" "}
            <span className="text-heading-alt">{s.text}</span>
          </p>
        ))}
      </div>

      <CodeBlock>{`// Usually handled by a library (Passport.js, Auth.js, or the provider's SDK)
// rather than hand-rolled - the flow above has a lot of sharp edges
// (state parameter for CSRF protection, PKCE for public clients, etc.)

app.get("/auth/google", passport.authenticate("google", {
  scope: ["profile", "email"],
}));

app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // req.user is now populated - issue your own session/JWT here
    res.redirect("/dashboard");
  }
);`}</CodeBlock>
    </div>
  );
}

export default OAuthDemo;
