import React, { useEffect, useRef } from 'react';
import { PhotoDetails } from './PhotoDetails';
import type { Photo } from '../types';

interface PhotoSectionProps {
  photo: Photo;
  onIntersect: () => void;
  isLast?: boolean;
  pagination?: React.ReactNode;
}

export function PhotoSection({ photo, onIntersect, isLast, pagination }: PhotoSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onIntersect();
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [onIntersect]);

  return (
    <section
      ref={sectionRef}
      className="h-screen w-full snap-start flex flex-col items-center justify-center px-4 pt-20"
    >
      <div className="max-w-4xl w-full space-y-4">
        <div className="relative h-[50vh] md:h-[65vh] w-full flex items-center justify-center">
          <img
            src={photo.url}
            alt={photo.title}
            className="max-h-full max-w-full object-contain border border-black/32"
            style={{ width: 'auto', height: 'auto' }}
          />
        </div>
        <PhotoDetails photo={photo} />
        {isLast && pagination && (
          <div className="mt-4 flex justify-center">
            {pagination}
          </div>
        )}
      </div>
    </section>
  );
}