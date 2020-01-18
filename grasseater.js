class Grasseater extends livingCreature {
    constructor(x, y, index) {
        super(x,y,index);
        this.energy = 8;
    }
        //GETS NEW DIRECTIONS FOR MOVEMENT
    getNewCordinates(){
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
        this.getNewCordinates();
        return super.chooseCell(character);
    }
    //multiplies
    mul() {
        this.multiply++;
        var newCell = random(super.chooseCell(0));
        if (newCell && this.multiply >= 3) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;
            var newGrasseater = new Grasseater(newX, newY, 1);
            grasseaterArr.push(newGrasseater);
            this.multiply = 0;

        }
    }
    eat() {
        var newcell = random(super.chooseCell(1));
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
        var newcell = random(super.chooseCell(0));
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