import { DateType } from '@type/date-type';

export const formatDateToYYYYMMDD = (date: DateType) => {
  if (!date) {
    return '';
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
};

export const formatDateToYYYY_MM_DD = (date: Date) => {
  if (!date) {
    return '';
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatYYYY_MM_DDToYYYYMMDD = (date: string | undefined) => {
  if (!date) {
    return '';
  }

  const year = date.substring(0, 4);
  const month = date.substring(5, 7);
  const day = date.substring(8, 10);

  return `${year}${month}${day}`;
};

export const formatYYYYMMDDToYYYY_MM_DD = (date: string | undefined) => {
  if (!date) {
    return '';
  }

  const year = date.substring(0, 4);
  const month = date.substring(4, 6);
  const day = date.substring(6, 8);
  return `${year}-${month}-${day}`;
};
