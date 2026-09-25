const CACHE_NAME = 'fabrica-app-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './regulagens.html',
  './calculadoras.html',
  './admin-login.html',
  './admin-panel.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
  // Adicione mais arquivos conforme criar (ex: calculadoras específicas)
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
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