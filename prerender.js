import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';
import { render } from './dist/server/entry-server.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function writeFile(filePath, content) {
  return new Promise((resolve, reject) => {
    const dir = dirname(filePath);
    
    // Ensure directory exists
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFile(filePath, content, 'utf8', (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

async function copyFile(src, dest) {
  return new Promise((resolve, reject) => {
    const dir = dirname(dest);
    
    // Ensure directory exists
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.copyFile(src, dest, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

async function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

async function prerender() {
  const outDir = resolve(__dirname, 'dist/client');
  
  try {
    // Read the template
    const template = await readFile(resolve(outDir, 'index.html'));

    // Get initial state to determine total pages
    const { initialState } = await render('/');
    const totalPhotos = initialState.photos.length;
    
    // Generate all routes including paginated ones
    const staticRoutes = ['/about', '/contact', '/new'];
    const paginatedRoutes = Array.from(
      { length: Math.ceil(totalPhotos / 10) },
      (_, i) => i === 0 ? '/' : `/page/${i + 1}`
    );
    const routes = [...paginatedRoutes, ...staticRoutes];

    // Process each route
    for (const url of routes) {
      try {
        console.log(`Pre-rendering ${url}...`);
        
        const { html, initialState, status } = await render(url);
        
        if (status !== 200) {
          console.warn(`Warning: ${url} rendered with status ${status}`);
          continue;
        }

        const rendered = template
          .replace(`<div id="root"></div>`, `<div id="root">${html}</div>`)
          .replace(
            '</head>',
            `<script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};</script></head>`
          );

        const filePath = url === '/' 
          ? resolve(outDir, 'index.html')
          : resolve(outDir, url.slice(1), 'index.html');

        await writeFile(filePath, rendered);
        console.log(`Pre-rendered ${url}`);
      } catch (error) {
        console.error(`Error pre-rendering ${url}:`, error);
        // Continue with other routes even if one fails
      }
    }

    // Copy the 404 page
    await copyFile(
      resolve(outDir, 'index.html'),
      resolve(outDir, '404.html')
    );

    console.log('Prerendering complete!');
  } catch (error) {
    console.error('Error during prerendering:', error);
    process.exit(1);
  }
}

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
  process.exit(1);
});

prerender();