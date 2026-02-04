import React from 'react';
import styles from './BitsVedha.module.css';

const BitsVedha = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bits Vedha</h1>
      <p className={styles.description}>
        UG Technical Event - Coding & Algorithm Challenge
      </p>
      <div className={styles.content}>
        {/* Event details will be added here */}
        <p>Coming Soon...</p>
      </div>
    </div>
  );
};

export default BitsVedha;
