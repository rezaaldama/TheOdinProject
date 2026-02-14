export { capitalize, reverseString, calculator, caesarCipher, analyzeArray };

const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

const reverseString = (str) => [...str].reverse().join('');

const calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => (b === 0 ? 'Cannot divide by zero' : a / b),
};

function caesarCipher(str, shift) {
  const modShift = ((shift % 26) + 26) % 26;

  const shiftChar = (char, baseCode) =>
    String.fromCharCode(
      ((char.charCodeAt(0) - baseCode + modShift) % 26) + baseCode,
    );

  return str.replace(/[a-z]/gi, (char) => {
    const isUppercase = char <= 'Z';
    return shiftChar(char, isUppercase ? 65 : 97);
  });
}

function analyzeArray(arr) {
  if (!arr.length) return null;

  const stats = arr.reduce(
    (acc, curr) => ({
      min: Math.min(acc.min, curr),
      max: Math.max(acc.max, curr),
      sum: acc.sum + curr,
    }),
    { min: arr[0], max: arr[0], sum: 0 },
  );

  return {
    average: stats.sum / arr.length,
    min: stats.min,
    max: stats.max,
    length: arr.length,
  };
}
