/*Given the triangle of consecutive odd numbers:

             1
          3     5
       7     9    11
   13    15    17    19
21    23    25    27    29
...
Calculate the sum of the numbers in the nth row of this triangle
(starting at index 1) e.g.: (Input --> Output)

1 -->  1
2 --> 3 + 5 = 8*/

function rowSumOddNumbers(n) {
    const startStep = (n) => (n === 1) ? n : 2 * (n - 1) + startStep(--n);
    const endStep = (n) => (n === 1) ? n : 2 * n + endStep(--n);
    let sum = 0, start = startStep(n), end = endStep(n);
    for (let i = start; i <= end; i += 2) {
        sum += i;
    }
    return sum;



}

console.log(rowSumOddNumbers(1), "1");
console.log(rowSumOddNumbers(2), "8");
console.log(rowSumOddNumbers(3), "27");
console.log(rowSumOddNumbers(4), "64");
console.log(rowSumOddNumbers(5), "125");
console.log(rowSumOddNumbers(42), "74088");