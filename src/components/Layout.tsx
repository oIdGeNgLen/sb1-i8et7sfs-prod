import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-auto">
      {children}
    </div>
  );
}