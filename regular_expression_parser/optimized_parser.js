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
    if (!str) return null;
    return parseOr(str);
}

function parseOr(str) {
    let parts = [parseAnd(str)];
    while (str[0] === '|') {
        str = str.slice(1);
        parts.push(parseAnd(str));
    }
    if (parts.length === 1) return parts[0];
    return new Or(...parts);
}

function parseAnd(str) {
    let parts = [parseElement(str)];
    while (str.length > 0 && !isSpecialCharacter(str[0]) && str[0] !== ')') {
        const prevLength = str.length;
        parts.push(parseElement(str));
        const currLength = str.length;
        if (prevLength === currLength) {
            throw new Error(`Failed to parse string: ${str}`);
        }
        str = str.slice(currLength - prevLength);
    }
    if (parts.length === 1) {
        return parts[0];
    } else {
        return new Str(parts);
    }
}

function parseElement(str) {
    let char = str[0];
    if (char === '(') {
        let endIndex = findMatchingClosingParenIndex(str);
        let innerStr = str.slice(1, endIndex);
        str = str.slice(endIndex + 1);
        return parseRegExp(innerStr);
    } else if (char === '[') {
        let endIndex = findMatchingClosingBracketIndex(str);
        let innerStr = str.slice(1, endIndex);
        str = str.slice(endIndex + 1);
        return parseBracketExpression(innerStr);
    } else {
        str = str.slice(1);
        if (char === '.') {
            return new Any();
        } else if (char === '*') {
            return new ZeroOrMore(parseElement(str));
        } else if (char === '+') {
            let prevRegExp = parseElement(str);
            return new Str([prevRegExp, new ZeroOrMore(prevRegExp)]);
        } else if (char === '?') {
            let prevRegExp = parseElement(str);
            return new Or(prevRegExp, new Normal(''));
        } else {
            return new Normal(char);
        }
    }
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
    throw new Error('No matching closing parenthesis found');
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
    throw new Error('No matching closing bracket found');
}

console.log(parseRegExp('ab|a'),
    "should return Or( left: Str(regexpList : [Normal {char: 'a'}, Normal {char: 'b'} ]), right: Normal {char: 'a'} )");

console.log(parseRegExp("a(b|c)*"),
    "should return Str {regexpList: [Normal {char: 'a'}, ZeroOrMore {regexp: Or {left: Normal {char: 'b'}, right: Normal {char: 'c'}}}]}");

console.log(parseRegExp("ab*"));