'use client';

import { ImageGenerator } from '../components/ImageGenerator';
import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        FLUX.1 Image Generator
      </h1>
      <ImageGenerator />
    </main>
  );
} 