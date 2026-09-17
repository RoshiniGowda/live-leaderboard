const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const type = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'application/javascript; charset=utf-8' };

http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const requested = url.pathname === '/' ? 'index.html' : (url.pathname === '/admin' || url.pathname === '/admin/' ? 'admin/index.html' : url.pathname.slice(1));
  const file = path.join(root, requested);
  if (!file.startsWith(root) || !fs.existsSync(file)) { res.writeHead(404); res.end('Not found'); return; }
  res.writeHead(200, { 'Content-Type': type[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  fs.createReadStream(file).pipe(res);
}).listen(process.env.PORT || 4173, '0.0.0.0', () => console.log('Northstar League is live at http://127.0.0.1:4173'));
