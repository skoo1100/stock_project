import { useMutation } from '@tanstack/react-query';
import oauthRequest from '@apis/oauth-request';

export const useAccessTokenMutation = () => {
  const mutation = useMutation({
    mutationFn: async () => {
      const data = await oauthRequest.postAccessToken();
      return data;
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return mutation;
};

export const useApprovalKeyMutation = () => {
  const mutation = useMutation({
    mutationFn: async () => {
      const data = await oauthRequest.postApprovalKey();
      return data;
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return mutation;
};
