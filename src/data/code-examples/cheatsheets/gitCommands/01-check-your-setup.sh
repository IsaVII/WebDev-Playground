# Confirm Git is installed
git --version

# List all settings (system, global, and local combined)
git config --list

# List only your global (user-level) settings - the ones you'll check most often
git config --list --global

# List settings for the current repository only (must be run inside a repo)
git config --list --local

# List system-wide settings (rare - shared by every user on the machine)
git config --list --system
