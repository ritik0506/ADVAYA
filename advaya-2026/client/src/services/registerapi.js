import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerWarrior = async (registrationData) => {
  try {
    const response = await apiClient.post("/api/registration", registrationData);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "The scroll failed to bind.";
    throw new Error(message);
  }
};
