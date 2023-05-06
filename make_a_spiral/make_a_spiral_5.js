const BODY = 1;
const WALL = 0;
const UNKNOWN = -1;
const DIRECTIONS = {
    0: Point(1, 0),
    1: Point(0, 1),
    2: Point(-1, 0),
    3: Point(0, -1)
};

function Point(x, y) {
    return {
        x: x,
        y: y,
        add: function(p) { return Point(this.x + p.x, this.y + p.y); }
    };
}

function createArrayWith(len, initData) {
    const arr = new Array(len);
    for (let i = 0; i < len; i++) {
        arr[i] = initData.call ? initData.call() : initData;
    }
    return arr;
}

function Snake(world) {
    this.edge = world.length;
    this.world = world;
    this.currentPosition = Point(0, 0);
    this.direction = 0;

    this.next = function() {
        const nextPoint = this.currentPosition.add(DIRECTIONS[this.direction]);
        return this.world[nextPoint.y] && this.world[nextPoint.y][nextPoint.x];
    }

    this.walk = function() {
        let success = false;
        if (this.nextWillHitTheWall()) {
            this.nextDirection();
        }

        if(!this.nextWillHitTheWall()) {
            this.currentPosition = this.currentPosition.add(DIRECTIONS[this.direction]);
            success = true;
        }
        return success;
    };

    this.mark = function() {
        const pointForWall = this.currentPosition.add(DIRECTIONS[(this.direction + 1) % 4]);
        if (!this.nextWillHitTheWall()) {
            this.world[pointForWall.y][pointForWall.x] = WALL;
        }

        this.world[this.currentPosition.y][this.currentPosition.x] = BODY;
    }

    this.nextWillHitTheWall = function() {
        return (!this.next() || this.next() === WALL);
    };

    this.nextDirection = function() {
        this.direction = (this.direction + 1) % 4;
    };
}

function spiralize(n) {
    const world = createArrayWith(n, function() {
        return createArrayWith(n, UNKNOWN);
    });

    const snake = new Snake(world);

    snake.mark();
    while(snake.walk()) {
        snake.mark();
    }

    return world;
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