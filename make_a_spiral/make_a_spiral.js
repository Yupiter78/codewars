/*Your task, is to create a NxN spiral with a given size.

For example, spiral with size 5 should look like this:

00000
....0
000.0
0...0
00000
and with the size 10:

0000000000
.........0
00000000.0
0......0.0
0.0000.0.0
0.0..0.0.0
0.0....0.0
0.000000.0
0........0
0000000000
Return value should contain array of arrays, of 0 and 1, with the first row being composed of 1s. For example for given size 5 result should be:

[[1,1,1,1,1],[0,0,0,0,1],[1,1,1,0,1],[1,0,0,0,1],[1,1,1,1,1]]
Because of the edge-cases for tiny spirals, the size will be at least 5.

General rule-of-a-thumb is, that the snake made with '1' cannot touch to itself.*/


function spiralize(n) {
    const matrix = Array.from({length: n}, () => new Array(n).fill(0));

    let rowStart = 0,
        rowEnd = n - 1,
        colStart = 0,
        colEnd = n - 1,
        count = 1;

    while (rowStart <= rowEnd && colStart <= colEnd) {

        // top row
        for (let i = colStart; i <= colEnd; i++) {
            matrix[rowStart][i] = 1;
            count++;
        }
        rowStart = rowStart + 1;

        if (colStart !== 0) colStart += 1;
        // right column
        for (let i = rowStart; i <= rowEnd; i++) {

            matrix[i][colEnd] = 1;
            count++;
        }
        colEnd = colEnd - 1;
        if (rowStart === rowEnd) break;

        // bottom row
        for (let i = colEnd; i >= colStart; i--) {
            matrix[rowEnd][i] = 1;
            count++;
        }
        rowEnd = rowEnd - 1;
        if (colStart === colEnd) break;

        // left column
        for (let i = rowEnd; i > rowStart; i--) {
            matrix[i][colStart] = 1;
        }

        rowStart++;
        rowEnd--;
        colStart++;
        colEnd--;
    }

    return matrix;
}
console.log(spiralize(5)); // [[1,1,1,1,1],[0,0,0,0,1],[1,1,1,0,1],[1,0,0,0,1],[1,1,1,1,1]]

console.log(spiralize(10));

/*
 [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]*/