# Kavery Website — Kag Batteries Digital Transformation Project

> **CRITICAL: Read `PROJECT_BLUEPRINT.md` in this directory BEFORE writing ANY code.**
> That file contains the complete business context, 4-phase build plan, product data, and design principles.

## Project Context
- **Client:** Kag Batteries — B2B LED torch/battery manufacturer, Est. 1997, Indore MP
- **Revenue:** ₹10 Cr/year, 100% offline, selling to dealers in MP & Maharashtra
- **Our Goal:** Complete digital transformation → Add ₹1 Cr growth → Charge ₹1L/month
- **This is Xero Seven's FIRST paying client.** Quality matters. This is our portfolio piece.

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS 4
- **Dev:** `npm run dev`
- **Build:** `npm run build`

## Project Structure
- `src/app/` — Pages and route components
- `src/app/components/` — UI components (header, hero, products, contact, etc.)
- `src/data/products.ts` — Product data for 17 torch models with specs & image paths
- `public/product-images/` — Product images
- `PROJECT_BLUEPRINT.md` — **THE MASTER PLAN. Read this first. Always.**

## Rules
1. **Read `PROJECT_BLUEPRINT.md` before every build session** — it has the full business context
2. Follow Next.js App Router conventions — use `app/` directory
3. Use `next/image` for optimized images (dealers on slow 4G connections)
4. Use `next/font` for fonts
5. Server components by default, `"use client"` only when needed
6. **Mobile-first always** — dealers use ₹8-10K Android phones on Jio 4G
7. **WhatsApp-centric CTAs** — every product/inquiry should have WhatsApp option
8. **Bilingual ready** — Hindi + English content support
9. **B2B tone** — professional, trust-building, not flashy consumer-style
10. **Fast loading** — lazy load images, minimize JS bundle, target <3s page load

## Build Phases (from PROJECT_BLUEPRINT.md)
- **Phase 1 (Current):** Digital Storefront — product pages, dealer inquiry, SEO, mobile optimization
- **Phase 2:** Dealer Management System (separate dashboard app)
- **Phase 3:** Operations & Automation (inventory, dispatch, WhatsApp automation)
- **Phase 4:** Growth Engine (social media, referrals, campaigns)

## WhatsApp Integration
- Factory WhatsApp number: (to be configured)
- All "Request Price" / "Place Order" / "Inquire" CTAs should open WhatsApp with pre-filled messages
- Format: `https://wa.me/91XXXXXXXXXX?text=encoded_message`
