import React from 'react';
import styles from './GuptaLeela.module.css';

const GuptaLeela = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Gupta Leela</h1>
      <p className={styles.description}>
        Non-Technical Event - Treasure Hunt & Mystery Game
      </p>
      <div className={styles.content}>
        {/* Event details will be added here */}
        <p>Coming Soon...</p>
      </div>
    </div>
  );
};

export default GuptaLeela;
