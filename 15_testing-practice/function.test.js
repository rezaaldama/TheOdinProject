import {
  capitalize,
  reverseString,
  calculator,
  caesarCipher,
  analyzeArray,
} from './function';

/** Capitalize **/
test('capitalize converts the first letter to uppercase', () => {
  expect(capitalize('hello')).toBe('Hello');
  expect(capitalize('world')).toBe('World');
});

/** Reverse String **/
test('reverseString flips the string correctly', () => {
  expect(reverseString('hello')).toBe('olleh');
});

/** Calculator **/
describe('calculator', () => {
  test.each([
    { method: 'add', a: 1, b: 2, expected: 3 },
    { method: 'subtract', a: 5, b: 2, expected: 3 },
    { method: 'multiply', a: 3, b: 4, expected: 12 },
    { method: 'divide', a: 10, b: 2, expected: 5 },
    { method: 'divide', a: 10, b: 0, expected: 'Cannot divide by zero' },
  ])(
    '$method($a, $b) should return $expected',
    ({ method, a, b, expected }) => {
      const result = calculator[method](a, b);
      expect(result).toBe(expected);
    },
  );
});

/** Caesar Cipher **/
describe('caesarCipher', () => {
  test('handles shifting, wrapping, casing, and punctuation', () => {
    expect(caesarCipher('abc', 1)).toBe('bcd');
    expect(caesarCipher('xyz', 2)).toBe('zab');
    expect(caesarCipher('Hello', 3)).toBe('Khoor');
    expect(caesarCipher('Hello, World!', 5)).toBe('Mjqqt, Btwqi!');
  });

  test('handles negative shifts', () => {
    expect(caesarCipher('bcd', -1)).toBe('abc');
  });
});

/** Analyze Array **/
describe('analyzeArray', () => {
  test('returns correct statistics object', () => {
    const input = [1, 8, 3, 4, 2, 6];
    const expected = {
      average: 4,
      min: 1,
      max: 8,
      length: 6,
    };
    expect(analyzeArray(input)).toEqual(expected);
  });

  test('returns null for empty arrays', () => {
    expect(analyzeArray([])).toBeNull();
  });
});
