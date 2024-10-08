import axios from '@apis/axios';

const stockRequest = {
  fetchPeriodStock: async (
    stockCode: string, // 종목 코드
    startDate?: string, // 조회 시작날짜
    endDate?: string, // 조회 종료날짜
    stockPriceType: string = '0', // 0:수정주가, 1:원주가
    periodType: string = 'D', // D: 일봉, W: 주봉, M: 월봉, Y: 년봉
  ) => {
    try {
      const { data } = await axios.get('/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice', {
        headers: {
          tr_id: 'FHKST03010100',
          custtype: 'P',
        },
        params: {
          fid_cond_mrkt_div_code: 'J',
          fid_input_date_1: startDate,
          fid_input_date_2: endDate,
          fid_input_iscd: stockCode,
          fid_org_adj_prc: stockPriceType,
          fid_period_div_code: periodType,
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  },

  fetchEtfNavComparison: async (
    etfCode: string, // etf 종목 코드
    startDate?: string, // 조회 시작날짜
    endDate?: string, // 조회 종료날짜
  ) => {
    try {
      const { data } = await axios.get('/uapi/etfetn/v1/quotations/nav-comparison-daily-trend', {
        headers: {
          tr_id: 'FHPST02440200',
          custtype: 'P',
        },
        params: {
          fid_cond_mrkt_div_code: 'J',
          fid_input_iscd: etfCode,
          fid_input_date_1: startDate,
          fid_input_date_2: endDate,
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
};

export default stockRequest;
