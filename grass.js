class Grass extends livingCreature {
    //multiplies
    mul() {
        this.multiply++;
        var emptyCells = super.chooseCell(0);
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