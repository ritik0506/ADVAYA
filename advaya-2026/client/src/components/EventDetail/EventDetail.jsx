import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEventById } from '../../constants/eventsData';
import styles from './EventDetail.module.css';

const EventDetail = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const event = getEventById(eventId);

  if (!event) {
    return (
      <div className={styles.notFound}>
        <h1>Event Not Found</h1>
        <button onClick={() => navigate('/events')} className={styles.backButton}>
          Back to Events
        </button>
      </div>
    );
  }

  const handleRegister = () => {
    navigate('/register', {
      state: {
        eventId: event.id,
        eventName: event.title,
        actualName: event.subtitle,
        category: event.category,
        teamSize: event.teamSize,
        fee: event.fee,
      },
    });
  };

  return (
    <div className={styles.container}>
      {/* Decorative Background Elements */}
      <div className={styles.bgPattern}></div>
      <div className={styles.bgGlow}></div>

      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.categoryBadge}>{event.category}</div>
          <h1 className={styles.title}>{event.title}</h1>
          <p className={styles.subtitle}>{event.subtitle}</p>
          <div className={styles.divider}></div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        {/* Event Info Cards */}
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>₹</div>
            <div className={styles.infoContent}>
              <span className={styles.infoLabel}>Registration Fee</span>
              <span className={styles.infoValue}>₹{event.fee}</span>
            </div>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>👥</div>
            <div className={styles.infoContent}>
              <span className={styles.infoLabel}>Team Size</span>
              <span className={styles.infoValue}>
                {event.teamSize.min === event.teamSize.max
                  ? event.teamSize.min
                  : `${event.teamSize.min}-${event.teamSize.max}`} members
              </span>
            </div>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>⏱️</div>
            <div className={styles.infoContent}>
              <span className={styles.infoLabel}>Duration</span>
              <span className={styles.infoValue}>{event.duration}</span>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>About the Event</h2>
          <div className={styles.sectionDivider}></div>
          <p className={styles.description}>{event.description}</p>
        </div>

        {/* Rules Section */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Rules & Guidelines</h2>
          <div className={styles.sectionDivider}></div>
          <ul className={styles.rulesList}>
            {event.rules.map((rule, index) => (
              <li key={index} className={styles.ruleItem}>
                <span className={styles.ruleNumber}>{index + 1}</span>
                <span className={styles.ruleText}>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Registration CTA */}
        <div className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <h3 className={styles.ctaTitle}>Ready to Participate?</h3>
            <p className={styles.ctaText}>
              Join us in this epic challenge and showcase your skills!
            </p>
            <button className={styles.registerButton} onClick={handleRegister}>
              Register Now
            </button>
          </div>
        </div>

        {/* Back Button */}
        <div className={styles.navigation}>
          <button onClick={() => navigate(-1)} className={styles.backBtn}>
            ← Back to Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
