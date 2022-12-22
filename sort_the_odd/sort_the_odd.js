/*You will be given an array of numbers.
You have to sort the odd numbers in ascending order while
leaving the even numbers at their original positions.

Examples
[7, 1]  =>  [1, 7]
[5, 8, 6, 3, 4]  =>  [3, 8, 6, 5, 4]
[9, 8, 7, 6, 5, 4, 3, 2, 1, 0]  =>  [1, 8, 3, 6, 5, 4, 7, 2, 9, 0]
*/

function sortArray (arr) {
    const sortArr = [];
    for (let i = 0; i < arr.length; i ++) {
        if (arr[i] % 2 === 0) continue;
        sortArr.push(arr[i]);
    }
    sortArr.sort((a, b) => b - a);
    for (let i = 0; i < arr.length; i ++) {
        if (arr[i] % 2 === 0) continue;
        arr[i] = sortArr.pop();
    }
    return arr;
}

console.log("[5, 8, 6, 3, 4]  =>  [3, 8, 6, 5, 4]", sortArray([5, 8, 6, 3, 4]));
console.log("[9, 8, 7, 6, 5, 4, 3, 2, 1, 0]  =>  [1, 8, 3, 6, 5, 4, 7, 2, 9, 0]", sortArray([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]));

