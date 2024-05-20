//평균
export const getMean = (array: number[]) => {
  return array.reduce((a, b) => a + b) / array.length;
};

//표준 편차
export const getStandardDeviation = (array: number[]) => {
  const mean = array.reduce((a, b) => a + b) / array.length;
  return Math.sqrt(array.map((n) => Math.pow(n - mean, 2)).reduce((a, b) => a + b) / array.length);
};

//log n
export const getLog = (n: number, num: number) => {
  return Math.log(num) / Math.log(n);
};

//루트
export const getSqrt = (num: number) => {
  return Math.sqrt(num);
};
