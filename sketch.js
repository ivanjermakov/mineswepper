let w = 600;
let h = 600;

let cellSize = 60;
let cols = w / cellSize;
let rows = h / cellSize;

let field;

let hardness = 10; //percentage of bombs

createMatrix = (cols, rows) => {
    let matrix = [];
    for (let i = 0; i < cols; i++) {
        matrix[i] = [rows];
    }
    return matrix;
};

createField = () => {
    field = createMatrix(cols, rows);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            field[i][j] = new Cell(i, j, cellSize, cols, rows);
            if (hardness > floor(random() * 100)) {
                field[i][j].value = -1;
            }
        }
    }
};

drawField = () => {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            field[i][j].draw();
        }
    }
};

setup = () => {
    createCanvas(w, h);

    createField();

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            field[i][j].calculateValues();
        }
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            field[i][j].setNeighbours();
            field[i][j].calculateValues();
        }
    }
};

draw = () => {
    background(150);

    drawField();
};

mouseClicked = () => {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (mouseX > i * cellSize && mouseX < i * cellSize + cellSize &&
                mouseY > j * cellSize && mouseY < j * cellSize + cellSize) {
                field[i][j].leftClick();
            }
        }
    }
};

mousePressed = () => {
    if (mouseButton === RIGHT) {
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                if (mouseX > i * cellSize && mouseX < i * cellSize + cellSize &&
                    mouseY > j * cellSize && mouseY < j * cellSize + cellSize) {
                    field[i][j].rightClick();
                }
            }
        }
    }
};

gameOver = () => {
    for (let col of field) {
        for (let cell of col) {
            cell.isHidden = false;
        }
    }
};