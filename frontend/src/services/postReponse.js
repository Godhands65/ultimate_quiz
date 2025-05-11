import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/api/reponses/";

export const envoyerReponse = async (reponse, accessToken) => {
  return await axios.post(API_URL, reponse, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
