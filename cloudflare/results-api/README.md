# Cloudflare Results API

This Worker accepts listening-test submissions from the static front-end and stores
them in Cloudflare D1.

## Endpoints

- `POST /api/submissions`
- `GET /health`
- `GET /api/submissions/export?limit=100` with `Authorization: Bearer <ADMIN_TOKEN>`

## Local development

1. Copy `.dev.vars.example` to `.dev.vars`.
2. Update `wrangler.toml` with your D1 database id and allowed origins.
3. Install dependencies with `npm install`.
4. Run `npm run dev`.

## Deploy

1. Create the D1 database.
2. Update `wrangler.toml`.
3. Apply migrations with `npm run db:migrate`.
4. Set secrets:
   - `npx wrangler secret put ADMIN_TOKEN`
   - `npx wrangler secret put IP_HASH_SALT`
5. Deploy with `npm run deploy`.
