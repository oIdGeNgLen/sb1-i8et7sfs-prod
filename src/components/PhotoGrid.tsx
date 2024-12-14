import React from 'react';
import { PhotoSection } from './PhotoSection';
import type { Photo } from '../types';

interface PhotoGridProps {
  photos: Photo[];
  onPhotoIntersect: (index: number) => void;
  pagination?: React.ReactNode;
}

export function PhotoGrid({ photos, onPhotoIntersect, pagination }: PhotoGridProps) {
  return (
    <div className="min-h-screen">
      {photos.map((photo, index) => (
        <PhotoSection
          key={photo.id}
          photo={photo}
          onIntersect={() => onPhotoIntersect(index)}
          isLast={index === photos.length - 1}
          pagination={pagination}
        />
      ))}
    </div>
  );
}