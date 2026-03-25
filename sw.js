// ── Mommy Reminder Hub — Service Worker ──
// Phase 2 | Cache-first for shell, network-first for API calls

const CACHE_NAME = 'mrh-v2';
const SHELL_URLS = [
  '/mommy-hub/',
  '/mommy-hub/index.html',
  '/mommy-hub/manifest.json',
  '/mommy-hub/icons/icon-192.png',
  '/mommy-hub/icons/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Nunito:wght@300;400;500;600;700&display=swap',
];

// ── Install: pre-cache app shell ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(SHELL_URLS).catch(err => {
        console.warn('[SW] Pre-cache partial fail:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// ── Activate: remove old caches ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: cache-first for shell, network-first for Anthropic API ──
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Always go network for Anthropic API (AI nudges)
  if (url.hostname === 'api.anthropic.com') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return new Response(
          JSON.stringify({ offline: true, content: [{ type: 'text', text: '__OFFLINE__' }] }),
          { headers: { 'Content-Type': 'application/json' } }
        );
      })
    );
    return;
  }

  // Always go network for Google Drive / OAuth
  if (url.hostname.includes('googleapis.com') || url.hostname.includes('accounts.google.com')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Cache-first for everything else (app shell, fonts, icons)
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Cache successful GET responses
        if (event.request.method === 'GET' && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // Offline fallback for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('/mommy-hub/index.html');
        }
      });
    })
  );
});

// ── Push Notifications (Telegram relay) ──
self.addEventListener('push', event => {
  if (!event.data) return;
  let data;
  try { data = event.data.json(); } catch { data = { title: 'Mommy Reminder Hub', body: event.data.text() }; }

  const options = {
    body: data.body || 'You have a new reminder',
    icon: '/mommy-hub/icons/icon-192.png',
    badge: '/mommy-hub/icons/icon-192.png',
    tag: data.tag || 'mrh-notification',
    renotify: true,
    requireInteraction: false,
    data: { url: data.url || '/mommy-hub/' },
    actions: [
      { action: 'open', title: '📋 Open App' },
      { action: 'dismiss', title: 'Dismiss' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title || '🌸 Mommy Reminder Hub', options)
  );
});

// ── Notification click ──
self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action === 'dismiss') return;
  const url = event.notification.data?.url || '/mommy-hub/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      for (const client of windowClients) {
        if (client.url.includes('/mommy-hub/') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});

// ── Background sync placeholder (Phase 3 — Google Drive) ──
self.addEventListener('sync', event => {
  if (event.tag === 'sync-reminders') {
    event.waitUntil(
      // Will be wired to Google Drive in Phase 3
      Promise.resolve()
    );
  }
});
