/* ============================================================
   IOC – service worker.
   Precache file tĩnh cùng origin, chiến lược cache-first.
   Cross-origin (CDN fonts/apexcharts/leaflet, OSM tiles):
   network-only, KHÔNG cache.
   Đường dẫn tương đối để chạy được dưới subpath GitHub Pages.
   ============================================================ */

var CACHE = "ioc-v13";

var ASSETS = [
  "./",
  "./index.html",
  "./grdp-nganh.html",
  "./nong-nghiep.html",
  "./cong-nghiep.html",
  "./dau-tu-cong.html",
  "./gia-thi-truong.html",
  "./van-tai.html",
  "./dich-vu.html",
  "./dich-vu-xh.html",
  "./thue.html",
  "./du-bao.html",
  "./mo-phong.html",
  "./ngan-sach.html",
  "./tai-san-cong.html",
  "./doanh-nghiep.html",
  "./thanh-tra.html",
  "./cai-cach-hanh-chinh.html",
  "./canh-bao.html",
  "./nhiem-vu.html",
  "./bao-cao.html",
  "./gis.html",
  "./quan-tri-nguoi-dung.html",
  "./cau-hinh-kpi.html",
  "./manifest.webmanifest",
  "./assets/css/style.css",
  "./assets/js/main.js",
  "./assets/js/charts.js",
  "./assets/js/data.js",
  "./assets/img/icon-192.png",
  "./assets/img/icon-512.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE)
      .then(function (c) { return c.addAll(ASSETS); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.filter(function (k) { return k !== CACHE; })
          .map(function (k) { return caches.delete(k); }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  var url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return; // cross-origin: network-only

  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(function (hit) {
      if (hit) return hit;
      return fetch(e.request).then(function (res) {
        if (res && res.ok) {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
        }
        return res;
      });
    })
  );
});
