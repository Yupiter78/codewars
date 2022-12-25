/*How many ways can you make the sum of a number?
From wikipedia: https://en.wikipedia.org/wiki/Partition_(number_theory)

In number theory and combinatorics, a partition of a positive integer n,
also called an integer partition, is a way of writing n as a sum of positive integers.
Two sums that differ only in the order of their summands are considered
the same partition. If order matters, the sum becomes a composition.
For example, 4 can be partitioned in five distinct ways:

4
3 + 1
2 + 2
2 + 1 + 1
1 + 1 + 1 + 1
Examples
Basic
sum(1) // 1
sum(2) // 2  -> 1+1 , 2
sum(3) // 3 -> 1+1+1, 1+2, 3
sum(4) // 5 -> 1+1+1+1, 1+1+2, 1+3, 2+2, 4
sum(5) // 7 -> 1+1+1+1+1, 1+1+1+2, 1+1+3, 1+2+2, 1+4, 5, 2+3

sum(10) // 42
Explosive
sum(50) // 204226
sum(80) // 15796476
sum(100) // 190569292
See here for more examples.*/


function sum(num) {
    return (function worker(num, k = num) {
        if (num === 0) return 1;
        let result = 0;
        for (let i = 1; i <= Math.min(num, k); i++) {
            result += worker(num - i, i);
        }
        return result;
    })(num);
}

console.log(sum(1), 1);
console.log(sum(2), 2);
console.log(sum(3), 3);
console.log(sum(4), 5);

console.log(sum(5), 7);

console.log(sum(10), 42);

function sumCache(num) {
    const cache = new Map();
    const getKey = (n1, n2) => `${n1}, ${n2}`;
    return (function worker(num, k = num) {
        const key = getKey(num, k);
        if (cache.has(key)) return cache.get(key);
        if (num === 0) return 1;
        let result = 0;
        for (let i = 1; i <= Math.min(num, k); i++) {
            result += worker(num - i, i);
        }
        cache.set(key, result);
        return result;
    })(num);
}

console.log("___________________")
console.log(sumCache(1), 1);
console.log(sumCache(2), 2);
console.log(sumCache(3), 3);
console.log(sumCache(4), 5);
console.log(sumCache(5), 7);
console.log(sumCache(10), 42);


const sum_2 = (num) => {
    const dp = [1, ...new Array(num).fill(0)];

    for (let i = 1; i <= num; i++) {
        for (let j = i; j <= num; j++) {
            dp[j] += dp[j - i];
        }
    }
    return dp[num];
};

/*const sum_2 = (num) => {
    const dp = [1, ...new Array(num).fill(0)];
    console.log("dp:", dp);

    for (let i = 1; i <= num; i++) {
        console.log(`__________i = ${i}__________`);
        console.log(`(dp[j]) += dp[j - i]`)
        for (let j = i; j <= num; j++) {
            console.log(`dp_for ${i}`, dp);
            console.log(`j = ${j} / ${dp[j]} += ${dp[j - i]} === ${dp[j] + dp[j - i]}`)
            dp[j] += dp[j - i];
        }
        console.log(`dp_NEXT ${i}:`, dp);
    }
    console.log("dp_END:", dp);
    return dp[num];
};*/

console.log("___________________")
console.log(sum_2(1), 1);
console.log(sum_2(2), 2);
console.log(sum_2(3), 3);
console.log(sum_2(4), 5);
console.log(sum_2(5), 7);
console.log(sum_2(10), 42);


function sum_3(num){
    if(num<0){return 0;}
    const arr=[];
    for(let i=0;i<=num+1;i++){
        arr[i]=0;
    }
    arr[0]=1;
    for(let i=1;i<=num;i++){
        for(let j=i;j<=num;j++){
            arr[j]+=arr[j-i];
        }
    }
    return arr[num];
}

console.log("___________________")
console.log(sum_3(1), 1);
console.log(sum_3(2), 2);
console.log(sum_3(3), 3);
console.log(sum_3(4), 5);
console.log(sum_3(5), 7);
console.log(sum_3(10), 42);

const memo = [];

function sum_4(n, m = n) {
    if (n === 0) return 1;
    if (n < 0 || m === 0) return 0;
    if (memo[n] && memo[n][m]) return memo[n][m];
    let total = sum_4(n, m - 1) + sum_4(n - m, m);
    if (!memo[n]) {
        memo[n] = [];
    }
    memo[n][m] = total;
    return total;
}

console.log("___________________")
console.log(sum_4(1), 1);
console.log(sum_4(2), 2);
console.log(sum_4(3), 3);
console.log(sum_4(4), 5);
console.log(sum_4(5), 7);
console.log(sum_4(10), 42);