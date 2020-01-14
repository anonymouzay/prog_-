// var's 
// var matrix = [
//     [0, 0, 0, 3, 0, 0, 0, 0, 0, 3],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 1, 0, 1, 0, 2, 0],
//     [0, 6, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
//     [0, 0, 1, 0, 0, 0, 0, 0, 0, 4],
//     [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
// ];
var matrix;

var side = 10;
var grassArr = [];
var grasseaterArr = [];
var predatorArr = [];
var XmenArr = [];
var RunnerArr = [];
function setup() {
    matrix = matrixGenerator(60);
    frameRate(10);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

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
            else if (matrix[y][x] == 3) {
                var pr = new Predator(x, y, 1);
                predatorArr.push(pr);
            }
            else if (matrix[y][x] == 4) {
                var xm = new Xmen(x, y, 1);
                XmenArr.push(xm);
            }
            else if (matrix[y][x] == 6) {
                var ru = new Runner(x, y, 1);
                RunnerArr.push(ru);
            }
        }
    }

}

function draw() {


    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("#00ff00");
                rect(x * side, y * side, side, side);


            }
            if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            if (matrix[y][x] == 4) {
                fill("black");
                rect(x * side, y * side, side, side);
            }
            if (matrix[y][x] == 6) {
                fill("white");
                rect(x * side, y * side, side, side);
            }

        }
    }
    if (grasseaterArr.length == grassArr.length / 2 || grasseaterArr.length>=grassArr.length ) {
        var newRun = random(grasseaterArr);
        var nx = newRun.x;
        var ny = newRun.y;
        if(newRun){
        for (var i in grasseaterArr) {
            if (nx == grasseaterArr[i].x && ny == grasseaterArr[i].y) {
                grasseaterArr.splice(i, 1);
                break;
            }
        }
        newRun = new Runner(nx, ny, 1);
        RunnerArr.push(newRun);
    }
    }
    if (XmenArr.length == grasseaterArr.length / 2  || XmenArr.length>=grasseaterArr.length) {
        var newRun1 = random(XmenArr);
        if(newRun1){
        var nx1 = newRun1.x;
        var ny1 = newRun1.y;
        for (var i in XmenArr) {
            if (nx1 == XmenArr[i].x && ny1 == XmenArr[i].y) {
                XmenArr.splice(i, 1);
                break;
            }
        }

        newRun1 = new Runner(nx1, ny1, 1);
        RunnerArr.push(newRun1);
    }
    }
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grasseaterArr) {
        grasseaterArr[i].eat();
    }
    for (var i in predatorArr) {
        predatorArr[i].eat();
    }
    for (var i in XmenArr) {
        XmenArr[i].eat();
    }
    for (var i in RunnerArr) {
        RunnerArr[i].eat();
    }
    // console.log("grass"+grassArr.length);
    // console.log("grassEater"+grasseaterArr.length);
    // console.log("predator"+predatorArr.length);
    // console.log("xman"+XmenArr.length);
    // console.log("runer"+RunnerArr.length);   
}


//matrix Generator
function matrixGenerator(l) {
    var m = [];
    for (var i = 0; i < l; i++) {
        m[i] = [];
        for (var j = 0; j < l; j++) {
            // Stexcel random tiv
            var rand = random(0, 100);
            // Lcnel matrix tokosayin haraberutyamb
            if (rand <= 40) {
                // Xot
                m[i][j] = 1;
            } else if (rand > 40 && rand <= 55) {
                // Xotaker
                m[i][j] = 2;
            } else if (rand > 55 && rand <= 60) {
                // Gishatich
                m[i][j] = 3;
            } else if (rand > 60 && rand <= 75) {
                // Nor kerpar 1
                m[i][j] = 4;
            } else if (rand > 75 && rand <= 77) {
                // Nor kerpar 2
                m[i][j] = 6;
            } else {
                // Datarkutyun
                m[i][j] = 0;
            }
        }
    }
    // Veradarcnel matrix
    return m;
}
