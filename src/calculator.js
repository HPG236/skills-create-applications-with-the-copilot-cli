#!/usr/bin/env node
// Node.js CLI Calculator
// Supported operations: add, sub, mul, div
// - add: addition (sums all provided numbers)
// - sub: subtraction (subtracts subsequent numbers from the first)
// - mul: multiplication (multiplies all provided numbers)
// - div: division (divides the first number by each subsequent number sequentially; division by zero is an error)

const readline = require('readline');

function isNumber(value) {
  return !isNaN(value) && value !== '' && value !== null;
}

function toNumbers(strings) {
  return strings.map(s => Number(s));
}

function compute(op, nums) {
  if (nums.length === 0) {
    throw new Error('No numeric operands provided');
  }

  switch (op) {
    case 'add':
    case '+':
      // Addition: sum all numbers
      return nums.reduce((a, b) => a + b, 0);

    case 'sub':
    case '-':
      // Subtraction: subtract subsequent numbers from the first
      return nums.slice(1).reduce((acc, n) => acc - n, nums[0]);

    case 'mul':
    case '*':
      // Multiplication: multiply all numbers
      return nums.reduce((a, b) => a * b, 1);

    case 'div':
    case '/':
      // Division: sequential division; check division by zero
      return nums.slice(1).reduce((acc, n) => {
        if (n === 0) throw new Error('Division by zero');
        return acc / n;
      }, nums[0]);

    default:
      throw new Error(`Unsupported operation: ${op}`);
  }
}

function printUsage() {
  console.error('Usage: node src/calculator.js <op> <num1> <num2> [<num3> ...]');
  console.error('Supported ops: add | sub | mul | div (or + | - | * | /)');
  console.error('Interactive mode: run without arguments');
}

async function interactiveMode() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  const question = (q) => new Promise(resolve => rl.question(q, resolve));

  try {
    const op = (await question('Operation (add, sub, mul, div): ')).trim();
    const numsLine = (await question('Numbers (space-separated, e.g. "2 3"): ')).trim();
    rl.close();

    if (!op) throw new Error('No operation provided');
    if (!numsLine) throw new Error('No numbers provided');

    const parts = numsLine.split(/\s+/).filter(Boolean);
    if (parts.length === 0) throw new Error('No numeric operands found');
    if (!parts.every(isNumber)) throw new Error('One or more operands are not valid numbers');

    const nums = toNumbers(parts);
    const result = compute(op, nums);
    console.log(result);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    rl.close();
    process.exit(1);
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    // No args: go interactive
    return interactiveMode();
  }

  if (args.length < 3) {
    printUsage();
    process.exit(2);
  }

  const op = args[0];
  const operandStrings = args.slice(1);

  if (!operandStrings.every(isNumber)) {
    console.error('Error: all operands must be numeric');
    process.exit(1);
  }

  const nums = toNumbers(operandStrings);

  try {
    const result = compute(op, nums);
    console.log(result);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
