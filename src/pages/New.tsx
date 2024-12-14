import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { BackButton } from '../components/BackButton';
import { PhotoForm } from '../components/PhotoForm';
import { LoginForm } from '../components/LoginForm';
import { isAuthenticated } from '../constants/auth';

export function New() {
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    setIsAuthed(isAuthenticated());
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthed(true);
  };

  return (
    <Layout>
      <BackButton />
      <div className="min-h-screen pt-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-light mb-12">Add New Photo</h1>
          {isAuthed ? (
            <PhotoForm />
          ) : (
            <div className="max-w-md mx-auto">
              <p className="text-gray-600 mb-8">
                Please authenticate to add new photos to the gallery.
              </p>
              <LoginForm onSuccess={handleLoginSuccess} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}