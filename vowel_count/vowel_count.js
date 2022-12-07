function getCount(str) {
    const char = ["a", "e", "i", "o", "u"];
    return str.split("").filter((item) => char.includes(item)).length;
}

/*
const {assert} = require("chai");

describe("Vowels Count Tests",function(){
    it("should return 5 for 'abracadabra'",function(){
        assert.strictEqual(getCount("abracadabra"), 5) ;
    });
});*/

console.log(getCount("abracadabra")) // 5

function getCount_2(str) {
    return (str.match(/[aeiou]/ig)||[]).length;
}

console.log(getCount_2("abracadabra")) // 5

function getCount_3(str) {
    let vowelsCount = 0;
    const vowels = ["a","e","i","o","u"];
    for(let i = 0;i < str.length;i++){
        for(let j=0;j<vowels.length;j++){
            if(str[i] === vowels[j]){
                vowelsCount++;
            }
        }
    }

    return vowelsCount;
}

console.log(getCount_3("abracadabra")) // 5

function getCount_4(str) {
    return str.split('').filter(c => "aeiouAEIOU".includes(c)).length;
}

console.log(getCount_4("abracadabra")) // 5

function getCount_5(str) {
    let vowelsCount = 0;
    for (let char in str){
        switch (str[char]) {
            case 'a':
            case 'e':
            case 'i':
            case 'o':
            case 'u':
                vowelsCount++;
                break;
        }
    }
    return vowelsCount;
}

console.log(getCount_5("abracadabra")) // 5

function getCount_6(str) {
    return str.replace(/[^aeiou]/gi, '').length;
}

console.log(getCount_6("abracadabra")) // 5

function getCount_7(str) {
    let vowelsCount = 0;
    vowelsCount = str.match(/[aeiou]/gi);
    return vowelsCount ? vowelsCount.length:0;
}

console.log(getCount_7("abracadabra")) // 5

function getCount_8(str) {
    return (str.match(/[aeiou]/g) || []).length
}

console.log(getCount_8("abracadabra")) // 5

function getCount_9(str) {
    let vowels = 'aeiou';
    return str.split("").reduce((acc,char ) => {
        if (vowels.indexOf (char) !== -1) {
            acc++
        }
        return acc
    }, 0)
}

console.log(getCount_9("abracadabra")) // 5