import React from 'react';
import styles from './BrahmaBits.module.css';

const BrahmaBits = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>🕉️ Brahma Bits</h1>
        <p className={styles.tagline}>Create Universes Through Elegant System Design</p>
      </div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Brahma Bits</h2>
          <p className={styles.description}>
            As Lord Brahma creates the universe with his divine knowledge, you shall architect scalable 
            systems that stand the test of time. Brahma Bits is the ultimate system design competition where 
            you design microservices, databases, and distributed systems that can handle millions of users. 
            Think like a creator, design like a god.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Challenge Structure</h2>
          <div className={styles.challenges}>
            <div className={styles.challenge}>
              <h3>🌍 Phase 1: Prithvi (Foundation)</h3>
              <p>Design a scalable database schema for a social media platform</p>
            </div>
            <div className={styles.challenge}>
              <h3>💨 Phase 2: Vayu (Communication)</h3>
              <p>Architecture for real-time messaging with millions of concurrent users</p>
            </div>
            <div className={styles.challenge}>
              <h3>🔥 Phase 3: Agni (Performance)</h3>
              <p>Optimize and scale a high-traffic e-commerce system</p>
            </div>
            <div className={styles.challenge}>
              <h3>💧 Phase 4: Jala (Flow)</h3>
              <p>Design a resilient distributed streaming platform</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Key Topics</h2>
          <div className={styles.topics}>
            <span className={styles.topic}>Microservices Architecture</span>
            <span className={styles.topic}>Database Sharding</span>
            <span className={styles.topic}>Load Balancing</span>
            <span className={styles.topic}>Caching Strategies</span>
            <span className={styles.topic}>CAP Theorem</span>
            <span className={styles.topic}>Message Queues</span>
            <span className={styles.topic}>CDN Design</span>
            <span className={styles.topic}>Rate Limiting</span>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Evaluation Criteria</h2>
          <ul className={styles.criteria}>
            <li>Scalability and Performance</li>
            <li>Fault Tolerance and Reliability</li>
            <li>Cost Optimization</li>
            <li>Security Architecture</li>
            <li>Trade-off Justifications</li>
          </ul>
        </section>

        <button className={styles.registerBtn}>Join the Creation</button>
      </div>
    </div>
  );
};

export default BrahmaBits;
