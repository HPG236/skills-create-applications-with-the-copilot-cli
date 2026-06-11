const { compute } = require('../calculator');

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
