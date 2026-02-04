import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './Loader.module.css';

const Loader = ({ isLoading }) => {
  const loaderRef = useRef(null);
  const symbolRef = useRef(null);

  useEffect(() => {
    if (symbolRef.current) {
      gsap.to(symbolRef.current, {
        rotation: 360,
        duration: 2,
        repeat: -1,
        ease: 'linear'
      });
    }
  }, []);

  useEffect(() => {
    if (!isLoading && loaderRef.current) {
      gsap.to(loaderRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          if (loaderRef.current) {
            loaderRef.current.style.display = 'none';
          }
        }
      });
    }
  }, [isLoading]);

  return (
    <div ref={loaderRef} className={styles.loaderContainer}>
      <div className={styles.loaderContent}>
        <div ref={symbolRef} className={styles.symbol}>
          ॐ
        </div>
        <h2 className={styles.loadingText}>Loading Advaya 2026...</h2>
        <div className={styles.progressBar}>
          <div className={styles.progressFill}></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
