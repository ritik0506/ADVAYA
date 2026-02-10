import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerWarrior = async (registrationData) => {
  console.log("🚀 [Frontend API] Initiating request to backend...", registrationData);
  const startTime = Date.now();

  try {
    // FIX: Changed /api/registrations to /api/registration to match your backend
    const response = await apiClient.post("/api/registration", registrationData);
    
    const duration = Date.now() - startTime;
    console.log(`✅ [Frontend API] Success! Server took ${duration}ms. Response:`, response.data);
    
    return response.data;
  } catch (error) {
    console.error("❌ [Frontend API] Error occurred:", error.response?.data || error.message);
    const message = error.response?.data?.message || error.message || "The scroll failed to bind.";
    throw new Error(message);
  }
};