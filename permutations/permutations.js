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


function permutations_4(string) {
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

console.log(permutations_4('a'), ['a']);
console.log(permutations_4('ab'), ['ab', 'ba']);
console.log(permutations_4('aabb'), ['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']);


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

let permutations_3 = (s) => {

    if (s.length <= 1) {
        console.log(`RETURN ${s}`);
        return [s];
    }

    let step = (c, index) => {
        console.log("c in step:", c, "INDEX:", index);
        let symbol = permutations_3(s.replace(c, ''));
        console.log("symbol:", symbol);
        return symbol.map((_, i) => {
            console.log(`_iteration_SYMBOL_${i}_:`, _);
           return _ + c
        })
    };
    console.log(`new Set(__${s}__)`, [...new Set(s)]);
    return [].concat(...[...new Set(s)].map(step));
};

console.log("__________NEXT___________")
// console.log(permutations_3('a'), ['a']);
// console.log(permutations_3('ab'), ['ab', 'ba']);
// console.log(permutations_3('aabb'), ['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']);


function permutations(str) {
    if (str.length <= 1) return [str];
    const step = char => permutations(str.replace(char, "")).map(item => item + char);
    return Array.prototype.concat(...[...new Set(str)].map(step));
}

console.log("__________NEXT___________")
console.log(permutations('a'), ['a']);
console.log(permutations('ab'), ['ab', 'ba']);
console.log(permutations('aabb'), ['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']);

const permutations_5 = string =>
    string.length < 2 ? [string] : [...string].reduce((pre, val, idx) =>
        string.indexOf(val) === idx ? [...pre, ...permutations(string.slice(0, idx) +
            string.slice(idx + 1)).map(v => val + v)] : pre, []);

console.log("__________NEXT___________")
console.log(permutations_5('a'), ['a']);
console.log(permutations_5('ab'), ['ab', 'ba']);
console.log(permutations_5('aabb'), ['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']);

function permutations_6(string) {
    if (string.length <= 1) {
        return [string];
    }
    let perms = [];
    for (let i = 0; i < string.length; i++) {
        perms = perms.concat(permutations_6(string.substring(0, i) + string.substring(i + 1)).map(function(e) {
            return string[i] + e;
        }).filter(function(e) {
            return perms.indexOf(e) === -1;
        }));
    }
    return perms;
}

console.log("__________NEXT___________")
console.log(permutations_6('a'), ['a']);
console.log(permutations_6('ab'), ['ab', 'ba']);
console.log(permutations_6('aabb'), ['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']);

function permutations_7(string) {
    if (string.length < 2) return [string];
    let output = [];
    for (let i=0; i<string.length; i++) {
        let char = string[i];
        if (string.indexOf(char) !== i)
            continue;

        let remainingString = string.slice(0,i) + string.slice(i+1,string.length);

        for (const subPermutation of permutations_7(remainingString))
            output.push(char + subPermutation)
    }
    return output;
}

console.log("__________NEXT___________")
console.log(permutations_7('a'), ['a']);
console.log(permutations_7('ab'), ['ab', 'ba']);
console.log(permutations_7('aabb'), ['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']);

function permutations_8(chs) {
    return [...new Set(
        Array.from( heapsPerms((chs+'').split('')),
            str => str.join('') )
    )];
}


function *heapsPerms(chs, n = chs.length) {
    if (n <= 1) yield chs.slice();
    else for (let i = 0; i < n; i++) {
        yield *heapsPerms(chs, n-1);
        swap(chs, (n % 2 !== 0) ? 0 : i, n-1);
    }
}


function swap(iterable, i, j) {
    [iterable[i], iterable[j]] = [iterable[j], iterable[i]];
}


console.log("__________NEXT___________")
console.log(permutations_8('a'), ['a']);
console.log(permutations_8('ab'), ['ab', 'ba']);
console.log(permutations_8('aabb'), ['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']);


const permutations_9 = (str) =>
    str.length === 1 ?
        [str] : Array.from(new Set(
            [...str].map((char, i) =>
                permutations_9(str.slice(0, i) + str.slice(i + 1))
                    .map(p => char + p)
            ).reduce((a, b) => a.concat(b), [])
        ));

console.log("__________NEXT___________")
console.log(permutations_9('a'), ['a']);
console.log(permutations_9('ab'), ['ab', 'ba']);
console.log(permutations_9('aabb'), ['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']);

const permutations_10 = (str, perms = []) => {
    if (str.length === 1) return [str];
    for (let i = 0; i < str.length; i++)
        str.indexOf(str[i]) === i && (perms = perms.concat(
            permutations_10(str.slice(0, i) + str.slice(i + 1))
                .map(rest => str[i] + rest)
        ));
    return perms;
};

console.log("__________NEXT___________")
console.log(permutations_10('a'), ['a']);
console.log(permutations_10('ab'), ['ab', 'ba']);
console.log(permutations_10('aabb'), ['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']);


function permutations_11(s)  {
    let res = new Set();

    const perm = (s, z='') => {
        if ( s.length === 0) res.add(z);
        for (let i=0; i< s.length; i++)
            perm (s.slice(0,i) + s.slice(i+1,s.length), z+s[i]);
    }

    perm(s);
    return [...res];
}

console.log("__________NEXT___________")
console.log(permutations_11('a'), ['a']);
console.log(permutations_11('ab'), ['ab', 'ba']);
console.log(permutations_11('aabb'), ['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']);


const permutations_12 = str => {
    return Array.from(new Set(str.length === 0 ? [''] : permutations_12(str.slice(1)).reduce((res, curr) => {
        for (let i = 0; i < str.length; i++) {
            res.push(curr.slice(0, i) + str[0] + curr.slice(i));
        }
        return res;
    }, [])));
};

console.log("__________NEXT___________")
console.log(permutations_12('a'), ['a']);
console.log(permutations_12('ab'), ['ab', 'ba']);
console.log(permutations_12('aabb'), ['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']);