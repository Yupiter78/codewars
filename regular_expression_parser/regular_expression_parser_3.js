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

function parseRegExp(s) {
    const eof = () => ! tokens.length ;
    const satisfy = pred => pred(tokens[0]) && tokens.shift() ;
    const char = c => satisfy( v => v===c ) ;
    const pParen = (e) => char('(') && ( e = pOr() || _|_ ) && ( char(')') || _|_ ) && e ;
    /*Oh, that. That's a way to generate an error with an expression ( throw is a statement, not an operator,
    so can't be used in an expression ).

_ is a valid identifier, and it's used as an undefined reference. | is bitwise OR,
which makes _|_ a legal expression, which looks like Haskell bottom
( undefined, which is an error in Haskell ). It's just a gimmick really.
I could have used error, which would generate the same ReferenceError.
Or any undefined identifier. But I like this one. :P*/
    const pNormal = (e) => ( e = satisfy( v => ! "()*|.".includes(v) ) ) && new Normal(e) ;
    const pAny = () => char('.') && new Any ;
    const pMany = (e) => ( e = pParen() || pNormal() || pAny() ) && char('*') ? new ZeroOrMore(e) : e ;
    const pStr = (e,f) => { for ( e = []; f = pMany(); e.push(f) ); return e.length && ( e.length===1 ? e[0] : new Str(e) ) ; } ;
    const pOr = (e,f) => ( e = pStr() ) && char('|') ? ( f = pStr() ) && new Or(e,f) : e ;
    const pRegex = (e) => ( e = pOr() ) && eof() && e ;
    let tokens = s.split("");
    try      { return pRegex() || null ; }
    catch(_) { return null; } // pParen should not eat tokens if it's going to fail later. use an index instead of `.shift()` ?
}

// console.log(parseRegExp("LL2::L|nX'=_T*X460$.A)Q %i3or,(s~rOr+)nGsP2R"));
// console.log(parseRegExp('*, +\"6O_.*$~&\\'));
// console.log(parseRegExp("(d.((.|(p*.|(g*|.)))|q.*)*|v)*"));
// console.log(parseRegExp("(d.((.|(p*.|(g*|.)))|q.*)*|v)*"));

console.log(parseRegExp("(a)b|c"));
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