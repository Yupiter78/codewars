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