class Predator {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 1;
        this.energy = 8;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }
    //chooses the celll where to move
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    //multiplies
    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (newCell && this.multiply >= 8) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;
            var newPredator = new Predator(newX, newY, 1);
            predatorArr.push(newPredator);
            this.multiply = 0;

        }

    }
    eat() {
        var newcell = random(this.chooseCell(2));
        if (newcell) {
            var newx = newcell[0];
            var newy = newcell[1];
            matrix[newy][newx] = 3;
            matrix[this.y][this.x] = 0;
            this.x = newx;
            this.y = newy;
            this.energy++;
            if (this.energy > 20) {
                this.energy = 10;
            }
            for (var i in grasseaterArr) {
                if (newx == grasseaterArr[i].x && newy == grasseaterArr[i].y) {
                    grasseaterArr.splice(i, 1);
                    break;
                }
            }
            this.mul()
        } else {
            this.move()
            this.mul()
        }
    }
    move() {
        var newcell = random(this.chooseCell(0));
        if (newcell) {
            var newx = newcell[0];
            var newy = newcell[1];
            matrix[newy][newx] = 3;
            matrix[this.y][this.x] = 0;
            this.x = newx;
            this.y = newy;
            this.energy --;
            if (this.energy <= 0) {
                this.die();
            }
        }
    }
    die() {
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
                matrix[this.y][this.x] = 0;
                break;
            }
        }

    }
}