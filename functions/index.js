const functions = require('firebase-functions');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, conf: { distDir: '.next' } });
const handle = app.getRequestHandler();

exports.nextServer = functions.https.onRequest((req, res) => {
  console.log('Request received for:', req.originalUrl);
  return app.prepare().then(() => handle(req, res));
});