import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const REMOTE_HISTORY = ["Initial commit", "Add README"];

function CommitList({ commits, emptyLabel }) {
  if (commits.length === 0) {
    return <p className="text-subtle text-sm">{emptyLabel}</p>;
  }
  return (
    <ol className="text-sm space-y-1">
      {commits.map((commit, i) => (
        <li key={i} className="text-heading-alt font-mono">
          {i + 1}. {commit}
        </li>
      ))}
    </ol>
  );
}

function CloneRemoteDemo() {
  const [cloned, setCloned] = useState(false);
  const [remote, setRemote] = useState(REMOTE_HISTORY);
  const [local, setLocal] = useState([]);

  const clone = () => {
    setLocal([...remote]);
    setCloned(true);
  };

  const commitLocally = () => {
    setLocal((l) => [...l, "Fix typo in header"]);
  };

  const push = () => {
    setRemote(local);
  };

  const remoteCommitsOnRemoteOnly = () => {
    setRemote((r) => [...r, "Update dependencies"]);
  };

  const pull = () => {
    setLocal(remote);
  };

  const ahead = local.length - remote.filter((c) => local.includes(c)).length;
  const behind = remote.length - local.filter((c) => remote.includes(c)).length;

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Cloning copies a remote repository's entire history to your machine.
        After that, <code>push</code> sends your local commits to the remote,
        and <code>pull</code> brings the remote's commits to you.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={clone}
          disabled={cloned}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          git clone origin
        </button>
        <button
          onClick={commitLocally}
          disabled={!cloned}
          className="bg-surface border border-line text-heading px-4 py-2 rounded hover:border-accent transition-colors disabled:opacity-50"
        >
          Commit locally
        </button>
        <button
          onClick={remoteCommitsOnRemoteOnly}
          disabled={!cloned}
          className="bg-surface border border-line text-heading px-4 py-2 rounded hover:border-accent transition-colors disabled:opacity-50"
        >
          Simulate teammate's push
        </button>
        <button
          onClick={push}
          disabled={!cloned || ahead === 0}
          className="bg-surface border border-line text-heading px-4 py-2 rounded hover:border-accent transition-colors disabled:opacity-50"
        >
          git push
        </button>
        <button
          onClick={pull}
          disabled={!cloned || behind === 0}
          className="bg-surface border border-line text-heading px-4 py-2 rounded hover:border-accent transition-colors disabled:opacity-50"
        >
          git pull
        </button>
      </div>

      {cloned && (
        <p className="text-sm text-muted mb-4">
          Local is{" "}
          <span className="text-heading-alt font-semibold">{ahead} ahead</span>{" "}
          and{" "}
          <span className="text-heading-alt font-semibold">
            {behind} behind
          </span>{" "}
          origin.
        </p>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-surface rounded p-4 border border-line">
          <h5 className="text-heading-alt font-semibold mb-2 text-sm uppercase tracking-wide">
            Local repository
          </h5>
          <CommitList
            commits={local}
            emptyLabel="Not cloned yet - nothing here."
          />
        </div>
        <div className="bg-surface rounded p-4 border border-line">
          <h5 className="text-heading-alt font-semibold mb-2 text-sm uppercase tracking-wide">
            Remote (origin)
          </h5>
          <CommitList commits={remote} emptyLabel="Empty" />
        </div>
      </div>

      <CodeBlock>{`git clone https://github.com/team/project.git
git push origin main
git pull origin main`}</CodeBlock>
    </div>
  );
}

export default CloneRemoteDemo;
