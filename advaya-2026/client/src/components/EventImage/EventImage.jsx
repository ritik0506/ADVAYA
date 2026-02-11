import React, { useState } from 'react';
import styles from './EventImage.module.css';

const EventImage = ({ 
  src, 
  alt, 
  fallbackSrc = '/assets/events/default.jpg',
  className = '',
  loading = 'lazy',
  aspectRatio = '16/9'
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setHasError(true);
    setIsLoading(false);
    if (imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
  };

  return (
    <div 
      className={`${styles.imageContainer} ${className}`}
      style={{ '--aspect-ratio': aspectRatio }}
    >
      {isLoading && (
        <div className={styles.skeleton}>
          <div className={styles.skeletonShimmer}></div>
        </div>
      )}
      
      <img
        src={imageSrc}
        alt={alt}
        loading={loading}
        onLoad={handleImageLoad}
        onError={handleImageError}
        className={`${styles.image} ${isLoading ? styles.hidden : ''} ${hasError ? styles.fallback : ''}`}
      />
      
      {hasError && (
        <div className={styles.errorOverlay}>
          <span className={styles.errorIcon}>🖼️</span>
          <span className={styles.errorText}>Image Not Available</span>
        </div>
      )}
    </div>
  );
};

export default EventImage;
