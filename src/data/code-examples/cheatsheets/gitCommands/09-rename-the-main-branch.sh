# Rename the local branch (e.g. master -> main)
git branch -m master main

# Push the new branch and set it as the upstream
git push -u origin main

# Delete the old branch on the remote
git push origin --delete master
