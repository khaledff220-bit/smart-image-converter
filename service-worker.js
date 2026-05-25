/**
 * Service Worker for Smart Image Converter
 * إدارة التخزين المؤقت والعمل دون اتصال بالإنترنت
 * @version 1.0.0
 */

// اسم ذاكرة التخزين المؤقت (مع الإصدار للتحديث)
const CACHE_NAME = 'smart-image-converter-v1';

// الملفات التي سيتم تخزينها مؤقتاً
const urlsToCache = [
    '/',
    '/index.html',
    '/en/index.html',
    
    // صفحات الأدوات
    '/tools/image-to-pdf.html',
    '/tools/compress-pdf.html',
    '/tools/merge-pdf.html',
    '/tools/password-protect.html',
    '/tools/decrypt.html',
    '/tools/image-quality.html',
    
    // الصفحات الثابتة
    '/privacy.html',
    '/terms.html',
    '/contact.html',
    
    // ملفات CSS
    '/assets/css/style.css',
    
    // ملفات JavaScript الأساسية
    '/assets/js/dev-mode.js',
    '/assets/js/main.js',
    '/assets/js/i18n.js',
    '/assets/js/core/memoryManager.js',
    '/assets/js/core/imageProcessor.js',
    
    // مكتبات
    '/assets/js/libs/pdf-lib.min.js',
    
    // Web Workers
    '/assets/js/workers/pdf-worker.js',
    '/assets/js/workers/image-worker.js',
    
    // الصور والأيقونات
    '/assets/images/favicon.png',
    '/assets/images/icon-192.png',
    '/assets/images/icon-512.png',
    
    // ملفات أخرى
    '/manifest.json',
    '/robots.txt',
    '/sitemap.xml',
    '/humans.txt'
];

// تثبيت Service Worker وتخزين الملفات
self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log('[Service Worker] Caching app files');
            return cache.addAll(urlsToCache);
        }).catch(function(error) {
            console.error('[Service Worker] Cache failed:', error);
        })
    );
    self.skipWaiting();
});

// تنشيط Service Worker وتنظيف المخابئ القديمة
self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Activating...');
    event.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== CACHE_NAME) {
                    console.log('[Service Worker] Removing old cache:', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    self.clients.claim();
});

// استراتيجية: Network First مع Cache Fallback
// للملفات الديناميكية، حاول الشبكة أولاً ثم استخدم التخزين المؤقت
self.addEventListener('fetch', function(event) {
    const url = event.request.url;
    
    // استثناء طلبات التحليلات (لا تخزنها مؤقتاً)
    if (url.includes('analytics') || url.includes('gtag') || url.includes('google-analytics')) {
        return;
    }
    
    // استراتيجية Cache First للملفات الثابتة
    if (url.includes('.css') || url.includes('.js') || url.includes('.png') || url.includes('.jpg') || url.includes('.webp')) {
        event.respondWith(
            caches.match(event.request).then(function(response) {
                if (response) {
                    return response;
                }
                return fetch(event.request).then(function(networkResponse) {
                    return caches.open(CACHE_NAME).then(function(cache) {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            }).catch(function() {
                return caches.match('/offline.html');
            })
        );
    } else {
        // استراتيجية Network First للملفات الديناميكية
        event.respondWith(
            fetch(event.request).then(function(networkResponse) {
                return caches.open(CACHE_NAME).then(function(cache) {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            }).catch(function() {
                return caches.match(event.request).then(function(cachedResponse) {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    return caches.match('/offline.html');
                });
            })
        );
    }
});

// الاستماع لأحداث الرسائل من التطبيق
self.addEventListener('message', function(event) {
    if (event.data === 'skipWaiting') {
        self.skipWaiting();
    }
});
