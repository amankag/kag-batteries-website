# KAG Batteries Digital Setup Guide

This guide converts the IT handoff plan into an execution checklist for KAG Batteries. Use it to create the official email accounts, Google Business Profile, social pages, first posts, and low-budget ads.

## Current Website Status

- Website: `www.kagbatteries.in`
- Dealer inquiry route: `/inquiry`
- Inquiry email target: `info@kagbatteries.in`
- Website code now supports email delivery through SMTP env vars.
- WhatsApp remains the backup if SMTP is not configured.

Required env vars after Zoho is active:

```env
SMTP_HOST=
SMTP_PORT=465
SMTP_USER=info@kagbatteries.in
SMTP_PASS=
INQUIRY_FROM_EMAIL=info@kagbatteries.in
INQUIRY_TO_EMAIL=info@kagbatteries.in
```

## 1. Zoho Mail Setup

Create all four addresses on Zoho Mail free plan using `kagbatteries.in`.

| Email address | Used for | Notes |
| --- | --- | --- |
| `info@kagbatteries.in` | Website form, public contact, Google Business, LinkedIn | Check daily. Main public address. |
| `sales@kagbatteries.in` | Dealer orders, pricing, follow-ups | Keeps sales separate from general inquiries. |
| `hr@kagbatteries.in` | Job applications and hiring | Keeps CVs away from business inboxes. |
| `accounts@kagbatteries.in` | Invoices, vendor payments, receipts | Keeps finance correspondence organized. |

Steps:

1. Go to `zoho.com/mail` on desktop.
2. Choose the Forever Free plan.
3. Create the Zoho admin account using the owner's personal email.
4. Verify phone OTP.
5. Add domain: `kagbatteries.in`.
6. Keep Zoho DNS screen open.
7. Ask domain/web developer to add the MX, TXT, and CNAME records shown by Zoho.
8. After verification, create these users: `info`, `sales`, `hr`, `accounts`.
9. Set strong passwords and store them in a secure owner-controlled place.
10. Send test email from Gmail to each address.
11. Reply from each Zoho address to confirm send/receive works.
12. Add SMTP values to Vercel/project env vars so the website inquiry form emails `info@`.
13. Install Zoho Mail app on the daily sales/inquiry phone and enable notifications.

Message for web developer:

```text
We are setting up Zoho Mail for kagbatteries.in. Please log in to the domain control panel and add the DNS records shown by Zoho: MX records, TXT records, and CNAME record. Do not delete existing website records. Add only the new Zoho records and reply after completion. DNS activation may take 30 to 60 minutes.
```

Future migration:

- Stay on Zoho for the first 6 to 12 months.
- Move to Google Workspace only when email volume or team need justifies the monthly cost.
- Keep the same four email addresses during migration.
- Migrate mail using Google Workspace migration tools so dealers see no address change.

## 2. Google Business Profile

Goal: make KAG visible for searches like `torch manufacturer Indore`, `LED battery factory Madhya Pradesh`, and `rechargeable torch supplier MP`.

Setup details:

- Business name: `KAG Batteries`
- Primary category: `Manufacturer`
- Secondary category: `Electrical equipment supplier`
- Address: `B-3, AKVN Industrial Area, Rangwasa, Indore, Madhya Pradesh 453310`
- Website: `www.kagbatteries.in`
- Hours: `Monday to Saturday, 9AM to 6PM` unless owner confirms different hours.
- Contact email: `info@kagbatteries.in`
- Phone: use both active phone numbers currently approved by the owner/website.

Business description:

```text
KAG Batteries is Madhya Pradesh's first battery and torch manufacturer, established in 1997 in Rau, Indore. We produce 1,00,000+ units per year across 17 rechargeable and LED torch models including the Kaveri and Deepshikha ranges. With 500+ active dealers across MP and Maharashtra, we offer factory-direct pricing and dealer partnerships. Visit kagbatteries.in to view products and submit a dealer inquiry.
```

Photos to collect before publishing:

| Photo type | What to shoot | Priority |
| --- | --- | --- |
| Factory exterior | Front gate, signboard, building exterior in daylight | High |
| Production floor | Workers at machines, assembly area, production line | High |
| Product range | All torch models together, plus individual hero shots | High |
| Finished goods store | Stacked boxes ready for dispatch | Medium |
| Team photo | Owner or manager with workers | Medium |
| Packing and dispatch | Packing boxes or loading vehicle | Medium |
| Company signboard | Any clear KAG branding inside/outside factory | Low |

Google Messages auto-reply:

```text
Thank you for contacting KAG Batteries. We will respond within 24 hours. For urgent queries, please call the number listed on our profile.
```

Review strategy:

- Ask only real workers, long-term dealers, and people who know the business.
- Never create fake accounts.
- Never ask one person to review multiple times.
- Do not offer money or gifts for reviews.
- Spread reviews over 4 to 5 days, around 5 reviews per day.
- Target 15 to 20 real reviews in the first month.
- Owner/manager should reply to every review.

