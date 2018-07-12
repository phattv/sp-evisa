const express = require('express'),
  sitemap = require('sitemap'),
  compression = require('compression'),
  cookieParser = require('cookie-parser'),
  cors = require('cors');

const port = 80,
  distFolder = 'dist',
  assetPrefix = '';

const app = express();
app.use(cors());
app.use(compression());
app.use(cookieParser());
app.use('/', express.static(distFolder));

app.get('/robots.txt', (req, res) =>
  res.status(200).sendFile('robots.txt', {
    root: __dirname + '/static/',
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8',
    },
  }),
);

app.get('/sitemap.xml', (req, res) =>
  sitemap
    .createSitemap({
      hostname: 'https://evisa-vn.com',
      cacheTime: 600000,
      urls: [
        { url: '/', changefreq: 'weekly', priority: 1.0 },
        { url: '/apply', changefreq: 'weekly', priority: 0.9 },
        { url: '/fees', changefreq: 'weekly', priority: 0.8 },
        { url: '/services', changefreq: 'weekly', priority: 0.7 },
        { url: '/contact', changefreq: 'monthly', priority: 0.5 },
        { url: '/faq', changefreq: 'monthly', priority: 0.5 },
        { url: '/privacy', changefreq: 'monthly', priority: 0.5 },
        { url: '/terms', changefreq: 'monthly', priority: 0.5 },
      ],
    })
    .toXML(function(err, xml) {
      if (err) {
        return res.status(500).end();
      }
      res.header('Content-Type', 'application/xml');
      res.send(xml);
    }),
);

app.get('/favicon.ico', (req, res) =>
  res.status(200).sendFile('favicon.ico', {
    root: __dirname + '/static/favicon',
  }),
);

app.get(`${assetPrefix}*`, function(req, res) {
  res.sendFile(`${distFolder}${assetPrefix}/index.html`, {
    root: __dirname,
  });
});

app.listen(port, function() {
  console.log(`App is listening on port ${port}!`);
});
