#!/usr/bin/env bash
###############################################################################
# Formula 19 — Update / restart script
#
# Use this AFTER the initial deploy.sh has been run successfully.
# It only pulls the latest code, reinstalls deps, rebuilds, and restarts the
# systemd service. It does NOT prompt for credentials and does NOT touch
# Nginx or SSL.
#
# Run as root from the project root:
#   sudo bash deploy/update.sh
#
# Optional flags:
#   --no-pull     skip "git pull"
#   --no-install  skip "pnpm install"
#   --service NAME  override the systemd service name (default: formula19)
###############################################################################
set -euo pipefail

if [[ $EUID -ne 0 ]]; then
  echo "This script must be run as root. Try: sudo bash deploy/update.sh"
  exit 1
fi

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
APP_USER="${SUDO_USER:-$USER}"
SERVICE_NAME="formula19"
DO_PULL=1
DO_INSTALL=1

while [[ $# -gt 0 ]]; do
  case "$1" in
    --no-pull) DO_PULL=0; shift ;;
    --no-install) DO_INSTALL=0; shift ;;
    --service) SERVICE_NAME="$2"; shift 2 ;;
    -h|--help)
      grep '^#' "$0" | sed 's/^#//'
      exit 0 ;;
    *) echo "Unknown flag: $1"; exit 1 ;;
  esac
done

if [[ ! -f "$PROJECT_DIR/.env.local" ]]; then
  echo "ERROR: $PROJECT_DIR/.env.local is missing."
  echo "Run 'sudo bash deploy/deploy.sh' first to create it."
  exit 1
fi

if ! systemctl cat "${SERVICE_NAME}.service" >/dev/null 2>&1; then
  echo "ERROR: systemd service '${SERVICE_NAME}' not found."
  echo "Run 'sudo bash deploy/deploy.sh' first, or pass --service <name> if it"
  echo "was installed under a different name."
  exit 1
fi

echo "============================================================"
echo " Formula 19 — Update & restart"
echo " Project:  $PROJECT_DIR"
echo " Service:  $SERVICE_NAME"
echo " User:     $APP_USER"
echo "============================================================"

cd "$PROJECT_DIR"

if [[ $DO_PULL -eq 1 ]] && [[ -d .git ]]; then
  echo
  echo "[1/4] Pulling latest code..."
  sudo -u "$APP_USER" git pull --ff-only
else
  echo
  echo "[1/4] Skipping git pull."
fi

if [[ $DO_INSTALL -eq 1 ]]; then
  echo
  echo "[2/4] Installing dependencies..."
  sudo -u "$APP_USER" bash -lc "cd '$PROJECT_DIR' && pnpm install --no-frozen-lockfile"
else
  echo
  echo "[2/4] Skipping pnpm install."
fi

echo
echo "[3/4] Building the app..."
# Always wipe the previous .next so stale prerendered pages (e.g. cached 404s)
# never carry over into the new build.
sudo -u "$APP_USER" bash -lc "cd '$PROJECT_DIR' && rm -rf .next && pnpm build"

echo
echo "[3.5/4] Importing TechFeed catalog (if not already imported)..."
sudo -u "$APP_USER" bash -lc "cd '$PROJECT_DIR' && pnpm import:techfeed"

echo
echo "[4/4] Restarting service..."
systemctl restart "$SERVICE_NAME"
sleep 2
systemctl --no-pager --full status "$SERVICE_NAME" | head -n 20 || true

echo
echo "============================================================"
echo " Done. Live logs:  sudo journalctl -u $SERVICE_NAME -f"
echo "============================================================"
