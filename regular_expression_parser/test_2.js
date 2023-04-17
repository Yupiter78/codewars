const log = console.log;

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
    let isOr = true;

    function parseRegex(str) {
        if (!str) return null;
        if (isOr && str.includes("|") && !str.includes("(")) {
            let index = str.indexOf("|");
            const left = parseRegex(str.slice(0, index));
            isOr = true;
            const right = parseRegex(str.slice(index + 1));
            isOr = true;
            if (JSON.stringify(left) === JSON.stringify(right)) return null;
            if (JSON.stringify(left) === "null" || JSON.stringify(right) === "null") return null;
            return new Or(left, right);
        }
        const regexpList = [];

        while (str.length > 0) {
            isOr = null;
            if (str[0] === '(') {
                let endIndex = findMatchingClosingParenIndex(str);
                if (!endIndex) return null;
                let innerStr = str.slice(1, endIndex);
                regexpList.push(parseRegex(innerStr));
                str = str.slice(endIndex + 1);
            } else if (str[0] === '[') {
                let endIndex = findMatchingClosingBracketIndex(str);
                if (!endIndex) return null;
                let innerStr = str.slice(1, endIndex);
                regexpList.push(parseBracketExpression(innerStr));
                str = str.slice(endIndex + 1);
            } else if (str[0] === '|') {
                let left = regexpList.pop();
                let right = parseRegex(str.slice(1));
                regexpList.push(new Or(left, right));
                break;
            } else if (str[0] === '*') {
                let prevRegExp = regexpList.pop();
                setLastObjectToZeroOrMore(prevRegExp, regexpList);
                str = str.slice(1);
            } else if (str[0] === '+') {
                let prevRegExp = regexpList.pop();
                let oneOrMoreRegExp = new Str([prevRegExp, new ZeroOrMore(prevRegExp)]);
                regexpList.push(oneOrMoreRegExp);
                str = str.slice(1);
            } else if (str[0] === '?') {
                let prevRegExp = regexpList.pop();
                let zeroOrOneRegExp = new Or(prevRegExp, new Normal(''));
                regexpList.push(zeroOrOneRegExp);
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
    return parseRegex(str);
}

function setLastObjectToZeroOrMore(prevRegExp, regexpList) {

    if (regexpList.length > 0) {
        let lastObject = regexpList[regexpList.length - 1];
        if (lastObject.regexp && lastObject.regexp.type === 'zeroOrMore') {
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
    return '()[]|*+?.\\'.indexOf(char) !== -1;
}

function parseBracketExpression(str) {
    let charSet = new Set();
    let negateSet = false;
    if (str[0] === '^') {
        negateSet = true;
        str = str.slice(1);
    }
    while (str.length > 0 && str[0] !== ']') {
        if (str[0] === '\\') {
            charSet.add(str[1]);
            str = str.slice(2);
        } else {
            charSet.add(str[0]);
            str = str.slice(1);
        }
    }

    return {
        charSet: charSet,
        negate: negateSet,
    };
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


function findMatchingClosingBracketIndex(str, startIndex = 0) {
    let count = 1;
    for (let i = startIndex + 1; i < str.length; i++) {
        if (str[i] === '[') {
            count++;
        } else if (str[i] === ']') {
            count--;
            if (count === 0) {
                return i;
            }
        }
    }
    return null;
}


/*console.log(parseRegExp('ab|a'),
    "should return Or( left: Str(regexpList : [Normal {char: 'a'}, " +
    "Normal {char: 'b'} ]), right: Normal {char: 'a'} )");

console.log(parseRegExp("a(b|c)*"),
    "should return Str {regexpList: [Normal {char: 'a'}, " +
    "ZeroOrMore {regexp: Or {left: Normal {char: 'b'}, right: Normal {char: 'c'}}}]}");

console.log(parseRegExp("a|a|a"));
console.log(parseRegExp("a**"));
console.log(parseRegExp("a("));
console.log(parseRegExp("*"));
console.log(parseRegExp("a|(a|a)"), "Or( Normal('a'), Or( Normal('a'), Normal('a') ) ) ");
console.log(parseRegExp("(a|a)|a"), "Or( Or( Normal('a'), Normal('a') ), Normal('a') ) ");*/
console.log(parseRegExp("NxR'!EKLT7CPuERF?2pTf0S>m  w?L1W+NC*F"));