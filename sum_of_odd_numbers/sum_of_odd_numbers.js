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
//сумма последовательности натуральных чисел до числа n равна n * (n + 1) / 2
// 1 + (2 * 1) + (2 * 2) + (2 * 3) = 1 + 2 * (1 + 2 + 3) = 1 + 2 * (n * (n + 1) / 2) = 1 + 2 * (n ** 2 + n) / 2 = 1 + n ** 2 + n
//  if (n === a - 1)
// 1 + (a - 1) ** 2 + (a - 1) = 1 + a ** 2 - 2 * (a * 1) + 1 ** 2 + a - 1 = 1 + a ** 2 - 2 * a + 1  + a - 1  =
// a ** 2 - a + 1;


function rowSumOddNumbers(n) {
    const startStep = (n) => (n === 1) ? n : 2 * (n - 1) + startStep(--n);
    const endStep = (n) => (n === 1) ? n : 2 * n + endStep(--n);
    let sum = 0, start = startStep(n), end = endStep(n);
    console.log("end: ", end);
    console.log("start: ", start);
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

function rowSumOddNumbers_2(n) {
    return n ** 3 + 2 * n ** 2 + 2 * n;
}

console.log(rowSumOddNumbers_2(1), "1");
console.log(rowSumOddNumbers_2(2), "8");
console.log(rowSumOddNumbers_2(3), "27");
console.log(rowSumOddNumbers_2(4), "64");
console.log(rowSumOddNumbers_2(5), "125");
console.log(rowSumOddNumbers_2(42), "74088");

function HogbenNumber(a)
{
    return (Math.pow(a, 2) - a + 1);
}
function HogbenNumber_2(n)
{
    return n ** 2 - n + 1;
}

console.log(HogbenNumber(42), "1723");
console.log(HogbenNumber_2(42), "1723");


function rowSumOddNumbers_3(n)
{
    /* The rows' start numbers are Hogben's centered polygonal numbers:
       1, 3, 7, 13, 21, 31, 43 = b[n] = n^2 - n + 1.
       <https://oeis.org/A002061>

       The sum of one row is given by:
       s[n] = n^2 + n(b[n] - 1).
       <https://www.quora.com/What-is-the-sum-of-n-consecutive-odd-integers/answer/Xavier-Dectot>

       Inline b[n]:
       s[n] = n^2 + n(n^2 - n + 1 - 1)
            = n^2 + n(n^2 - n)
            = n^2 + n^3 - n^2
            = n^3
       ... oh. */
    return n * n * n;
}

// нечетные числа с порядковым номером c = 2a − 1
// 2a = c + 1
// n(n+2a) = n(n + c + 1) = n2 + cn + n
// c = 1 + n ** 2 + n
// n2 + cn + n = n ** 2 + (n ** 2 + n + 1) * n  + n = n ** 2 + n ** 3 + n ** 2 + n + n = n ** 3 + 2 * n ** 2 + 2 * n
//b=2a+1
//n(n+2a)
// n2+(b−1)n
// n2 + ( n2 - n + 1) * n = n2 + n3 - n2 + n =

/*So, ∀(a,n)∈N×N∗

∑k=an+a−12k+1=2∑k=an+a−1k+∑k=an+a−11=
2(∑k=an+a−1(k−a+a))+n+a−1−a+1=
2∑k=an+a−1(k−a)+2∑k=an+a−1a+n=
2∑k=0n−1k+2a∑k=an+a−11+n=
2(n−1)n2+2na+n=n(n−1)+n(2a+1)=n(n−1+2a+1)=n(n+2a)

So for a given odd number b=2a+1, the sum of the n consecutive
odd integers starting with b will be n(n+2a)=n2+(b−1)n

And for a given even number c=2a, the sum of the n consecutive
odd integers immediately greater than c will be n(n+2a)=n2+cn
*/