import { Photo } from '../types';
import { API_CONFIG } from '../config/api';
import { handleApiResponse, handleApiError } from '../utils/apiUtils';

export async function createPhoto(photo: Omit<Photo, 'id'>): Promise<Photo> {
  try {
    // Validate photo data before submission
    if (!photo.title || !photo.location || !photo.url || !photo.facebookurl || !photo.instagramurl) {
      throw new Error('All fields are required');
    }

    // Validate URLs
    const urlFields = ['url', 'facebookurl', 'instagramurl'] as const;
    for (const field of urlFields) {
      try {
        new URL(photo[field]);
      } catch {
        throw new Error(`Invalid ${field} format`);
      }
    }

    const response = await fetch(`${API_CONFIG.baseUrl}/create/photos?Instance=${API_CONFIG.instance}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_CONFIG.apiKey}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...photo,
        // Ensure proper field names match API expectations
        facebookurl: photo.facebookurl,
        instagramurl: photo.instagramurl
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to create photo (HTTP ${response.status})`);
    }

    return handleApiResponse<Photo>(response);
  } catch (error) {
    console.error('Error in createPhoto:', error);
    throw handleApiError(error);
  }
}