Sample review guidance:

```text
Hindi: KAG Batteries mein bahut accha kaam hai. Products ki quality bahut achchi hai aur 25 saal se log kharidte hain.

English: Good quality torches. We have known KAG for many years. Reliable products and honest pricing.
```

Ask reviewers to write in their own words.

## 3. Social Media Setup

### LinkedIn Company Page

Setup:

- Company name: `KAG Batteries`
- Website: `www.kagbatteries.in`
- Industry: `Manufacturing > Electrical/Electronic Manufacturing`
- Company size: `11-50 employees`
- Company type: `Privately Held`
- Founded: `1997`
- Contact email: `info@kagbatteries.in`
- Logo: KAG Batteries logo
- Banner: factory photo, ideal size `1128 x 191 px`

About section:

```text
KAG Batteries is Madhya Pradesh's pioneering battery and torch manufacturer, founded in 1997 in Rau, Indore. We were the first company to establish battery manufacturing in the state, and over 25 years we have built an ecosystem of quality, reliability, and trust.

Our product range includes 17 rechargeable and LED torch models - including the Kaveri, Deepshikha, Nano, Commando, Safari, and Tez series - manufactured at our facility in Rangwasa, Indore with an output of over 1,00,000 units per year.

We work with 500+ active dealers across Madhya Pradesh and Maharashtra. Factory-direct pricing. Consistent quality. 25 years of trust behind every product.

Dealer inquiries welcome. Visit www.kagbatteries.in or write to info@kagbatteries.in.
```

First LinkedIn post:

```text
25 years ago, there were no battery manufacturers in Madhya Pradesh. KAG Batteries changed that.

We started in Rau, Indore in 1997 - and since then, we have not just built products. We have built a team, a factory, and an ecosystem. Many of the battery brands you see in MP today were started by people who first learned the craft here.

Our workers are the reason we have delivered over 1,00,000 units per year, year after year. The Kaveri torch in a farmer's hand at midnight. The Deepshikha in a shopkeeper's store during a power cut. Each one made by hands that have been part of this factory for years.

25 years. 17 products. 500+ dealers. And we are just getting started.

Dealer inquiries welcome - www.kagbatteries.in

#MadeinIndia #BatteryManufacturer #IndoreBusiness #KAGBatteries #Manufacturing #MadhyaPradesh
```

Add 2 to 3 real factory or worker photos.

### Instagram and Facebook

Setup:

- Facebook page name: `KAG Batteries Official`
- Instagram username options: `@kagbatteries` or `@kagbatteriesofficial`
- Bio:

```text
MP's first battery manufacturer since 1997. 17 torch models. 500+ dealers. Factory-direct pricing. Dealer inquiries: kagbatteries.in
```

Content that works:

- Product demo video: 30 seconds, torch beam in dark room.
- Worker/factory content: production line, packing, dispatch.
- Use case post: farmer, security guard, shopkeeper during power cut.
- Festival post: Diwali, Holi, Republic Day.
- Dealer shoutout: thank active dealers by city.
- Product comparison: quick guide for 3 models and use cases.

Hashtags:

```text
#KAGBatteries #KaveriTorch #MadeinIndia #TorchManufacturer #IndoreBusiness #BatteryManufacturer #MadhyaPradesh #LEDTorch #DealerInquiry #FarmerFirst
```

Weekly content plan:

| Week | Topic | What to post |
| --- | --- | --- |
| 1 | Company launch | 25-year story, workforce, factory photos |
| 2 | Product feature | Kaveri torch specs and use cases |
| 3 | Dealer spotlight | 500+ dealer network, invite new dealers |
| 4 | Behind the scenes | Production floor video/photos |
| 5 | Product feature 2 | Deepshikha or Nano model |
| 6 | Seasonal post | Monsoon/power cut season |
| Ongoing | Mixed | One post per week, always include website link |

## 4. Ads Setup

Start only after:

- `info@kagbatteries.in` works.
- Website inquiry form has been smoke-tested.
- Google Business Profile is at least submitted for verification.
- Product/factory photos are available.

### Google Ads Search Campaign

Campaign settings:

- Goal: website sign-ups or leads.
- Campaign type: Search.
- Locations: Madhya Pradesh, Maharashtra, Gujarat, Rajasthan, Uttar Pradesh.
- Languages: Hindi and English.
- Do not target all India in the first test.
- Daily budget: `Rs. 150/day` for first 2 weeks.
- Bidding: maximize clicks for first 2 weeks.
- Scale to `Rs. 300/day` only if inquiry submissions are visible.

Keywords:

| High priority | Medium priority | Brand |
| --- | --- | --- |
| torch manufacturer Indore | LED torch factory price | KAG Batteries |
| LED torch manufacturer MP | torch wholesale dealer | Kaveri torch |
| battery manufacturer Madhya Pradesh | battery torch manufacturer | kagbatteries.in |
| rechargeable torch supplier India | bulk torch supplier | Deepshikha torch |
| torch dealer wholesale Indore | rechargeable torch wholesale | KAG torch Indore |

