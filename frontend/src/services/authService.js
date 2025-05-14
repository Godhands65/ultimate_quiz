import axios from 'axios';

const API_URL = 'https://ultimate-quiz-furv.onrender.com/api/auth/';

// 🔐 Inscription
export const registerUser = async (credentials) => {
  const response = await axios.post(`${API_URL}users/`, credentials);
  return response.data;
};

// 🔑 Connexion (obtenir access + refresh token)
export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}jwt/create/`, credentials);
  return response.data; // { access: "...", refresh: "..." }
};

// 🔄 Rafraîchir le token d'accès
export const refreshToken = async (refresh) => {
  const response = await axios.post(`${API_URL}jwt/refresh/`, { refresh });
  return response.data; // { access: "..." }
};

// 👤 Récupérer les infos de l'utilisateur connecté
export const getCurrentUser = async (accessToken) => {
  const response = await axios.get(`${API_URL}users/me/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data; // { id, username, ... }
};
