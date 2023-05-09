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

const spiralize = (size) => {
    const getIndex = (idx, size) => (idx < size / 2) ? idx : size - 1 - idx;
    return Array.from({length: size}, () => new Array(size).fill(0))
        .map( (row, rowIdx) => row.map( (col, colIdx) => {
4
            const shouldReverse = rowIdx <= size / 2 - 1 + Math.sign(size % 4) &&
                rowIdx - colIdx === 1;
            const rowIdxMirror = getIndex(rowIdx, size),
                colIdxMirror = getIndex(colIdx, size);
            return rowIdxMirror % 2 && rowIdxMirror <= colIdxMirror ||
            colIdxMirror % 2 && rowIdxMirror >= colIdxMirror ?
                Number(shouldReverse) : Number(!shouldReverse);

        } ) );
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