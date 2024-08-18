export const formatDateToYYYYMMDD = (date: string | undefined) => {
  if (!date) {
    return '';
  }

  const year = date.substring(0, 4);
  const month = date.substring(5, 7);
  const day = date.substring(8, 10);

  return `${year}${month}${day}`;
};

export const formatYYYYMMDDToDate = (date: string | undefined) => {
  if (!date) {
    return '';
  }

  const year = date.substring(0, 4);
  const month = date.substring(4, 6);
  const day = date.substring(6, 8);
  return `${year}-${month}-${day}`;
};
