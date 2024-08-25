import { useState } from 'react';
import { useEtfNavComparisonQuery } from '@hooks/react-query/use-query-stock';
import { formatDateToYYYY_MM_DD, formatDateToYYYYMMDD } from '@utils/format-date';
import { StockDataType } from '@type/stock-type';
import { DateValue } from '@type/date-type';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';

type StockCalenderProps = {
  stockData: StockDataType;
};

const StockCalendar = ({ stockData }: StockCalenderProps) => {
  const [selectDate, setSelectDate] = useState<DateValue>(new Date());

  const { data: EtfNavComparisonData } = useEtfNavComparisonQuery(
    stockData.first.종목코드 ? stockData.first.종목코드 : '',
    formatDateToYYYYMMDD(selectDate && Array.isArray(selectDate) ? selectDate[0] : selectDate),
    formatDateToYYYYMMDD(selectDate && Array.isArray(selectDate) ? selectDate[1] : selectDate),
  );

  const handleDateChange = (date: DateValue) => {
    setSelectDate(date);
  };

  console.log(EtfNavComparisonData);

  return (
    <S.StyledCalendarWrapper>
      <S.StyledCalendar
        value={selectDate}
        selectRange={false}
        onChange={handleDateChange}
        formatDay={(locale, date) => date.getDate().toString()}
        formatYear={(locale, date) => date.getFullYear().toString()}
        formatMonthYear={(locale, date) => `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, '0')}`}
        calendarType="gregory"
        showNeighboringMonth={false}
        next2Label={'>>'}
        prev2Label={'<<'}
        minDetail="year"
      />
      <div>
        <div>{`선택 날짜: ${formatDateToYYYY_MM_DD(selectDate as Date)}`}</div>
        <div>주식 정보</div>
        {EtfNavComparisonData ? (
          <div>
            {EtfNavComparisonData.output.map((item, index) => (
              <div key={index}>
                <div>{`데이터 리스트 ${index + 1}: ${JSON.stringify(item)}`}</div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </S.StyledCalendarWrapper>
  );
};

export default StockCalendar;

const S = {
  StyledCalendarWrapper: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
  `,
  StyledCalendar: styled(Calendar)``,
};
