/*In this kata you have to create all permutations of a
non empty input string and remove duplicates,
if present. This means, you have to shuffle all letters
from the input in all possible orders.

Examples:

* With input 'a'
* Your function should return: ['a']
* With input 'ab'
* Your function should return ['ab', 'ba']
* With input 'aabb'
* Your function should return ['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']
The order of the permutations doesn't matter.
*/


function permutations(string) {
    const arrChar = string.split("");
    let len = arrChar.length,
        words = [];
    const combinations = (arr, n) => {
        if (n === 1) {
            words.push(arr.join(""));;
        } else {

            for (let i = 1; i <= n; i += 1) {
                combinations(arr, n - 1);
                let j = n % 2 ? 1 : i;
                [arr[j - 1], arr[n - 1]] = [arr[n - 1], arr[j - 1]];
            }
            // words = [...words, ...[arr.join("")]];
        }
    };
    combinations(arrChar, len);
    return [...new Set(words)];
}

console.log(permutations('a'), ['a']);
console.log(permutations('ab'), ['ab', 'ba']);
console.log(permutations('aabb'), ['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']);
