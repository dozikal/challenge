import FizzBuzz from './FizzBuzz';

const testVariables = [
    ['', ''],               //Empty
    [0, 'FizzBuzz'],        // Zero
    [1, 1],                 // One
    [3, 'Fizz'],            // Divisible by 3
    [5, 'Buzz'],            // Divisible by 5
    [15, 'FizzBuzz'],       // Divisible by 3 & 5
    [15.2, 15.2],         // Non integer
    ['Adam', 'Adam']        // Non number
];

test.each(testVariables)('Tests the FizzBuzz function against several values of n', (a, expected) => {
    expect(FizzBuzz(a)).toBe(expected);
});
