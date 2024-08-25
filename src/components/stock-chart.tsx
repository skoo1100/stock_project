import ApexCharts from 'react-apexcharts';
import { usePeriodStockQuery } from '@hooks/react-query/use-query-stock';
import { formatYYYY_MM_DDToYYYYMMDD, formatYYYYMMDDToYYYY_MM_DD } from '@utils/format-date';
import { StockDataType } from '@type/stock-type';

type StockChartProps = {
  stockData: StockDataType;
};

const StockChart = ({ stockData }: StockChartProps) => {
  const { data: firstPeriodStockData } = usePeriodStockQuery(
    stockData.first.종목코드 ? stockData.first.종목코드 : '',
    formatYYYY_MM_DDToYYYYMMDD(stockData.date?.start),
    formatYYYY_MM_DDToYYYYMMDD(stockData.date?.end),
    stockData.option.priceType,
    stockData.option.periodType,
  );

  const { data: secondPeriodStockData } = usePeriodStockQuery(
    stockData.second.종목코드 ? stockData.second.종목코드 : '',
    formatYYYY_MM_DDToYYYYMMDD(stockData.date?.start),
    formatYYYY_MM_DDToYYYYMMDD(stockData.date?.end),
    stockData.option.priceType,
    stockData.option.periodType,
  );

  const firstSeriesData = firstPeriodStockData?.output2
    .map((data) => ({
      x: formatYYYYMMDDToYYYY_MM_DD(data.stck_bsop_date),
      y: [Number(data.stck_oprc), Number(data.stck_hgpr), Number(data.stck_lwpr), Number(data.stck_clpr)],
    }))
    .sort((a, b) => new Date(a.x).getTime() - new Date(b.x).getTime());

  const secondSeriesData = secondPeriodStockData?.output2
    .map((data) => ({
      x: formatYYYYMMDDToYYYY_MM_DD(data.stck_bsop_date),
      y: [Number(data.stck_oprc), Number(data.stck_hgpr), Number(data.stck_lwpr), Number(data.stck_clpr)],
    }))
    .sort((a, b) => new Date(a.x).getTime() - new Date(b.x).getTime());

  return firstSeriesData || secondSeriesData ? (
    <ApexCharts
      type="candlestick"
      series={[
        {
          name: firstPeriodStockData?.output1.hts_kor_isnm,
          data: firstSeriesData || [],
        },
        {
          name: secondPeriodStockData?.output1.hts_kor_isnm,
          data: secondSeriesData || [],
        },
      ]}
      options={{
        theme: {
          mode: 'dark',
        },
        chart: {
          height: '100%',
          width: '100%',
          toolbar: {
            tools: {
              download: false,
              zoom: false,
              zoomin: false,
              zoomout: false,
              pan: false,
              reset: false,
            },
            show: false,
          },
          background: 'transparent',
        },
        title: {
          text: '주식 차트',
          align: 'center',
          margin: 0,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: '12px',
            color: '#0c0c0c',
          },
        },
        grid: {
          show: true,
        },
        plotOptions: {
          candlestick: {
            wick: {
              useFillColor: true,
            },
          },
        },
        xaxis: {
          type: 'category',
          categories: firstSeriesData?.map((point) => point.x),
          labels: {
            style: {
              colors: '#0c0c0c',
              fontSize: '6px',
            },
            formatter: (value) => `${value}`,
          },
        },
        yaxis: {
          tickAmount: 5,
          labels: {
            style: {
              colors: '#0c0c0c',
              fontSize: '8px',
            },
            formatter: (value) => `${value}원 -`,
          },
        },
        tooltip: {
          enabled: true,
          shared: false,
          intersect: true,
          fixed: {
            enabled: true,
            position: 'topRight',
            offsetX: 100,
            offsetY: 0,
          },
          theme: 'dark',
          style: {
            fontSize: '10px',
          },
          x: {
            formatter: (value) => `${firstSeriesData?.[value - 1]?.x ?? ''}`,
          },
          y: {
            formatter: (value) => `$ ${value.toFixed(2)}`,
          },
        },
      }}
    />
  ) : null;
};

export default StockChart;
