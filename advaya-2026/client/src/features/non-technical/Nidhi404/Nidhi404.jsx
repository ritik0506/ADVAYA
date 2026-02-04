import React from 'react';
import styles from './Nidhi404.module.css';

const Nidhi404 = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>💎 Nidhi 404</h1>
        <p className={styles.tagline}>Seek the Lost Treasures of Knowledge</p>
      </div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>The Legend of Lost Treasures</h2>
          <p className={styles.description}>
            In ancient India, the concept of "Nidhi" represented hidden treasures of immense value. 
            These nine treasures (Nava Nidhi) were gifts from Kubera, the god of wealth. But some 
            treasures remain unfound - Error 404: Treasure Not Found! This technical quiz challenges 
            you to discover hidden gems of knowledge across technology, programming, and innovation.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>The Nine Nidhis (Quiz Rounds)</h2>
          <div className={styles.nidhis}>
            <div className={styles.nidhi}>
              <span className={styles.nidhiIcon}>💰</span>
              <h3>Padma Nidhi</h3>
              <p>Core Programming & Data Structures</p>
            </div>
            <div className={styles.nidhi}>
              <span className={styles.nidhiIcon}>🌊</span>
              <h3>Mahapadma Nidhi</h3>
              <p>Web Technologies & Frameworks</p>
            </div>
            <div className={styles.nidhi}>
              <span className={styles.nidhiIcon}>🐚</span>
              <h3>Shankha Nidhi</h3>
              <p>Database Management Systems</p>
            </div>
            <div className={styles.nidhi}>
              <span className={styles.nidhiIcon}>💍</span>
              <h3>Makara Nidhi</h3>
              <p>Operating Systems & Networks</p>
            </div>
            <div className={styles.nidhi}>
              <span className={styles.nidhiIcon}>🐢</span>
              <h3>Kacchapa Nidhi</h3>
              <p>Machine Learning & AI</p>
            </div>
            <div className={styles.nidhi}>
              <span className={styles.nidhiIcon}>🌸</span>
              <h3>Mukunda Nidhi</h3>
              <p>Cloud Computing & DevOps</p>
            </div>
            <div className={styles.nidhi}>
              <span className={styles.nidhiIcon}>⚔️</span>
              <h3>Nanda Nidhi</h3>
              <p>Cybersecurity & Cryptography</p>
            </div>
            <div className={styles.nidhi}>
              <span className={styles.nidhiIcon}>🔱</span>
              <h3>Nila Nidhi</h3>
              <p>Blockchain & Web3</p>
            </div>
            <div className={styles.nidhi}>
              <span className={styles.nidhiIcon}>✨</span>
              <h3>Kharva Nidhi</h3>
              <p>Innovation & Tech Trivia</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Competition Format</h2>
          <div className={styles.format}>
            <div className={styles.round}>
              <h3>🎯 Round 1: Prelims (MCQ)</h3>
              <p>50 questions | 30 minutes | Top 20 teams qualify</p>
            </div>
            <div className={styles.round}>
              <h3>⚡ Round 2: Rapid Fire</h3>
              <p>Quick-fire questions | 1 minute per question | Top 10 advance</p>
            </div>
            <div className={styles.round}>
              <h3>🏆 Round 3: Grand Finale</h3>
              <p>Buzzer round | Audio-visual questions | Winner takes all</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Prizes</h2>
          <div className={styles.prizes}>
            <div className={styles.prizeCard}>
              <span className={styles.rank}>1st</span>
              <span className={styles.amount}>₹10,000</span>
              <span className={styles.extra}>+ Certificates</span>
            </div>
            <div className={styles.prizeCard}>
              <span className={styles.rank}>2nd</span>
              <span className={styles.amount}>₹7,000</span>
              <span className={styles.extra}>+ Certificates</span>
            </div>
            <div className={styles.prizeCard}>
              <span className={styles.rank}>3rd</span>
              <span className={styles.amount}>₹3,000</span>
              <span className={styles.extra}>+ Certificates</span>
            </div>
          </div>
        </section>

        <button className={styles.registerBtn}>Seek the Treasures</button>
      </div>
    </div>
  );
};

export default Nidhi404;
