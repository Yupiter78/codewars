/*Write a method that takes an array of consecutive
(increasing) letters as input and that returns the missing letter in the array.

You will always get an valid array.
And it will be always exactly one letter be missing.
The length of the array will always be at least 2.
The array will always contain letters in only one case.

Example:

['a','b','c','d','f'] -> 'e'
['O','Q','R','S'] -> 'P'
(Use the English alphabet with 26 letters!)
*/

function findMissingLetter(array) {
    let check = array[0].codePointAt(0);
    for (let i = 0; i < array.length; i++) {
        if (array[i].codePointAt(0) - check <= 1) {
            check = array[i].codePointAt(0);
        }
    }
    return String.fromCodePoint(check + 1);
}


console.log(findMissingLetter(['a','b','c','d','f']), '/ e');
console.log(findMissingLetter(['O','Q','R','S']), '/ P');

function findMissingLetter_2(array) {
    let check = array[0].codePointAt(0);
    return array.reduce((prev, cur, i, arr) => {
        if (arr[i].codePointAt(0) - check <= 1) {
            check = array[i].codePointAt(0);
            return "";
        }
        return String.fromCodePoint(check + 1);
    }, "");
}

console.log(findMissingLetter_2(['a','b','c','d','f']), '/ e');
console.log(findMissingLetter_2(['O','Q','R','S']), '/ P');

function findMissingLetter_3(array) {
    let first = array[0].charCodeAt(0)
    for (let i = 1; i < array.length; i++) {
        if (first + i !== array[i].charCodeAt(0)) {
            return String.fromCharCode(first + i)
        }
    }
    throw new Error("Invalid input")
}

console.log(findMissingLetter_3(['a','b','c','d','f']), '/ e');
console.log(findMissingLetter_3(['O','Q','R','S']), '/ P');

function findMissingLetter_4(array) {
    let check = array[0].codePointAt(0);
    for (let i = 1; i < array.length; i++) {
        if (array[i].codePointAt(0) - check === 1) {
            check++;
        }
    }
    return String.fromCodePoint(check + 1);
}

console.log(findMissingLetter_4(['a','b','c','d','f']), '/ e');
console.log(findMissingLetter_4(['O','Q','R','S']), '/ P');

function findMissingLetter_5(array)
{
    let i=array[0].charCodeAt(0);
    array.map(x=>  x.charCodeAt(0) === i  ? i++ : i);
    return String.fromCharCode(i);
}

console.log(findMissingLetter_5(['a','b','c','d','f']), '/ e');
console.log(findMissingLetter_5(['O','Q','R','S']), '/ P');

function findMissingLetter_6(letters) {
    for (var i = 0; i < letters.length; i++) {
        if (letters[i].charCodeAt(0) + 1 !== letters[i + 1].charCodeAt(0)) {
            return String.fromCharCode(letters[i].charCodeAt(0) + 1);
        }
    }
}

console.log(findMissingLetter_6(['a','b','c','d','f']), '/ e');
console.log(findMissingLetter_6(['O','Q','R','S']), '/ P');

function findMissingLetter_7(array) {
    let i = array[0].charCodeAt(0);
    return String.fromCharCode(array.find(el => el.charCodeAt(0) !== i++).charCodeAt(0) - 1);
}

console.log(findMissingLetter_7(['a','b','c','d','f']), '/ e');
console.log(findMissingLetter_7(['O','Q','R','S']), '/ P');

function findMissingLetter_8(array) {
    let codes = array.map(a => a.charCodeAt(0)),
        last = codes.length - 1,
        sum = codes.reduce((a, b) => a + b),
        expect = (codes[last] + codes[0]) * (codes[last] - codes[0] + 1) / 2;

    return String.fromCharCode(expect - sum);
}

console.log(findMissingLetter_8(['a','b','c','d','f']), '/ e');
console.log(findMissingLetter_8(['O','Q','R','S']), '/ P');

function findMissingLetter_9(array) {
    return String.fromCodePoint(array.map(x => x.codePointAt(0))
        .find((current,index,array) => index && current - array[index - 1] > 1) - 1);

    // If we deconstruct this, we get the following:
    // let charArrayToAscii = arr.map(x => x.codePointAt(0)) // convert array to ascii numbers
    // let nonConsecutiveNumber = charArrayToAscii.find((current,index,array) => index && current-array[index-1] > 1)-1 // find the non-consective number (current number - array[i] > 1)
    // String.fromCodePoint(nonConsecutiveNumber)
}

console.log(findMissingLetter_9(['a','b','c','d','f']), '/ e');
console.log(findMissingLetter_9(['O','Q','R','S']), '/ P');

function findMissingLetter_10(array){
    return String.fromCharCode(array.map(x => x.charCodeAt(0))
        .find((x, i, arr) => x + 1 !== arr[i + 1]) + 1);
}

console.log(findMissingLetter_10(['a','b','c','d','f']), '/ e');
console.log(findMissingLetter_10(['O','Q','R','S']), '/ P');