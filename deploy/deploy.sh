#!/usr/bin/env bash
###############################################################################
# Formula 19 — One-shot Ubuntu 22.04 VPS deployment script
#
# Run as root (or with sudo) from the project root:
#   sudo bash deploy/deploy.sh
#
# It will:
#   1. Prompt for the site domain, admin email (for Let's Encrypt), and the
#      Supabase environment variables (URL, anon key, service-role key).
#   2. Install Node.js 20, pnpm, Nginx, and Certbot.
#   3. Install dependencies, build the Next.js app, and create a systemd
#      service that runs it on 127.0.0.1:3000.
#   4. Configure Nginx as a reverse proxy on the chosen domain.
#   5. Obtain & auto-renew a free SSL certificate via Certbot.
#
# After it finishes, open https://<your-domain>/setup to create the admin
# account from the browser.
###############################################################################
set -euo pipefail

if [[ $EUID -ne 0 ]]; then
  echo "This script must be run as root. Try: sudo bash deploy/deploy.sh"
  exit 1
fi

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
APP_USER="${SUDO_USER:-$USER}"
SERVICE_NAME="formula19"
APP_PORT="3000"

echo "============================================================"
echo " Formula 19 — Ubuntu 22.04 deployment"
echo "============================================================"

# ---- 1. Prompts ------------------------------------------------------------
# Allow re-running non-interactively by reading saved values from
# /etc/formula19/deploy.conf (created on first successful run).
CONF_DIR="/etc/formula19"
CONF_FILE="$CONF_DIR/deploy.conf"
if [[ -f "$CONF_FILE" ]]; then
  echo "Found existing config at $CONF_FILE — reusing saved values."
  echo "Delete that file to re-prompt, or run deploy/update.sh for code-only updates."
  # shellcheck disable=SC1090
  source "$CONF_FILE"
fi

prompt_default() {
  # prompt_default <var-name> <prompt-text> [hidden]
  local __var="$1" __msg="$2" __hidden="${3:-}"
  local __cur="${!__var:-}"
  local __input=""
  if [[ -n "$__cur" ]]; then
    if [[ "$__hidden" == "hidden" ]]; then
      read -rp "$__msg [keep existing] (leave empty to keep): " __input || true
    else
      read -rp "$__msg [$__cur]: " __input || true
    fi
    [[ -n "$__input" ]] && printf -v "$__var" '%s' "$__input"
  else
    if [[ "$__hidden" == "hidden" ]]; then
      read -rsp "$__msg: " __input
      echo
    else
      read -rp "$__msg: " __input
    fi
    printf -v "$__var" '%s' "$__input"
  fi
}

prompt_default DOMAIN "Site domain (e.g. example.com, no http://)"
[[ -z "${DOMAIN:-}" ]] && { echo "Domain is required."; exit 1; }

prompt_default INCLUDE_WWW "Also include www.${DOMAIN}? [Y/n]"
INCLUDE_WWW="${INCLUDE_WWW:-Y}"

prompt_default LE_EMAIL "Email for Let's Encrypt notifications"
[[ -z "${LE_EMAIL:-}" ]] && { echo "Email is required."; exit 1; }

echo
echo "Supabase credentials (from your Supabase project Settings -> API):"
prompt_default SUPABASE_URL "  NEXT_PUBLIC_SUPABASE_URL"
prompt_default SUPABASE_ANON "  NEXT_PUBLIC_SUPABASE_ANON_KEY"
prompt_default SUPABASE_SERVICE "  SUPABASE_SERVICE_ROLE_KEY (input hidden)" hidden
[[ -z "${SUPABASE_URL:-}" || -z "${SUPABASE_ANON:-}" || -z "${SUPABASE_SERVICE:-}" ]] && {
  echo "All three Supabase values are required."; exit 1; }

# Save for next run (root-only).
mkdir -p "$CONF_DIR"
cat > "$CONF_FILE" <<CONF
DOMAIN="$DOMAIN"
INCLUDE_WWW="$INCLUDE_WWW"
LE_EMAIL="$LE_EMAIL"
SUPABASE_URL="$SUPABASE_URL"
SUPABASE_ANON="$SUPABASE_ANON"
SUPABASE_SERVICE="$SUPABASE_SERVICE"
CONF
chmod 600 "$CONF_FILE"

