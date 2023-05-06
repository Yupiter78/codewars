// The idea is to build an array of "concentrical" '0' and '1' squares replacing
// to opposite just a few figures along the diagonal in the upper left quadrant.
// Smth like:

//  1 1 1 1 1 1 1 1    1 1 1 1 1 1 1 1    1 1 1 1 1 1 1 1
//  1             1    *             1                  1
//  1   1 1 1 1   1    1 * 1 1 1 1   1    1 1 1 1 1 1   1
//  1   1     1   1 => 1   *     1   1 => 1         1   1
//  1   1     1   1 => 1   1     1   1 => 1   1     1   1
//  1   1 1 1 1   1    1   1 1 1 1   1    1   1 1 1 1   1
//  1             1    1             1    1             1
//  1 1 1 1 1 1 1 1    1 1 1 1 1 1 1 1    1 1 1 1 1 1 1 1

const spiralize = (size) =>

    Array.from({length: size}, () => Array.from({length: size}))
        .map( (row, rowIdx) => row.map( (col, colIdx) => {
            const shouldReverse = rowIdx <= size / 2 - 1 + Math.sign(size % 4) &&
                rowIdx - colIdx === 1;
            const rowIdxMirror = (rowIdx < size / 2) ? rowIdx : size - 1 - rowIdx,
                colIdxMirror = (colIdx < size / 2) ? colIdx : size - 1 - colIdx;
            return rowIdxMirror % 2 && rowIdxMirror <= colIdxMirror ||
            colIdxMirror % 2 && rowIdxMirror >= colIdxMirror ?
                (0 - shouldReverse) ** 2 : 1 - shouldReverse;
        }));

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