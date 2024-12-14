import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPhoto } from '../services/api';
import { checkRateLimit } from '../constants/auth';
import { ApiError } from '../utils/apiUtils';
import type { Photo } from '../types';

interface SubmitState {
  isSubmitting: boolean;
  error: string | null;
}

export function usePhotoSubmit() {
  const [state, setState] = useState<SubmitState>({
    isSubmitting: false,
    error: null
  });
  const navigate = useNavigate();

  const submitPhoto = async (photoData: Omit<Photo, 'id'>) => {
    if (!checkRateLimit()) {
      setState({
        isSubmitting: false,
        error: 'Rate limit exceeded. Please try again later.'
      });
      return;
    }

    setState({ isSubmitting: true, error: null });

    try {
      // Validate URLs before submission
      const urlFields = ['url', 'facebookurl', 'instagramurl'] as const;
      for (const field of urlFields) {
        try {
          new URL(photoData[field]);
        } catch {
          throw new ApiError(`Invalid ${field} format. Please enter a valid URL.`);
        }
      }

      await createPhoto(photoData);
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setState({
        isSubmitting: false,
        error: error instanceof Error ? error.message : 'Failed to create photo'
      });
    }
  };

  return {
    ...state,
    submitPhoto,
    clearError: () => setState(prev => ({ ...prev, error: null }))
  };
}