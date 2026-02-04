import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for GSAP animations with automatic cleanup
 * @param {Function} callback - Animation function
 * @param {Array} dependencies - Dependency array
 */
export const useGSAP = (callback, dependencies = []) => {
  const animationRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      animationRef.current = callback();
    });

    return () => {
      ctx.revert();
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, dependencies);

  return animationRef;
};

export default useGSAP;
