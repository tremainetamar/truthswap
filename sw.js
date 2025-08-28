self.addEventListener('install', e=>{self.skipWaiting();});
self.addEventListener('activate', e=>{e.waitUntil(self.clients.claim());});
const CACHE='truthswap-simple-v1';
self.addEventListener('fetch', event=>{
  const req=event.request; if(req.method!=='GET') return;
  event.respondWith(caches.match(req).then(cached=> cached || fetch(req).then(res=>{
    const copy=res.clone(); caches.open(CACHE).then(c=>c.put(req, copy)); return res;
  })));
});
self.addEventListener('notificationclick', e=>{e.notification.close(); e.waitUntil(clients.openWindow('/'));});
