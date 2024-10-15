// Service worker otimizado para funcionalidade offline completa

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('app-cache-v2').then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/style.css',
                '/manifest.json',
                '/service-worker.js',
                '/icons/icon-192x192.png',
                '/icons/icon-512x512.png',
                '/horas/index.html', // Incluindo páginas adicionais
                '/cargas/index.html', // Incluindo páginas adicionais
                // Adicione outros arquivos e pastas necessários aqui
            ]);
        })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = ['app-cache-v2'];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                return response;
            }
            return fetch(event.request).then(fetchResponse => {
                return caches.open('app-cache-v2').then(cache => {
                    if (event.request.url.startsWith(self.location.origin)) {
                        cache.put(event.request, fetchResponse.clone());
                    }
                    return fetchResponse;
                });
            });
        })
    );
});
