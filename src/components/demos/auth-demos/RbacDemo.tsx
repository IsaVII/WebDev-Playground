import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const USERS = [
  { id: 1, label: "You (user, owns this post)", role: "user", authorId: 1 },
  { id: 2, label: "Another user (not the owner)", role: "user", authorId: 1 },
  { id: 3, label: "Admin (not the owner)", role: "admin", authorId: 1 },
];

const POST = { id: 7, authorId: 1, title: "My first post" };

function ProtectedRouteResult({ user }) {
  const isOwner = POST.authorId === user.id;
  const isAdmin = user.role === "admin";
  const allowed = isOwner || isAdmin;

  return (
    <div className="text-xs">
      <p className="text-heading-alt">
        DELETE /posts/{POST.id} as user {user.id} (role: {user.role})
      </p>
      <p className="pl-3 text-heading-alt">
        isOwner = post.authorId ({POST.authorId}) === req.user.sub ({user.id}) →{" "}
        {String(isOwner)}
      </p>
      <p className="pl-3 text-heading-alt">
        isAdmin = req.user.role === "admin" → {String(isAdmin)}
      </p>
      <p className={`pl-3 ${allowed ? "text-green-400" : "text-red-400"}`}>
        {allowed
          ? "✓ 204 No Content - deleted"
          : "✗ 403 Forbidden - not allowed"}
      </p>
    </div>
  );
}

function RbacDemo() {
  const [log, setLog] = useState([]);

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Being logged in (authentication) isn't the same as being allowed to do a
        specific thing (authorization). This delete route allows two kinds of
        requester: the resource's owner, or anyone with the <code>admin</code>{" "}
        role - everyone else, even other logged-in users, gets a 403.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {USERS.map((user) => (
          <button
            key={user.id + user.role}
            onClick={() => setLog((l) => [...l, user])}
            className="bg-surface border border-line rounded px-3 py-2 text-xs text-heading-alt hover:border-accent transition-colors"
          >
            {user.label}
          </button>
        ))}
        <button
          onClick={() => setLog([])}
          className="text-sm text-subtle hover:text-accent transition-colors ml-auto"
        >
          Clear
        </button>
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-sm min-h-[150px] space-y-3">
        {log.length === 0 && (
          <p className="text-subtle text-xs">Try deleting the post as...</p>
        )}
        {log.map((user, i) => (
          <ProtectedRouteResult key={i} user={user} />
        ))}
      </div>

      <CodeBlock>{`app.delete("/posts/:id", requireAuth, async (req, res) => {
  const post = await db.posts.findById(req.params.id);

  const isOwner = post.authorId === req.user.sub;
  const isAdmin = req.user.role === "admin";

  if (!isOwner && !isAdmin) {
    return res.status(403).json({ error: "Not allowed to delete this post" });
  }

  await post.delete();
  res.status(204).end();
});

// A middleware version, reusable across routes:
const requireRole = (role) => (req, res, next) =>
  req.user.role === role ? next() : res.status(403).json({ error: "Forbidden" });

app.get("/admin/stats", requireAuth, requireRole("admin"), handler);`}</CodeBlock>
    </div>
  );
}

export default RbacDemo;
