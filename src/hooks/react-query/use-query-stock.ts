import { useQuery } from '@tanstack/react-query';
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
    queryKey: [stockCode, startDate, endDate, stockPriceType, periodType, stockType],
    queryFn: async () =>
      await stockRequest.fetchPeriodStock(stockCode, startDate, endDate, stockPriceType, periodType, stockType),
  });
  return query;
};
