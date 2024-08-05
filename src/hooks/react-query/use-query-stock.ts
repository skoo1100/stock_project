import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/query-key';

export const useUserQuery = () => {
  const query = useQuery({
    queryKey: [QUERY_KEY.stockInfo],
    queryFn: async () => await userRequest.FetchUserData(),
    gcTime: Infinity,
  });
  return query;
};
