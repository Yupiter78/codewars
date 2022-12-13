/*The drawing shows 6 squares the sides of which have a length
 of 1, 1, 2, 3, 5, 8. It's easy to see that the sum of the perimeters
 of these squares is : 4 * (1 + 1 + 2 + 3 + 5 + 8) = 4 * 20 = 80

Could you give the sum of the perimeters of all the squares in a rectangle
 when there are n + 1 squares disposed in the same manner as in the drawing:

alternative text

Hint:
See Fibonacci sequence

Ref:
http://oeis.org/A000045

The function perimeter has for parameter n where n + 1
is the number of squares (they are numbered from 0 to n)
and returns the total perimeter of all the squares.

perimeter(5)  should return 80
perimeter(7)  should return 216
*/

function perimeter(n) {
    let fib = (n) => n <= 1 ? n : fib(n - 1) + fib(n - 2);
    const cache = new Map();
    function wrap(func) {

        return function (x) {
            if (cache.has(x)) return cache.get(x);
            let result = func(x);
            cache.set(x, result);
            return result;
        }
    }
    fib = wrap(fib);
    fib(n + 1);
    return Array.from(cache.values()).reduce((prev, cur) => prev + cur, 0) * 4;
}

console.log(perimeter(0), "/ 4");
console.log(perimeter(5), "/ 80");
console.log(perimeter(7), "/ 216");
console.log(perimeter(20), "/ 114624");
console.log(perimeter(30), "/ 14098308");

function fib(n) {
    var a = 1, b = 1, tmp;
    while (n-- > 0) {
        tmp = a;
        a = b;
        b += tmp;
    }
    return a;
}

function perimeter_2(n) {
    return 4 * (fib(n + 2) -1)
}

console.log(perimeter_2(0), "/ 4");
console.log(perimeter_2(5), "/ 80");
console.log(perimeter_2(7), "/ 216");
console.log(perimeter_2(20), "/ 114624");
console.log(perimeter_2(30), "/ 14098308");


const perimeter_3 = n =>
    4 * Math.round((((1 + 5 ** .5) / 2) ** (n + 3) / 5 ** .5) - 1);

console.log(perimeter_3(0), "/ 4");
console.log(perimeter_3(5), "/ 80");
console.log(perimeter_3(7), "/ 216");
console.log(perimeter_3(20), "/ 114624");
console.log(perimeter_3(30), "/ 14098308");

const fib_2 = n =>
    Math.round((((1 + 5 ** .5) / 2) ** (n) / 5 ** .5));
console.log(fib_2(0), "/ 13");
console.log(fib_2(1), "/ 13");
console.log(fib_2(2), "/ 13");
console.log(fib_2(3), "/ 13");
console.log(fib_2(4), "/ 13");
console.log(fib_2(5), "/ 13");
console.log(fib_2(6), "/ 13");
console.log(fib_2(7), "/ 13");

const SQRT5 = Math.sqrt(5);
const PHI = (SQRT5 + 1) / 2;
const fib_3 = n => Math.round(PHI**n / SQRT5);
const perimeter_4 = n => 4 * fib_3(n + 3) - 4;

console.log(perimeter_4(0), "/ 4");
console.log(perimeter_4(5), "/ 80");
console.log(perimeter_4(7), "/ 216");
console.log(perimeter_4(20), "/ 114624");
console.log(perimeter_4(30), "/ 14098308");

const perimeter_5 = N => {
    let [a, b] = [1, 1];
    for (let i = 0; i <= N; i++) [a, b] = [b, a + b];
    return (b - 1) * 4;
}

console.log(perimeter_5(0), "/ 4");
console.log(perimeter_5(5), "/ 80");
console.log(perimeter_5(7), "/ 216");
console.log(perimeter_5(20), "/ 114624");
console.log(perimeter_5(30), "/ 14098308");

const fib_4 = (_ => {
    let r = Math.sqrt(5), h = 0.5, s = r / 2;
    return n => Math.round((h + s) ** ++n / r - (h - s) ** n / r);
})();

const perimeter_6 = n => 4 * (fib(n + 2) - 1);

console.log(perimeter_6(0), "/ 4");
console.log(perimeter_6(5), "/ 80");
console.log(perimeter_6(7), "/ 216");
console.log(perimeter_6(20), "/ 114624");
console.log(perimeter_6(30), "/ 14098308");

function perimeter_7(n) {
    return 4 * fibonacci(n).reduce( (a,b) => a + b, 0);
}

function fibonacci(length) {
    let result = [];
    let i = -1;
    while (result.length < length + 1 ) {
        let n = result.length <= 1 ? 1 : result[i] + result[i - 1];
        result.push(n);
        i++
    }
    return result;
}

console.log(perimeter_7(0), "/ 4");
console.log(perimeter_7(5), "/ 80");
console.log(perimeter_7(7), "/ 216");
console.log(perimeter_7(20), "/ 114624");
console.log(perimeter_7(30), "/ 14098308");