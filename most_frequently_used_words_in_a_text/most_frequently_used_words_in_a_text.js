/*Write a function that, given a string of text (possibly with punctuation and line-breaks),
returns an array of the top-3 most occurring words,
in descending order of the number of occurrences.

Assumptions:
A word is a string of letters (A to Z) optionally containing one or more apostrophes (') in ASCII.
Apostrophes can appear at the start, middle or end of a word ('abc, abc', 'abc', ab'c are all valid)
Any other characters (e.g. #, \, / , . ...) are not part of a word and should be treated as whitespace.
Matches should be case-insensitive, and the words in the result should be lowercased.
Ties may be broken arbitrarily.
If a text contains fewer than three unique words, then either the top-2 or top-1 words
should be returned, or an empty array if a text contains no words.
Examples:
top_3_words("In a village of La Mancha, the name of which I have no desire to call to
mind, there lived not long since one of those gentlemen that keep a lance
in the lance-rack, an old buckler, a lean hack, and a greyhound for
coursing. An olla of rather more beef than mutton, a salad on most
nights, scraps on Saturdays, lentils on Fridays, and a pigeon or so extra
on Sundays, made away with three-quarters of his income.")
# => ["a", "of", "on"]

top_3_words("e e e e DDD ddd DdD: ddd ddd aa aA Aa, bb cc cC e e e")
# => ["e", "ddd", "aa"]

top_3_words("  //wont won't won't")
# => ["won't", "wont"]
Bonus points (not really, but just for fun):
Avoid creating an array whose memory footprint is roughly as big as the input text.
Avoid sorting the entire array of unique words.
*/

