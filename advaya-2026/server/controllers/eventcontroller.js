// Ensure the 'E' is capitalized to match the filename exactly
import Event from '../models/Event.js';
export const getEvents = async (req, res) => {
  try {
    // Attempt to get from DB
    const events = await Event.find();
    
    // If DB is empty, you can still return your manual list for now
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};