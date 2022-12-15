/*1, 246, 2, 123, 3, 82, 6, 41 are the divisors of number 246.
Squaring these divisors we get: 1, 60516, 4, 15129, 9, 6724, 36, 1681.
The sum of these squares is 84100 which is 290 * 290.

Task
Find all integers between m and n (m and n integers with 1 <= m <= n)
such that the sum of their squared divisors is itself a square.

We will return an array of subarrays or of tuples (in C an array of Pair)
or a string. The subarrays (or tuples or Pairs) will have two elements:
first the number the squared divisors of which is a square and then the sum
of the squared divisors.

Example:
list_squared(1, 250) --> [[1, 1], [42, 2500], [246, 84100]]
list_squared(42, 250) --> [[42, 2500], [246, 84100]]
The form of the examples may change according to the language, see "Sample Tests".

Note
In Fortran - as in any other language - the returned string is not
permitted to contain any redundant trailing whitespace:
you can use dynamically allocated character strings.
*/

function divisorsOf(x) {
    const divs = [];

    for (let j = 1; j <= x; j++) {
        if (x % j === 0) {
            divs.push(j);
        }
    }

    return divs;
}

function isSquare(x) {
    return Math.sqrt(x) % 1 === 0;
}

function listSquared(m, n) {
    const res = [];

    for (let i = m; i <= n; i++) {
        const divs = divisorsOf(i);

        const sumOfSquaredDivs = divs.reduce(
            (accumulator, current) => (accumulator += current * current),
            0
        );

        if (isSquare(sumOfSquaredDivs)) {
            res.push([i, sumOfSquaredDivs]);
        }
    }

    return res;
}

// console.log(listSquared(1, 250), "/", [[1, 1], [42, 2500], [246, 84100]])
// console.log(listSquared(42, 250), "/", [[42, 2500], [246, 84100]])
// console.log(listSquared(250, 500), "/", [[287, 84100]])


/*пройдите по всем числам от m до n;
найдите все делители текущего числа (i);
возведите в квадрат все делители и сложите их;
проверьте, является ли полученное sum число квадратным,
и если это так, сохраните number (i) и the sum в массив;
*/

function listSquared_2(m, n) {
    const result = [];
    for (let i = m; i <= n; i++) {
        const divisors = [];
        for (let j = 1; j <= n; j++) {
           if (i % j === 0) {
               divisors.push(j);
           }
        }
        const sum = divisors.reduce((prev, cur) => prev + (cur ** 2), 0);
        let square = sum ** 0.5;
        if (square === ~~square) {
            result.push([i, sum]);
        }
    }
    return result;
}


// console.log(listSquared_2(1, 250), "/", [[1, 1], [42, 2500], [246, 84100]])
console.log(listSquared_2(42, 250), "/", [[42, 2500], [246, 84100]])
// console.log(listSquared_2(250, 500), "/", [[287, 84100]])