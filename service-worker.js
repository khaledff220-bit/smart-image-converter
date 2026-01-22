const CACHE_NAME = 'image-converter-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/password-protect.html',
  '/image-quality.html', 
  '/merge-pdf.html',
  '/compress-pdf.html',
  '/about.html',
  '/privacy.html',
  '/assets/css/style.css',
  '/assets/js/app.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
})
