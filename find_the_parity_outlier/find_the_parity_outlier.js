/*You are given an array (which will have a length of at least 3,
but could be very large) containing integers.
The array is either entirely comprised of odd integers or
entirely comprised of even integers except for a single integer N.
Write a method that takes the array as an argument and returns this "outlier" N.

Examples
[2, 4, 0, 100, 4, 11, 2602, 36]
Should return: 11 (the only odd number)

[160, 3, 1719, 19, 11, 13, -21]
Should return: 160 (the only even number)
*/

function findOutlier(integers){
const evenNum = [], oddNum = [];
for (let num of integers) {
    if (num === 0 || num % 2 === 0) {
        evenNum.push(num);
    } else {
        oddNum.push(num);
    }
}
return evenNum.length === 1 ? evenNum[0] : oddNum[0];
}

console.log(findOutlier([0, 1, 2]), "1");
console.log(findOutlier([1, 2, 3]), "2");
console.log(findOutlier([2,6,8,10,3]), "3");
console.log(findOutlier([0,0,3,0,0]), "3");
console.log(findOutlier([1,1,0,1,1]), "0");


function findOutlier_2(integers){
    const evenNum = [], oddNum = [];
    integers.forEach((num) => (num % 2 === 0) ? evenNum.push(num) : oddNum.push(num))
    return evenNum.length === 1 ? evenNum[0] : oddNum[0];
}

console.log(findOutlier_2([0, 1, 2]), "1");
console.log(findOutlier_2([1, 2, 3]), "2");
console.log(findOutlier_2([2,6,8,10,3]), "3");
console.log(findOutlier_2([0,0,3,0,0]), "3");
console.log(findOutlier_2([1,1,0,1,1]), "0");

function findOutlier_3(integers){
    const isEven = integers.filter(i => i%2).length === 1;
    return integers.find(i => isEven ? i%2 : !(i%2));
}

console.log(findOutlier_3([0, 1, 2]), "1");
console.log(findOutlier_3([1, 2, 3]), "2");
console.log(findOutlier_3([2,6,8,10,3]), "3");
console.log(findOutlier_3([0,0,3,0,0]), "3");
console.log(findOutlier_3([1,1,0,1,1]), "0");