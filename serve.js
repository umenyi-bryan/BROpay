// Universal static server for BROpay - Works everywhere
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const port = process.env.PORT || 3000;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  let pathname = url.parse(req.url).pathname;
  
  // Default to index.html
  if (pathname === '/' || pathname === '') {
    pathname = '/index.html';
  }
  
  const ext = path.extname(pathname);
  const contentType = mimeTypes[ext] || 'text/plain';
  const filePath = path.join(__dirname, pathname);
  
  // Check if file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // File not found - serve index.html for SPA routing
      fs.readFile(path.join(__dirname, '/index.html'), (err, data) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 - File Not Found');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data);
        }
      });
    } else {
      // File exists - serve it
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('500 - Internal Server Error');
        } else {
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(data);
        }
      });
    }
  });
});

server.listen(port, () => {
  console.log('🌐 BROpay Universal Server Running!');
  console.log(`📍 Local: http://localhost:${port}`);
  console.log(`🏁 Platform: ${process.env.VERCEL ? 'Vercel' : process.env.NETLIFY ? 'Netlify' : 'Local'}`);
  console.log('🚀 Ready for deployment on ANY platform!');
  console.log('   • Vercel:    npm run vercel:deploy');
  console.log('   • Netlify:   npm run netlify:deploy');
  console.log('   • Anywhere:  Upload files to web hosting');
});
