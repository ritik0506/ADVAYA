import React from 'react';
import EventCard from '../../components/EventCard/EventCard';
import { EVENTS_DATA } from '../../constants/eventsData';
import styles from './PGTechnical.module.css';

const PGTechnical = () => {
  // Filter for PG Technical events
  const pgEvents = EVENTS_DATA.filter(event => event.category.includes('PG'));

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>PG Technical Events</h1>
        <p className={styles.heroSubtitle}>
          Advanced challenges for postgraduate warriors of technology
        </p>
        <div className={styles.heroDivider}></div>
      </div>

      {/* Events Grid */}
      <div className={styles.eventsGrid}>
        {pgEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {/* Empty State */}
      {pgEvents.length === 0 && (
        <div className={styles.emptyState}>
          <p>No events available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default PGTechnical;
