"use strict"
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


const parseRegExp = ([...arr]) => (
    function parse(n) {
    const ret = [[]];
    for(let v = ""; v = arr.shift();){
        if(v === ")"){n = !n; break}
        if(v === "*" || (v === "|" && (ret[1] || !ret[0][0]))) return null;
        if(v === "|"){ret.unshift([]); continue}
        v = v === "(" ? parse(1) : v === "." ? new Any(): new Normal(v);
        if(v === null) return null;
        ret[0].push(arr[0] === "*" ? arr.shift() && new ZeroOrMore(v) : v);
    }
    let f = ret.map(a => a[1] ? new Str(a) : a[0]);
    return n || !ret[0][0] ? null : f[1] ? new Or(f[1], f[0]) : f[0];
})();
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