import type { Photo } from '../types';
import { API_CONFIG } from '../config/api';
import { ApiError } from '../utils/apiUtils';

export async function getPhotos(): Promise<Photo[]> {
  try {
    const response = await fetch(`${API_CONFIG.baseUrl}/read/photos?Instance=${API_CONFIG.instance}`, {
      headers: {
        'Authorization': `Bearer ${API_CONFIG.apiKey}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new ApiError(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    const photos = Array.isArray(result) ? result : (result.data || []);
    
    if (!Array.isArray(photos)) {
      throw new ApiError('Invalid response format');
    }

    return photos;
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error instanceof ApiError ? error : new ApiError('Failed to fetch photos');
  }
}

export async function createPhoto(photo: Omit<Photo, 'id'>): Promise<Photo> {
  try {
    const response = await fetch(`${API_CONFIG.baseUrl}/create/photos?Instance=${API_CONFIG.instance}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_CONFIG.apiKey}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: photo.title.trim(),
        location: photo.location.trim(),
        url: photo.url.trim(),
        facebookurl: photo.facebookurl.trim(),
        instagramurl: photo.instagramurl.trim()
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || `Failed to create photo (HTTP ${response.status})`,
        response.status
      );
    }

    const result = await response.json();
    if (!result || typeof result !== 'object') {
      throw new ApiError('Invalid response format');
    }

    return result;
  } catch (error) {
    console.error('Error creating photo:', error);
    throw error instanceof ApiError ? error : new ApiError('Failed to create photo');
  }
}