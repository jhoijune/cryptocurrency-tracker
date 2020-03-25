export const transformMoneyUnit = (num) => {
  let transformed = '';
  num = num.toString();
  const numLen = num.length;
  for (let i = 1; i <= numLen; i++) {
    if (i > 3 && i % 3 === 1) {
      transformed = `,${transformed}`;
    }
    transformed = num.charAt(numLen - i) + transformed;
  }
  return transformed;
};

export const generateNorm = (mean = 0, sigma = 1) => {
  let x1, x2;
  do {
    x1 = Math.random();
  } while (x1 === 0);
  do {
    x2 = Math.random();
  } while (x2 === 0);
  const calc = Math.sqrt(-2 * Math.log(x1)) * Math.cos(2 * Math.PI * x2);
  return calc * sigma + mean;
};
