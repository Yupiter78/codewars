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

const parseRegExp = (function() {
    const flatred = (r,v,i,a) => r.concat(v);
    return function parseRegExp(str) {
        let z, s, g, i, j, b, a = splitRegExp(str);
        if (!a) return null;
        for (g=a[i=0]; i<a.length; g=a[++i]) {
            for (s=g[j=0]; j<g.length; s=g[++j]) {
                b = s[0] === '(', z = b && s[s.length-1] === '*';
                s = b ? parseRegExp(s.slice(+b,-b-z)) : parseStr(s);
                if (!s) return null;
                if (z) s = new ZeroOrMore(s);
                g[j] = s;
            }
            if (g.some(Array.isArray)) g = g.reduce(flatred,[]);
            a[i] = g.length === 1 ? g[0] : new Str(g);
        }
        a = a.or ? new Or(...a) : a[0];
        return a;
    };
    function parseStr(str) {
        let c, i = 0, r = [];
        for (c=str[i]; i<str.length; c=str[++i]) {
            if (c === '*') return null;
            c = c === '.' ? new Any() : new Normal(c);
            if (str[i+1] === '*') ++i, c = new ZeroOrMore(c);
            r.push(c);
        }
        return r;
    }
    function splitRegExp(str) {
        let r = [[]], i = 0, j = 0;
        if (!str || '|*)'.indexOf(str[0]) !== -1) return null; else r.or = 0;
        do {
            if (str[j] === ')') return null;
            j = indexFrom(str,'()|',j-1);
            if (j !== -1) {
                if (i !== j) r[r.length-1].push(str.slice(i,i=j));
                if (str[j] === '(') {
                    j = matchBraces(str,j);
                    if (j === -1 || j === i+1) return null;
                    if (str[++j] === '*') ++j;
                    r[r.length-1].push(str.slice(i,j));
                }
                else if (str[j] === '|') r.or = 1, r.push([]), ++j;
            }
            else r[r.length-1].push(str.slice(i));
        } while ((i=j) !== -1 && i<str.length);
        return r.length === 1+r.or && r.every(g => g.length) ? r : null;
    }
    function indexFrom(str,chr,i) {
        while (++i<str.length && chr.indexOf(str[i]) === -1);
        return i<str.length ? i : -1;
    }
    function matchBraces(str,i) {
        let b = 1;
        while (b && ++i<str.length) str[i] === '(' && ++b, str[i] === ')' && --b;
        return !b && i<str.length ? i : -1;
    }
})();

log(parseRegExp("LL2::L|nX'=_T*X460$.A)Q %i3or,(s~rOr+)nGsP2R"));
// log(parseRegExp('*, +\"6O_.*$~&\\'));
log(parseRegExp("(d.((.|(p*.|(g*|.)))|q.*)*|v)*"));


log("_____________:", parseRegExp("(a)b|c"));
// {type: "Or", left: {type: "Str", regexpList: [{type: "Normal", char: "a"},
// {type: "Normal", char: "b"}]} , right: {type: "Normal", char: "c"}}
// log("_____________", parseRegExp("a|b"));
// log("_____________", parseRegExp("((a|b)*)*|cds|(a)*"));
log("_____________", parseRegExp("a|b|c"));
log("_____________", parseRegExp("a**"));
// log("_____________", parseRegExp("a|(b|c)"));
// log("_____________", "NULL", parseRegExp("a|b|c"));
// log("_____________", parseRegExp("abc"));
// log("_____________", parseRegExp("(abc)*"));
// log("_____________", parseRegExp("a*|(ab|c)*|s"));
log("_____________", parseRegExp("HzF0>odtFZO3M<Ic_H|D2t]r?y2?S&)HY~Al9@(2Zb"));
log("_____________", parseRegExp("(a|)"));