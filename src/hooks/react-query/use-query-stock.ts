import { useQuery } from '@tanstack/react-query';
import stockRequest from '@apis/stock-request';

type PeriodStockDataType = {
  output1: {
    hts_kor_isnm: string;
  };
  output2: {
    stck_bsop_date: string; //날짜
    stck_clpr: string; //종가
    stck_hgpr: string; //최고가
    stck_lwpr: string; //최저가
    stck_oprc: string; //시가
  }[];
};

export const usePeriodStockQuery = (
  stockCode: string,
  startDate?: string,
  endDate?: string,
  stockPriceType?: '0' | '1', // 0: 원주가, 1: 수정주가
  periodType?: 'D' | 'W' | 'M' | 'Y', // D: Day, W: Week, M: Month, Y: Year
  stockType?: 'J' | 'ETF' | 'ETN', // J: 주식, ETF: ETF, ETN: ETN
) => {
  const query = useQuery<PeriodStockDataType>({
    queryKey: [stockCode, startDate, endDate, stockPriceType, periodType, stockType],
    queryFn: async () =>
      await stockRequest.fetchPeriodStock(stockCode, startDate, endDate, stockPriceType, periodType, stockType),
  });
  return query;
};
