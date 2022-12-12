/*We need to sum big numbers and we require your help.

Write a function that returns the sum of two numbers.
The input numbers are strings and the function must return a string.

Example
add("123", "321"); -> "444"
add("11", "99");   -> "110"
Notes
The input numbers are big.
The input is a string of only digits
The numbers are positives
*/

function add(a, b) {
    return (BigInt(a) + BigInt(b)).toString(); // Fix me!
}


console.log(add("1", "1"), "/ 2");
console.log(add("123", "456"), "/ 579");
console.log(add("888", "222"), "/ 1110");
console.log(add("1372", "69"), "/ 1441");
console.log(add("12", "456"), "/ 468");
console.log(add("101", "100"), "/ 201");
console.log(add('63829983432984289347293874', '90938498237058927340892374089'),
    "/ 91002328220491911630239667963")

function add_2 (a, b) {
    let res = '', c = 0;
    a = a.split('');
    b = b.split('');
    while (a.length || b.length || c) {
        console.log("a, b: ", a, b);
        console.log("~~a, ~~b: ", ~~a, ~~b);
        console.log(`${a.length} || ${b.length} || ${c}: `, a.length || b.length || c);

        c += ~~a.pop() + ~~b.pop();
        // c += a.pop() ^ 0 + b.pop() ^ 0;
        // c += Math.floor((a.pop() || 0)) + Math.floor((b.pop() || 0));
        console.log("c: ", c);
        res = c % 10 + res;
        c = c > 9;
    }
    return res;
}

console.log(add_2("1", "1"), "/ 2");
console.log(add_2("123", "456"), "/ 579");
console.log(add_2("888", "222"), "/ 1110");
console.log(add_2("1372", "69"), "/ 1441");
console.log(add_2("12", "456"), "/ 468");
console.log(add_2("101", "100"), "/ 201");
console.log(add_2('63829983432984289347293874', '90938498237058927340892374089'),
    "/ 91002328220491911630239667963");


function add_3(a, b) {
    a = a.split("").reverse().join("");
    b = b.split("").reverse().join("");
    let lenA = a.length,
    lenB = b.length,
    bit = 0,
    cur = 0;
    const temp = [];

    for(let i = 0; i < Math.max(lenA, lenB); i++){
        if(i >= lenA){
            cur = Number(b[i]);
        }else if(i >= lenB){
            cur = Number(a[i]);
        }else{
            cur = Number(a[i]) + Number(b[i]);
        }
        temp.push((cur + bit) % 10);
        bit = Math.floor(( cur + bit) / 10);
    }
    console.log("bit: ", bit);
    if (bit === 1){
        temp.push(1);
    }
    let ans = "";
    for(let i = temp.length - 1; i >= 0; i--) {
        ans += temp[i];
    }
    return ans;
}

console.log(add_3("1", "1"), "/ 2");
console.log(add_3("123", "456"), "/ 579");
console.log(add_3("888", "222"), "/ 1110");
console.log(add_3("1372", "69"), "/ 1441");
console.log(add_3("12", "456"), "/ 468");
console.log(add_3("101", "100"), "/ 201");
console.log(add_3('63829983432984289347293874', '90938498237058927340892374089'),
    "/ 91002328220491911630239667963");

function add_4(a, b) {
    const numArr1 = [...a].reverse(), numArr2 = [...b].reverse(),
        largeArr = numArr1.length >= numArr2.length ? numArr1 : numArr2,
        smallerArr = largeArr === numArr1 ? numArr2 : numArr1;
    let carryBit = 0,
        strNum = largeArr.reduce((prev, cur, i, arr) => {
            let sum = Number(arr[i]) + Number(smallerArr[i] || 0) + carryBit,
                result = sum % 10;
            carryBit = (sum / 10) ^ 0;
            return prev + result;
        }, "");
    return (carryBit ? strNum + carryBit : strNum ).split("").reverse().join("");
}

console.log(add_4("1", "1"), "/ 2");
console.log(add_4("123", "456"), "/ 579");
console.log(add_4("888", "222"), "/ 1110");
console.log(add_4("1372", "69"), "/ 1441");
console.log(add_4("12", "456"), "/ 468");
console.log(add_4("101", "100"), "/ 201");
console.log(add_4('63829983432984289347293874', '90938498237058927340892374089'),
    "/ 91002328220491911630239667963");


const add_5 = (a, b) =>
    ((a, b, c) => [...a]
        .reduceRight((pre, val, idx) => {
            console.log("a: ", a);
            console.log("b: ", b);
            console.log("c: ", c);
            return (sum => (c = sum / 10 ^ 0, sum % 10 + pre))(+val + +b[idx] + c)
        }, ``).replace(/^0+/, ``))
    (a.padStart(Math.max(a.length, b.length) + 1, `0`), b.padStart(Math.max(a.length, b.length) + 1, `0`), 0);

console.log(add_5("1", "1"), "/ 2");
console.log(add_5("123", "456"), "/ 579");
console.log(add_5("888", "222"), "/ 1110");
console.log(add_5("1372", "69"), "/ 1441");
console.log(add_5("12", "456"), "/ 468");
console.log(add_5("101", "100"), "/ 201");
console.log(add_5('63829983432984289347293874', '90938498237058927340892374089'),
    "/ 91002328220491911630239667963");

function add_6(a, b) {
    const sum = +a.slice(-1) + +b.slice(-1) + +(arguments[2] || '').slice(0, 1);
    if (a.length <= 1 && b.length <= 1) return sum + (arguments[2] || '').slice(1);
    let acc = '' + ~~(sum / 10) + sum % 10 + (arguments[2] || '').slice(1);
    return add(a.slice(0, -1), b.slice(0, -1), acc)
}

console.log(add_6("1", "1"), "/ 2");
console.log(add_6("123", "456"), "/ 579");
console.log(add_6("888", "222"), "/ 1110");
console.log(add_6("1372", "69"), "/ 1441");
console.log(add_6("12", "456"), "/ 468");
console.log(add_6("101", "100"), "/ 201");
console.log(add_6('63829983432984289347293874', '90938498237058927340892374089'),
    "/ 91002328220491911630239667963");


const add_7 = (a, b) => {
    let s;
    return ((s = ((a = a.split("")).length > (b = b.split("")).length ? a : b)
        .reduceRight(s => ({s: (s.c += ~~a.pop() + ~~b.pop()) % 10 + s.s, c: ~~(s.c / 10)}),
            {s: "", c: 0})).c === 0 ? "" : s.c) + s.s;
}

console.log(add_7("1", "1"), "/ 2");
console.log(add_7("123", "456"), "/ 579");
console.log(add_7("888", "222"), "/ 1110");
console.log(add_7("1372", "69"), "/ 1441");
console.log(add_7("12", "456"), "/ 468");
console.log(add_7("101", "100"), "/ 201");
console.log(add_7('63829983432984289347293874', '90938498237058927340892374089'),
    "/ 91002328220491911630239667963");

