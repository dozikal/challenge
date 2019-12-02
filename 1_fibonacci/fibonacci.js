// TODO: implement this function

/* -The fibonacci function runs iteratively.
   -The iterative approach has been chosen because of its Time-Space advantages
    over the recursive method.
   -The recursive method is faster for small values of n but progressively gets 
    slower with larger values of n.
   -Iterative => Time complexity: O(n)  Space complexity: O(1)
   -Recursive => Time Complexity: O(2^n)  Space complexity: O(n)
*/

function fibonacci(n) {
  let prevNumber = 0;
  let prevNumber2 = 0;
  let currentNumber = 1;

  for (let i = 1; i < n; i++) {
    prevNumber2 = prevNumber;
    prevNumber = currentNumber;
    currentNumber = prevNumber + prevNumber2;
  }

  return currentNumber;
}

for (let i = 0; i < 10; i++) {
  console.log(i, fibonacci(i));
}
