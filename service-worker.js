self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('pwa-cache').then(cache => {
      return cache.addAll([
        '/index.html',
        '/resultados.html',
        '/detalhes.html',
        '/styles.css',
        '/manifest.json'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});