import { useAccessTokenMutation, useApprovalKeyMutation } from '@hooks/react-query/use-query-oauth';
import { useEffect } from 'react';
import { setCookie } from '@utils/cookie';

export const useSetAccessTokenCookie = () => {
  const accessTokenMutation = useAccessTokenMutation();

  useEffect(() => {
    const accessToken = async () => {
      try {
        const data = await accessTokenMutation.mutateAsync();
        setCookie('accessToken', data.access_token, {
          sameSite: 'Strict',
          secure: true,
          // domain: 'koreainvestment.com',
        });
      } catch (error) {
        console.error(error);
      }
    };

    accessToken();
  }, []);
};

export const useSetApprovalKeyCookie = () => {
  const approvalKeyMutation = useApprovalKeyMutation();

  useEffect(() => {
    const approvalKey = async () => {
      try {
        const data = await approvalKeyMutation.mutateAsync();
        setCookie('approvalKey', data.approval_key, {
          sameSite: 'Strict',
          secure: true,
          // domain: 'koreainvestment.com',
        });
      } catch (error) {
        console.error(error);
      }
    };

    approvalKey();
  }, []);
};
