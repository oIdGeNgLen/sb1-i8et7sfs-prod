import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

export function BackButton() {
  const navigate = useNavigate();
  const { state } = useNavigation();

  const handleBack = () => {
    const path = state.page === 1 ? '/' : `/page/${state.page}`;
    navigate(path, { 
      state: { 
        page: state.page,
        scrollPosition: state.scrollPosition
      },
      replace: true
    });
  };

  return (
    <button
      onClick={handleBack}
      className="fixed top-24 left-4 z-50 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
      aria-label="Back"
    >
      <ArrowLeft className="w-5 h-5" />
    </button>
  );
}