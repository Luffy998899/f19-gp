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
read -rp "Site domain (e.g. example.com, no http://): " DOMAIN
[[ -z "$DOMAIN" ]] && { echo "Domain is required."; exit 1; }

read -rp "Also include www.${DOMAIN}? [Y/n]: " INCLUDE_WWW
INCLUDE_WWW="${INCLUDE_WWW:-Y}"

read -rp "Email for Let's Encrypt notifications: " LE_EMAIL
[[ -z "$LE_EMAIL" ]] && { echo "Email is required."; exit 1; }

echo
echo "Supabase credentials (from your Supabase project Settings -> API):"
read -rp "  NEXT_PUBLIC_SUPABASE_URL: " SUPABASE_URL
read -rp "  NEXT_PUBLIC_SUPABASE_ANON_KEY: " SUPABASE_ANON
read -rsp "  SUPABASE_SERVICE_ROLE_KEY (input hidden): " SUPABASE_SERVICE
echo
[[ -z "$SUPABASE_URL" || -z "$SUPABASE_ANON" || -z "$SUPABASE_SERVICE" ]] && {
  echo "All three Supabase values are required."; exit 1; }

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
sudo -u "$APP_USER" bash -c "cd '$PROJECT_DIR' && pnpm install --frozen-lockfile=false && pnpm build"

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
systemctl enable --now ${SERVICE_NAME}.service

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
