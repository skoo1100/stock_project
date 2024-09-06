import { useState } from 'react';
import { useParams } from 'react-router-dom';
import StockCalendar from '@components/stock-calendar';
import StockChart from '@components/stock-chart';
import { useEtfNavComparisonQuery } from '@hooks/react-query/use-query-stock';
import { z_index } from '@styles/z-index';
import { DateValue } from '@type/date-type';
import { formatDateToYYYYMMDD, formatDateToYYYY_MM_DD } from '@utils/format-date';
import styled from 'styled-components';

const StockItem = () => {
  const { code } = useParams();
  const [openCalendar, setOpenCalendar] = useState(false);
  const [selectDate, setSelectDate] = useState<DateValue>(new Date());

  const { data: EtfNavComparisonData } = useEtfNavComparisonQuery(
    code || '',
    formatDateToYYYYMMDD(selectDate && Array.isArray(selectDate) ? selectDate[0] : selectDate),
    formatDateToYYYYMMDD(selectDate && Array.isArray(selectDate) ? selectDate[1] : selectDate),
  );

  const avgNav =
    (EtfNavComparisonData?.output.reduce((acc, cur) => {
      return acc + (Number(cur.nav) || 0);
    }, 0) || 0) / (EtfNavComparisonData?.output.length || 1);

  const noNav = EtfNavComparisonData?.output[0].stck_bsop_date || '0' === '0';

  console.log(code);

  return (
    <S.StockItemContainer>
      <StockChart />
      <S.StockCalendar>
        <S.SelectDateButton onClick={() => setOpenCalendar((prev) => !prev)}>날짜 선택하기</S.SelectDateButton>
        {openCalendar && (
          <S.Calender>
            <StockCalendar selectDate={selectDate} setSelectDate={setSelectDate} />
          </S.Calender>
        )}
      </S.StockCalendar>
      <div>
        {selectDate && Array.isArray(selectDate)
          ? `시작일: ${formatDateToYYYY_MM_DD(selectDate[0] as Date)} 종료일: ${formatDateToYYYY_MM_DD(
              selectDate[1] as Date,
            )}`
          : `선택일: ${formatDateToYYYY_MM_DD(selectDate as Date)}`}
      </div>
      <S.AvgStockItem>{`평균 nav: ${avgNav}`}</S.AvgStockItem>
    </S.StockItemContainer>
  );
};

export default StockItem;

const S = {
  StockItemContainer: styled.div`
    position: relative;
  `,
  StockCalendar: styled.div`
    position: relative;
  `,
  SelectDateButton: styled.button``,
  Calender: styled.div`
    position: absolute;
    top: -18rem; /* Adjust based on the height of the calendar */
    left: 0;
    z-index: ${z_index.calendar};
  `,
  StockItem: styled.div``,
  AvgStockItem: styled.div``,
};
