const API_BASE_URL = import.meta.env.VITE_SEATFLIX_API_URL;

export const endpoints = {
  register: `${API_BASE_URL}/api/v1/users/register`,
  login: `${API_BASE_URL}/api/v1/users/login`,
  uploadAvatar: `${API_BASE_URL}/api/v1/users/upload-avatar`,
  getUser: `${API_BASE_URL}/api/v1/users`,
 

  // Add more endpoints as you build them
};