let w = 600;
let h = 600;

let field;

let cellSize = 50;
let cols = w / cellSize;
let rows = h / cellSize;

let win;
let isGameOver;
let gameStarted;

let minesCount;
let minesLeftP = document.getElementById("minesLeft");

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
            field[i][j] = new Cell(i, j);
        }
    }

    let mines = 0;
    while (mines !== minesCount) {
        let i = floor(random(cols));
        let j = floor(random(rows));
        if (field[i][j].value !== -1) {
            field[i][j].value = -1;
            mines++;
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
    let cnv = createCanvas(w, h);
    cnv.parent("canvas");

    minesCount = 10;

    win = false;
    isGameOver = false;
    gameStarted = false;

    field = [];
    createField();

    background(150);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            field[i][j].setNeighbours();
            field[i][j].calculateValues();
        }
    }
};

draw = () => {
    drawField();
    checkForWin();

    if (mouseIsPressed) {
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                if (mouseX > i * cellSize && mouseX < i * cellSize + cellSize &&
                    mouseY > j * cellSize && mouseY < j * cellSize + cellSize) {
                    if (mouseButton === LEFT && !field[i][j].isHidden) {
                        for (let neighbour of field[i][j].neighbours) {
                            neighbour.highlighted = true;
                        }
                    }
                }
            }
        }
    }

    minesLeftP.innerText = minesCount;
};

mouseClicked = () => {
    if (mouseButton === LEFT) {
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                if (mouseX > i * cellSize && mouseX < i * cellSize + cellSize &&
                    mouseY > j * cellSize && mouseY < j * cellSize + cellSize) {
                    //first click is always lose-free
                    if (!gameStarted) {
                        while (field[i][j].value === -1) {
                            setup();
                        }

                        gameStarted = true;
                    }
                    field[i][j].leftClick();
                    return;
                }
            }
        }
    }
};

mousePressed = () => {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (mouseX > i * cellSize && mouseX < i * cellSize + cellSize &&
                mouseY > j * cellSize && mouseY < j * cellSize + cellSize) {
                if (mouseButton === RIGHT) {
                    field[i][j].rightClick();
                }
            }
        }
    }

};

mouseReleased = () => {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            field[i][j].highlighted = false;
        }
    }
};

keyPressed = () => {
    if (keyCode === 82) {
        setup();
    }
};

gameOver = () => {
    isGameOver = true;
    for (let col of field) {
        for (let cell of col) {
            cell.isHidden = false;
        }
    }

};

checkForWin = () => {
    for (let col of field) {
        for (let cell of col) {
            if ((cell.value === -1 && !cell.checked) || (cell.value !== -1 && cell.isHidden)) {
                return;
            }
        }
    }

    win = true;

    for (let col of field) {
        for (let cell of col) {
            cell.isHidden = false;
        }
    }
};