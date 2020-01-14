class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
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
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell && this.multiply >= 6) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;
            var newGrass = new Grass(newX, newY, 1);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }
}
class Grasseater {
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
            matrix[newY][newX] = 2;
            var newGrasseater = new Grasseater(newX, newY, 1);
            grasseaterArr.push(newGrasseater);
            this.multiply = 0;

        }
    }
    eat() {
        var newcell = random(this.chooseCell(1));
        if (newcell) {
            var newx = newcell[0];
            var newy = newcell[1];
            for (var i in grassArr) {
                if (newx == grassArr[i].x && newy == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            matrix[newy][newx] = 2;
            matrix[this.y][this.x] = 0;
            this.x = newx;
            this.y = newy;
            this.energy++;
            this.mul();
        }
        else {
            this.mul()
            this.move();
        }
    }
    move() {
        var newcell = random(this.chooseCell(0));
        if (newcell) {
            var newx = newcell[0];
            var newy = newcell[1];
            matrix[newy][newx] = 2;
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
        for (var i in grasseaterArr) {
            if (this.x == grasseaterArr[i].x && this.y == grasseaterArr[i].y) {
                grasseaterArr.splice(i, 1);
                matrix[this.y][this.x] = 0;
                break;
            }
        }

    }
}
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
class Xmen {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 16;
        this.multiply = 0;
        this.index = index;
        this.kill_amount = 0;
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
class Runner {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 20;
        // this.walkable_dir = [
        //     [this.x - 1, this.y],
        //     [this.x + 1, this.y]
        // ];
        this.attack_dir = [
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
        for (var i in this.attack_dir) {
            var x = this.attack_dir[i][0];
            var y = this.attack_dir[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.attack_dir[i]);
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
        // if (this.way_dir == true) {
        //     var x = this.walkable_dir[0][0];
        //     var y = this.walkable_dir[0][1];
        //     if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        //         if (matrix[y][x] == character) {
        //             found.push(this.walkable_dir[0]);
                    
        //         }
        //     }
        // } else {
        //     var x = this.walkable_dir[1][0];
        //     var y = this.walkable_dir[1][1];
        //     if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        //         if (matrix[y][x] == character) {
        //             found.push(this.walkable_dir[1]);
                    
        //         }
        //     }
        
        // }
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