//과소비 지수 계산
export const overconsumption = (
  income: number, //월 평균 수입
  saving: number, //월 평균 저축
  age: number, //나이
) => {
  const overconsumption = 1 - saving / income;
};
