import axios from '@apis/axios';

const oauthRequest = {
  postAccessToken: async () => {
    try {
      const { data } = await axios.post('/oauth2/tokenP', {
        grant_type: 'client_credentials',
      });
      return data;
    } catch (error) {
      throw error;
    }
  },

  postApprovalKey: async () => {
    try {
      const { data } = await axios.post('/oauth2/Approval', {
        grant_type: 'client_credentials',
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
};

export default oauthRequest;
