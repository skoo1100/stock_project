import ApexCharts from 'react-apexcharts';

type StockChartProps = {
  stockData?: {
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
};

const StockChart = ({ stockData }: StockChartProps) => {
  const formatDate = (dateString: string) => {
    // YYYYMMDD 형식을 YYYY-MM-DD로 변환
    return `${dateString.substring(0, 4)}-${dateString.substring(4, 6)}-${dateString.substring(6)}`;
  };
  const seriesData = stockData?.output2
    .map((data) => ({
      x: formatDate(data.stck_bsop_date),
      y: [Number(data.stck_oprc), Number(data.stck_hgpr), Number(data.stck_lwpr), Number(data.stck_clpr)],
    }))
    .sort((a, b) => new Date(a.x).getTime() - new Date(b.x).getTime());

  return seriesData ? (
    <ApexCharts
      type="candlestick"
      series={[
        {
          data: seriesData,
        },
      ]}
      options={{
        theme: {
          mode: 'dark',
        },
        chart: {
          height: 600,
          width: 1000,
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
          text: stockData?.output1.hts_kor_isnm,
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
          show: false,
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
          categories: seriesData.map((point) => point.x),
          labels: {
            style: {
              colors: '#0c0c0c',
              fontSize: '6px',
            },
            formatter: (value) => `${value}`,
          },
        },
        yaxis: {
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
            enabled: true, // 툴팁 고정 여부
            position: 'topRight', // 고정 위치
            offsetX: 100, // x축 오프셋
            offsetY: 0, // y축 오프셋
          },
          theme: 'dark',
          style: {
            fontSize: '10px',
          },
          x: {
            formatter: (value) => `${seriesData[value - 1].x}`,
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
