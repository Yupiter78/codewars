/*Complete the function/method (depending on the language)
to return true/True when its argument is an array that has the
same nesting structures and same corresponding length of nested arrays as the first array.

For example:

 // should return true
[ 1, 1, 1 ].sameStructureAs( [ 2, 2, 2 ] );
[ 1, [ 1, 1 ] ].sameStructureAs( [ 2, [ 2, 2 ] ] );

 // should return false
[ 1, [ 1, 1 ] ].sameStructureAs( [ [ 2, 2 ], 2 ] );
[ 1, [ 1, 1 ] ].sameStructureAs( [ [ 2 ], 2 ] );

// should return true
[ [ [ ], [ ] ] ].sameStructureAs( [ [ [ ], [ ] ] ] );

// should return false
[ [ [ ], [ ] ] ].sameStructureAs( [ [ 1, 1 ] ] );
For your convenience, there is already a function 'isArray(o)'
declared and defined that returns true if its argument is an array, false otherwise.
*/


Array.prototype.sameStructureAs = function (other) {
    if (this.length !== other.length) {
        return false;
    }
    for (let i = 0; i < this.length; i++)  {
        if (Array.isArray(this[i]) !== Array.isArray(other[i])) {
            return false;
        }
        if (Array.isArray(this[i])) {
            if (!this[i].sameStructureAs(other[i])) return false;
        }
    }
    return true;
};

        console.log([1,1,1].sameStructureAs([2,2,2]), "[1,1,1] same as [2,2,2]");

        console.log([1,[1,1]].sameStructureAs([2,[2,2]]), "[1,[1,1]] same as [2,[2,2]]");
        console.log([1,[1,1]].sameStructureAs([[2,2],2]), "[1,[1,1]] not same as [[2,2],2]");
        console.log([1,[1,1]].sameStructureAs([2,[2]]), "[1,[1,1]] not same as [2,[2]]");

        console.log([[[],[]]].sameStructureAs([[[],[]]]), "[[[],[]]] same as [[[],[]]]");
        console.log([[[],[]]].sameStructureAs([[1,1]]), "[[[],[]]] not same as [[1,1]]");

        console.log([1,[[[1]]]].sameStructureAs([2,[[[2]]]]), "[1,[[[1]]]] same as [2,[[[2]]]]");

        console.log([].sameStructureAs(1), "[] not same as 1");
        console.log([].sameStructureAs({}), "[] not same as {}");
        //
        console.log([1,'[',']'].sameStructureAs(['[',']',1]), "[1,'[',']'] same as ['[',']',1]");

        console.log( [1,2].sameStructureAs([[3],3]), "[1,2] not same as [[3],3]" );


Array.prototype.sameStructureAs_2 = function (other) {
    if (!Array.isArray(other) || this.length !== other.length)
        return false;

    for(let i = 0; i < this.length; ++i) {
        if (Array.isArray(this[i])) {
            if (!this[i].sameStructureAs(other[i])) {
                return false;
            }
        } else if (Array.isArray(other[i])) {
            return false;
        }
    }

    return true;
};

console.log('________________NEXT_________________');
console.log([1,1,1].sameStructureAs_2([2,2,2]), "[1,1,1] same as [2,2,2]");

console.log([1,[1,1]].sameStructureAs_2([2,[2,2]]), "[1,[1,1]] same as [2,[2,2]]");
console.log([1,[1,1]].sameStructureAs_2([[2,2],2]), "[1,[1,1]] not same as [[2,2],2]");
console.log([1,[1,1]].sameStructureAs_2([2,[2]]), "[1,[1,1]] not same as [2,[2]]");

console.log([[[],[]]].sameStructureAs_2([[[],[]]]), "[[[],[]]] same as [[[],[]]]");
console.log([[[],[]]].sameStructureAs_2([[1,1]]), "[[[],[]]] not same as [[1,1]]");

console.log([1,[[[1]]]].sameStructureAs_2([2,[[[2]]]]), "[1,[[[1]]]] same as [2,[[[2]]]]");

console.log([].sameStructureAs_2(1), "[] not same as 1");
console.log([].sameStructureAs_2({}), "[] not same as {}");
//
console.log([1,'[',']'].sameStructureAs_2(['[',']',1]), "[1,'[',']'] same as ['[',']',1]");

console.log( [1,2].sameStructureAs_2([[3],3]), "[1,2] not same as [[3],3]" );


Array.prototype.sameStructureAs_3 = function(other) {
    return this.length === other.length && this.every((value, index) => Array.isArray(value) ?
        value.sameStructureAs_3(other[index]) : Array.isArray(value) === Array.isArray(other[index]));
}

console.log('________________NEXT_________________');
console.log([1,1,1].sameStructureAs_3([2,2,2]), "[1,1,1] same as [2,2,2]");

console.log([1,[1,1]].sameStructureAs_3([2,[2,2]]), "[1,[1,1]] same as [2,[2,2]]");
console.log([1,[1,1]].sameStructureAs_3([[2,2],2]), "[1,[1,1]] not same as [[2,2],2]");
console.log([1,[1,1]].sameStructureAs_3([2,[2]]), "[1,[1,1]] not same as [2,[2]]");

console.log([[[],[]]].sameStructureAs_3([[[],[]]]), "[[[],[]]] same as [[[],[]]]");
console.log([[[],[]]].sameStructureAs_3([[1,1]]), "[[[],[]]] not same as [[1,1]]");

console.log([1,[[[1]]]].sameStructureAs_3([2,[[[2]]]]), "[1,[[[1]]]] same as [2,[[[2]]]]");

console.log([].sameStructureAs_3(1), "[] not same as 1");
console.log([].sameStructureAs_3({}), "[] not same as {}");
//
console.log([1,'[',']'].sameStructureAs_3(['[',']',1]), "[1,'[',']'] same as ['[',']',1]");

console.log( [1,2].sameStructureAs_3([[3],3]), "[1,2] not same as [[3],3]" );


Array.prototype.sameStructureAs_4 = function (other) {
    return Array.isArray(other) && this.length === other.length && this.every(function (a, i) {
        let b = other[i];
        return Array.isArray(a) ? a.sameStructureAs(b) : Array.isArray(a) === Array.isArray(b);
    });
};

console.log('________________NEXT_________________');
console.log([1,1,1].sameStructureAs_4([2,2,2]), "[1,1,1] same as [2,2,2]");

console.log([1,[1,1]].sameStructureAs_4([2,[2,2]]), "[1,[1,1]] same as [2,[2,2]]");
console.log([1,[1,1]].sameStructureAs_4([[2,2],2]), "[1,[1,1]] not same as [[2,2],2]");
console.log([1,[1,1]].sameStructureAs_4([2,[2]]), "[1,[1,1]] not same as [2,[2]]");

console.log([[[],[]]].sameStructureAs_4([[[],[]]]), "[[[],[]]] same as [[[],[]]]");
console.log([[[],[]]].sameStructureAs_4([[1,1]]), "[[[],[]]] not same as [[1,1]]");

console.log([1,[[[1]]]].sameStructureAs_4([2,[[[2]]]]), "[1,[[[1]]]] same as [2,[[[2]]]]");

console.log([].sameStructureAs_4(1), "[] not same as 1");
console.log([].sameStructureAs_4({}), "[] not same as {}");
//
console.log([1,'[',']'].sameStructureAs_4(['[',']',1]), "[1,'[',']'] same as ['[',']',1]");

console.log( [1,2].sameStructureAs_4([[3],3]), "[1,2] not same as [[3],3]" );

