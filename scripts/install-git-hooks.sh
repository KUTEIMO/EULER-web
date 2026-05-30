#!/bin/sh
# Install from repo root: sh scripts/install-git-hooks.sh
cp scripts/hooks/prepare-commit-msg .git/hooks/prepare-commit-msg
chmod +x .git/hooks/prepare-commit-msg
echo "Git hook installed: co-author trailers will be removed from commits."
echo "On Windows/Cursor use: bash scripts/git-commit-tree-kuteimo.sh \"your message\""
