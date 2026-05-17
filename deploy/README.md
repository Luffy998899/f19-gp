# Ubuntu 22.04 VPS Deployment

This deploys the Formula 19 Next.js app to a fresh Ubuntu 22.04 server with
Nginx + Let's Encrypt SSL in one command.

## Prerequisites

1. A VPS running **Ubuntu 22.04** with root or sudo access.
2. A **domain name** whose A record (and optional `www` CNAME/A) points to
   the VPS public IP. SSL issuance will fail until DNS has propagated.
3. A **Supabase project** with the schema bootstrapped. From your local
   machine or the Supabase SQL editor, run once:
   ```
   scripts/000_bootstrap_schema.sql
   ```
   Grab these three values from Supabase **Settings → API**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

## Deploy

SSH into the VPS, pull the project, then run:

```bash
sudo bash deploy/deploy.sh
```

You will be prompted for:

- Site domain (e.g. `example.com`)
- Whether to also include `www.example.com`
- Email address for Let's Encrypt
- The three Supabase environment variables

The script will:

1. Install Node.js 20, pnpm, Nginx, and Certbot.
2. Open ports 80/443 in UFW.
3. Write `.env.local`, install dependencies, and run `pnpm build`.
4. Create a `formula19` systemd service running on `127.0.0.1:3000`.
5. Configure Nginx as a reverse proxy for your domain.
6. Issue and auto-renew a Let's Encrypt SSL certificate with HTTP→HTTPS
   redirect enabled.

When it finishes, open:

```
https://<your-domain>/setup
```

to create the first admin account. The setup page is single-use and will
become unavailable once an admin exists.

## Common operations

```bash
sudo systemctl status formula19         # app status
sudo journalctl -u formula19 -f         # live logs
sudo systemctl restart formula19        # restart after env changes
sudo certbot renew --dry-run            # test SSL renewal
sudo nginx -t && sudo systemctl reload nginx
```

## Updating the site

```bash
cd /path/to/project
git pull
pnpm install
pnpm build
sudo systemctl restart formula19
```
