class Normal {
    constructor(char) {
        this.char = char;
    }
}

class Any {}

class ZeroOrMore {
    constructor(regexp) {
        this.regexp = regexp;
    }
}

class Or {
    constructor(left, right) {
        this.left = left;
        this.right = right;
    }
}

class Str {
    constructor(regexpList) {
        this.regexpList = regexpList;
    }
}


function parseRegExp(str) {
    if (!str) return null;
    if (!validationOr(str)) return null;

    const regexpList = [];

    while (str.length > 0) {

        if (str[0] === '(') {
            let endIndex = findMatchingClosingParenIndex(str);
            if (!endIndex) return null;
            let innerStr = str.slice(1, endIndex);
            regexpList.push(parseRegExp(innerStr));
            str = str.slice(endIndex + 1);

        } else if (str[0] === '|') {
            if (regexpList.length === 0) return null;
            let left = regexpList.length > 1 ? new Str([...regexpList]) : regexpList.pop();
            regexpList.length = 0;
            let right = parseRegExp(str.slice(1));
            if (!right) return null;
            regexpList.push(new Or(left, right));
            break;

        } else if (str[0] === '*') {
            let prevRegExp = regexpList.pop();
            setLastObjectToZeroOrMore(prevRegExp, regexpList);
            str = str.slice(1);

        } else if (str[0] === '.') {
            regexpList.push(new Any());
            str = str.slice(1);

        } else {
            let sequence = parseSequence(str);
            if (!sequence) return null;
            let normalObjects = sequence.split('').map(char => new Normal(char));
            regexpList.push(...normalObjects);
            str = str.slice(sequence.length);
        }
    }

    if (regexpList.length === 0) {
        return null;
    } else if (regexpList.length === 1) {
        return regexpList[0];
    } else {
        return new Str(regexpList);
    }
}
function setLastObjectToZeroOrMore(prevRegExp, regexpList) {
    if (regexpList.length > 0) {
        let lastObject = regexpList[regexpList.length - 1];
        if (lastObject.regexp && lastObject.regexp instanceof ZeroOrMore) {
            lastObject.regexp.regexp = prevRegExp;
        } else {
            regexpList.push(new ZeroOrMore(prevRegExp));
        }
    } else {
        if (!prevRegExp) return null;
        if (prevRegExp instanceof ZeroOrMore)  return null;
        regexpList.push(new ZeroOrMore(prevRegExp));
    }
}

function parseSequence(str) {
    let endIndex = 0;
    while (endIndex < str.length && !isSpecialCharacter(str[endIndex])) {
        endIndex++;
    }
    return str.slice(0, endIndex);
}

function isSpecialCharacter(char) {
    return '()|*.'.indexOf(char) !== -1;
}

function findMatchingClosingParenIndex(str, startIndex = 0) {
    let count = 1;
    for (let i = startIndex + 1; i < str.length; i++) {
        if (str[i] === '(') {
            count++;
        } else if (str[i] === ')') {
            count--;
            if (count === 0) {
                return i;
            }
        }
    }
    return null;
}

function validationOr(str) {
    let pos = -1;
    const arrIndex = [];
    while((pos = str.indexOf("|", pos + 1)) !== -1) {
        arrIndex.push(pos);
    }
    return arrIndex.every((indexOr, i, arr) => {
        let nextIndex = arr[i + 1];
        if (!nextIndex) return true;
        return str.slice(indexOr + 1, nextIndex).search(/\(|\)/) >= 0;
    });
}
// console.log(parseRegExp("LL2::L|nX'=_T*X460$.A)Q %i3or,(s~rOr+)nGsP2R"));
// console.log(parseRegExp('*, +\"6O_.*$~&\\'));
// console.log(parseRegExp("(d.((.|(p*.|(g*|.)))|q.*)*|v)*"));
 console.log(parseRegExp("(d.((.|(p*.|(g*|.)))|q.*)*|v)*"));

//console.log(parseRegExp("(a)b|c"));
// {type: "Or", left: {type: "Str", regexpList: [{type: "Normal", char: "a"},
// {type: "Normal", char: "b"}]} , right: {type: "Normal", char: "c"}}
// console.log("_____________", parseRegExp("a|b"));
// console.log("_____________", parseRegExp("((a|b)*)*|cds|(a)*"));
console.log("_____________", parseRegExp("a|b|c"));
console.log("_____________", parseRegExp("a**"));
 console.log("_____________", parseRegExp("a|(b|c)"));
// console.log("_____________", "NULL", parseRegExp("a|b|c"));
// console.log("_____________", parseRegExp("abc"));
// console.log("_____________", parseRegExp("(abc)*"));
// console.log("_____________", parseRegExp("a*|(ab|c)*|s"));
console.log("_____________", parseRegExp("HzF0>odtFZO3M<Ic_H|D2t]r?y2?S&)HY~Al9@(2Zb"));
console.log("_____________", parseRegExp("(a|)"));