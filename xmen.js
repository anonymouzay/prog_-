class Xmen extends livingCreature {
    constructor(x, y, index) {
        super(x,y,index);
        this.energy = 16;
        this.kill_amount = 0;
    }
    getNewCordinates(){
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x - 2, this.y - 2],
            [this.x - 3, this.y - 3],
            [this.x - 1, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 3, this.y + 3],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 2],
            [this.x + 3, this.y + 3],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 2],
            [this.x + 3, this.y - 3],
        ];
    }
    //chooses the celll where to move
    chooseCell(character) {
        this.getNewCordinates();
        return super.chooseCell(character);
    }
    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (newCell && this.multiply >= 12) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;
            var newXmen = new Xmen(newX, newY, this.index);
            XmenArr.push(newXmen);
            this.multiply = 0;
        }
    }
    eat() {
        var cord = this.chooseCell(2).concat(this.chooseCell(3));
        var newCell = random(cord)
        if (cord.length == 12) {
            matrix=matrixGenerator(60);
            grassArr=[];
            grasseaterArr=[];
            predatorArr=[];
            XmenArr=[];
            RunnerArr=[];
            for (var y = 0; y < matrix.length; ++y) {
                for (var x = 0; x < matrix[y].length; ++x) {
                    if (matrix[y][x] == 1) {
                        var gr = new Grass(x, y, 1);
                        grassArr.push(gr);
                    }
                    else if (matrix[y][x] == 2) {
                        var ge = new Grasseater(x, y, 1);
                        grasseaterArr.push(ge);
                    }
                    // else if (matrix[y][x] == 3) {
                    //     var pr = new Predator(x, y, 1);
                    //     predatorArr.push(pr);
                    // }
                    else if (matrix[y][x] == 4) {
                        var pr = new Xmen(x, y, 1);
                        XmenArr.push(pr);
                    }
                    else if (matrix[y][x] == 6) {
                        var pr = new Runner(x, y, 1);
                        RunnerArr.push(pr);
                    }
                }
            }
        }
        else if (newCell) {
            for (var i = 0; i < cord.length; i++) {
                var newx = cord[i][0];
                var newy = cord[i][1];
                this.energy++;
                this.kill_amount++;
                if (matrix[newy][newy] == 2) {
                    for (var i in grasseaterArr) {
                        if (newx == grasseaterArr[i].x && newy == grasseaterArr[i].y) {
                            grasseaterArr.splice(i, 1);
                            break;
                        }
                    }
                } 
                else if (matrix[newy][newy] == 3) {
                    for (var i in predatorArr) {
                        if (newx == predatorArr[i].x && newy == predatorArr[i].y) {
                            predatorArr.splice(i, 1);
                            break;
                        }
                    }
                }
                matrix[newy][newx] = 0;
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
            matrix[newy][newx] = 4;
            matrix[this.y][this.x] = 0;
            this.x = newx;
            this.y = newy;
            this.energy -=2;
            if (this.energy <= 0) {
                this.die();
            }
        }
    }
    die() {
        for (var i in XmenArr) {
            if (this.x == XmenArr[i].x && this.y == XmenArr[i].y) {
                XmenArr.splice(i, 1);
                matrix[this.y][this.x] = 0;
                break;
            }
        }

    }
}