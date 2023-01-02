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
    const options = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const len = puzzle.length;
    const choices = [];
    const arrCell = [];
    const choicesCell = [];
    const choicesSq = [];
    console.log("choicesSq:", choicesSq);
    for (let i = 0; i < len; i++) {
        const choiceRow = [];
        const cell = []
        for (let j = 0; j < len; j++) {
            if (!puzzle[i].includes(options[j])) choiceRow.push(options[j]);
            cell.push(puzzle[j][i]);
        }
        choices.push(choiceRow);
        arrCell.push((cell));
    }
    // console.log("choices:", choices);

    for (let i = 0; i < len; i++) {
        const choiceCell = [];
        for (let j = 0; j < len; j++) {
            if (!arrCell[i].includes(options[j])) choiceCell.push(options[j]);
        }
        choicesCell.push(choiceCell);

    }
    // console.log("choicesCell:", choicesCell);

    for (let i = 0; i < len; i += 3) {

        let k = i;
        for (let j = 0; j < len; j += 3) {
            choicesSq.push([]);

            choicesSq[k].push(...puzzle[i].slice(j, j + 3));
            choicesSq[k].push(...puzzle[i + 1].slice(j, j + 3));
            choicesSq[k].push(...puzzle[i + 2].slice(j, j + 3));
            k++;
            // if (!arrCell[i].includes(options[j])) choiceCell.push(options[j]);
        }

    }
    const arrSquares = [];
    for (let i = 0; i < len; i++) {
        const square = [];
        for (let j = 0; j < len; j++) {
            if (!choicesSq[i].includes(options[j])) square.push(options[j]);
        }
        arrSquares.push(square);

    }
    // console.log("arrSquares:", arrSquares);
    const cache = {};
    for (let i = 0; i < len; i++) {

        for (let j = 0; j < len; j++) {
            if (puzzle[i][j] === 0) {
                const getSquare = (gor, ver) => {
                    let x = ~~(gor / 3);
                    let y = ~~(ver / 3);
                    // console.log(`(${gor}, ${ver})  getSquare ${x}, ${y}:`, x * 3 + y);
                    return x * 3 + y;
                }
                // console.log(`[...choices[${i}], ...choicesCell[${j}], ...arrSquares[getSquare(${i}, ${j})]]:`,
                //     [...choices[i], ...choicesCell[j], ...arrSquares[getSquare(i, j)]]);
                cache[`${i},${j}`] = [...choices[i], ...choicesCell[j], ...arrSquares[getSquare(i, j)]].sort()
                    .filter((item, i, arr) => {
                        // console.log(`arr.indexOf(${item}) === arr.lastIndexOf(${arr[i - 2]})`);
                        if (item === arr[i + 2]) return item;
                    })

            }
        }
    }

    console.log("CACHE:", cache);

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

