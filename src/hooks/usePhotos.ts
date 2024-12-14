import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPhotos } from '../services/api';
import type { Photo } from '../types';

const REVALIDATION_INTERVAL = 3600000; // 1 hour

declare global {
  interface Window {
    __INITIAL_STATE__?: {
      photos: Photo[];
      lastFetched: number;
    };
  }
}

const getInitialState = () => {
  if (typeof window === 'undefined') return [];
  return window.__INITIAL_STATE__?.photos || [];
};

const getLastFetched = () => {
  if (typeof window === 'undefined') return 0;
  return window.__INITIAL_STATE__?.lastFetched || 0;
};

export function usePhotos() {
  const location = useLocation();
  const [photos, setPhotos] = useState<Photo[]>(getInitialState);
  const [loading, setLoading] = useState(!getInitialState().length);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    let timeoutId: NodeJS.Timeout;

    async function fetchPhotos() {
      if (typeof window === 'undefined') return;
      
      try {
        const data = await getPhotos();
        if (mounted && data.length > 0) {
          const reversedData = [...data].reverse();
          setPhotos(reversedData);
          window.__INITIAL_STATE__ = {
            photos: reversedData,
            lastFetched: Date.now()
          };
        }
        setError(null);
      } catch (err) {
        if (mounted) {
          setError('Failed to fetch photos. Please try again later.');
          console.error('Error in usePhotos:', err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    function revalidate() {
      const lastFetched = getLastFetched();
      const shouldRevalidate = Date.now() - lastFetched > REVALIDATION_INTERVAL;

      if (shouldRevalidate || photos.length === 0) {
        timeoutId = setTimeout(fetchPhotos, 0);
      } else {
        setLoading(false);
      }
    }

    revalidate();

    return () => {
      mounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return { photos, loading, error };
}