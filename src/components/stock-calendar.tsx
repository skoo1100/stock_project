import { SetStateAction, useState } from 'react';
import Calendar, { TileDisabledFunc } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { DateValue } from '@type/date-type';
import styled from 'styled-components';

type StockCalenderProps = {
  selectDate: DateValue;
  setSelectDate: React.Dispatch<SetStateAction<DateValue>>;
};

const StockCalendar = ({ selectDate, setSelectDate }: StockCalenderProps) => {
  const [selectOption, setSelectOption] = useState(false);

  const handleDateChange = (date: DateValue) => {
    setSelectDate(date);
  };

  const disableDates: TileDisabledFunc = ({ date, view }) => {
    // "view"가 "month"일 때만 비활성화 (연도, 월 선택 시는 활성화)
    const isAfterToday = date > new Date();
    return isAfterToday;
  };

  return (
    <S.StyledCalendarWrapper>
      <S.StyledCalendar
        value={selectDate}
        selectRange={selectOption}
        onChange={handleDateChange}
        formatDay={(locale, date) => date.getDate().toString()}
        formatYear={(locale, date) => date.getFullYear().toString()}
        formatMonthYear={(locale, date) => `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, '0')}`}
        calendarType="gregory"
        showNeighboringMonth={false}
        next2Label={'>>'}
        prev2Label={'<<'}
        minDetail="year"
        tileDisabled={disableDates}
      />
      <S.OptionSelectButton onClick={() => setSelectOption(!selectOption)}>
        {selectOption ? '단일 날짜 선택' : '범위 선택'}
      </S.OptionSelectButton>
    </S.StyledCalendarWrapper>
  );
};

export default StockCalendar;

const S = {
  StyledCalendarWrapper: styled.div`
    width: 100%;
    overflow-x: hidden; /* 수평 스크롤 방지 */
    display: flex;
    justify-content: center;
    position: relative;
    box-sizing: border-box; /* 패딩과 보더 포함하여 너비 계산 */
    padding: 0 10px; /* 좌우 여백 추가 (필요 시) */
  `,
  StyledCalendar: styled(Calendar)`
    width: 100%; /* Calendar의 너비를 100%로 설정 */
    max-width: 100%; /* Calendar의 최대 너비를 제한 */
  `,
  OptionSelectButton: styled.button``,
};
