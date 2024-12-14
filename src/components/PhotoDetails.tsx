import React from 'react';
import { Facebook, Instagram } from 'lucide-react';
import { PHOTOGRAPHER_NAME } from '../constants/photographer';
import type { Photo } from '../types';

interface PhotoDetailsProps {
  photo: Photo;
}

export function PhotoDetails({ photo }: PhotoDetailsProps) {
  return (
    <div className="space-y-2 text-center">
      <h2 className="text-xl md:text-2xl font-light tracking-wide">{photo.title}</h2>
      <p className="text-sm text-gray-600">
        {photo.location} • Photo by {PHOTOGRAPHER_NAME}
      </p>
      <div className="flex items-center justify-center gap-3 mt-2">
        <a
          href={photo.facebookurl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          VIEW ON <Facebook className="w-4 h-4" />
        </a>
        <a
          href={photo.instagramurl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          VIEW ON <Instagram className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}