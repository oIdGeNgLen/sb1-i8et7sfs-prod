import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFile } from './src/prerender/fileSystem';
import { generateStaticRoutes } from './src/prerender/routes';
import { prerenderRoute, create404Page } from './src/prerender/renderer';
import { setupErrorHandlers } from './src/prerender/errorHandling';
import { logger } from './src/prerender/logger';
import { render } from './dist/server/entry-server.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function prerender(): Promise<void> {
  setupErrorHandlers();
  const outDir = resolve(__dirname, 'dist/client');
  
  try {
    // Read template
    const template = await readFile(resolve(outDir, 'index.html'));
    
    // Get initial state for pagination
    const { initialState } = await render('/');
    const totalPhotos = initialState.photos.length;
    
    // Generate routes
    const routes = generateStaticRoutes(totalPhotos);
    
    // Process routes sequentially
    for (const url of routes) {
      try {
        await prerenderRoute(url, render, { template, outDir });
      } catch (error) {
        logger.error(`Error processing ${url}:`, error);
        // Continue with other routes
      }
    }
    
    // Create 404 page
    await create404Page(outDir);
    
    logger.success('Prerendering complete!');
    process.exit(0);
  } catch (error) {
    logger.error('Fatal error during prerendering:', error);
    process.exit(1);
  }
}

// Start prerendering with a clean event loop
setImmediate(prerender);