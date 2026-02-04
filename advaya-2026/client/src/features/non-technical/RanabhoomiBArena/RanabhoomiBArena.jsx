import React from 'react';
import styles from './RanabhoomiBArena.module.css';

const RanabhoomiBArena = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>🎯 Ranabhoomi Arena</h1>
        <p className={styles.tagline}>Battle in the Arena of Digital Warriors</p>
      </div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Welcome to the Battlefield</h2>
          <p className={styles.description}>
            Ranabhoomi - the sacred battlefield where warriors prove their mettle. Just as the Pandavas 
            and Kauravas clashed in Kurukshetra, modern gamers now clash in digital arenas. This is not 
            just a gaming tournament - it's a test of strategy, reflexes, teamwork, and the warrior 
            spirit that resides within you.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Gaming Categories</h2>
          <div className={styles.categories}>
            <div className={styles.category}>
              <h3>⚔️ Yudha Kshetra (Battle Royale)</h3>
              <p className={styles.gameTitle}>BGMI / Free Fire</p>
              <ul className={styles.gameDetails}>
                <li>Squad Mode (4 players)</li>
                <li>Best of 3 matches</li>
                <li>Point-based elimination</li>
                <li>Prize: ₹20,000</li>
              </ul>
            </div>
            <div className={styles.category}>
              <h3>🏹 Dhanurdhari (FPS Tournament)</h3>
              <p className={styles.gameTitle}>Valorant / CS:GO</p>
              <ul className={styles.gameDetails}>
                <li>5v5 Team matches</li>
                <li>Single Elimination</li>
                <li>Professional setup</li>
                <li>Prize: ₹15,000</li>
              </ul>
            </div>
            <div className={styles.category}>
              <h3>🎮 Shakti Sangram (MOBA)</h3>
              <p className={styles.gameTitle}>Mobile Legends / LoL</p>
              <ul className={styles.gameDetails}>
                <li>5v5 Classic Mode</li>
                <li>Double Elimination</li>
                <li>Live Commentary</li>
                <li>Prize: ₹12,000</li>
              </ul>
            </div>
            <div className={styles.category}>
              <h3>🏆 Chakravyuha Challenge (Strategy)</h3>
              <p className={styles.gameTitle}>Chess / Clash Royale</p>
              <ul className={styles.gameDetails}>
                <li>1v1 Format</li>
                <li>Timed matches</li>
                <li>Knockout rounds</li>
                <li>Prize: ₹8,000</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Tournament Rules</h2>
          <div className={styles.rules}>
            <div className={styles.rule}>
              <span className={styles.ruleIcon}>📜</span>
              <p>All participants must carry valid college ID</p>
            </div>
            <div className={styles.rule}>
              <span className={styles.ruleIcon}>🎮</span>
              <p>Gaming devices will be provided for PC/Console games</p>
            </div>
            <div className={styles.rule}>
              <span className={styles.ruleIcon}>📱</span>
              <p>For mobile games, bring your own device</p>
            </div>
            <div className={styles.rule}>
              <span className={styles.ruleIcon}>⚖️</span>
              <p>Fair play policy - cheating leads to disqualification</p>
            </div>
            <div className={styles.rule}>
              <span className={styles.ruleIcon}>🕐</span>
              <p>Teams must report 15 minutes before match time</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Schedule</h2>
          <div className={styles.schedule}>
            <div className={styles.scheduleItem}>
              <span className={styles.time}>Day 1</span>
              <span className={styles.event}>Registrations & Qualifiers</span>
            </div>
            <div className={styles.scheduleItem}>
              <span className={styles.time}>Day 2</span>
              <span className={styles.event}>Quarter Finals & Semi Finals</span>
            </div>
            <div className={styles.scheduleItem}>
              <span className={styles.time}>Day 3</span>
              <span className={styles.event}>Grand Finals & Prize Distribution</span>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Total Prize Pool</h2>
          <div className={styles.prizePool}>
            <span className={styles.poolAmount}>₹55,000+</span>
            <p>Plus Gaming Peripherals & Merchandise</p>
          </div>
        </section>

        <button className={styles.registerBtn}>Enter the Arena</button>
      </div>
    </div>
  );
};

export default RanabhoomiBArena;
