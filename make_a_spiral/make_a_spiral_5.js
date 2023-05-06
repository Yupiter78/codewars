var BODY = 1;
var WALL = 0;
var UNKNOWN = -1;
var DIRECTIONS = {
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

function craeteArrayWith(len, initData) {
    var arr = new Array(len);
    for (var i = 0; i < len; i++) {
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
        var nextPoint = this.currentPosition.add(DIRECTIONS[this.direction]);
        return this.world[nextPoint.y] && this.world[nextPoint.y][nextPoint.x];
    }

    this.walk = function() {
        var success = false;
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
        var pointForWall = this.currentPosition.add(DIRECTIONS[(this.direction + 1) % 4]);
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
    var world = craeteArrayWith(n, function() {
        return craeteArrayWith(n, UNKNOWN);
    });

    var snake = new Snake(world);

    snake.mark();
    while(snake.walk()) {
        snake.mark();
    }

    return world;
}