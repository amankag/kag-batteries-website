# KAG Batteries — B2B Website

Public-facing B2B website for **KAG Batteries**, a torch manufacturer based in Indore, MP. Serves as the digital storefront for dealers and distributors across Madhya Pradesh and Maharashtra.

**Live:** [www.kagbatteries.in](https://www.kagbatteries.in)

---

## What's Inside

- **17 Product Pages** — Dynamic SSG pages for every torch model (`/products/[slug]`) with specs, pricing tiers, and JSON-LD schema for Google Shopping
- **Product Catalogue** (`/products`) — Filterable grid/list with category filters (Li-Ion / Lead Acid) and search
- **Dealer Inquiry** (`/inquiry`) — Bulk order inquiry form with email delivery to `info@kagbatteries.in`, WhatsApp fallback, and product multi-select
- **Dealer Pricing Tiers** — Retail MRP visible; dealer/distributor prices blurred, unlocked via WhatsApp CTA
- **SEO** — `sitemap.xml`, `robots.txt`, `metadataBase`, per-page OG tags, JSON-LD Product schema
- **DealerCTA Section** — Homepage B2B upgrade with trust stats and dealer benefits

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | TailwindCSS 4 |
| Language | TypeScript |
| Hosting | Vercel |
| SEO | generateMetadata + JSON-LD |

## Internal Links — KAG Batteries Digital Suite

| Project | Description | Link |
|---|---|---|
| **This repo** | Public B2B website | [kag-batteries-website](https://github.com/rohitkag07/kag-batteries-website) |
| **Dealer CRM** | Internal dealer management dashboard | [kag-batteries-dealer-crm](https://github.com/rohitkag07/kag-batteries-dealer-crm) |
| **Live CRM** | Dashboard for super admin / owner access | [kag-batteries-dealer-crm.vercel.app](https://kag-batteries-dealer-crm.vercel.app) |

> The Dealer CRM is restricted-access. Contact Xero Seven for credentials.

## Local Development

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Dealer Inquiry Email

The inquiry form posts to `/api/inquiry`. When SMTP env vars are configured, submissions are emailed to `info@kagbatteries.in`. If SMTP is not configured yet, the form falls back to the existing WhatsApp inquiry flow so leads are not lost.

Copy `.env.local.example` to `.env.local` after Zoho Mail is active and fill:

```bash
SMTP_HOST=
SMTP_PORT=465
SMTP_USER=info@kagbatteries.in
SMTP_PASS=
INQUIRY_FROM_EMAIL=info@kagbatteries.in
INQUIRY_TO_EMAIL=info@kagbatteries.in
```

Full operational setup guide: [`docs/KAG_DIGITAL_SETUP_GUIDE.md`](docs/KAG_DIGITAL_SETUP_GUIDE.md)

## Deployment

Auto-deploys to Vercel on every push to `main`. Add the SMTP environment variables in Vercel once Zoho Mail is ready.

---

Built by [Xero Seven](https://xeroseven.in) · Powered by Next.js + Vercel
