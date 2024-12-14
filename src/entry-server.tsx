import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { App } from './App';
import { getPhotos } from './services/api';

export async function render(url: string) {
  try {
    // Fetch photos only once per render
    const photos = await getPhotos();
    
    // Create a stable initial state
    const initialState = {
      photos: photos.reverse(),
      lastFetched: Date.now()
    };

    // Ensure window is not accessed during SSR
    global.window = undefined as any;

    const html = ReactDOMServer.renderToString(
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    );

    return {
      html,
      initialState,
      status: 200
    };
  } catch (error) {
    console.error('Error during SSR:', error);
    return { 
      html: '', 
      initialState: { photos: [], lastFetched: 0 },
      status: 500
    };
  } finally {
    // Clean up global window mock
    delete (global as any).window;
  }
}