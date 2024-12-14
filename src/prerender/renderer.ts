import { resolve } from 'path';
import { writeFile, copyFile } from './fileSystem';
import { injectContent } from './template';
import { logger } from './logger';
import { PrerenderError } from './errorHandling';
import type { RenderResult, PrerenderOptions } from './types';

export async function prerenderRoute(
  url: string,
  render: (url: string) => Promise<RenderResult>,
  options: PrerenderOptions
): Promise<void> {
  const { template, outDir } = options;
  logger.info(`Pre-rendering ${url}...`);

  try {
    const { html, initialState, status } = await render(url);

    if (status !== 200) {
      throw new PrerenderError(`Route ${url} rendered with status ${status}`);
    }

    const rendered = injectContent(template, html, initialState);
    const filePath = url === '/' 
      ? resolve(outDir, 'index.html')
      : resolve(outDir, url.slice(1), 'index.html');

    await writeFile(filePath, rendered);
    logger.success(`Pre-rendered ${url}`);
  } catch (error) {
    throw new PrerenderError(`Failed to pre-render ${url}`, error);
  }
}

export async function create404Page(outDir: string): Promise<void> {
  try {
    await copyFile(
      resolve(outDir, 'index.html'),
      resolve(outDir, '404.html')
    );
    logger.success('Created 404 page');
  } catch (error) {
    throw new PrerenderError('Failed to create 404 page', error);
  }
}