import React from 'react';
import { usePhotoSubmit } from '../hooks/usePhotoSubmit';
import { getRateLimitInfo } from '../constants/auth';
import { PhotoFormFields } from './PhotoFormFields';
import type { Photo } from '../types';

const initialFormData: Omit<Photo, 'id'> = {
  title: '',
  location: 'Phnom Penh, Cambodia',
  url: '',
  facebookurl: '',
  instagramurl: ''
};

export function PhotoForm() {
  const { isSubmitting, error, submitPhoto, clearError } = usePhotoSubmit();
  const { remaining, resetTime } = getRateLimitInfo();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const formData = new FormData(e.currentTarget);
      const photoData = Object.fromEntries(formData.entries()) as Omit<Photo, 'id'>;
      await submitPhoto(photoData);
    } catch (error) {
      console.error('Error in form submission:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
      <div className="text-sm text-gray-600 mb-4">
        Remaining submissions: {remaining} (Resets in {resetTime})
      </div>

      <PhotoFormFields
        initialData={initialFormData}
        onFieldChange={clearError}
      />

      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md border border-red-200">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting || remaining === 0}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
      >
        {isSubmitting ? 'Adding Photo...' : 'Add Photo'}
      </button>
    </form>
  );
}