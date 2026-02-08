import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './EventCard.module.css';

const EventCard = ({ event }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const truncateDescription = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  const handleViewRules = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const handleRegister = (e) => {
    e.stopPropagation();
    navigate(`/events/${event.id}`);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div
        className={styles.card}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Decorative corner elements */}
        <div className={styles.cornerTopLeft}></div>
        <div className={styles.cornerTopRight}></div>
        <div className={styles.cornerBottomLeft}></div>
        <div className={styles.cornerBottomRight}></div>

        {/* Card Content */}
        <div className={styles.content}>
          {/* Category Badge */}
          <div className={styles.categoryBadge}>{event.category}</div>

          {/* Event Title (Mythology Name) */}
          <h2 className={styles.title}>{event.title}</h2>

          {/* Event Subtitle (Actual Name) */}
          <p className={styles.subtitle}>{event.subtitle}</p>

          {/* Divider */}
          <div className={styles.divider}></div>

          {/* Description */}
          <p className={styles.description}>
            {truncateDescription(event.description)}
          </p>

          {/* Fee and Team Info */}
          <div className={styles.info}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Fee:</span>
              <span className={styles.infoValue}>₹{event.fee}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Team:</span>
              <span className={styles.infoValue}>
                {event.teamSize.min === event.teamSize.max
                  ? event.teamSize.min
                  : `${event.teamSize.min}-${event.teamSize.max}`}
              </span>
            </div>
          </div>
        </div>

        {/* Hover Overlay with Buttons */}
        <div className={`${styles.overlay} ${isHovered ? styles.visible : ''}`}>
          <button className={styles.btnViewRules} onClick={handleViewRules}>
            View Rules
          </button>
          <button className={styles.btnRegister} onClick={handleRegister}>
            Register
          </button>
        </div>
      </div>

      {/* Rules Modal */}
      {showModal && (
        <div className={styles.modalBackdrop} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>{event.title}</h2>
              <button className={styles.closeButton} onClick={closeModal}>
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className={styles.modalContent}>
              <p className={styles.modalSubtitle}>{event.subtitle}</p>
              
              <div className={styles.modalSection}>
                <h3 className={styles.modalSectionTitle}>Event Details</h3>
                <div className={styles.modalDetails}>
                  <div className={styles.modalDetailItem}>
                    <span className={styles.modalLabel}>Team Size:</span>
                    <span className={styles.modalValue}>
                      {event.teamSize.min === event.teamSize.max
                        ? `${event.teamSize.min} member${event.teamSize.min > 1 ? 's' : ''}`
                        : `${event.teamSize.min}-${event.teamSize.max} members`}
                    </span>
                  </div>
                  <div className={styles.modalDetailItem}>
                    <span className={styles.modalLabel}>Registration Fee:</span>
                    <span className={styles.modalValue}>₹{event.fee}</span>
                  </div>
                  <div className={styles.modalDetailItem}>
                    <span className={styles.modalLabel}>Duration:</span>
                    <span className={styles.modalValue}>{event.duration}</span>
                  </div>
                  <div className={styles.modalDetailItem}>
                    <span className={styles.modalLabel}>Category:</span>
                    <span className={styles.modalValue}>{event.category}</span>
                  </div>
                </div>
              </div>

              <div className={styles.modalSection}>
                <h3 className={styles.modalSectionTitle}>Rules & Guidelines</h3>
                <ul className={styles.rulesList}>
                  {event.rules.map((rule, index) => (
                    <li key={index} className={styles.ruleItem}>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.modalSection}>
                <p className={styles.modalDescription}>{event.description}</p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className={styles.modalFooter}>
              <button className={styles.modalBtnRegister} onClick={handleRegister}>
                Register for this Event
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventCard;
