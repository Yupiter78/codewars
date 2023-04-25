function parseRegExp(s) {
    // simple recursive descent parser
    let i = 0;

    const parse_normal = () => /^[^\*\|\(\)]$/.test(s[i]) ? new Normal(s[i++]) : null;
    const parse_any = () => s[i] === '.' ? new Any(s[i++]) : parse_normal();

    const parse_group = () => {
        if (s[i] === '(') {
            i++;
            const next = parse_or();
            if (s[i++] !== ')') throw new Error('Unclosed group');
            return next;
        } else {
            return parse_any();
        }
    };

    const parse_zero_or_more = () => {
        const next = parse_group();
        if (s[i] === '*') {
            i++;
            return new ZeroOrMore(next);
        }
        return next;
    };

    const parse_str = () => {
        const set = [];
        let r;
        while ( r = parse_zero_or_more() ) set.push(r);
        if (set.length === 0) return null;
        return (set.length === 1) ? set[0] : new Str(set);
    };

    const parse_or = () => {
        const next = parse_str();
        if (s[i] === '|') {
            i++;
            return new Or(next, parse_str());
        } else {
            return next;
        }
    };

    try {
        const ast = parse_or();
        if (i !== s.length) throw new Error('Could not parse');
        return ast;
    } catch (e) {
        return null;  // invalid
    }
}

// console.log(parseRegExp("LL2::L|nX'=_T*X460$.A)Q %i3or,(s~rOr+)nGsP2R"));
// console.log(parseRegExp('*, +\"6O_.*$~&\\'));
// console.log(parseRegExp("(d.((.|(p*.|(g*|.)))|q.*)*|v)*"));
// console.log(parseRegExp("(d.((.|(p*.|(g*|.)))|q.*)*|v)*"));

//console.log(parseRegExp("(a)b|c"));
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