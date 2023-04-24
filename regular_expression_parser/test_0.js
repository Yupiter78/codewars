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
    if (str[0] !== "|") {
        if (str.includes("|") && !(str.includes("(") || str.includes(")") )) {
            console.log("str:", str);
            let index = str.indexOf("|");
            let lastIndex = str.lastIndexOf("|");

            if (index !== lastIndex && !str.includes("(") && !str.includes(")")) return null;
            const left = parseRegExp(str.slice(0, index));
            const right = parseRegExp(str.slice(index + 1));
            return new Or(left, right);
        }
        if (str.includes("|") && str.includes("(") && !str.includes(")")) return null;
        if (str.includes("|") && !str.includes("(") && str.includes(")")) return null;
        if (str.includes("|") && str.includes("(") && str.includes(")")) {
            console.log("str:", str);
            let openingBraceIndex = str.indexOf("(");
            let closingBraceIndex = str.indexOf(")");
            if (openingBraceIndex > closingBraceIndex) return null;
        }
    }

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
            let left = regexpList.pop();
            let right = parseRegExp(str.slice(1));
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
console.log(parseRegExp("(a|a)|a"), "Or( Or( Normal('a'), Normal('a') ), Normal('a') ) ");
console.log(parseRegExp("|#Esxf@-f@/;'"));
console.log(parseRegExp("}(g#pKvQ,Ox?ds<k^~9cYZ|%x}%b.f5ujE '"));
console.log(parseRegExp("r,~#)~3O_G*lLxu=M\\vdDYCd~}`e`v|k"));
console.log(parseRegExp("f72iP9|})[[(LCj12q_`.`w9Z^co"));*/
console.log(parseRegExp("(.*(..lc)*vw|u)"));
//Str([ Or( Str(
// [ Normal('q'),
// Or( Normal('y'),
// Str([ Any, Or( Or( Normal('k'), Any ), Normal('u') ), Or( Normal('k'), Any ), ZeroOrMore(Normal('k')) ]) ) ]),
// Normal('k') ), Any, Normal('f'), ZeroOrMore(Normal('l')) ])