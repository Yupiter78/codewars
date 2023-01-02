/*
Write a function that will solve a 9x9 Sudoku puzzle.
The function will take one argument consisting of the 2D puzzle array,
with the value 0 representing an unknown square.

The Sudokus tested against your function will be "easy"
(i.e. determinable; there will be no need to assume and test possibilities on unknowns)
and can be solved with a brute-force approach.

For Sudoku rules, see the Wikipedia article.

var puzzle = [
            [5,3,0,0,7,0,0,0,0],
            [6,0,0,1,9,5,0,0,0],
            [0,9,8,0,0,0,0,6,0],
            [8,0,0,0,6,0,0,0,3],
            [4,0,0,8,0,3,0,0,1],
            [7,0,0,0,2,0,0,0,6],
            [0,6,0,0,0,0,2,8,0],
            [0,0,0,4,1,9,0,0,5],
            [0,0,0,0,8,0,0,7,9]];

sudoku(puzzle);
Should return
[[5,3,4,6,7,8,9,1,2],
[6,7,2,1,9,5,3,4,8],
[1,9,8,3,4,2,5,6,7],
[8,5,9,7,6,1,4,2,3],
[4,2,6,8,5,3,7,9,1],
[7,1,3,9,2,4,8,5,6],
[9,6,1,5,3,7,2,8,4],
[2,8,7,4,1,9,6,3,5],
[3,4,5,2,8,6,1,7,9]]
*/

function sudoku(puzzle) {
    const options = [1, 2, 3, 4, 5, 6, 7, 8, 9],
     len = puzzle.length,
     lines = [],
     arrColumns = [],
     columns = [],
     choicesSq = [],
     squares = [],
     cache = {},
     getSquare = (x, y) => ~~(x / 3) * 3 + ~~(y / 3);


    for (let i = 0; i < len; i++) {
        const choiceRow = [],
        column = []
        for (let j = 0; j < len; j++) {
            if (!puzzle[i].includes(options[j])) choiceRow.push(options[j]);
            column.push(puzzle[j][i]);
        }
        lines.push(choiceRow);
        arrColumns.push((column));
    }

    for (let i = 0; i < len; i += 3) {
        for (let j = 0; j < len; j += 3) {
            choicesSq.push([...puzzle[i].slice(j, j + 3),
                ...puzzle[i + 1].slice(j, j + 3), ...puzzle[i + 2].slice(j, j + 3)]);
        }

    }

    for (let i = 0; i < len; i++) {
        const choiceColumn = [],
            square = [];
        for (let j = 0; j < len; j++) {
            if (!arrColumns[i].includes(options[j])) choiceColumn.push(options[j]);
            if (!choicesSq[i].includes(options[j])) square.push(options[j]);
        }
        columns.push(choiceColumn);
        squares.push(square);
    }

    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (puzzle[i][j] === 0) {
                cache[`${i},${j}`] = [...lines[i], ...columns[j], ...squares[getSquare(i, j)]].sort()
                    .filter((item, i, arr) => {
                        if (item === arr[i + 2]) return item;
                    });
            }
        }
    }

    for (let key of Object.keys(cache)) {
        for (key in cache) {
            if (cache[key].length === 1) {
                puzzle[key[0]][key[2]] = cache[key][0];
                delete cache[key];
            }
        }
    }

    if (Object.keys(cache).length > 0) sudoku(puzzle);
    return puzzle;
}

    let puzzle = [
        [5,3,0,0,7,0,0,0,0],
        [6,0,0,1,9,5,0,0,0],
        [0,9,8,0,0,0,0,6,0],
        [8,0,0,0,6,0,0,0,3],
        [4,0,0,8,0,3,0,0,1],
        [7,0,0,0,2,0,0,0,6],
        [0,6,0,0,0,0,2,8,0],
        [0,0,0,4,1,9,0,0,5],
        [0,0,0,0,8,0,0,7,9]];

    let solution = [
        [5,3,4,6,7,8,9,1,2],
        [6,7,2,1,9,5,3,4,8],
        [1,9,8,3,4,2,5,6,7],
        [8,5,9,7,6,1,4,2,3],
        [4,2,6,8,5,3,7,9,1],
        [7,1,3,9,2,4,8,5,6],
        [9,6,1,5,3,7,2,8,4],
        [2,8,7,4,1,9,6,3,5],
        [3,4,5,2,8,6,1,7,9]];

let puzzle_2 = [
    [0,0,0,6,0,0,0,8,0],
    [6,0,9,8,3,0,0,0,0],
    [0,0,7,0,0,9,6,1,0],
    [0,0,0,0,8,0,1,9,0],
    [2,0,0,3,0,0,0,0,0],
    [0,0,6,0,5,7,0,0,0],
    [0,0,0,4,0,5,0,0,8],
    [0,0,5,7,6,0,4,0,0],
    [3,7,0,9,0,0,5,0,1]];



    console.log(sudoku(puzzle), "answer:", solution);

