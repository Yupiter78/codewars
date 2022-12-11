/*There is an array with some numbers. All numbers are equal except for one. Try to find it!

findUniq([ 1, 1, 1, 2, 1, 1 ]) === 2
findUniq([ 0, 0, 0.55, 0, 0 ]) === 0.55
It’s guaranteed that array contains at least 3 numbers.

The tests contain some very huge arrays, so think about performance.
*/

function findUniq(arr) {
const [num1, num2] = [...new Set(arr)];
return arr.slice(0, 3).filter(item => item === num1).length === 1 ? num1 : num2;
}


console.log(findUniq([ 1, 0, 0 ]), "/ 1");
console.log(findUniq([ 0, 1, 0 ]), "/ 1");
console.log(findUniq([ 0, 0, 1 ]), "/ 1");
console.log(findUniq([ 1, 1, 1, 2, 1, 1 ]), "/ 2");
console.log(findUniq([ 1, 1, 2, 1, 1 ]), "/ 2");
console.log(findUniq([ 3, 10, 3, 3, 3 ]), "/ 10");


function findUniq_2(arr) {
    arr.sort((a,b) => a-b);
    return arr[0] === arr[1] ? arr.pop() : arr[0];
}

console.log(findUniq_2([ 1, 0, 0 ]), "/ 1");
console.log(findUniq_2([ 0, 1, 0 ]), "/ 1");
console.log(findUniq_2([ 0, 0, 1 ]), "/ 1");
console.log(findUniq_2([ 1, 1, 1, 2, 1, 1 ]), "/ 2");
console.log(findUniq_2([ 1, 1, 2, 1, 1 ]), "/ 2");
console.log(findUniq_2([ 3, 10, 3, 3, 3 ]), "/ 10");

function findUniq_3(arr) {
    return arr.find(n => arr.indexOf(n) === arr.lastIndexOf(n));
}

console.log(findUniq_3([ 1, 0, 0 ]), "/ 1");
console.log(findUniq_3([ 0, 1, 0 ]), "/ 1");
console.log(findUniq_3([ 0, 0, 1 ]), "/ 1");
console.log(findUniq_3([ 1, 1, 1, 2, 1, 1 ]), "/ 2");
console.log(findUniq_3([ 1, 1, 2, 1, 1 ]), "/ 2");
console.log(findUniq_3([ 3, 10, 3, 3, 3 ]), "/ 10");

function findUniq_4(arr) {
    let [a, b, c] = arr.slice(0,3);
    if( a !== b && a !== c ) return a;
    for( let x of arr ) if( x !== a ) return x
}

console.log(findUniq_4([ 1, 0, 0 ]), "/ 1");
console.log(findUniq_4([ 0, 1, 0 ]), "/ 1");
console.log(findUniq_4([ 0, 0, 1 ]), "/ 1");
console.log(findUniq_4([ 1, 1, 1, 2, 1, 1 ]), "/ 2");
console.log(findUniq_4([ 1, 1, 2, 1, 1 ]), "/ 2");
console.log(findUniq_4([ 3, 10, 3, 3, 3 ]), "/ 10");

function findUniq_5(arr) {
    return arr.filter(function(elem){
        return arr.indexOf(elem)===arr.lastIndexOf(elem)
    })[0]
}

console.log(findUniq_5([ 1, 0, 0 ]), "/ 1");
console.log(findUniq_5([ 0, 1, 0 ]), "/ 1");
console.log(findUniq_5([ 0, 0, 1 ]), "/ 1");
console.log(findUniq_5([ 1, 1, 1, 2, 1, 1 ]), "/ 2");
console.log(findUniq_5([ 1, 1, 2, 1, 1 ]), "/ 2");
console.log(findUniq_5([ 3, 10, 3, 3, 3 ]), "/ 10");

function findUniq_6(arr) {
    let uniq = {},
        result;
    arr.forEach(function(item) {
        uniq[item] = uniq[item] + 1 || 1;
    });
    Object.keys(uniq).forEach(function(key) {
        if (uniq[key] === 1) {
            result = key;
        }
    });
    return parseFloat(result);
}

console.log(findUniq_6([ 1, 0, 0 ]), "/ 1");
console.log(findUniq_6([ 0, 1, 0 ]), "/ 1");
console.log(findUniq_6([ 0, 0, 1 ]), "/ 1");
console.log(findUniq_6([ 1, 1, 1, 2, 1, 1 ]), "/ 2");
console.log(findUniq_6([ 1, 1, 2, 1, 1 ]), "/ 2");
console.log(findUniq_6([ 3, 10, 3, 3, 3 ]), "/ 10");