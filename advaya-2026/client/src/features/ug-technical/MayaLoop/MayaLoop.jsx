import React from 'react';
import styles from './MayaLoop.module.css';

const MayaLoop = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>🎮 Maya Loop</h1>
        <p className={styles.tagline}>Create Illusions and Worlds Through Code</p>
      </div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>The Realm of Maya</h2>
          <p className={styles.description}>
            In Hindu philosophy, Maya represents the illusion that creates our perceived reality. 
            In this event, you become the architect of digital Maya - creating immersive games and 
            animated worlds that captivate and mesmerize. Use Unity, Unreal Engine, or web technologies 
            to craft experiences that blur the line between reality and illusion.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Competition Tracks</h2>
          <div className={styles.tracks}>
            <div className={styles.track}>
              <h3>🌌 Track 1: Swarga Loka (2D Games)</h3>
              <p>Create engaging 2D platformers or puzzle games with unique mechanics</p>
              <span className={styles.tools}>Tools: Phaser.js, Godot, GameMaker</span>
            </div>
            <div className={styles.track}>
              <h3>🏔️ Track 2: Prithvi Loka (3D Games)</h3>
              <p>Build immersive 3D experiences with Unity or Unreal Engine</p>
              <span className={styles.tools}>Tools: Unity, Unreal Engine, Three.js</span>
            </div>
            <div className={styles.track}>
              <h3>✨ Track 3: Chitragraha (Animation)</h3>
              <p>Create stunning animations and interactive visual experiences</p>
              <span className={styles.tools}>Tools: Blender, After Effects, WebGL</span>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Judging Parameters</h2>
          <div className={styles.parameters}>
            <div className={styles.parameter}>
              <span className={styles.paramIcon}>🎨</span>
              <span className={styles.paramName}>Visual Appeal</span>
              <span className={styles.paramScore}>25%</span>
            </div>
            <div className={styles.parameter}>
              <span className={styles.paramIcon}>⚙️</span>
              <span className={styles.paramName}>Gameplay Mechanics</span>
              <span className={styles.paramScore}>25%</span>
            </div>
            <div className={styles.parameter}>
              <span className={styles.paramIcon}>💡</span>
              <span className={styles.paramName}>Innovation</span>
              <span className={styles.paramScore}>25%</span>
            </div>
            <div className={styles.parameter}>
              <span className={styles.paramIcon}>🎯</span>
              <span className={styles.paramName}>Theme Integration</span>
              <span className={styles.paramScore}>25%</span>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Theme Reveal</h2>
          <div className={styles.themeBox}>
            <p className={styles.themeText}>
              The theme will be revealed at the start of the event. Prepare to weave your Maya!
            </p>
          </div>
        </section>

        <button className={styles.registerBtn}>Enter the Illusion</button>
      </div>
    </div>
  );
};

export default MayaLoop;
