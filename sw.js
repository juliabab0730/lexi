const CACHE = "flexi-shell-v3";
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png"])));
  self.skipWaiting();
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  if (event.request.method !== "GET" || url.origin !== location.origin) return;
  if (url.pathname.includes("/auth/") || url.pathname.includes("/rest/")) return;
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