Ad copy:

```text
Headline 1: KAG Batteries - Factory Direct Torches
Headline 2: 25 Years | 17 Models | 500+ Dealers
Headline 3: Dealer Inquiries Welcome - Indore MP

Description 1: MP's first battery manufacturer since 1997. LED and rechargeable torches at factory pricing.
Description 2: Kaveri, Deepshikha, Nano, Commando series. Bulk orders welcome. Visit kagbatteries.in

Landing page: https://www.kagbatteries.in/inquiry
```

### Meta Ads

Campaign settings:

- Objective: Lead Generation or Traffic to `/inquiry`.
- Locations: MP, Maharashtra, Gujarat, Rajasthan.
- City focus: Indore, Bhopal, Nagpur, Ahmedabad, Jaipur.
- Age: 25 to 55.
- Interests: hardware, manufacturing, electrical goods, small business, wholesale trade, tools and equipment.
- Budget: `Rs. 100/day` for first 2 weeks.
- Scale to `Rs. 200/day` only if clicks/inquiries are visible.

Creative:

```text
Image: all 17 torches together, or Kaveri torch on clean background.

Headline: MP's First Torch Manufacturer - Now Available Nationwide

Primary text: KAG Batteries has been manufacturing quality LED and rechargeable torches in Indore since 1997. Factory-direct pricing for dealers and distributors. 17 models. Bulk orders welcome.

CTA: Learn More
Link: https://www.kagbatteries.in/inquiry
```

Budget:

| Item | Test period | Monthly after test |
| --- | ---: | ---: |
| Zoho Mail | Rs. 0 | Rs. 0 |
| Google Business Profile | Rs. 0 | Rs. 0 |
| LinkedIn Page | Rs. 0 | Rs. 0 |
| Instagram/Facebook Pages | Rs. 0 | Rs. 0 |
| Google Ads | Rs. 2,100 | Rs. 4,500 to Rs. 9,000 |
| Meta Ads | Rs. 1,400 | Rs. 3,000 to Rs. 6,000 |
| Total test spend | Rs. 3,500 approx | Rs. 8,000 to Rs. 15,000 |

## Master Checklist

| # | Task | Owner | Status |
| --- | --- | --- | --- |
| 1 | Create Zoho Mail account and add domain `kagbatteries.in` | Owner/IT | Pending |
| 2 | Add Zoho DNS records in domain panel | Web developer/domain owner | Pending |
| 3 | Create `info`, `sales`, `hr`, `accounts` mailboxes | Owner/IT | Pending |
| 4 | Test send and receive for all four addresses | Owner/IT | Pending |
| 5 | Add SMTP env vars to website hosting | Web developer | Pending |
| 6 | Test `/inquiry` email delivery to `info@` | Web developer | Pending |
| 7 | Install Zoho Mail app and enable notifications | Sales owner | Pending |
| 8 | Claim Google Business Profile | Owner/IT | Pending |
| 9 | Complete Google profile details, photos, messages | Owner/IT | Pending |
| 10 | Verify Google listing by postcard/phone/video | Owner | Pending |
| 11 | Collect 15 to 20 real reviews over first month | Owner/manager | Pending |
| 12 | Reply to every Google review | Owner/manager | Pending |
| 13 | Create LinkedIn Company Page | Owner/IT | Pending |
| 14 | Publish first LinkedIn post | Owner/IT | Pending |
| 15 | Share LinkedIn page with team/dealers | Owner/manager | Pending |
| 16 | Create Facebook Page | Owner/IT | Pending |
| 17 | Create Instagram Business Account | Owner/IT | Pending |
| 18 | Publish first Instagram/Facebook content | Owner/IT | Pending |
| 19 | Start Google Ads test campaign | Owner/IT | Pending |
| 20 | Start Meta Ads test campaign | Owner/IT | Pending |
| 21 | Review ad results after 7 days | Owner/IT | Pending |

## 7-Day Launch Order

Day 1:

- Create Zoho account and add DNS records.
- Prepare factory/product photos.

Day 2:

- Create four email accounts.
- Test all accounts.
- Add website SMTP env vars.
- Smoke-test `/inquiry`.

Day 3:

- Claim Google Business Profile.
- Upload photos and complete description.
- Turn on Google Messages.

Day 4:

- Create LinkedIn, Facebook, and Instagram pages.
- Publish first LinkedIn post.
- Publish first Meta post.

Day 5:

- Start real review collection with workers and trusted dealers.
- Reply to all live reviews.

Day 6:

- Prepare Google Ads and Meta Ads campaigns, but keep paused until owner approves spend.

Day 7:

- Launch ads if owner approves.
- Record clicks, spend, and inquiries every 3 days.
