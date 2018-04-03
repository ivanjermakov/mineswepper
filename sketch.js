let w = 600;
let h = 600;

let cellSize = 50;
let cols = w / cellSize;
let rows = h / cellSize;

let field;

let hardness = 10; //percentage of bombs

function createMatrix(cols, rows) {
    let matrix = [];
    for (let i = 0; i < cols; i++) {
        matrix[i] = [rows];
    }
    return matrix;
}

function createField() {
    field = createMatrix(cols, rows);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            field[i][j] = new Cell(i, j, cellSize, cols, rows);
            if (hardness > floor(random() * 100)) {
                field[i][j].value = -1;
            }
        }
    }
}

function drawField() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            field[i][j].draw();
        }
    }
}

function setup() {
    createCanvas(w, h);

    createField(w / cellSize, h / cellSize);

}

function draw() {
    background(41);

    drawField();
}