# ---- 2. System packages ----------------------------------------------------
echo
echo "[1/6] Installing system packages..."
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y curl ca-certificates gnupg ufw nginx

if ! command -v node >/dev/null 2>&1 || [[ "$(node -v)" != v20* ]]; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi

if ! command -v pnpm >/dev/null 2>&1; then
  npm install -g pnpm@9
fi

if ! command -v certbot >/dev/null 2>&1; then
  apt-get install -y certbot python3-certbot-nginx
fi

# Firewall
ufw allow OpenSSH || true
ufw allow 'Nginx Full' || true
yes | ufw enable || true

# ---- 3. Build the app ------------------------------------------------------
echo
echo "[2/6] Writing .env.local..."
cat > "$PROJECT_DIR/.env.local" <<ENV
NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_ANON
SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_SERVICE
NEXT_PUBLIC_SITE_URL=https://$DOMAIN
NODE_ENV=production
ENV
chown "$APP_USER":"$APP_USER" "$PROJECT_DIR/.env.local"
chmod 600 "$PROJECT_DIR/.env.local"

echo
echo "[3/6] Installing dependencies and building the app..."
# Always wipe the previous .next so Next can never serve a stale prerendered
# page (e.g. a cached 404) from a previous build.
sudo -u "$APP_USER" bash -lc "cd '$PROJECT_DIR' && rm -rf .next && pnpm install --no-frozen-lockfile && pnpm build"

# ---- 4. systemd service ----------------------------------------------------
echo
echo "[4/6] Creating systemd service '$SERVICE_NAME'..."
cat > /etc/systemd/system/${SERVICE_NAME}.service <<UNIT
[Unit]
Description=Formula 19 Next.js app
After=network.target

[Service]
Type=simple
User=$APP_USER
WorkingDirectory=$PROJECT_DIR
EnvironmentFile=$PROJECT_DIR/.env.local
Environment=PORT=$APP_PORT
ExecStart=/usr/bin/pnpm start
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
UNIT

systemctl daemon-reload
systemctl enable ${SERVICE_NAME}.service
# Always restart so re-runs of deploy.sh pick up the freshly built code.
systemctl restart ${SERVICE_NAME}.service

# ---- 5. Nginx --------------------------------------------------------------
echo
echo "[5/6] Configuring Nginx for $DOMAIN..."
SERVER_NAMES="$DOMAIN"
[[ "$INCLUDE_WWW" =~ ^[Yy]$ ]] && SERVER_NAMES="$DOMAIN www.$DOMAIN"

cat > /etc/nginx/sites-available/${SERVICE_NAME} <<NGINX
server {
    listen 80;
    listen [::]:80;
    server_name $SERVER_NAMES;

    client_max_body_size 25m;

    location / {
        proxy_pass http://127.0.0.1:$APP_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 300s;
    }
}
NGINX

ln -sf /etc/nginx/sites-available/${SERVICE_NAME} /etc/nginx/sites-enabled/${SERVICE_NAME}
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

# ---- 6. SSL via Certbot ----------------------------------------------------
echo
echo "[6/6] Requesting SSL certificate from Let's Encrypt..."
CERTBOT_DOMAINS="-d $DOMAIN"
[[ "$INCLUDE_WWW" =~ ^[Yy]$ ]] && CERTBOT_DOMAINS="$CERTBOT_DOMAINS -d www.$DOMAIN"

certbot --nginx --non-interactive --agree-tos -m "$LE_EMAIL" \
  --redirect $CERTBOT_DOMAINS

systemctl reload nginx

# Auto-renew is installed as a systemd timer by the certbot package.
systemctl enable --now certbot.timer || true

echo
echo "============================================================"
echo " Done."
echo " Visit:  https://$DOMAIN/setup"
echo " to create the first admin account."
echo "============================================================"
echo
echo "Useful commands:"
echo "  sudo systemctl status $SERVICE_NAME       # app status"
echo "  sudo journalctl -u $SERVICE_NAME -f       # live logs"
echo "  sudo systemctl restart $SERVICE_NAME      # restart"
echo "  sudo certbot renew --dry-run              # test renewals"
