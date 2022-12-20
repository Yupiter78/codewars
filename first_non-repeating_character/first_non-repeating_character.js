/*Write a function named first_non_repeating_letter that takes a string input,
and returns the first character that is not repeated anywhere in the string.

For example, if given the input 'stress', the function should return 't',
since the letter t only occurs once in the string, and occurs first in the string.

As an added challenge, upper- and lowercase letters are considered the same character,
but the function should return the correct case for the initial letter. For example,
the input 'sTreSS' should return 'T'.

If a string contains all repeating characters,
it should return an empty string ("") or None -- see sample tests.
*/

function firstNonRepeatingLetter(s) {
    if (s.length === 0) return "";
    const charArr = [];
    [...s].forEach((char, i, arr) =>
        !charArr.includes(char.toLowerCase() || char.toUpperCase()) && charArr.push(char));
    const sumObj = [...s.toLowerCase()].sort().reduce((prev, cur) => {
         prev[cur] = prev[cur] ? ++prev[cur] : 1;
         return prev;
    }, {});

    const result = charArr.map(item => [item, sumObj[item.toLowerCase()]]).find(c => c[1] === 1);
    return result ? result[0] : "";
}

console.log(firstNonRepeatingLetter('a'), '/ a');
console.log(firstNonRepeatingLetter('stress'), '/ t');
console.log(firstNonRepeatingLetter('moonmen'), '/ e');
console.log(firstNonRepeatingLetter(''), '/ ""');
console.log(firstNonRepeatingLetter('moonmene'), '/ ""');
console.log(firstNonRepeatingLetter('sTreSS'), '/ "T"');
console.log(firstNonRepeatingLetter('s,TreSS'), '/ "T"');

/*
function firstNonRepeatingLetter(s) {
    if (s.length === 0) return "";
    const charObj = {};
    const exceptions = [".", ",", "-", "!", "?"];
    for (let char of s) {
        if (exceptions.includes(char)) continue;
        charObj[char] = charObj[char.toLowerCase() || char.toUpperCase()] ?
            ++charObj[char.toLowerCase() || char.toUpperCase()] : 1;
    }
    const result = Object.entries(charObj).find(uniq => uniq[1] === 1);
    return result ? result[0] : "";
}
*/

// console.log(firstNonRepeatingLetter('a'), '/ a');
// console.log(firstNonRepeatingLetter('stress'), '/ t');
// console.log(firstNonRepeatingLetter('moonmen'), '/ e');
// console.log(firstNonRepeatingLetter(''), '/ ""');
// console.log(firstNonRepeatingLetter('moonmene'), '/ ""');
// console.log(firstNonRepeatingLetter('sTreSS'), '/ "T"');
// console.log(firstNonRepeatingLetter('s,TreSS'), '/ "T"');

/*function firstNonRepeatingCharacter(str) {
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (str.indexOf(char) == i && str.indexOf(char, i + 1) == -1) {
      return char;
    }
  }
  return "_";
}*/

function firstNonRepeatingLetter_2(s) {
    let str = s.toLowerCase();
    for(let i = 0; i < str.length; i++) {
        if(str.indexOf(str[i]) === str.lastIndexOf(str[i])) {
            return s[i];
        }
    }
    return "";
}

console.log(firstNonRepeatingLetter_2('a'), '/ a');
console.log(firstNonRepeatingLetter_2('stress'), '/ t');
console.log(firstNonRepeatingLetter_2('moonmen'), '/ e');
console.log(firstNonRepeatingLetter_2(''), '/ ""');
console.log(firstNonRepeatingLetter_2('moonmene'), '/ ""');
console.log(firstNonRepeatingLetter_2('sTreSS'), '/ "T"');
console.log(firstNonRepeatingLetter_2('s,TreSS'), '/ "T"');

function firstNonRepeatingLetter_3(s) {
    for(let i in s) {
        if(s.match(new RegExp(s[i],"gi")).length === 1) {
            return s[i];
        }
    }
    return '';
}

console.log(firstNonRepeatingLetter_3('a'), '/ a');
console.log(firstNonRepeatingLetter_3('stress'), '/ t');
console.log(firstNonRepeatingLetter_3('moonmen'), '/ e');
console.log(firstNonRepeatingLetter_3(''), '/ ""');
console.log(firstNonRepeatingLetter_3('moonmene'), '/ ""');
console.log(firstNonRepeatingLetter_3('sTreSS'), '/ "T"');
console.log(firstNonRepeatingLetter_3('s,TreSS'), '/ "T"');

function firstNonRepeatingLetter_4(s) {
    return s[s.toLowerCase().split('')
        .findIndex(letter => s.toLowerCase().split('')
            .filter(l => l === letter).length === 1 )] || '';
}

console.log(firstNonRepeatingLetter_4('a'), '/ a');
console.log(firstNonRepeatingLetter_4('stress'), '/ t');
console.log(firstNonRepeatingLetter_4('moonmen'), '/ e');
console.log(firstNonRepeatingLetter_4(''), '/ ""');
console.log(firstNonRepeatingLetter_4('moonmene'), '/ ""');
console.log(firstNonRepeatingLetter_4('sTreSS'), '/ "T"');
console.log(firstNonRepeatingLetter_4('s,TreSS'), '/ "T"');