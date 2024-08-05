import axios from '@apis/axios';

const stockRequest = {
  fetchStock: async () => {
    try {
      const { data } = await axios.post('/oauth2/Approval', {
        grant_type: 'client_credentials',
        appkey: import.meta.env.VITE_KIS_INVESTMENT_API_KEY,
        secretkey: import.meta.env.VITE_KIS_INVESTMENT_API_SECRET,
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
};

export default oauthRequest;
