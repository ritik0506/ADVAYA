import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

export const fetchAllEvents = async () => {
  const { data } = await axios.get(`${API_BASE}/api/events/all`);
  return data;
};