function topThreeWords(text) {
    const charSumObj =  text.toLowerCase()
        .split(/[\s|,:!./#]+/)
        .filter(word => word !== "" && word !== "'")
        .reduce((prev, cur) => {
         prev[cur] = prev[cur] ? ++prev[cur] : 1;
         return prev;
    }, {});
    return Object.entries(charSumObj)
        .sort((a,b) => b[1] - a[1])
        .slice(0, 3)
        .map(item => item[0]);
}

console.log(topThreeWords("a a a  b  c c  d d d d  e e e e e"), ['e','d','a']);

console.log(topThreeWords("a a c b b"), ['a','b','c']);

console.log(topThreeWords("e e e e DDD ddd DdD: ddd ddd aa aA Aa, bb cc cC e e e"),['e','ddd','aa']);

console.log(topThreeWords("  //wont won't won't "), ["won't", "wont"]);

console.log(topThreeWords("  , e   .. "), ["e"]);

console.log(topThreeWords("  ...  "), []);

console.log(topThreeWords("  '  "), []);

console.log(topThreeWords(`In a village of La Mancha, the name of which I have no desire to call to
mind, there lived not long since one of those gentlemen that keep a lance
in the lance-rack, an old buckler, a lean hack, and a greyhound for
coursing. An olla of rather more beef than mutton, a salad on most
nights, scraps on Saturdays, lentils on Fridays, and a pigeon or so extra
on Sundays, made away with three-quarters of his income.`), ['a','of','on']);


function topThreeWords_2(text) {
    let words = {}
    text.toLowerCase()
        .replace(/([A-Za-z][A-Za-z']*)/g, match => {
        let c = words[match] || 0
        words[match] = ++c;
    })
    return Object
        .keys(words)
        .sort(function(a,b){return words[b]-words[a]})
        .slice(0,3)
}

console.log(topThreeWords_2("a a a  b  c c  d d d d  e e e e e"), ['e','d','a']);

console.log(topThreeWords_2("a a c b b"), ['a','b','c']);

console.log(topThreeWords_2("e e e e DDD ddd DdD: ddd ddd aa aA Aa, bb cc cC e e e"),['e','ddd','aa']);

console.log(topThreeWords_2("  //wont won't won't "), ["won't", "wont"]);

console.log(topThreeWords_2("  , e   .. "), ["e"]);

console.log(topThreeWords_2("  ...  "), []);

console.log(topThreeWords_2("  '  "), []);

console.log(topThreeWords_2(`In a village of La Mancha, the name of which I have no desire to call to
mind, there lived not long since one of those gentlemen that keep a lance
in the lance-rack, an old buckler, a lean hack, and a greyhound for
coursing. An olla of rather more beef than mutton, a salad on most
nights, scraps on Saturdays, lentils on Fridays, and a pigeon or so extra
on Sundays, made away with three-quarters of his income.`), ['a','of','on']);

const topThreeWords_3 = text => {
    let total = (text.toLowerCase()
        .match(/\b[a-z']+\b/g)||[])
        .reduce((acc,cur) => (acc[cur] = (acc[cur]||0) + 1, acc), {});
    return Object.keys(total)
        .sort((a,b) => total[b] - total[a])
        .slice(0,3);
};

console.log(topThreeWords_3("a a a  b  c c  d d d d  e e e e e"), ['e','d','a']);

console.log(topThreeWords_3("a a c b b"), ['a','b','c']);

console.log(topThreeWords_3("e e e e DDD ddd DdD: ddd ddd aa aA Aa, bb cc cC e e e"),['e','ddd','aa']);

console.log(topThreeWords_3("  //wont won't won't "), ["won't", "wont"]);

console.log(topThreeWords_3("  , e   .. "), ["e"]);

console.log(topThreeWords_3("  ...  "), []);

console.log(topThreeWords_3("  '  "), []);

console.log(topThreeWords_3(`In a village of La Mancha, the name of which I have no desire to call to
mind, there lived not long since one of those gentlemen that keep a lance
in the lance-rack, an old buckler, a lean hack, and a greyhound for
coursing. An olla of rather more beef than mutton, a salad on most
nights, scraps on Saturdays, lentils on Fridays, and a pigeon or so extra
on Sundays, made away with three-quarters of his income.`), ['a','of','on']);

const topThreeWords_4 = text => {
    const obj = {};
    text.toLowerCase().replace(/(\w'?)+/g, val => {
        return obj[val] = -~obj[val], val
    });
    return Object.keys(obj).sort((a, b) => obj[b] - obj[a]).slice(0, 3);
};

console.log(topThreeWords_4("a a a  b  c c  d d d d  e e e e e"), ['e','d','a']);

console.log(topThreeWords_4("a a c b b"), ['a','b','c']);

console.log(topThreeWords_4("e e e e DDD ddd DdD: ddd ddd aa aA Aa, bb cc cC e e e"),['e','ddd','aa']);

console.log(topThreeWords_4("  //wont won't won't "), ["won't", "wont"]);

console.log(topThreeWords_4("  , e   .. "), ["e"]);

console.log(topThreeWords_4("  ...  "), []);

console.log(topThreeWords_4("  '  "), []);

console.log(topThreeWords_4(`In a village of La Mancha, the name of which I have no desire to call to
mind, there lived not long since one of those gentlemen that keep a lance
in the lance-rack, an old buckler, a lean hack, and a greyhound for
coursing. An olla of rather more beef than mutton, a salad on most
nights, scraps on Saturdays, lentils on Fridays, and a pigeon or so extra
on Sundays, made away with three-quarters of his income.`), ['a','of','on']);

function topThreeWords_5(text) {
    const string = text.toLowerCase().replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"").trim();
    return Object.entries(string.split(' ').reduce((h,c)=>(h[c]=(h[c]||0)+1,h),{}))
        .filter(e=> e[0] !== '' && e[0] !== '\'')
        .sort((a,b)=>b[1] - a[1])
        .map(e => e[0]).slice(0,3);
}

console.log(topThreeWords_5("a a a  b  c c  d d d d  e e e e e"), ['e','d','a']);

console.log(topThreeWords_5("a a c b b"), ['a','b','c']);

console.log(topThreeWords_5("e e e e DDD ddd DdD: ddd ddd aa aA Aa, bb cc cC e e e"),['e','ddd','aa']);

console.log(topThreeWords_5("  //wont won't won't "), ["won't", "wont"]);

console.log(topThreeWords_5("  , e   .. "), ["e"]);

console.log(topThreeWords_5("  ...  "), []);

console.log(topThreeWords_5("  '  "), []);

console.log(topThreeWords_5(`In a village of La Mancha, the name of which I have no desire to call to
mind, there lived not long since one of those gentlemen that keep a lance
in the lance-rack, an old buckler, a lean hack, and a greyhound for
coursing. An olla of rather more beef than mutton, a salad on most
nights, scraps on Saturdays, lentils on Fridays, and a pigeon or so extra
on Sundays, made away with three-quarters of his income.`), ['a','of','on']);