# 🌸 Mommy Reminder Hub

A personal PWA (Progressive Web App) built for a working mom in Kuala Lumpur, Malaysia. Manages daily reminders, family schedules, bills, school calendars, and delivers proactive AI-powered nudges — all synced privately via Google Drive.

Live app → **[https://amalisme.github.io/mommy-hub/](https://amalisme.github.io/mommy-hub/)**

---

## ✨ Features

### Today Dashboard
- Live date header with Kuala Lumpur context
- Miki's Taska daily check-in toggle (synced across app)
- Summary cards — urgent reminders, this week, upcoming birthdays
- Proactive AI nudges powered by Claude (Anthropic API) — refreshes on every open, with Malay context
- Today's reminders + Coming Up Soon list

### Reminders
- Add reminders with: title, category, priority (urgent / normal / low), due date & time, repeat (daily / weekly / monthly / yearly), notes
- Filter by 12 categories: Work, Finance, School, Birthday, Health, Holiday, Public Holiday, Grocery, Home, Self-Care, Meals, Other
- Sort by due date, priority, or category
- Due date sorting with overdue flagging
- Completed archive — done reminders move here; repeating reminders auto-create next occurrence
- Restore from archive

### Finance & Bills
- All monthly commitments organised in collapsible groups
- Bill statuses auto-update based on today's date (e.g. TNB bill out on 23rd, Mawar due before 4th)
- Groups: Property & Vehicle, Plaza KJ Utilities, Mawar Utilities, Subscriptions & Mobile, Family & Savings

### Calendar
- Monthly calendar with public holiday markers and reminder dots
- Malaysia 2026 school calendar (Penggal 1–4 + all breaks)
- Lisa's SJK(C) Sentul 2027 prep checklist
- Malaysia public holidays 2026 (national + KL/Selangor)

### Family Hub
- Individual cards for Lisa, Miki, Thomas, Syabil
- Vaccination trackers for Lisa and Miki
- Lisa's SJK(C) Sentul school readiness progress bars
- Thomas — birthday and date night reminders
- Weekly meal planner

### Settings
- Google Drive sync status and connect/disconnect
- Anthropic API key (stored locally on device only)
- Telegram bot configuration
- Dark / light mode toggle
- Export / import data as JSON
- Force sync

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla HTML + CSS + JS (single file) |
| Fonts | Playfair Display + Nunito (Google Fonts) |
| PWA | Web App Manifest + Service Worker |
| Auth | Google OAuth 2.0 (popup for PWA, redirect for Safari) |
| Sync | Google Drive API v3 — `appDataFolder` (private, hidden from Drive UI) |
| AI Nudges | Anthropic Claude API (claude-sonnet-4) |
| Notifications | Telegram Bot via GitHub Actions cron |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions (daily Telegram reminders) |

---

## 📁 Repository Structure

```
mommy-hub/
├── index.html                  ← Full app (HTML + CSS + JS, single file)
├── manifest.json               ← PWA manifest
├── sw.js                       ← Service worker (offline cache + sync hooks)
├── icons/
│   ├── icon-192.png            ← Rose gold lotus icon (192×192)
│   └── icon-512.png            ← Rose gold lotus icon (512×512)
├── .github/
│   └── workflows/
│       └── reminders.yml       ← Daily Telegram notification cron job
├── README.md                   ← This file
└── SETUP.md                    ← Full setup and deployment guide
```

---

## 🚀 Deployment

See **[SETUP.md](SETUP.md)** for the complete step-by-step guide covering:
- GitHub Pages deployment
- Google OAuth setup
- Telegram bot setup
- PWA installation on iPhone
- Anthropic API key configuration

---

## 🔔 Telegram Notifications

GitHub Actions runs automatically at:
- **8:00 AM MYT** — morning briefing
- **6:00 PM MYT** — evening check-in

Sends alerts for: bill due dates, birthdays (7 days, 3 days, on the day), public holiday prep, SNOW KB contribution, yearly subscriptions.

---

## 🔒 Privacy & Security

- **Google Drive** — data stored in your own `appDataFolder`, invisible to normal Drive UI. Only this app can access it.
- **API keys** — Anthropic and Telegram keys are stored in device `localStorage` only. Never committed to the repo.
- **GitHub Secrets** — Telegram credentials stored as encrypted GitHub repository secrets.
- **No backend** — this is a fully static app. No server, no database, no third party sees your data.

---

## 📱 Install as PWA on iPhone

1. Open **[https://amalisme.github.io/mommy-hub/](https://amalisme.github.io/mommy-hub/)** in **Safari**
2. Tap the Share button → **Add to Home Screen**
3. Tap **Add**

> Chrome on iOS cannot install PWAs. Safari only.

---

## 🌸 Built with

- Rose gold & blush color theme
- Playfair Display + Nunito fonts
- Star & crescent lotus icon
- Dark mode default, light mode available
- Built for a working mom in KL with love ☽
