import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.logo}>
          ADVAYA 2026
        </Link>

        <button className={styles.hamburger} onClick={toggleMenu}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>

        <ul className={`${styles.navMenu} ${isOpen ? styles.active : ''}`}>
          <li className={styles.navItem}>
            <Link to="/" className={styles.navLink} onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/events" className={styles.navLink} onClick={() => setIsOpen(false)}>
              Events
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/register" className={styles.navLink} onClick={() => setIsOpen(false)}>
              Register
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/about" className={styles.navLink} onClick={() => setIsOpen(false)}>
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
