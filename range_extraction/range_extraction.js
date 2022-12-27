/*A format for expressing an ordered list of integers
is to use a comma separated list of either

individual integers
or a range of integers denoted by the starting integer separated
from the end integer in the range by a dash, '-'. The range includes
all integers in the interval including both endpoints. It is not
considered a range unless it spans at least 3 numbers. For example "12,13,15-17"
Complete the solution so that it takes a list of integers in increasing
order and returns a correctly formatted string in the range format.

Example:

solution([-10, -9, -8, -6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]);
// returns "-10--8,-6,-3-1,3-5,7-11,14,15,17-20"
Courtesy of rosettacode.org
*/

function solution(list){
    const result = [];
    const temp = [];
    for (let i = 0; i < list.length; i++) {
        if (list[i] + 1 === list[i + 1]) {
            temp.push(list[i]);
            continue;
        }
        if (temp.at(- 1) === list[i] - 1) {
            temp.push(list[i]);
            result.push(temp.length > 2 ? `${temp[0]}-${temp.at(- 1)}` : temp.slice(0));
            temp.length = 0;
            continue;
        }
        result.push(list[i]);
    }
    return result.join(",");
}

console.log(solution([-6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]),
    "/ -6,-3-1,3-5,7-11,14,15,17-20");

console.log(solution([-10, -9, -8, -6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]),
    "/ -10--8,-6,-3-1,3-5,7-11,14,15,17-20");


function solution_2(list){
    return list
        .reduce((acc, n, i, arr) => {
            if(n !== arr[i - 1] + 1) {
                acc.push([n]);
            } else {
                acc[acc.length - 1].push(n);
            }
            return acc;
        }, [])
        .map(arr => arr.length > 2 ? `${arr[0]}-${arr[arr.length-1]}` : arr)
        .join(',');
}

console.log(solution_2([-6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]),
    "/ -6,-3-1,3-5,7-11,14,15,17-20");

console.log(solution_2([-10, -9, -8, -6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]),
    "/ -10--8,-6,-3-1,3-5,7-11,14,15,17-20");


const solution_3 = list =>
    list.map((val, idx) => list[idx - 1] === val - 1 && list[++idx] === val + 1 ? `~` : val)
        .join(`,`).replace(/,?(~,)+/g, `-`);

console.log(solution_3([-6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]),
    "/ -6,-3-1,3-5,7-11,14,15,17-20");

console.log(solution_3([-10, -9, -8, -6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]),
    "/ -10--8,-6,-3-1,3-5,7-11,14,15,17-20");