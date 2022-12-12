/*Greed is a dice game played with five six-sided dice. Your mission, should you choose to accept it, is to score a throw according to these rules. You will always be given an array with five six-sided dice values.

 Three 1's => 1000 points
 Three 6's =>  600 points
 Three 5's =>  500 points
 Three 4's =>  400 points
 Three 3's =>  300 points
 Three 2's =>  200 points
 One   1   =>  100 points
 One   5   =>   50 point
A single die can only be counted once in each roll.
For example, a given "5" can only count as part of a triplet
(contributing to the 500 points) or as a single 50 points,
but not both in the same roll.

Example scoring

 Throw       Score
 ---------   ------------------
 5 1 3 4 1   250:  50 (for the 5) + 2 * 100 (for the 1s)
 1 1 1 3 1   1100: 1000 (for three 1s) + 100 (for the other 1)
 2 4 4 5 4   450:  400 (for three 4s) + 50 (for the 5)
In some languages, it is possible to mutate the input to the function.
This is something that you should never do.
If you mutate the input, you will not be able to pass all the tests.
*/

function score( dice ) {
    const objValue = {};
    let sum = 0;
    for (let num of dice) {
        objValue[num] = (objValue[num] ?? 0 ) + 1;
    }

    Object.entries(objValue).filter((tuple) =>
        (tuple[0] === "1" || tuple[0] === "5") || tuple[1] >= 3)
        .forEach((arr) => {
            let key = arr[0], value = arr[1];
        if (value >= 3) {
            let balance = value - 3;
            sum += key === "1" ? 1000 + balance * 100 :
                key === "5" ? key * 100 + balance * 50 :
                key * 100;
        } else {
            sum += key === "1" ? value * 100 : value * 50;
        }
    })
    return sum;
}

console.log( score( [2, 3, 4, 6, 2] ), "/ === 0",   "Should be 0 :-(" );
console.log( score([4, 4, 4, 3, 3] ), "/ === 400", "Should be 400");
console.log( score(  [2, 4, 4, 5, 4] ), "/ === 450", "Should be 450" );

function score_2( dice ) {
    const dc = [0,0,0,0,0,0],
    tdr = [1000,200,300,400,500,600],
    sdr = [100,0,0,0,50,0];
    dice.forEach(function(x){ dc[x-1]++; });
    return dc.reduce(function(s,x,i){
        return s + (x >= 3? tdr[i] : 0) + sdr[i]*(x % 3);
    },0);
}

console.log( score_2( [2, 3, 4, 6, 2] ), "/ === 0",   "Should be 0 :-(" );
console.log( score_2([4, 4, 4, 3, 3] ), "/ === 400", "Should be 400");
console.log( score_2(  [2, 4, 4, 5, 4] ), "/ === 450", "Should be 450" );

function score_3( dice ) {
    if (dice.length !== 5) return 0;

    let diceStr = dice.sort().join('');
    let score = 0;
    const rules = [
        { reg: /111/, score: 1000 },
        { reg: /666/, score: 600 },
        { reg: /555/, score: 500 },
        { reg: /444/, score: 400 },
        { reg: /333/, score: 300 },
        { reg: /222/, score: 200 },
        { reg: /1/,   score: 100 },
        { reg: /5/,   score: 50 },
    ];

    rules.forEach(rule => {
        while (rule.reg.test(diceStr)) {
            diceStr = diceStr.replace(rule.reg, '');
            score += rule.score;
        }
    });

    return score;
}

console.log( score_3( [2, 3, 4, 6, 2] ), "/ === 0",   "Should be 0 :-(" );
console.log( score_3([4, 4, 4, 3, 3] ), "/ === 400", "Should be 400");
console.log( score_3(  [2, 4, 4, 5, 4] ), "/ === 450", "Should be 450" );

const score_4 = ( dice, r = Array(6).fill(0), sum = 0 ) => {
    dice.forEach(d => ++r[d - 1])
    for(let i = 0; i < 6; ++i) {
        if (r[i] > 2) sum += (i ? (i + 1) * 100 : 1000)
        if (!i || i === 4) sum += ( r[i] > 2 ? r[i] - 3 : r[i]) * (i ? 50 : 100)
    }
    return sum
}

console.log( score_4( [2, 3, 4, 6, 2] ), "/ === 0",   "Should be 0 :-(" );
console.log( score_4([4, 4, 4, 3, 3] ), "/ === 400", "Should be 400");
console.log( score_4(  [2, 4, 4, 5, 4] ), "/ === 450", "Should be 450" );

function score_5( dice ) {
    let points = [0,0,0,0,0,0],
        result = 0;

    dice.forEach(function(item) {
        if (++points[item-1] === 3) {
            if (item === 1) result += 1000
            else result += item * 100
            points[item-1] -= 3;
        }
    });

    return result + points[0] * 100 + points[4] * 50
}

console.log( score_5( [2, 3, 4, 6, 2] ), "/ === 0",   "Should be 0 :-(" );
console.log( score_5([4, 4, 4, 3, 3] ), "/ === 400", "Should be 400");
console.log( score_5(  [2, 4, 4, 5, 4] ), "/ === 450", "Should be 450" );


function score_6( dice ) {
    return (dice.sort().join('').match(/(\d)\1{2}|[15]/g) || [])
        .reduce((a,b)=>a+=100*({111:10,5:.5}[b]||b[0]),0)
}

console.log( score_6( [2, 3, 4, 6, 2] ), "/ === 0",   "Should be 0 :-(" );
console.log( score_6([4, 4, 4, 3, 3] ), "/ === 400", "Should be 400");
console.log( score_6(  [2, 4, 4, 5, 4] ), "/ === 450", "Should be 450" );

function score_7( dice ) {
    let v = {
        111: 1000,
        222: 200,
        333: 300,
        444: 400,
        555: 500,
        666: 600,
        1: 100,
        5: 50
    };

    let s = dice.sort().join('').match(/(([1-6])\2\2)|(1|5)/g) || [];
    return s.reduce(function (a, e) {
        return a + v[e];
    }, 0);
}

console.log( score_7( [2, 3, 4, 6, 2] ), "/ === 0",   "Should be 0 :-(" );
console.log( score_7([4, 4, 4, 3, 3] ), "/ === 400", "Should be 400");
console.log( score_7(  [2, 4, 4, 5, 4] ), "/ === 450", "Should be 450" );

function score_8(dice) {
    let sum = 0;
    dice = dice.sort();
    for(let i = 0; i < dice.length; i++){
        if (dice[i] === dice[i + 1] && dice[i + 1] === dice[i + 2]) {
            switch(dice[i]) {
                case 1:
                    sum += 1000; break;
                case 6:
                    sum += 600; break;
                case 5:
                    sum += 500; break;
                case 4:
                    sum += 400; break;
                case 3:
                    sum += 300; break;
                case 2:
                    sum += 200;
            }
            i = i + 2;
        }
        else if (dice[i] === 1) {
            sum += 100;
        } else if (dice[i] === 5) {
            sum += 50;
        }
    }
    return sum;
}

console.log( score_8( [2, 3, 4, 6, 2] ), "/ === 0",   "Should be 0 :-(" );
console.log( score_8([4, 4, 4, 3, 3] ), "/ === 400", "Should be 400");
console.log( score_8(  [2, 4, 4, 5, 4] ), "/ === 450", "Should be 450" );