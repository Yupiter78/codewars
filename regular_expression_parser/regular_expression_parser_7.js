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


function parseRegExp(expr) {
    const chars = Array.from(expr)
    const stack = []

    let ptr = 0
    let left = null

    const str = () => new Str(stack.splice(0))

    for(; ptr < chars.length; ++ptr)
        switch(chars[ptr]) {
            case '(':
                let start = ++ptr
                let cnt = 1

                for(; ptr < chars.length; ++ptr) {
                    if(chars[ptr] === '(') cnt++
                    else if(chars[ptr] === ')') cnt--
                    if(!cnt) break
                }
                if(cnt) return null

                let nested = parseRegExp(chars.slice(start, ptr))
                if(!nested) return null
                stack.push(nested)

                break
            case ')':
                return null
            case '*':
                if(!stack.length || stack[stack.length - 1] instanceof ZeroOrMore)
                    return null

                stack.push(new ZeroOrMore(stack.pop()))
                break
            case '|':
                if(left || !ptr) return null
                left = stack.length > 1 ? str() : stack.pop()
                break
            case '.':
                stack.push(new Any)
                break
            default:
                stack.push(new Normal(chars[ptr]))
        }

    if(left) {
        let right = stack.length > 1 ? str() : stack.pop()
        if(!right) return null
        stack.push(new Or(left, right))
    }

    if(stack.length > 1) stack.push(str())

    return stack.pop() || null
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