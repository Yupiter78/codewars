"use strict"

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

let i = 0;
let j = 0;
const parseRegExp = ([...arr]) => (

    function parse(n) {
        log(`___PARSE___START___j = ${j++}`);
        log("ARR:", arr);
        log({n});
        // log("n = !n:", n = !n);
    const ret = [[]];
    for(let char; char = arr.shift();){
        log({char});
        if(char === ")"){n = !n; break}
        // log({n});
        if(char === "*" || (char === "|" && (ret[1] || !ret[0][0]))) return null;

        if(char === "|"){
            log("ret:", JSON.stringify(ret, null, 2));
            ret.unshift([]); continue
        }
        char = char === "(" ? parse(1) : char === "." ? new Any(): new Normal(char);
        log("after '|'", {char});

        if(char === null) return null;
        ret[0].push(arr[0] === "*" ? arr.shift() && new ZeroOrMore(char) : char);
    }
    let f = ret.map(a => a[1] ? new Str(a) : a[0]);
    log({f});
    log({n});
    log(`___RETURN___i = ${i++}`);
    log(`ret[0][0] :`, ret[0][0]);
    return n || !ret[0][0] ? null : f[1] ? new Or(f[1], f[0]) : f[0];
})();
// log(parseRegExp("LL2::L|nX'=_T*X460$.A)Q %i3or,(s~rOr+)nGsP2R"));
// log(parseRegExp('*, +\"6O_.*$~&\\'));
// log(parseRegExp("(d.((.|(p*.|(g*|.)))|q.*)*|v)*"));
// log(parseRegExp("(d.((.|(p*.|(g*|.)))|q.*)*|v)*"));

log("_____________:", parseRegExp("(a)b|c"));
// {type: "Or", left: {type: "Str", regexpList: [{type: "Normal", char: "a"},
// {type: "Normal", char: "b"}]} , right: {type: "Normal", char: "c"}}
// log("_____________", parseRegExp("a|b"));
// log("_____________", parseRegExp("((a|b)*)*|cds|(a)*"));
// log("_____________", parseRegExp("a|b|c"));
// log("_____________", parseRegExp("a**"));
// log("_____________", parseRegExp("a|(b|c)"));
// log("_____________", "NULL", parseRegExp("a|b|c"));
// log("_____________", parseRegExp("abc"));
// log("_____________", parseRegExp("(abc)*"));
// log("_____________", parseRegExp("a*|(ab|c)*|s"));
// log("_____________", parseRegExp("HzF0>odtFZO3M<Ic_H|D2t]r?y2?S&)HY~Al9@(2Zb"));
// log("_____________", parseRegExp("(a|)"));