import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './AncientScroll.module.css';

const AncientScroll = ({ children }) => {
  const wrapperRef = useRef(null);
  const topRollerRef = useRef(null);
  const bottomRollerRef = useRef(null);
  const parchmentRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const topRoller = topRollerRef.current;
    const bottomRoller = bottomRollerRef.current;
    const parchment = parchmentRef.current;
    const content = contentRef.current;
    if (!wrapper || !parchment || !content) return;

    // Set initial state — scroll is rolled up, rollers together in center
    gsap.set(parchment, { 
      maxHeight: 0,
      opacity: 1
    });
    gsap.set(content, { opacity: 0 });
    gsap.set(bottomRoller, { y: 0 });

    const tl = gsap.timeline({ 
      defaults: { ease: "power2.inOut" },
      delay: 0.3
    });

    // Phase 1: Parchment unrolls — bottom roller moves down revealing paper
    tl.to(parchment, {
      maxHeight: '75vh',
      duration: 2.5,
      ease: "power3.out"
    })
    // Phase 2: Content fades in as parchment opens
    .to(content, {
      opacity: 1,
      duration: 1.2,
      ease: "power2.out"
    }, "-=1.8")
    // Phase 3: Gentle breathing animation on the whole scroll
    .to(wrapper, {
      y: -4,
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className={styles.backdrop}>
      <div ref={wrapperRef} className={styles.scrollWrapper}>
        {/* Top Roller */}
        <div ref={topRollerRef} className={styles.roller}>
          <div className={styles.rollerEndLeft}>
            <div className={styles.knob}></div>
          </div>
          <div className={styles.rollerBar}>
            <div className={styles.woodGrain}></div>
            <div className={styles.band} style={{ left: '15%' }}></div>
            <div className={styles.band} style={{ left: '25%' }}></div>
            <div className={styles.band} style={{ left: '75%' }}></div>
            <div className={styles.band} style={{ left: '85%' }}></div>
          </div>
          <div className={styles.rollerEndRight}>
            <div className={styles.knob}></div>
          </div>
        </div>

        {/* Parchment Area */}
        <div ref={parchmentRef} className={styles.parchment}>
          <div ref={contentRef} className={styles.contentArea}>
            {children}
          </div>
        </div>

        {/* Bottom Roller */}
        <div ref={bottomRollerRef} className={styles.roller}>
          <div className={styles.rollerEndLeft}>
            <div className={styles.knob}></div>
          </div>
          <div className={styles.rollerBar}>
            <div className={styles.woodGrain}></div>
            <div className={styles.band} style={{ left: '15%' }}></div>
            <div className={styles.band} style={{ left: '25%' }}></div>
            <div className={styles.band} style={{ left: '75%' }}></div>
            <div className={styles.band} style={{ left: '85%' }}></div>
          </div>
          <div className={styles.rollerEndRight}>
            <div className={styles.knob}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AncientScroll;
