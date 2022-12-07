/*Create a function that returns the sum of the two lowest
positive numbers given an array of minimum 4 positive integers.
No floats or non-positive integers will be passed.

For example, when an array is passed like [19, 5, 42, 2, 77], the output should be 7.

[10, 343445353, 3453445, 3453545353453] should return 3453455.*/

function sumTwoSmallestNumbers(numbers) {
  numbers.sort((a, b) => a - b);
  return numbers[0] + numbers[1];
}

console.log(sumTwoSmallestNumbers([5, 8, 12, 19, 22]), "Sum should be 13");
console.log(sumTwoSmallestNumbers([15, 28, 4, 2, 43]), "Sum should be 6");
console.log(sumTwoSmallestNumbers([3, 87, 45, 12, 7]), "Sum should be 10");
console.log(sumTwoSmallestNumbers([23, 71, 33, 82, 1]), "Sum should be 24");
console.log(sumTwoSmallestNumbers([52, 76, 14, 12, 4]), "Sum should be 16");

function sumTwoSmallestNumbers_2(numbers) {
    let [ a, b ] = numbers.sort((a, b) => a - b)
    return a + b
}

console.log(sumTwoSmallestNumbers_2([5, 8, 12, 19, 22]), "Sum should be 13");
console.log(sumTwoSmallestNumbers_2([15, 28, 4, 2, 43]), "Sum should be 6");
console.log(sumTwoSmallestNumbers_2([3, 87, 45, 12, 7]), "Sum should be 10");
console.log(sumTwoSmallestNumbers_2([23, 71, 33, 82, 1]), "Sum should be 24");
console.log(sumTwoSmallestNumbers_2([52, 76, 14, 12, 4]), "Sum should be 16");

const sumTwoSmallestNumbers_3 = numbers => numbers.sort((x, y) => x - y).slice(0, 2).reduce((x, y) => x + y);

console.log(sumTwoSmallestNumbers_3([5, 8, 12, 19, 22]), "Sum should be 13");
console.log(sumTwoSmallestNumbers_3([15, 28, 4, 2, 43]), "Sum should be 6");
console.log(sumTwoSmallestNumbers_3([3, 87, 45, 12, 7]), "Sum should be 10");
console.log(sumTwoSmallestNumbers_3([23, 71, 33, 82, 1]), "Sum should be 24");
console.log(sumTwoSmallestNumbers_3([52, 76, 14, 12, 4]), "Sum should be 16");

function sumTwoSmallestNumbers_4(numbers) {
    const [a, b] = [...numbers].filter(e => e>= 0).sort((a,b) => a - b);
    return a + b;
}

console.log(sumTwoSmallestNumbers_4([5, 8, 12, 19, 22]), "Sum should be 13");
console.log(sumTwoSmallestNumbers_4([15, 28, 4, 2, 43]), "Sum should be 6");
console.log(sumTwoSmallestNumbers_4([3, 87, 45, 12, 7]), "Sum should be 10");
console.log(sumTwoSmallestNumbers_4([23, 71, 33, 82, 1]), "Sum should be 24");
console.log(sumTwoSmallestNumbers_4([52, 76, 14, 12, 4]), "Sum should be 16");

const sumTwoSmallestNumbers_5 = a => (a = a.sort((x, y) => x - y))[0] + a[1];

console.log(sumTwoSmallestNumbers_5([5, 8, 12, 19, 22]), "Sum should be 13");
console.log(sumTwoSmallestNumbers_5([15, 28, 4, 2, 43]), "Sum should be 6");
console.log(sumTwoSmallestNumbers_5([3, 87, 45, 12, 7]), "Sum should be 10");
console.log(sumTwoSmallestNumbers_5([23, 71, 33, 82, 1]), "Sum should be 24");
console.log(sumTwoSmallestNumbers_5([52, 76, 14, 12, 4]), "Sum should be 16");