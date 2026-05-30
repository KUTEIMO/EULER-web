#!/bin/sh
set -e
cd "$(dirname "$0")/.."
export GIT_AUTHOR_NAME="KUTEIMO"
export GIT_AUTHOR_EMAIL="123103966+KUTEIMO@users.noreply.github.com"
export GIT_COMMITTER_NAME="KUTEIMO"
export GIT_COMMITTER_EMAIL="123103966+KUTEIMO@users.noreply.github.com"
MSG="${1:-feat: EULER Web React with slides, guion, i18n and Firebase}"
git add -A
TREE=$(git write-tree)
COMMIT=$(git commit-tree "$TREE" -m "$MSG")
git reset --hard "$COMMIT"
echo "Created commit: $COMMIT"
git log -1 --format="author=%an <%ae> committer=%cn <%ce>"
