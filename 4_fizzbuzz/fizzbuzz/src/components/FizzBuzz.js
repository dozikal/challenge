
//FizzBuzz
// If n is divisible by 3 return Fizz
// If n is divisible by 5 return Buzz
// If n is divisible by both 3 and 5 return FizzBuzz
// If n is blank or anything else return n


export default function FizzBuzz(n) {

    if(isNaN(n) || n === '') return n;

    if (n % 3 === 0 && n % 5 === 0) return "FizzBuzz";
    if (n % 3 === 0) return "Fizz";
    if (n % 5 === 0) return "Buzz";

    return n;
}