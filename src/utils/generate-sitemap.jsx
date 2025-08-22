import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { NODE_ENV } from "@src/Env.jsx";

const hostname =
  NODE_ENV === 'development'
    ? 'http://localhost:5173'
    : 'https://st-x.netlify.app';

const sitemap = new SitemapStream({ hostname });
const writeStream = createWriteStream('./public/sitemap.xml');

sitemap.pipe(writeStream);

const routes = [
  '/',
  '/about',
  '/privacy',
  '/contact',
  '/conditions'
];

routes.forEach(route => {
  sitemap.write({ url: route, changefreq: 'weekly', priority: 0.8 });
});

sitemap.end();

streamToPromise(sitemap)
  .then(() => console.log('Sitemap correctly generated in public/sitemap.xml!'))
  .catch( console.error('Error generating sitemap:'));
