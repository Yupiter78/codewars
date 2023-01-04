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
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                v.push(puzzle[x][i * 3 + j]);
                v.push(puzzle[i * 3 + j][y]);
                v.push(puzzle[3 * Math.floor(x / 3) + i][3 * Math.floor(y / 3)+ j]);
            }
        }
        return [1,2,3,4,5,6,7,8,9].filter(e => v.indexOf(e) === -1);
    }
    const rec = (x,y) => {
        if(y === 9) {
            return puzzle;
        } else if (!puzzle[x][y]) {
            const correct = valid(x,y).some(i => {
                puzzle[x][y] = i;
                return rec((x + 1) % 9,y+(x === 9 ? 1 : 0));
            })
            if (correct)
                return puzzle;
            puzzle[x][y] = 0;
        } else {
            return rec((x + 1) % 9,y + (x === 8 ? 1 : 0));
        }
    }
    return rec(0,0);
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

function sudoku_4(puzzle) {
    let unsolved = [];
    const blocks = new Array(9).fill(0).map(_ => new Set),
    rows = new Array(9).fill(0).map(_ => new Set),
    cols = new Array(9).fill(0).map(_ => new Set);

    for (let y = 0; y < 9; y++) {
        for(let x = 0; x < 9; x++) {
            let v = puzzle[y][x];
            if (v === 0)
                unsolved.push({y, x});
            else {
                blocks[3 * Math.floor(y/3) + Math.floor(x/3)].add(v);
                rows[y].add(v);
                cols[x].add(v);
            }
        }
    }

    while(unsolved.length > 0) {
        unsolved = unsolved.filter(cell => {
            let set = new Set([1,2,3,4,5,6,7,8,9]);
            let known = new Set([
                ...blocks[3 * Math.floor(cell.y/3) + Math.floor(cell.x/3)],
                ...rows[cell.y],
                ...cols[cell.x]]);
            known.forEach(v => set.delete(v));

            if (set.size === 1) {
                let v = [...set][0];
                rows[cell.y].add(v);
                cols[cell.x].add(v);
                blocks[3 * Math.floor(cell.y/3) + Math.floor(cell.x/3)].add(v);
                puzzle[cell.y][cell.x] = v;

                return false;
            }
            return true;
        });
    }
    return puzzle;
}

console.log(sudoku_4(puzzle), "answer:", solution);

function sudoku_5(a, x= 0, y= 0) {
    function next(x, y) {
        if (++y === 9) x++, y = 0;
        return x === 9 ? a : sudoku_5(a, x, y);
    }
    function getFree(x, y) {
        let [xx, yy] = [~~(x / 3) * 3, ~~(y / 3) * 3];
        let nums = a[x].concat(a[0]
            .map((_, i) => a[i][y]))
            .concat(a.slice(xx, xx + 3)
            .reduce((p, c) => p.concat(c.slice(yy, yy + 3)), []));
        return [1,2,3,4,5,6,7,8,9].filter(v => !nums.includes(v));
    }
    a = a.slice().map(x=>x.slice());
    return a[x][y] ? next(x,y) : getFree(x,y).reduce((ans, n) => (a[x][y] = n, ans||next(x, y)), 0);
}

console.log(sudoku_5(puzzle), "answer:", solution);

function sudoku_6(pz) {
    let pr = [...Array(9)].map(x => [...Array(9)]);
    for (let i = 0; i < 9; i++) for (let j = 0; j < 9; j++) pr[i][j] = pz[j][i];
    let n0 = pz.reduce((a, b) => a+b.filter(x => x === 0).length, 0);

    let checkFor = (x, y) => {
        let v = pz[x].concat(pr[y]);
        [0, 1, 2].forEach(z => v = v.concat(pz[x - x % 3 + z].slice(y - y % 3, y - y % 3 + 3)));
        v = v.filter(n => typeof n === 'number' && n !== 0)
            .reduce((a, b) => a.indexOf(b) === -1 ? a.concat(b) : a, []);
        if (v.length === 8) {
            let tmp = 45 - v.reduce((a, b)=> a + b);
            pz[x][y] = tmp , pr[y][x] = tmp , n0--;
        }
    }

    for (let k = 0; k < 1000 && n0 > 0; k++)  for (let i = 0; i < 9; i++) for (let j = 0; j < 9; j++) {
        if (isNaN(pz[i][j]) || !pz[i][j]) checkFor(i, j);
    }
    return pz;
}

