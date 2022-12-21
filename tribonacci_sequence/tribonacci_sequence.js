function tribonacci(arr, n) {
    if (n < 4) return arr.slice(0, n);
    let [a, b, c] = arr;
    for (let i = 4; i <= n; i++) {
        [a, b, c] = [b, c, a + b + c];
        arr.push(c);
    }
    return arr;
}
const array = [1, 1, 1];
console.log("tribonacci(arr, 10)", tribonacci(array, 10));
console.log("tribonacci(arr, 10)", tribonacci(array, 2));
console.log("tribonacci(arr, 10)", tribonacci(array, 0));
console.log("tribonacci(arr, 10)", tribonacci([1, 2, 3], 2));
console.log("tribonacci(arr, 10)", tribonacci([31, 57, 105], 2));
console.log("tribonacci(arr, 10)", tribonacci([31, 57, 105], 3));