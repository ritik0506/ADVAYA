import React from 'react';
import styles from './VyasaData.module.css';

const VyasaData = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Vyasa Data</h1>
      <p className={styles.description}>
        PG Technical Event - Data Science & Analytics Competition
      </p>
      <div className={styles.content}>
        {/* Event details will be added here */}
        <p>Coming Soon...</p>
      </div>
    </div>
  );
};

export default VyasaData;
