/*Description
Given an array X of positive integers, its elements are to be transformed
by running the following operation on them as many times as required:

if X[i] > X[j] then X[i] = X[i] - X[j]

When no more transformations are possible, return its sum ("smallest possible sum").

For instance, the successive transformation of the elements of input X = [6, 9, 21] is detailed below:

X_1 = [6, 9, 12] # -> X_1[2] = X[2] - X[1] = 21 - 9
X_2 = [6, 9, 6]  # -> X_2[2] = X_1[2] - X_1[0] = 12 - 6
X_3 = [6, 3, 6]  # -> X_3[1] = X_2[1] - X_2[0] = 9 - 6
X_4 = [6, 3, 3]  # -> X_4[2] = X_3[2] - X_3[1] = 6 - 3
X_5 = [3, 3, 3]  # -> X_5[1] = X_4[0] - X_4[1] = 6 - 3
The returning output is the sum of the final transformation (here 9).

Example
solution([6, 9, 21]) #-> 9
Solution steps:
[6, 9, 12] #-> X[2] = 21 - 9
[6, 9, 6] #-> X[2] = 12 - 6
[6, 3, 6] #-> X[1] = 9 - 6
[6, 3, 3] #-> X[2] = 6 - 3
[3, 3, 3] #-> X[1] = 6 - 3
Additional notes:
There are performance tests consisted of very big numbers and arrays
of size at least 30000. Please write an efficient algorithm to prevent timeout.
*/


function solution(numbers) {
    let arr = [...numbers], len = numbers.length;
    while ( 1 < arr.length) {
        let min = Math.min(...arr);
        arr = [...new Set(arr.map(num => {
            return num > min && num - (min * Math.floor(num / min)) !== 0 ?
                num - (min * Math.floor(num / min)) : min;
        }))];
    }
    return arr[0] * len;
}

console.log(solution([6,9,21]), "Answer:",9);

    const step = (start, next) => {
        while ( next !== start ) {
            if ( next > start ) {
                if ( next % start === 0 ) return start;
                next %= start;
            }
            else {
                if ( start % next === 0 ) return next;
                start %= next;
            }
        }
        return next;
    }

function solution_2(arr){
    if ( arr.length === 1) return arr[0];
    let start = arr[0], next = null;

    for ( let i = 1; i < arr.length; i++ ) {
        next = arr[i];
        next = step(start, next);
        if ( next === 1 ) return arr.length;
        start = next;
    }
    return next * arr.length;
}

console.log(solution_2([6,9,21]), "Answer:",9);


function solution_3(numbers) {
    const gcd = (a, b) => a ? gcd(b % a, a) : b;
    return numbers.reduce(gcd) * numbers.length;
}

console.log(solution_3([6,9,21]), "Answer:",9);


function solution_4(numbers) {
    return numbers.reduce(function gcd(a, b) {
        return a ? gcd(b % a, a) : b
    }) * numbers.length;
}

console.log(solution_4([6,9,21]), "Answer:",9);


function solution_5(numbers) {
    return numbers.reduce((a, b)=>gcd_2(a, b)) * numbers.length
}

function gcd_2(a, b) {
    let remains;
    while ((a % b) > 0)  {
        remains = a % b;
        a = b;
        b = remains;
    }
    return b;
}

console.log(solution_5([6,9,21]), "Answer:",9);

function solution_6(numbers) {
    let copy = numbers.slice();

    while (!copy.every(i => i === copy[0])) {
        let min = Math.min(...copy);
        copy = [...new Set(copy.map(i => (i > min && (i - min*parseInt((i / min).toString())) !== 0) ?
            i - min * parseInt((i / min).toString()) : min))];
    }
    return copy[0] * numbers.length;
}

console.log(solution_6([6,9,21]), "Answer:",9);

function solution_7(numbers) {
    let arr = numbers.length
    return arr * numbers.reduce((prev, cur) => cur % prev ?
        cur % prev : prev, Math.min(...numbers));
}

console.log(solution_7([6,9,21]), "Answer:",9);