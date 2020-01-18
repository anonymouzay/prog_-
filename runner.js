class Runner extends livingCreature
{
    constructor(x, y, index) {
        super(x,y,index);
        this.energy = 20;
        this.directions = [
            [this.x, this.y - 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y - 1],
            [this.x + 1, this.y + 1],
            [this.x - 1, this.y - 1],
            [this.x - 1, this.y + 1],
        ];
        this.way_dir = false;

    }
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
    chooseCellWalk() {
        var dir = 1;
        if (this.way_dir) {
            dir = -1;
        }
        var found = [this.x + dir, this.y];
        return found;
        
    }
    eat() {
        var cord = (this.chooseCell(2).concat(this.chooseCell(3)));
        var newcell = random(cord);
        if (newcell) {
            for (var i = 0; i < cord.length; i++) {
                var newx = cord[i][0];
                var newy = cord[i][1];
                this.energy++;
                this.kill_amount++;
                if (matrix[newy][newx] == 2) {
                    for (var i in grasseaterArr) {
                        if (newx == grasseaterArr[i].x && newy == grasseaterArr[i].y) {
                            grasseaterArr.splice(i, 1);
                            break;
                        }
                    }
                } 
                else if (matrix[newy][newx] == 3) {
                    for (var i in predatorArr) {
                        if (newx == predatorArr[i].x && newy == predatorArr[i].y) {
                            predatorArr.splice(i, 1);
                            break;
                        }
                    }
                }
                else if (matrix[newy][newx] == 4) {
                    for (var i in XmenArr) {
                        if (newx == XmenArr[i].x && newy == XmenArr[i].y) {
                            XmenArr.splice(i, 1);
                            break;
                        }
                    }
                }
                matrix[newy][newx] = 0;
            }
        }
        else {
            this.move();
        }

    }
    move() {
        var newcell = this.chooseCellWalk();

        
        if (newcell) {
            var newx = newcell[0];
            var newy = newcell[1];
            
            matrix[newy][newx] = 6;
            matrix[this.y][this.x] = 0;
            this.x = newx;
            this.y = newy;
            

            if (this.x == matrix[0].length - 1) { 
                this.way_dir = true;
            }
            else if (this.x == 0) {
                this.way_dir = false;
            }
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
        }

    }
    die() {
        for (var i in RunnerArr) {
            if (this.x == RunnerArr[i].x && this.y == RunnerArr[i].y) {
                RunnerArr.splice(i, 1);
                matrix[this.y][this.x] = 0;
                break;
            }
        }

    }

}