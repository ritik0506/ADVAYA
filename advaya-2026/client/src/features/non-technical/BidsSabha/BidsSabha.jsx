import React from 'react';
import styles from './BidsSabha.module.css';

const BidsSabha = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bids Sabha</h1>
      <p className={styles.description}>
        Non-Technical Event - Debate & Discussion Forum
      </p>
      <div className={styles.content}>
        {/* Event details will be added here */}
        <p>Coming Soon...</p>
      </div>
    </div>
  );
};

export default BidsSabha;
