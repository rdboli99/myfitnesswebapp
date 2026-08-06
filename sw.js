const C = 'ross-fitness-v4';
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(C).then(c => c.addAll([
      './',
      './index.html',
      './manifest.json',
      './icon-180.png'
    ]))
  );
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== C).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
