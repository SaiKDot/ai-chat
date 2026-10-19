#!/usr/bin/env bash

set -u

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is required to start the Next.js app." >&2
  exit 1
fi

PYTHON="$ROOT_DIR/apps/python-api/.venv/bin/python"
if [[ ! -x "$PYTHON" ]]; then
  if ! command -v python3 >/dev/null 2>&1; then
    echo "Python 3 is required to start the Python app." >&2
    exit 1
  fi
  PYTHON="$(command -v python3)"
fi

pids=()

cleanup() {
  local status=$?
  trap - EXIT INT TERM

  for pid in "${pids[@]}"; do
    kill "$pid" 2>/dev/null || true
  done
  for pid in "${pids[@]}"; do
    wait "$pid" 2>/dev/null || true
  done

  exit "$status"
}

trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM

echo "Starting Python app..."
"$PYTHON" -u apps/python-api/main.py &
pids+=("$!")

echo "Starting Next.js app..."
npm --prefix apps/ai-chat-web run dev &
pids+=("$!")

status=0
wait "${pids[0]}" || status=$?
wait "${pids[1]}" || {
  next_status=$?
  if [[ "$status" -eq 0 ]]; then
    status="$next_status"
  fi
}
exit "$status"
