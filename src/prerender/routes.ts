import { generatePaginatedRoutes } from '../utils/pagination';

export function generateStaticRoutes(totalPhotos: number): string[] {
  const staticPaths = ['/about', '/contact', '/new'];
  const paginatedPaths = generatePaginatedRoutes(totalPhotos);
  return [...paginatedPaths, ...staticPaths];
}