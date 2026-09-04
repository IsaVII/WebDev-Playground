Error: "Process completed with exit code 1" (no more detail)
Cause: A step failed but the real error is buried above the generic summary line.
Fix: Expand the failing step's log, not just the final summary block - the actual stack trace is usually a few lines up.

Error: "Dependencies lock file is not found" / npm ci fails
Cause: No package-lock.json committed, or setup-node's cache: "npm" can't find one to hash.
Fix: Commit package-lock.json - npm ci refuses to run without an exact lockfile, by design.

Error: Workflow doesn't trigger at all
Cause: The file isn't under .github/workflows/, has a YAML syntax error, or the branch name in on.push.branches doesn't match your default branch.
Fix: Check the Actions tab's "All workflows" list - if yours isn't listed, GitHub couldn't parse the file; check YAML indentation first.

Error: "remote: Permission to <owner>/<repo>.git denied" / 403 when pushing gh-pages
Cause: The deploy job is missing permissions: contents: write, so the default GITHUB_TOKEN isn't allowed to push the gh-pages branch that peaceiris/actions-gh-pages creates.
Fix: Add permissions: contents: write to the deploy job, as shown in step 9.

Error: "Resource not accessible by integration" on deploy (only if using the optional actions/deploy-pages job)
Cause: The job is missing the permissions block (pages: write / id-token: write) that actions/deploy-pages needs, or the repo's Pages source is still set to "Deploy from a branch" instead of "GitHub Actions".
Fix: Add that permissions block to the deploy job, and switch the Pages source to "GitHub Actions" - see the optional sub-step under step 9.

Error: Secret shows up as an empty string in the log
Cause: Referencing secrets.NAME from a pull_request-triggered workflow on a fork, where secrets are withheld intentionally.
Fix: Use pull_request_target with caution, or restructure so the step needing the secret only runs on push to your own repo.
