import React from 'react';
import EventCard from '../../components/EventCard/EventCard';
import { EVENTS_DATA } from '../../constants/eventsData';
import styles from './UGTechnical.module.css';

const UGTechnical = () => {
  // Filter for UG Technical events and Combined Technical events
  const ugEvents = EVENTS_DATA.filter(
    event => event.category.includes('UG') || event.category.includes('Combined')
  );

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>UG Technical Events</h1>
        <p className={styles.heroSubtitle}>
          Challenge your skills and forge your path in the realm of technology
        </p>
        <div className={styles.heroDivider}></div>
      </div>

      {/* Events Grid */}
      <div className={styles.eventsGrid}>
        {ugEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {/* Empty State */}
      {ugEvents.length === 0 && (
        <div className={styles.emptyState}>
          <p>No events available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default UGTechnical;
