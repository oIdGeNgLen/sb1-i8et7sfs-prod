import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { PhotoGrid } from '../components/PhotoGrid';
import { Pagination } from '../components/Pagination';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { usePhotos } from '../hooks/usePhotos';
import { useNavigation } from '../context/NavigationContext';
import { PHOTOS_PER_PAGE, getTotalPages, getPaginatedPhotos } from '../utils/pagination';

export function Home() {
  const { photos, loading, error } = usePhotos();
  const { state: navigationState, setState: setNavigationState } = useNavigation();
  const location = useLocation();
  const navigate = useNavigate();
  const { page } = useParams();
  const currentPage = page ? parseInt(page) : 1;
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  useEffect(() => {
    if (location.state?.scrollPosition) {
      const container = document.querySelector('.snap-y');
      if (container) {
        container.scrollTop = location.state.scrollPosition;
      }
    }
  }, [location.state]);

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <ErrorMessage message={error} />
      </Layout>
    );
  }

  const totalPages = getTotalPages(photos);
  const currentPhotos = getPaginatedPhotos(photos, currentPage);

  const handleIntersect = (index: number) => {
    setActivePhotoIndex(index);
    const container = document.querySelector('.snap-y');
    if (container) {
      setNavigationState({
        page: currentPage,
        scrollPosition: container.scrollTop
      });
    }
  };

  const handlePageChange = (page: number) => {
    const path = page === 1 ? '/' : `/page/${page}`;
    navigate(path, {
      state: { page, scrollPosition: 0 }
    });
    setActivePhotoIndex(0);
    window.scrollTo(0, 0);
  };

  const paginationElement = (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );

  return (
    <Layout>
      <PhotoGrid 
        photos={currentPhotos} 
        onPhotoIntersect={handleIntersect}
        pagination={paginationElement}
      />
    </Layout>
  );
}