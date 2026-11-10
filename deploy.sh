#!/bin/bash
set -e

cd /opt/kai

echo "=== Pull latest changes ==="
git pull

echo "=== Validate Docker Compose ==="
docker compose config -q

echo "=== Rebuild and start services ==="
docker compose up -d --build --force-recreate

echo "=== Restart internal Nginx ==="
docker compose restart nginx

echo "=== Check container status ==="
docker compose ps

echo "=== Test frontend ==="
curl -sS -o /dev/null -w "Frontend HTTP %{http_code}\n" \
  -H "Host: kaimusic.app" http://127.0.0.1:18081/ || true

echo "=== Test backend ==="
curl -sS -o /dev/null -w "Backend HTTP %{http_code}\n" \
  -H "Host: api.kaimusic.app" http://127.0.0.1:18081/ || true

echo "=== Deployment finished ==="
