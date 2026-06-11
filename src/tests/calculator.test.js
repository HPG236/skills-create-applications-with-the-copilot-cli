const { compute, modulo, power, squareRoot } = require('../calculator');

describe('Calculator compute()', () => {
  test('addition: 2 + 3 => 5 (symbolic and named)', () => {
    expect(compute('add', [2, 3])).toBe(5);
    expect(compute('+', [2, 3])).toBe(5);
  });

  test('subtraction: 10 - 4 => 6 (symbolic and named)', () => {
    expect(compute('sub', [10, 4])).toBe(6);
    expect(compute('-', [10, 4])).toBe(6);
  });

  test('multiplication: 45 * 2 => 90 (symbolic and named)', () => {
    expect(compute('mul', [45, 2])).toBe(90);
    expect(compute('*', [45, 2])).toBe(90);
  });

  test('division: 20 / 5 => 4 (symbolic and named)', () => {
    expect(compute('div', [20, 5])).toBe(4);
    expect(compute('/', [20, 5])).toBe(4);
  });

  test('multiple operands: add and mul work with many numbers', () => {
    expect(compute('add', [1, 2, 3, 4])).toBe(10);
    expect(compute('mul', [2, 3, 4])).toBe(24);
  });

  test('subtraction with single operand returns the operand', () => {
    expect(compute('sub', [7])).toBe(7);
  });

  test('division by zero throws error', () => {
    expect(() => compute('div', [10, 0])).toThrow(/Division by zero/);
    expect(() => compute('/', [5, 0])).toThrow(/Division by zero/);
  });

  test('unsupported operation throws', () => {
    expect(() => compute('pow', [2, 3])).toThrow(/Unsupported operation/);
  });

  test('non-numeric operands still compute if numbers provided to compute()', () => {
    // compute expects numbers; this ensures behavior is numeric-only
    expect(compute('+', [1.5, 2.25])).toBeCloseTo(3.75);
  });
});

describe('Extended operations: modulo, power, squareRoot', () => {
  test('modulo: 5 % 2 => 1', () => {
    expect(modulo(5, 2)).toBe(1);
  });

  test('modulo with negative numbers follows JS % behavior', () => {
    expect(modulo(-5, 2)).toBe(-1);
    expect(modulo(5, -2)).toBe(1);
  });

  test('modulo by zero throws', () => {
    expect(() => modulo(5, 0)).toThrow(/Modulo by zero/);
  });

  test('power: 2^3 => 8 and supports negative exponents', () => {
    expect(power(2, 3)).toBe(8);
    expect(power(2, -1)).toBeCloseTo(0.5);
  });

  test('power supports fractional exponents', () => {
    expect(power(9, 0.5)).toBeCloseTo(3);
  });

  test('squareRoot: sqrt(16) => 4', () => {
    expect(squareRoot(16)).toBe(4);
  });

  test('squareRoot of non-perfect squares returns fractional result', () => {
    expect(squareRoot(2)).toBeCloseTo(Math.sqrt(2));
  });

  test('squareRoot of negative number throws', () => {
    expect(() => squareRoot(-4)).toThrow(/Cannot take square root of negative number/);
  });
});
