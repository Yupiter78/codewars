/*
Write a function that will solve a 9x9 Sudoku puzzle.
The function will take one argument consisting of the 2D puzzle array,
with the value 0 representing an unknown square.

The Sudokus tested against your function will be "easy"
(i.e. determinable; there will be no need to assume and test possibilities on unknowns)
and can be solved with a brute-force approach.

For Sudoku rules, see the Wikipedia article.

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

function sudoku_2(puzzle) {
    const valid = (x,y) => {
        let v = [];
        for(let i=0; i<3; i++) {
            for(let j=0; j<3; j++) {
                v.push(puzzle[x][i*3+j])
                v.push(puzzle[i*3+j][y])
                v.push(puzzle[3*Math.floor(x/3)+i][3*Math.floor(y/3)+j])
            }
        }
        return [1,2,3,4,5,6,7,8,9].filter(e => v.indexOf(e) === -1)
    }
    const rec = (x,y) => {
        if(y === 9) {
            return puzzle
        } else if (!puzzle[x][y]) {
            const correct = valid(x,y).some(i => {
                puzzle[x][y] = i;
                return rec((x + 1) % 9,y+(x === 9 ? 1 : 0))
            })
            if (correct)
                return puzzle;
            puzzle[x][y] = 0;
        } else {
            return rec((x + 1) % 9,y+(x=== 8 ? 1 : 0))
        }
    }
    return rec(0,0)
}

console.log(sudoku_2(puzzle), "answer:", solution);

function sudoku_3(puzzle) {
    while (puzzle.some( l => l.some( p => p === 0 ) ))  // while some unfilled pos.
        for (let y = 0; y < 9; y++)                         // scan whole board
            for (let x = 0; x < 9; x++)
                if (puzzle[y][x] === 0) {                     // and with unfilled do:
                    let p = [true, true, true, true, true,         // init possible digits
                        true, true, true, true, true];
                    for (let i = 0; i < 9; i++) {               // exclude all digits
                        p[ puzzle[y][i] ] = false;              // found in same row
                        p[ puzzle[i][x] ] = false;              // and column
                    }
                    for (let i = 3 * ~~(x / 3); i < 3 * (~~(x / 3) + 1); i++)    // exclude all
                        for (let j = 3 * ~~(y / 3); j < 3 * (~~(y / 3) + 1); j++)  // digits in
                            p[ puzzle[j][i] ] = false;                 // local 3x3 sqare
                    if (p.reduce( (p,c) => p + (c ? 1 : 0) ) === 1) // if just one possible left
                        puzzle[y][x] = p.indexOf(true);         // put it in current place
                }
    return puzzle;
}

console.log(sudoku_3(puzzle), "answer:", solution);