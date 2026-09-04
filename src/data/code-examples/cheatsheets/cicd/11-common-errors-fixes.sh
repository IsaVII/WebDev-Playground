Error: "Process completed with exit code 1" (no more detail)
Cause: A step failed but the real error is buried above the generic summary line.
Fix: Expand the failing step's log, not just the final summary block - the actual stack trace is usually a few lines up.

Error: "Dependencies lock file is not found" / npm ci fails
Cause: No package-lock.json committed, or setup-node's cache: "npm" can't find one to hash.
Fix: Commit package-lock.json - npm ci refuses to run without an exact lockfile, by design.

Error: Workflow doesn't trigger at all
Cause: The file isn't under .github/workflows/, has a YAML syntax error, or the branch name in on.push.branches doesn't match your default branch.
Fix: Check the Actions tab's "All workflows" list - if yours isn't listed, GitHub couldn't parse the file; check YAML indentation first.

Error: "Resource not accessible by integration" on deploy
Cause: The job is missing the permissions block (pages: write / id-token: write) that actions/deploy-pages needs.
Fix: Add the permissions block shown in step 9 to the deploy job.

Error: Secret shows up as an empty string in the log
Cause: Referencing secrets.NAME from a pull_request-triggered workflow on a fork, where secrets are withheld intentionally.
Fix: Use pull_request_target with caution, or restructure so the step needing the secret only runs on push to your own repo.
