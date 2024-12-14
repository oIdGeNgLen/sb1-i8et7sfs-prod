import type { Photo } from '../types';

export const PHOTOS_PER_PAGE = 10;

export function getTotalPages(photos: Photo[]): number {
  return Math.ceil(photos.length / PHOTOS_PER_PAGE);
}

export function getPaginatedPhotos(photos: Photo[], page: number): Photo[] {
  const startIndex = (page - 1) * PHOTOS_PER_PAGE;
  return photos.slice(startIndex, startIndex + PHOTOS_PER_PAGE);
}

export function generatePaginatedRoutes(totalPhotos: number): string[] {
  const totalPages = Math.ceil(totalPhotos / PHOTOS_PER_PAGE);
  return Array.from({ length: totalPages }, (_, i) => 
    i === 0 ? '/' : `/page/${i + 1}`
  );
}