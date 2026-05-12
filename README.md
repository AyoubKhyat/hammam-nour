# Hammam Nour

Luxury Moroccan hammam & spa website built with Next.js 14, Tailwind CSS, Three.js.

**Live:** https://hammam-nour.vercel.app
**Repo:** https://github.com/AyoubKhyat/hammam-nour

## Pages

- **Homepage** — Hero with parallax + water ripple, about, venn advantages, gallery (3D scroll), offers, testimonials, CTA with 3D Moroccan lantern
- **Treatments** — 15 rituals with category filters (Hammam, Massages, Facials, Body Wraps)
- **Booking** — 4-step flow: treatment > date/time > details > confirmation
- **About** — Timeline, team, ingredients
- **Gift Cards** — Amount or package selection with live preview + PDF download

## Features

- **Multi-language** — English, French, and Arabic with RTL support. Language switcher in navbar, persists via localStorage
- **SEO** — Open Graph, Twitter cards, per-page metadata, auto-generated sitemap.xml and robots.txt
- **WhatsApp** — Floating button (bottom-right) linking to wa.me/212524389100 with pre-filled message
- **3D Effects** — Parallax hero, water ripple cursor, Three.js Moroccan lantern, magnetic hover, gallery parallax scroll
- **Booking System** — Resend email confirmations + Google Sheets calendar availability (demo mode without env vars)

## Tech Stack

- Next.js 14 (App Router), Tailwind CSS, Ragas font
- Three.js (@react-three/fiber) for 3D Moroccan lantern
- CSS scroll reveals (IntersectionObserver), magnetic hover, water ripple canvas
- React Context i18n with EN/FR/AR translations
- Resend for booking confirmation emails
- Google Sheets API for calendar availability

## Setup

```bash
npm install
npm run dev
```

## TODO: Activate Booking System

The booking currently runs in **demo mode**. To make it real, add these environment variables in **Vercel Dashboard > Settings > Environment Variables** (and in `.env.local` for local dev):

### 1. Resend (Email Confirmations)

1. Sign up at https://resend.com
2. Get your API key from the dashboard
3. (Optional) Verify your domain at resend.com/domains for a custom from address

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=Hammam Nour <onboarding@resend.dev>
BOOKING_NOTIFICATION_EMAIL=your-spa-email@example.com
```

- `RESEND_API_KEY` — from your Resend dashboard
- `RESEND_FROM_EMAIL` — use `onboarding@resend.dev` for testing, or your verified domain
- `BOOKING_NOTIFICATION_EMAIL` — the spa email that receives new booking notifications

### 2. Google Sheets (Real Calendar Availability)

1. Go to https://console.cloud.google.com
2. Create a new project (or use existing)
3. Enable the **Google Sheets API**
4. Go to **IAM & Admin > Service Accounts** > Create service account
5. Download the JSON key file
6. Create a Google Sheet with this header row in Sheet1 (rename tab to "Bookings"):

```
ID | Treatment | Date | Time | Duration | Name | Email | Phone | Requests | Price | Created
```

7. Share the spreadsheet with the service account email (as Editor)
8. Copy the spreadsheet ID from the URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`

```
GOOGLE_SERVICE_ACCOUNT_EMAIL=name@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your_spreadsheet_id_here
```

### 3. Redeploy

After adding env vars in Vercel, redeploy for them to take effect:

```bash
npx vercel --prod
```

Or trigger a redeploy from the Vercel dashboard.

## How It Works Once Activated

- Client books a treatment > selects date/time > fills details > confirms
- Booking is saved to Google Sheets (row with all details)
- Client receives a branded confirmation email via Resend
- Spa receives a notification email with booking details
- Already-booked time slots show as unavailable for future visitors