console.log(sudoku_6(puzzle), "answer:", solution);

const sudoku_7 = puzzle =>
    !puzzle.some(row => row.some(cell => cell > 9 || !cell)) ? puzzle
        : sudoku_7(puzzle.reduce((_, row0, rowIdx0) => row0.reduce((_, cell0, colIdx0) =>
            puzzle.map((row, rowIdx) => row.map((cell, colIdx) =>
                cell0 <= 9 && (cell > 9 || !cell) &&
                (rowIdx0 === rowIdx || colIdx0 === colIdx ||
                    ~~(colIdx0 / 3) === ~~(colIdx / 3) && ~~(rowIdx0 / 3) === ~~(rowIdx / 3)
                ) ? row[colIdx] = +`${cell || 123456789}`.replace(cell0, '') : cell)), []), []));

console.log(sudoku_7(puzzle), "answer:", solution);

function sudoku_8(puzzle) {
    // helpers
    const row    = (i) => puzzle[i].slice(),
    col    = (j) => puzzle.reduce((res, row) => res.concat([row[j]]), []),
    square = (si, sj) => {
        const res = [];
        for(const i of [0, 1, 2]) res.push(...puzzle[si + i].slice(sj, sj + 3));
        return res;
    }
    const range = [1, 2, 3, 4, 5, 6, 7, 8, 9],
    resolve = (i, j) => {
        if (puzzle[i][j] === 0){
            const used = [].concat(row(i), col(j), square(i - i % 3, j - j % 3)),
            canUse = range.filter(k => used.indexOf(k) === -1);
            if (canUse.length === 1) puzzle[i][j] = canUse[0];
        }
        return puzzle[i][j];
    }
    // solution
    let rest = [];
    for (const i in range) for (const j in range) rest.push([i, j]);
    while(rest.length > 0) rest = rest.filter(slot => resolve(...slot) === 0);
    return puzzle;
}

console.log(sudoku_8(puzzle), "answer:", solution);

function getPos(puzzle, x, y) {
    const hash = {};
    for (let u = 0; u < 9; u++) hash[ puzzle[y][u] ] = 1;
    for (let u = 0; u < 9; u++) hash[ puzzle[u][x] ] = 1;
    for (let u = 0; u < 9; u++) hash[ puzzle[ 3 * ((y / 3) | 0) + ((u / 3) | 0) ][ 3 * ((x / 3) | 0) + (u % 3) ] ] = 1;

    const poss = [];
    for (let i = 1; i <= 9; i++) if (!(i in hash)) poss.push(i);
    return poss;
}

function sudoku_9(puzzle) {
    const indices = [];
    let n;
    for (n = 0; n < 81; n++) if (puzzle[(n / 9) | 0][n % 9] === 0) indices.push({ v: n, p: null, i: 0});

    n = 0;
    while (n < indices.length) {
        const c = indices[n], y = (c.v / 9) | 0, x = c.v % 9;
        c.p = c.p || getPos(puzzle, x, y);
        if (c.i >= c.p.length) {
            puzzle[y][x] = 0;
            c.i = 0;
            c.p = null;
            n--;
        } else {
            puzzle[y][x] = c.p[c.i++];
            n++;
        }

    }

    return puzzle;
}

console.log(sudoku_9(puzzle), "answer:", solution);

const sudoku_10 = (p, i= 0, [x, y] = [~~(i / 9), i % 9]) => {
    const $ = (v, p, x, y) => !(p[x].includes(v) ||
        p.some(r => r[y] === v) ||
        p.filter((r, a) => a >= ~~(x / 3) * 3 && a < ~~(x / 3) * 3 + 3)
            .some(r => [0, 1, 2].some(k => r[~~(y / 3) * 3 + k] === v)));
    if(i > 80) return 1;
    for (let v = 1; p[x][y] === 0 && v <= 9; (p[x][y] = 0), v++) {
        console.log("TEST");
        if ($(v, p, x, y) && (p[x][y] = v) && sudoku_10(p, i + 1)) return p;
    }
    return p[x][y] ? sudoku_10(p,i + 1) : 0; // устранить ошибку рекурсионного вызова
}

