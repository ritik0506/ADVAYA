import React from 'react';
import styles from './WebAstra.module.css';

const WebAstra = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>🏹 WebAstra</h1>
        <p className={styles.tagline}>Forge Divine Weapons with Modern Web Technologies</p>
      </div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Event Overview</h2>
          <p className={styles.description}>
            Just as the ancient warriors wielded powerful astras blessed by the gods, modern developers 
            wield the power of advanced web technologies. WebAstra challenges you to forge cutting-edge 
            web applications using React, Vue, Angular, and other modern frameworks. Create weapons of 
            code that are as powerful as Brahmastra and as precise as Pashupatastra.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Challenge Rounds</h2>
          <div className={styles.rounds}>
            <div className={styles.round}>
              <h3>🔱 Round 1: Agni Astra (Speed Build)</h3>
              <p>Build a responsive web component in 30 minutes using modern frameworks</p>
            </div>
            <div className={styles.round}>
              <h3>⚡ Round 2: Indra Astra (API Integration)</h3>
              <p>Integrate complex APIs and create dynamic real-time applications</p>
            </div>
            <div className={styles.round}>
              <h3>🌟 Round 3: Brahmastra (Full Stack)</h3>
              <p>Build a complete full-stack application with advanced features</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Technologies</h2>
          <div className={styles.techGrid}>
            <span className={styles.tech}>React.js</span>
            <span className={styles.tech}>Vue.js</span>
            <span className={styles.tech}>Angular</span>
            <span className={styles.tech}>Next.js</span>
            <span className={styles.tech}>Node.js</span>
            <span className={styles.tech}>GraphQL</span>
            <span className={styles.tech}>TypeScript</span>
            <span className={styles.tech}>WebSockets</span>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Prizes</h2>
          <div className={styles.prizes}>
            <div className={styles.prize}>
              <span className={styles.prizeIcon}>🥇</span>
              <span className={styles.prizeAmount}>₹15,000</span>
            </div>
            <div className={styles.prize}>
              <span className={styles.prizeIcon}>🥈</span>
              <span className={styles.prizeAmount}>₹10,000</span>
            </div>
            <div className={styles.prize}>
              <span className={styles.prizeIcon}>🥉</span>
              <span className={styles.prizeAmount}>₹5,000</span>
            </div>
          </div>
        </section>

        <button className={styles.registerBtn}>Register Now</button>
      </div>
    </div>
  );
};

export default WebAstra;
