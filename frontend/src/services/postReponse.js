import axios from 'axios';

const API_URL = "https://ultimate-quiz-furv.onrender.com/api/reponses/";

export const envoyerReponse = async (reponse, accessToken) => {
  return await axios.post(API_URL, reponse, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
