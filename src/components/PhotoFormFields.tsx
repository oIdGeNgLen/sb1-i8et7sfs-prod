import React from 'react';
import type { Photo } from '../types';

interface PhotoFormFieldsProps {
  initialData: Omit<Photo, 'id'>;
  onFieldChange?: () => void;
}

export function PhotoFormFields({ initialData, onFieldChange }: PhotoFormFieldsProps) {
  return (
    <>
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={initialData.title}
          onChange={onFieldChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 p-[5px]"
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          defaultValue={initialData.location}
          onChange={onFieldChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 p-[5px]"
        />
      </div>

      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700">
          Photo URL
        </label>
        <input
          type="url"
          id="url"
          name="url"
          defaultValue={initialData.url}
          onChange={onFieldChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 p-[5px]"
          placeholder="https://example.com/photo.jpg"
        />
      </div>

      <div>
        <label htmlFor="facebookurl" className="block text-sm font-medium text-gray-700">
          Facebook URL
        </label>
        <input
          type="url"
          id="facebookurl"
          name="facebookurl"
          defaultValue={initialData.facebookurl}
          onChange={onFieldChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 p-[5px]"
          placeholder="https://facebook.com/..."
        />
      </div>

      <div>
        <label htmlFor="instagramurl" className="block text-sm font-medium text-gray-700">
          Instagram URL
        </label>
        <input
          type="url"
          id="instagramurl"
          name="instagramurl"
          defaultValue={initialData.instagramurl}
          onChange={onFieldChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 p-[5px]"
          placeholder="https://instagram.com/..."
        />
      </div>
    </>
  );
}