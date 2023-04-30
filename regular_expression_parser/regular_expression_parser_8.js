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

function parseRegExp(s) {
    let tokens = [[[]]];
    let depth = 0;
    for(let c of s) {
        let cur = tokens[depth];
        let temp = cur[cur.length - 1];
        switch(c) {
            case '(': {
                depth++;
                tokens[depth] = [[]];
                break;
            }
            case ')': {
                if(depth === 0 || cur.some(i => !i.length)) return null;
                cur = cur.map(i => i.length === 1 ? i[0] : new Str(i));
                let res;
                if(cur.length === 1) {
                    res = cur[0];
                }
                else {
                    res = new Or(...cur);
                }
                depth--;
                let t = tokens[depth].pop();
                t.push(res);
                tokens[depth].push(t);
                break;
            }
            case '|': {
                if(cur.length > 1) return null;
                cur.push([]);
                break;
            }
            case '.': {
                temp.push(new Any());
                break;
            }
            case '*': {
                if(temp.length === 0) return null;
                let last = temp.pop();
                if(last instanceof ZeroOrMore) return null;
                temp.push(new ZeroOrMore(last));
                break;
            }
            default: {
                temp.push(new Normal(c));
                break;
            }
        }
    }
    if(depth || tokens[0].some(i => !i.length)) return null;
    tokens = tokens[0].map(i => i.length === 1 ? i[0] : new Str(i));
    if(tokens.length === 1) {
        return tokens[0];
    }
    return new Or(...tokens);
}

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