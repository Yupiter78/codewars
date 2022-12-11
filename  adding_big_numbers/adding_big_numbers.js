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
        c += ~~a.pop() + ~~b.pop();
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