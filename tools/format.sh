#!/bin/bash -e

git diff main --name-only --diff-filter=ACMR "*.mjs" "*.ts" "*.tsx" \
  | sed "s/'/\\\\'/g" \
  | sed 's| |\\ |g' \
  | sed 's/-/\\-/g' \
  | xargs yarn prettier --write
