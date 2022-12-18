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


function solution(curStr, lettersArr, resultSet) {
    if (lettersArr.length === 1) {
        // сохраним результат
        resultSet.add(curStr + lettersArr[0]);
    }
    for (let i = 0; i < lettersArr.length; i++) {
        // добавим букву к строке
        let updatedStr = curStr + lettersArr[i];
        // массив оставшихся букв
        let updatedArr = lettersArr.slice(0, i).concat(lettersArr.slice(i + 1, lettersArr.length));
        solution(updatedStr, updatedArr, resultSet);
    }
}

function permutations_2(string) {
    let resultSet = new Set();
    solution('', string, resultSet);
    return [...resultSet];
}

console.log("__________NEXT___________")
console.log(permutations_2('a'), ['a']);
console.log(permutations_2('ab'), ['ab', 'ba']);
console.log(permutations_2('aabb'), ['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']);