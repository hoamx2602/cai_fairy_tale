import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('.', import.meta.url));
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.ico': 'image/x-icon' };
http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    const relative = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname);
    const target = path.resolve(root, '.' + relative);
    if (!target.startsWith(root) || !mime[path.extname(target)] || relative.includes('/.')) {
      res.writeHead(404); res.end('Not found'); return;
    }
    const data = await readFile(target);
    res.writeHead(200, { 'Content-Type': mime[path.extname(target)], 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' });
    res.end(data);
  } catch { res.writeHead(404); res.end('Not found'); }
}).listen(Number(process.env.PORT || 4173), '127.0.0.1', () => console.log('Cải & Biệt đội Bủm: http://127.0.0.1:' + (process.env.PORT || 4173)));
