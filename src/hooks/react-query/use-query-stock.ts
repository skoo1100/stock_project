import { QUERY_KEY } from '@constants/query-key';
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

type EtfNavComparisonType = {
  output: {
    stck_bsop_date: string;
    stck_clpr: string;
    prdy_vrss: string;
    prdy_vrss_sign: string;
    prdy_ctrt: string;
    acml_vol: string;
    cntg_vol: string;
    dprt: string;
    nav_vrss_prpr: string;
    nav: string;
    nav_prdy_vrss_sign: string;
    nav_prdy_vrss: string;
    nav_prdy_ctrt: string;
  }[];
};

export const usePeriodStockQuery = (
  stockCode: string, // 종목 코드
  startDate?: string, // 조회 시작날짜
  endDate?: string, // 조회 종료날짜
  stockPriceType?: '0' | '1', // 0: 원주가, 1: 수정주가
  periodType?: 'D' | 'W' | 'M' | 'Y', // D: Day, W: Week, M: Month, Y: Year
  stockType?: 'J' | 'ETF' | 'ETN', // J: 주식, ETF: ETF, ETN: ETN
) => {
  const query = useQuery<PeriodStockDataType>({
    queryKey: [QUERY_KEY.periodStock, stockCode, startDate, endDate, stockPriceType, periodType, stockType],
    queryFn: async () => await stockRequest.fetchPeriodStock(stockCode, startDate, endDate, stockPriceType, periodType),
  });
  return query;
};

export const useEtfNavComparisonQuery = (
  etfCode: string, // etf 종목 코드
  startDate?: string, // 조회 시작날짜
  endDate?: string, // 조회 종료날짜
) => {
  const query = useQuery<EtfNavComparisonType>({
    queryKey: [QUERY_KEY.etfNavComparison, etfCode, startDate, endDate],
    queryFn: async () => await stockRequest.fetchEtfNavComparison(etfCode, startDate, endDate),
  });
  return query;
};
