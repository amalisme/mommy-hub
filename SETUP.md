# Mommy Reminder Hub — Setup Guide 🌸

Complete setup guide for deploying and configuring the app. All 3 phases are complete and working.

---

## Repository Files

```
mommy-hub/
├── index.html                  ← Full app — replace this to update
├── manifest.json               ← PWA manifest (do not change)
├── sw.js                       ← Service worker (do not change)
├── icons/
│   ├── icon-192.png            ← App icon
│   └── icon-512.png            ← App icon (large)
├── .github/
│   └── workflows/
│       └── reminders.yml       ← Telegram daily notifications
├── README.md
└── SETUP.md                    ← This file
```

---

## Step 1 — GitHub Pages Deployment

1. Push all files to the `main` branch of `https://github.com/amalisme/mommy-hub`
2. Go to repo **Settings → Pages**
3. Set Source: **Deploy from branch** → Branch: `main` → Folder: `/ (root)`
4. Save — your app will be live at:

```
https://amalisme.github.io/mommy-hub/
```

> ✅ Already done and working.

---

## Step 2 — Google OAuth Setup

The app uses Google OAuth 2.0 for sign-in and Google Drive for data sync.

### 2a. Google Cloud Console settings

Go to [console.cloud.google.com](https://console.cloud.google.com) → APIs & Services → Credentials → your OAuth 2.0 Client ID.

Confirm these are set:

**Authorised JavaScript origins:**
```
https://amalisme.github.io
```

**Authorised redirect URIs:**
```
https://amalisme.github.io/mommy-hub/
```

**APIs enabled:**
- Google Drive API
- Google Sign-In (People API / OAuth)

### 2b. How sign-in works

| Environment | Sign-in method |
|-------------|---------------|
| PWA (installed to Home Screen) | Google popup |
| Safari browser | Google redirect (leaves page, returns with token) |

Session is remembered for ~50 minutes. After that, sign-in is prompted again to refresh the token.

> ✅ Already done and working.

---

## Step 3 — Telegram Bot Notifications

GitHub Actions sends you a morning and evening Telegram briefing automatically.

### 3a. Create your bot

1. Open Telegram → search **@BotFather** (blue verified tick ✅)
2. Send `/newbot`
3. Name: `Mommy Reminder Hub`
4. Username: `mommyreminderhub_bot` (must end in `bot`)
5. Copy the token BotFather gives you — looks like `7123456789:AAHdqTAZ…`

### 3b. Get your Chat ID

If you have trouble opening the bot in the Telegram app on iPhone:
1. Go to [web.telegram.org](https://web.telegram.org) in Safari
2. Search for your bot username → Open → Send `hi`
3. Then open in Safari: `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates`
4. Look for `"chat":{"id":` — that number is your Chat ID

**Alternative:** Message [@userinfobot](https://t.me/userinfobot) on Telegram Web. It instantly replies with your Chat ID.

### 3c. Add GitHub Secrets

Go to your repo → **Settings → Secrets and variables → Actions → New repository secret**

Add these two secrets:

| Name | Value |
|------|-------|
| `TELEGRAM_BOT_TOKEN` | Your bot token from BotFather |
| `TELEGRAM_CHAT_ID` | Your Chat ID number |

### 3d. Test

Go to **Actions** tab → **Daily Reminder Notifications** → **Run workflow** → check Telegram.

### Notification schedule

Runs automatically at:
- **8:00 AM MYT** (00:00 UTC) — morning briefing
- **6:00 PM MYT** (10:00 UTC) — evening check-in

Sends alerts for:
- Mortgage Mawar (3 days before 4th)
- TNB electricity bills (23rd)
- Unifi bill (22nd)
- CelcomDigi bill (24th)
- TnG top-up (25th)
- Apple Music, iCloud+, StrengthLog, Claude Pro, Clue, Cryptomator
- Birthdays — Thomas (12 Feb), Syabil (8 Mar), Lisa (12 Mar), Miki (2 May) at 7 days, 3 days, on the day
- Public holidays — 7 days and 3 days before
- SNOW KB contribution reminder (20th and 27th monthly)
- Assessment Tax (1st March)

> ✅ Already done and working.

---

## Step 4 — Anthropic API Key (AI Nudges)

The AI nudges on the Today screen call Claude via the Anthropic API.

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign in (use the same email as your Claude account if you have one)
3. Go to **API Keys → Create Key** → name it `mommy-hub`
4. Copy the key immediately — it is only shown once
5. Open the app → **Settings (⚙️)** → scroll to **Anthropic API Key** → paste → **Save Key**

**Cost:** Each nudge refresh costs ~$0.001–0.003. A $5 top-up lasts months.

**Security:** The key is stored in your device's `localStorage` only. It is never committed to GitHub or sent anywhere except directly to `api.anthropic.com`.

> ✅ Already done and working.

---

## Step 5 — Install as PWA on iPhone

1. Open `https://amalisme.github.io/mommy-hub/` in **Safari** (not Chrome)
2. Tap the **Share** button (box with arrow pointing up, bottom of screen)
3. Scroll down → tap **Add to Home Screen**
4. Name: `Mommy Reminder Hub` → tap **Add**
5. The rose gold lotus icon appears on your Home Screen

> ⚠️ Must use Safari. Chrome on iOS cannot install PWAs.
>
> ✅ Already done and working.

---

## Troubleshooting

### Sign-in issues

**Google sign-in button does nothing (Safari browser)**
The redirect flow handles this automatically. If it fails:
- Clear Safari cache: Settings → Safari → Clear History and Website Data
- Try in a fresh Safari tab

**"Error 400: redirect_uri_mismatch"**
Your redirect URI in Google Cloud Console doesn't match. Make sure `https://amalisme.github.io/mommy-hub/` (with trailing slash) is listed under Authorised redirect URIs.

**Token expired — keeps asking to sign in**
Normal behaviour — tokens last ~50 minutes. Sign in again, session restores automatically next time.

### PWA issues

**Content overlaps iPhone status bar / time**
Fixed with `env(safe-area-inset-top)` in the header. Make sure you are on the latest `index.html`.

**PWA not installing**
- Must use Safari, not Chrome
- Check that `manifest.json` is reachable at `/mommy-hub/manifest.json`
- GitHub Pages must be enabled and deployed

**App not updating after pushing new index.html**
The service worker caches the app shell. To force an update:
- Close app from Home Screen completely and reopen
- Or: Settings → Safari → Advanced → Website Data → find `amalisme.github.io` → delete

### Google Drive sync issues

**Sync dot stays red / error**
- Token may have expired — sign out and sign in again
- Check internet connection
- Tap the sync dot or go to Settings → Force Sync Now

**Data not appearing after sign-in on new device**
- Make sure you signed in with the same Google account
- Tap Settings → Force Sync Now to pull latest data from Drive

### Telegram issues

**"No reminders for today — nothing to send"**
This is correct behaviour — it means the workflow ran but found nothing scheduled for today. Your secrets are working correctly.

**No Telegram message received**
- Go to Actions tab → check the run logs for any error line
- Verify both GitHub Secrets are saved correctly with no extra spaces
- Make sure you sent a message to your bot first so it has a chat context

**Bot chat won't open on iPhone Telegram app**
Use [web.telegram.org](https://web.telegram.org) in Safari instead.

### AI Nudges issues

**Nudges showing static cards instead of AI-generated**
- Check your Anthropic API key in Settings — confirm it shows `✓ Set`
- Check you have API credits at [console.anthropic.com](https://console.anthropic.com)
- Offline? Nudges are intentionally disabled when offline

---

## Updating the App

To update with new features, replace only `index.html` in your repo:
1. Commit and push the new `index.html` to `main`
2. GitHub Pages deploys in ~1 minute
3. Close and reopen the PWA from Home Screen to get the update

`manifest.json`, `sw.js`, and `icons/` only need changing for major version updates.

---

## Data Backup

Your reminders are stored in two places:
- **Google Drive** `appDataFolder` — primary source of truth, syncs across devices
- **Device localStorage** — local cache for instant offline access

To manually export: Settings → **Export Data (JSON)**

To restore from backup: Settings → **Import Data** → select your JSON file
