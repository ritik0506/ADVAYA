import React from 'react';
import EventCard from '../../components/EventCard/EventCard';
import { EVENTS_DATA } from '../../constants/eventsData';
import styles from './NonTechnical.module.css';

const NonTechnical = () => {
  // Filter for Non-Technical events
  const nonTechEvents = EVENTS_DATA.filter(event => event.category.includes('Non-Technical'));

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Non-Technical Events</h1>
        <p className={styles.heroSubtitle}>
          Beyond code and circuits - unleash your creativity, strategy, and spirit
        </p>
        <div className={styles.heroDivider}></div>
      </div>

      {/* Events Grid */}
      <div className={styles.eventsGrid}>
        {nonTechEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {/* Empty State */}
      {nonTechEvents.length === 0 && (
        <div className={styles.emptyState}>
          <p>No events available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default NonTechnical;
