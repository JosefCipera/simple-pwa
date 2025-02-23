self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('v1').then((cache) => {
            return cache.addAll([
                '/simple-pwa/',  // Základní URL
                '/simple-pwa/index.html',
                '/simple-pwa/style.css',
                '/simple-pwa/app.js',
                '/simple-pwa/manifest.json',  // Přidáme manifest, aby se cachoval
                '/simple-pwa/microphone-192.png',   // Přidáme ikony
                '/simple-pwa/microphone-512.png',
                '/simple-pwa/microphone-144.png',
                '/simple-pwa/microphone-96.png'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
