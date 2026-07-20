#!/bin/sh
set -eu

LEGACY_TAG="pre-kag-live-2026-07-20"
BRANCH="$(git branch --show-current)"

if [ "$BRANCH" != "main" ]; then
  echo "Run this command from the main branch. Current branch: $BRANCH" >&2
  exit 1
fi

if ! git rev-parse --verify "$LEGACY_TAG" >/dev/null 2>&1; then
  echo "Missing rollback tag: $LEGACY_TAG" >&2
  exit 1
fi

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Working tree has uncommitted changes. Commit or stash them before rollback." >&2
  exit 1
fi

LIVE_COMMIT="$(git rev-list --all --ancestry-path "$LEGACY_TAG"..HEAD | tail -n 1)"
if [ -z "$LIVE_COMMIT" ]; then
  echo "No commit found after $LEGACY_TAG; website is already on the legacy baseline." >&2
  exit 0
fi

echo "Reverting live website commit $LIVE_COMMIT to restore the pre-live version..."
git revert --no-edit "$LIVE_COMMIT"
git push origin main
echo "Rollback pushed. Vercel will redeploy the legacy website from main."
