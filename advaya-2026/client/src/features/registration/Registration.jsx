import React, { useState } from 'react';
import { registerForEvent } from '../../services/api';
import styles from './Registration.module.css';

const Registration = ({ 
  eventName, 
  category, // 'UG' or 'PG'
  registrationFee,
  teamSize = 1, // number of participants
  minTeamSize = 1,
  maxTeamSize = 4
}) => {
  const [formData, setFormData] = useState({
    collegeName: '',
    teamName: '',
    participants: Array(minTeamSize).fill({ name: '', mobile: '', email: '' }),
  });

  const [currentTeamSize, setCurrentTeamSize] = useState(minTeamSize);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [generatedTeamId, setGeneratedTeamId] = useState('');

  // Handle college name and team name changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  // Handle participant field changes
  const handleParticipantChange = (index, field, value) => {
    const updatedParticipants = [...formData.participants];
    updatedParticipants[index] = {
      ...updatedParticipants[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      participants: updatedParticipants
    }));
    setError('');
  };

  // Add participant
  const addParticipant = () => {
    if (currentTeamSize < maxTeamSize) {
      setFormData(prev => ({
        ...prev,
        participants: [...prev.participants, { name: '', mobile: '', email: '' }]
      }));
      setCurrentTeamSize(prev => prev + 1);
    }
  };

  // Remove participant
  const removeParticipant = (index) => {
    if (currentTeamSize > minTeamSize) {
      const updatedParticipants = formData.participants.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        participants: updatedParticipants
      }));
      setCurrentTeamSize(prev => prev - 1);
    }
  };

  // Validate form
  const validateForm = () => {
    if (!formData.collegeName.trim()) {
      setError('College name is required');
      return false;
    }

    if (!formData.teamName.trim()) {
      setError('Team name is required');
      return false;
    }

    for (let i = 0; i < formData.participants.length; i++) {
      const participant = formData.participants[i];
      
      if (!participant.name.trim()) {
        setError(`Participant ${i + 1} name is required`);
        return false;
      }

      if (!participant.mobile.trim()) {
        setError(`Participant ${i + 1} mobile number is required`);
        return false;
      }

      // Validate mobile number (10 digits)
      if (!/^\d{10}$/.test(participant.mobile)) {
        setError(`Participant ${i + 1} mobile number must be 10 digits`);
        return false;
      }

      if (!participant.email.trim()) {
        setError(`Participant ${i + 1} email is required (mandatory for certificate)`);
        return false;
      }

      // Validate email format
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(participant.email)) {
        setError(`Participant ${i + 1} email is invalid`);
        return false;
      }
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const registrationData = {
        eventName,
        category,
        registrationFee,
        collegeName: formData.collegeName,
        teamName: formData.teamName,
        participants: formData.participants,
        teamSize: currentTeamSize
      };

      const response = await registerForEvent(registrationData);
      
      // Store generated team ID
      setGeneratedTeamId(response.teamId || response.data?.teamId);
      setSuccess(`Registration successful! Your Team ID is: ${response.teamId || response.data?.teamId}`);
      
      // Reset form
      setFormData({
        collegeName: '',
        teamName: '',
        participants: Array(minTeamSize).fill({ name: '', mobile: '', email: '' }),
      });
      setCurrentTeamSize(minTeamSize);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.registrationContainer}>
      <div className={styles.registrationCard}>
        <h2 className={styles.title}>Register for {eventName}</h2>
        
        <div className={styles.eventInfo}>
          <p className={styles.infoItem}>
            <span className={styles.label}>Category:</span>
            <span className={styles.value}>{category}</span>
          </p>
          <p className={styles.infoItem}>
            <span className={styles.label}>Registration Fee:</span>
            <span className={styles.value}>₹{registrationFee}</span>
          </p>
          <p className={styles.infoItem}>
            <span className={styles.label}>Team Size:</span>
            <span className={styles.value}>{minTeamSize} - {maxTeamSize} participants</span>
          </p>
        </div>

        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* College Name */}
          <div className={styles.formGroup}>
            <label htmlFor="collegeName" className={styles.formLabel}>
              College Name <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="collegeName"
              name="collegeName"
              value={formData.collegeName}
              onChange={handleChange}
              className={styles.formInput}
              placeholder="Enter your college name"
              required
            />
          </div>

          {/* Team Name */}
          <div className={styles.formGroup}>
            <label htmlFor="teamName" className={styles.formLabel}>
              Team Name <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="teamName"
              name="teamName"
              value={formData.teamName}
              onChange={handleChange}
              className={styles.formInput}
              placeholder="Enter your team name"
              required
            />
          </div>

          {/* Participants */}
          <div className={styles.participantsSection}>
            <h3 className={styles.sectionTitle}>Participants</h3>
            
            {formData.participants.map((participant, index) => (
              <div key={index} className={styles.participantCard}>
                <div className={styles.participantHeader}>
                  <h4 className={styles.participantTitle}>Participant {index + 1}</h4>
                  {currentTeamSize > minTeamSize && (
                    <button
                      type="button"
                      onClick={() => removeParticipant(index)}
                      className={styles.removeBtn}
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Name <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    value={participant.name}
                    onChange={(e) => handleParticipantChange(index, 'name', e.target.value)}
                    className={styles.formInput}
                    placeholder="Enter participant name"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Mobile Number <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="tel"
                    value={participant.mobile}
                    onChange={(e) => handleParticipantChange(index, 'mobile', e.target.value)}
                    className={styles.formInput}
                    placeholder="10-digit mobile number"
                    pattern="[0-9]{10}"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Email <span className={styles.required}>*</span>
                    <span className={styles.mandatory}>(Mandatory for certificate)</span>
                  </label>
                  <input
                    type="email"
                    value={participant.email}
                    onChange={(e) => handleParticipantChange(index, 'email', e.target.value)}
                    className={styles.formInput}
                    placeholder="Enter email address"
                    required
                  />
                </div>
              </div>
            ))}

            {currentTeamSize < maxTeamSize && (
              <button
                type="button"
                onClick={addParticipant}
                className={styles.addBtn}
              >
                + Add Participant
              </button>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`${styles.submitBtn} ${loading ? styles.loading : ''}`}
          >
            {loading ? 'Processing...' : 'Register Now'}
          </button>
        </form>

        {generatedTeamId && (
          <div className={styles.teamIdCard}>
            <p className={styles.teamIdLabel}>Your Team ID:</p>
            <p className={styles.teamIdValue}>{generatedTeamId}</p>
            <p className={styles.teamIdNote}>Please save this ID for future reference</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Registration;
