# KAG Batteries — B2B Website

Public-facing B2B website for **KAG Batteries**, a torch manufacturer based in Indore, MP. Serves as the digital storefront for dealers and distributors across Madhya Pradesh and Maharashtra.

**Live:** [www.kagbatteries.in](https://www.kagbatteries.in)

---

## What's Inside

- **17 Product Pages** — Dynamic SSG pages for every torch model (`/products/[slug]`) with specs, pricing tiers, and JSON-LD schema for Google Shopping
- **Product Catalogue** (`/products`) — Filterable grid/list with category filters (Li-Ion / Lead Acid) and search
- **Dealer Inquiry** (`/inquiry`) — Bulk order inquiry form with WhatsApp integration and product multi-select
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

## Deployment

Auto-deploys to Vercel on every push to `main`. No environment variables required for the public website.

---

Built by [Xero Seven](https://xeroseven.in) · Powered by Next.js + Vercel
