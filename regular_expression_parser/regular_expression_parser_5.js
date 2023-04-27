
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

const parseRegExp = str => {

    try {

        const matchingParen = tokens => {
            for(let i = 0, balance = 1; i < tokens.length; i++) {
                balance += tokens[i] === '('; balance -= tokens[i] === ')'
                if(!balance) return i
            }
            throw Error('No matching parenthesis.')
        }

        const createTree = tokens => {

            if(!tokens.length) throw Error('Nothing to parse.')

            let stack = [], ops = [], ast = [], seq = [], arg, arg2

            while(tokens.length) {
                let curr = tokens.shift()
                if(curr === '(') {
                    let subExpr = tokens.splice(0, matchingParen(tokens))
                    tokens.shift()
                    seq.push(createTree(subExpr))
                }
                if(curr === ')')
                    throw Error('Invalid parentheses.')
                if(curr === '*') {
                    arg = seq.length ? seq.pop() : stack.pop()
                    if(arg instanceof ZeroOrMore) throw Error('Syntax Error (ZeroOrMore).')
                    seq.push(new ZeroOrMore(arg))
                }
                if(curr === '|') {
                    stack.push(seq.length > 1 ? new Str(seq) : seq[0])
                    seq = []
                    ops.push(curr)
                }
                if(!'()*|'.includes(curr))
                    seq.push(curr === '.' ? new Any() : new Normal(curr))
            }
            stack.push(seq.length > 1 ? new Str(seq) : seq[0])

            if(ops.length) {
                while(ops.length) {
                    arg2 = stack.pop(); arg = stack.pop()
                    if(!arg || !arg2) throw Error('Syntax error (Or).')
                    ast.push(new Or(arg, arg2))
                    ops.pop()
                }
            }
            else ast = stack

            return ast.length > 1 ? new Str(ast) : ast.pop()
        }

        return createTree([...str])
    }

    catch (e) { return null }

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