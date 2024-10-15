// Nome do cache. Atualize este valor ao fazer alterações nos arquivos para forçar o refresh do cache.
const CACHE_NAME = 'pwa-cache-v1';

// URLs que queremos armazenar no cache
const urlsToCache = [
  '/',
  '/index.html',
  '/horas/index.html',
  '/cargas/index.html',
  '/style.css',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Evento de instalação do service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto e URLs adicionadas:', urlsToCache);
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de busca (fetch) do service worker
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna a resposta do cache se encontrada, senão faz uma nova requisição
        return response || fetch(event.request);
      })
  );
});

// Evento de ativação do service worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME]; // Lista de caches que queremos manter
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Deleta caches que não estão na whitelist
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Cache excluído:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
