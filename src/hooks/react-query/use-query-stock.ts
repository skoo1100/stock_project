import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/query-key';
import stockRequest from '@apis/stock-request';

export const usePeriodStockQuery = (
  stockCode: string,
  startDate: string,
  endDate: string,
  stockPriceType?: string,
  periodType?: string,
  stockType?: string,
) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.periodStockInfo],
    queryFn: async () =>
      await stockRequest.fetchPeriodStock(stockCode, startDate, endDate, stockPriceType, periodType, stockType),
  });
  return query;
};
