# Mommy Reminder Hub — Phase 2 Setup Guide 🌸

## Files in this release

```
mommy-hub/
├── index.html          ← Main app (replace your existing one)
├── manifest.json       ← PWA manifest
├── sw.js               ← Service worker (offline + caching)
├── icons/
│   ├── icon-192.png    ← PWA icon (192×192)
│   └── icon-512.png    ← PWA icon (512×512)
└── .github/
    └── workflows/
        └── reminders.yml  ← Telegram daily notifications
```

---

## Step 1 — Push to GitHub

Push all files to your `main` branch at `https://github.com/amalisme/mommy-hub`.

Your folder structure in the repo root should look exactly as above.

Make sure GitHub Pages is enabled:
- Go to repo **Settings → Pages**
- Source: **Deploy from branch**
- Branch: `main` / `/ (root)`
- Save → your app will be at `https://amalisme.github.io/mommy-hub/`

---

## Step 2 — Set up Telegram Bot (5 minutes)

### 2a. Create your bot

1. Open Telegram on your iPhone
2. Search for **@BotFather** and tap on it
3. Send `/newbot`
4. Choose a name: e.g. `Mommy Reminder Hub`
5. Choose a username: e.g. `mommyreminderhub_bot` (must end in `bot`)
6. BotFather will give you a **token** like: `7123456789:AAHdqTAZkGFGGX6mMJbzLz-abc123xyz`
7. **Copy this token — you'll need it in two places**

### 2b. Get your Chat ID

1. Message your new bot (just say "hi")
2. Open this URL in your phone browser (replace TOKEN):
   ```
   https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates
   ```
3. Look for `"chat":{"id":` — copy that number (e.g. `987654321`)
4. This is your **Chat ID**

### 2c. Add secrets to GitHub

1. Go to your repo on GitHub
2. **Settings → Secrets and variables → Actions → New repository secret**
3. Add two secrets:
   - Name: `TELEGRAM_BOT_TOKEN` → Value: your bot token
   - Name: `TELEGRAM_CHAT_ID` → Value: your chat ID number

### 2d. Test it

1. Go to **Actions** tab in your GitHub repo
2. Click **Daily Reminder Notifications**
3. Click **Run workflow → Run workflow**
4. You should receive a Telegram message in ~30 seconds!

---

## Step 3 — Add Anthropic API Key (for AI Nudges)

1. Open the app on your phone
2. Tap **Settings** (bottom nav ⚙️)
3. Paste your Anthropic API key in the field
4. Tap **Save Key**
5. Go to **Today** — nudges will load automatically each time you open the app

---

## Step 4 — Install as PWA on iPhone

1. Open `https://amalisme.github.io/mommy-hub/` in **Safari** (must be Safari, not Chrome)
2. Tap the **Share** button (box with arrow pointing up)
3. Scroll down → tap **Add to Home Screen**
4. Name it **Mommy Reminder Hub** → tap **Add**
5. The lotus icon will appear on your home screen!

> ⚠️ Must use Safari for PWA install on iPhone. Chrome on iOS cannot install PWAs.

---

## Notification schedule

The GitHub Action runs automatically at:
- **8:00 AM MYT** — morning briefing
- **6:00 PM MYT** — evening check-in

It sends Telegram messages for:
- Bill due reminders (Mortgage Mawar before 4th, TNB bills out on 23rd, etc.)
- Birthday alerts (7 days before, 3 days before, on the day)
- Public holiday prep reminders (7 days before, 3 days before)
- SNOW KB contribution reminder (20th and 27th of each month)
- Assessment Tax reminder (1st March)
- Yearly subscription reminders (Clue on 20 Jan, Cryptomator on 15 Nov)

---

## Phase 3 Preview

Phase 3 will add:
- **Google Drive sync** — your reminders backed up to Drive, survive phone changes
- **Google OAuth** — sign in with your existing Google account
- Background sync via service worker

---

## Troubleshooting

**PWA not installing?**
- Must use Safari on iPhone, not Chrome
- Make sure `manifest.json` is accessible at `/mommy-hub/manifest.json`

**Telegram not sending?**
- Check your secrets in GitHub Settings → Secrets
- Try manual trigger in Actions tab to see error logs

**AI nudges not loading?**
- Check your Anthropic API key in Settings
- Make sure you have credits in your Anthropic account
- Offline? Nudges are disabled when offline (by design)

**Service worker not updating?**
- Hard refresh: close and reopen app from Home Screen
- Or: Settings → Safari → Advanced → Website Data → clear mommy-hub data
