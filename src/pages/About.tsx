import React from 'react';
import { Layout } from '../components/Layout';
import { BackButton } from '../components/BackButton';
import { AboutImage } from '../components/AboutImage';
import { AboutContent } from '../components/AboutContent';

export function About() {
  return (
    <Layout>
      <BackButton />
      <div className="min-h-screen pt-24 px-4">
        <div className="max-w-4xl mx-auto">
          <AboutImage />
          <AboutContent />
        </div>
      </div>
    </Layout>
  );
}