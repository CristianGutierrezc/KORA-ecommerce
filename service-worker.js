const CACHE_NAME = 'kora-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/controllers/home.controller.js',
  '/js/controllers/carrito.controller.js',
  '/js/utils/fnStorages.js',
  '/js/utils/cookies.js',
  '/js/utils/validaciones.js',
  '/manifest.json',
  '/img/logo_kora.png',
  '/img/banner.png',
  '/img/icons/icon-192x192.png',
  '/img/icons/icon-512x512.png'
];

// Instalar
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activar
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    )
  );
});

// Interceptar fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(respuesta => {
      return respuesta || fetch(event.request);
    })
  );
});
