/* Banco de Oportunidades de Hotéis · service worker próprio (não use o do app aéreo) */
const CACHE = "vt-hoteis-v1";
const ESTATICOS = ["./", "index.html", "xlsx.mini.min.js", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png", "logo-visual.png", "acesso.json", "hoteis.dat"];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(ESTATICOS.map(u => c.add(u).catch(() => null)))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE && k.startsWith("vt-hoteis")).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request; if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.hostname === "api.github.com") return;                       // área do administrador: sempre direto
  const mesmo = url.origin === self.location.origin;
  // Página, base e acesso: rede primeiro (atualização imediata), cópia salva sem internet
  if (mesmo && (req.mode === "navigate" || /\.(dat|json|html)$/.test(url.pathname) || url.pathname.endsWith("/"))) {
    e.respondWith(fetch(req).then(r => { if (r.ok) { const cp = r.clone(); caches.open(CACHE).then(c => c.put(req, cp)); } return r; })
      .catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match("index.html"))));
    return;
  }
  // Demais arquivos e fontes: cópia salva, atualizada em segundo plano
  if (mesmo || /fonts\.(googleapis|gstatic)\.com|cdnjs\.cloudflare\.com/.test(url.hostname)) {
    e.respondWith(caches.match(req).then(salvo => {
      const rede = fetch(req).then(r => { if (r.ok || r.type === "opaque") { const cp = r.clone(); caches.open(CACHE).then(c => c.put(req, cp)); } return r; }).catch(() => salvo);
      return salvo || rede;
    }));
  }
});