console.log(sudoku_10(puzzle), "answer:", solution);

const sudoku_11 = rows => {
    const cols   = _ => rows.map((_, i) => rows.map((_, j) => rows[j][i]));

    const square = (i, j) => {
        let idxI = ~~(i / 3) * 3;
        let idxJ = ~~(j / 3) * 3;
        return [].concat(...rows.slice(idxI, idxI + 3).map(row => row.slice(idxJ, idxJ + 3)))
    };

    while ([].concat(...rows).includes(0)) {
        rows.forEach((row, i) => {
            row.forEach((x, j) => {
                if (x === 0) {
                    let nums      = [...new Set([...rows[i], ...cols()[j], ...square(i, j)])];
                    let possibles = [...Array(9)].map((_, i) => ++i).filter(n => !nums.includes(n));
                    if (possibles.length === 1) row[j] = possibles[0];
                }
            });
        });
    }
    return rows;
};

console.log(sudoku_11(puzzle), "answer:", solution);



const sudoku_12 = puzzle => new Sudoku(puzzle).solve();

class Sudoku {

    cell = (row, col) => this.cells.find(c => c.row === row && c.col === col);
    row(i) { return this.cells.filter(c => c.row === i); };
    col(i) { return this.cells.filter(c => c.col === i); };
    box(i) { return this.cells.filter(c => c.box === i); };
    constructor(grid) {
        this.grid = grid;
        this.m = this.grid.length;
        this.n = Math.floor(this.m ** 0.5);
        this.cells = [...Array(this.m ** 2).keys()]
            .map(id => new Cell(this, id));
        this.walk((row, col) => {

            if (grid[row][col] > 0) {
                this.cell(row, col).clue(grid[row][col] - 1);
            }
        });
    }
    solve() {
        while (this.solveNakedSingle()) {}
        return this.grid;
    }
    solveNakedSingle() {
        const cell = this.cells.find(c => !c.isSet && c.candidates.length === 1);
        if (cell == null) return false;
        console.log(`match << naked single >> ${cell.name} element ${cell.candidates[0]+1}`);
        cell.clue(cell.candidates[0]);
        this.grid[cell.row][cell.col] = cell.candidates[0]+1;
        return true;
    }
    walk(fn) {
        for (let row in [...Array(this.m).keys()]) {
            for (let col in [...Array(this.m).keys()]) {
                fn(Number(row), Number(col));
            }
        }
    }
}

class Cell {
    constructor(owner, id) {
        this.owner = owner;
        this.id = id;
        this.row = Math.floor(this.id / this.owner.m);
        this.col = this.id % this.owner.m;
        this.box =
            Math.floor(this.row / this.owner.n) * this.owner.n +
            Math.floor(this.col / this.owner.n);
        this.candidates = [...Array(this.owner.m).keys()];
        this.name = `R${this.row+1}C${this.col+1}`;
    }
    /*value() {
        if (!this.isSet) throw "no value set";
        return this.candidates[0];
    }*/
    peers() {
        const rowPeers = this.owner.row(this.row).filter(c => c.box !== this.box);
        const colPeers = this.owner.col(this.col).filter(c => c.box !== this.box);
        const boxPeers = this.owner.box(this.box).filter(c => c.id !== this.id);
        return rowPeers.concat(colPeers).concat(boxPeers);
    }
    clue(candidate) {
        this.set(candidate);
        // this.isClue = true;
    }
    set(candidate) {
        this.candidates = [candidate];
        this.isSet = true;
        for (let peer of this.peers()) {
            peer.eliminate(candidate);
        }
    }
    eliminate(candidate) {
        this.candidates = this.candidates.filter(c => c !== candidate);
    }
}

console.log(sudoku_12(puzzle), "answer:", solution);