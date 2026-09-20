/* AfroPDF service worker: makes the app open with no internet after the first visit.
   When you change any file, bump VERSION so phones fetch the new copy. */
var VERSION = "afropdf-v1";
var APP = ["./", "index.html", "manifest.webmanifest", "locales/en.json", "locales/sn.json",
           "icons/icon-192.png", "icons/icon-512.png", "icons/icon-180.png"];
var LIBS = ["https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js",
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js"];

self.addEventListener("install", function(e){
  e.waitUntil(caches.open(VERSION).then(function(c){
    return Promise.all([c.addAll(APP)].concat(LIBS.map(function(u){ return c.add(u).catch(function(){}); })));
  }).then(function(){ return self.skipWaiting(); }));
});
self.addEventListener("activate", function(e){
  e.waitUntil(caches.keys().then(function(ks){
    return Promise.all(ks.filter(function(k){ return k!==VERSION; }).map(function(k){ return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});
/* Open instantly from the cache, and refresh the cache quietly in the background */
self.addEventListener("fetch", function(e){
  var req=e.request;
  if(req.method!=="GET") return;
  var url=new URL(req.url);
  if(url.origin!==location.origin && LIBS.indexOf(req.url)<0) return;
  e.respondWith(caches.match(req,{ignoreSearch:true}).then(function(hit){
    var net=fetch(req).then(function(res){
      if(res && res.ok){ var copy=res.clone(); caches.open(VERSION).then(function(c){ c.put(req,copy); }); }
      return res;
    }).catch(function(){ return hit || (req.mode==="navigate" ? caches.match("index.html") : undefined); });
    return hit || net;
  }));
});
