/*Your goal in this kata is to implement a difference function,
which subtracts one list from another and returns the result.

It should remove all values from list a,
which are present in list b keeping their order.

arrayDiff([1,2],[1]) == [2]
If a value is present in b, all of its occurrences must be removed from the other:

arrayDiff([1,2,2,2,3],[2]) == [1,3]*/

function arrayDiff(a, b) {

    for (let i = 0; i < b.length; i++) {
        a = a.filter((item) => item !== b[i])
    }
    return a;
}

console.log(arrayDiff([1,2], [1])); // [2], "a was [1,2], b was [1]";
console.log(arrayDiff([1,2,2], [1])); // [2,2], "a was [1,2,2], b was [1]");
console.log(arrayDiff([1,2,2], [2])); // [1], "a was [1,2,2], b was [2]");
console.log(arrayDiff([1,2,2], [])); // [1,2,2], "a was [1,2,2], b was []");
console.log(arrayDiff([], [1,2])); // [], "a was [], b was [1,2]");
console.log(arrayDiff([1,2,3], [1,2])); // [3], "a was [1,2,3], b was [1,2]")

function arrayDiff_2(a, b) {
    return a.filter(e => !b.includes(e));
}

console.log(arrayDiff_2([1,2], [1])); // [2], "a was [1,2], b was [1]";
console.log(arrayDiff_2([1,2,2], [1])); // [2,2], "a was [1,2,2], b was [1]");
console.log(arrayDiff_2([1,2,2], [2])); // [1], "a was [1,2,2], b was [2]");
console.log(arrayDiff_2([1,2,2], [])); // [1,2,2], "a was [1,2,2], b was []");
console.log(arrayDiff_2([], [1,2])); // [], "a was [], b was [1,2]");
console.log(arrayDiff_2([1,2,3], [1,2])); // [3], "a was [1,2,3], b was [1,2]")


function arrayDiff_3(a, b) {
    return a.filter(function(x) { return b.indexOf(x) === -1; });
}

console.log(arrayDiff_3([1,2], [1])); // [2], "a was [1,2], b was [1]";
console.log(arrayDiff_3([1,2,2], [1])); // [2,2], "a was [1,2,2], b was [1]");
console.log(arrayDiff_3([1,2,2], [2])); // [1], "a was [1,2,2], b was [2]");
console.log(arrayDiff_3([1,2,2], [])); // [1,2,2], "a was [1,2,2], b was []");
console.log(arrayDiff_3([], [1,2])); // [], "a was [], b was [1,2]");
console.log(arrayDiff_3([1,2,3], [1,2])); // [3], "a was [1,2,3], b was [1,2]")

function arrayDiff_4(a, b) {
    b = new Set(b)
    return a.filter(v => !b.has(v))
}

console.log(arrayDiff_4([1,2], [1])); // [2], "a was [1,2], b was [1]";
console.log(arrayDiff_4([1,2,2], [1])); // [2,2], "a was [1,2,2], b was [1]");
console.log(arrayDiff_4([1,2,2], [2])); // [1], "a was [1,2,2], b was [2]");
console.log(arrayDiff_4([1,2,2], [])); // [1,2,2], "a was [1,2,2], b was []");
console.log(arrayDiff_4([], [1,2])); // [], "a was [], b was [1,2]");
console.log(arrayDiff_4([1,2,3], [1,2])); // [3], "a was [1,2,3], b was [1,2]")