import eventsData from '../data/eventsData.js';

export const getEvents = (req, res) => {
  try {
    // 🔥 SEND ARRAY DIRECTLY (frontend-safe)
    res.status(200).json(eventsData);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch events',
    });
  }
};
