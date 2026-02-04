import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Events.module.css';

const Events = () => {
  const eventCategories = [
    {
      title: 'PG Technical Events',
      category: 'pg-technical',
      events: [
        {
          name: 'Vyasa Data',
          slug: 'vyasa-data',
          description: 'Data Science & Analytics Competition - Unveil insights like Vyasa revealed the Mahabharata',
          icon: '📊',
        },
        {
          name: 'Code Kurukshetra',
          slug: 'code-kurukshetra',
          description: 'Competitive Programming Battle - Fight with code on the battlefield of algorithms',
          icon: '⚔️',
        },
        {
          name: 'WebAstra',
          slug: 'webastra',
          description: 'Advanced Web Development - Forge divine weapons with modern web technologies',
          icon: '🏹',
        },
        {
          name: 'Brahma Bits',
          slug: 'brahma-bits',
          description: 'System Design & Architecture - Create universes through elegant system design',
          icon: '🕉️',
        },
      ],
    },
    {
      title: 'UG Technical Events',
      category: 'ug-technical',
      events: [
        {
          name: 'Web Shilpa Chakra',
          slug: 'web-shilpa-chakra',
          description: 'Web Development & 3D Design - Craft divine architectures like Vishwakarma',
          icon: '🎨',
        },
        {
          name: 'Bits Vedha',
          slug: 'bits-vedha',
          description: 'Coding & Algorithm Challenge - Pierce through problems with the arrow of logic',
          icon: '💻',
        },
        {
          name: 'Maya Loop',
          slug: 'maya-loop',
          description: 'Game Development & Animation - Create illusions and worlds through code',
          icon: '🎮',
        },
        {
          name: 'ShabdaVedha',
          slug: 'shabdavedha',
          description: 'NLP & AI Challenge - Master the power of words and speech recognition',
          icon: '🗣️',
        },
      ],
    },
    {
      title: 'Non-Technical Events',
      category: 'non-technical',
      events: [
        {
          name: 'Drishti POV',
          slug: 'drishti-pov',
          description: 'Photography & Videography - Capture moments through the divine third eye',
          icon: '📷',
        },
        {
          name: 'Bids Sabha',
          slug: 'bids-sabha',
          description: 'Debate & Discussion - Voice your wisdom in the assembly of scholars',
          icon: '⚖️',
        },
        {
          name: 'Gupta Leela',
          slug: 'gupta-leela',
          description: 'Treasure Hunt - Uncover hidden treasures through divine play',
          icon: '🔍',
        },
        {
          name: 'Nidhi 404',
          slug: 'nidhi-404',
          description: 'Technical Quiz - Seek the lost treasures of knowledge',
          icon: '💎',
        },
        {
          name: 'Ranabhoomi Arena',
          slug: 'ranabhoomi-arena',
          description: 'Gaming Tournament - Battle in the arena of digital warriors',
          icon: '🎯',
        },
      ],
    },
  ];

  return (
    <div className={styles.eventsContainer}>
      <div className={styles.header}>
        <h1 className={styles.mainTitle}>Advaya 2026 Events</h1>
        <p className={styles.subtitle}>Choose your path to glory</p>
      </div>

      {eventCategories.map((category, index) => (
        <section key={index} className={styles.categorySection}>
          <h2 className={styles.categoryTitle}>{category.title}</h2>
          <div className={styles.eventsGrid}>
            {category.events.map((event, eventIndex) => (
              <Link
                key={eventIndex}
                to={`/events/${event.slug}`}
                className={styles.eventCard}
              >
                <div className={styles.eventIcon}>{event.icon}</div>
                <h3 className={styles.eventName}>{event.name}</h3>
                <p className={styles.eventDescription}>{event.description}</p>
                <div className={styles.eventFooter}>
                  <span className={styles.exploreText}>Explore →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Events;
