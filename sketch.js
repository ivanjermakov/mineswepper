//disable double click selection
document.addEventListener('mousedown', function (e) {
    e.preventDefault();
}, false);

let field;

let cellSize;
let cols;
let rows;

let w;
let h;

let win;
let isGameOver;
let gameStarted;

let minesCount;
let minesLeftP = document.getElementById("minesLeft");

load = () => {
    cols = 20;
    rows = 10;
    minesCount = 16;

    let difficulty = document.getElementById("levels").value;
    switch (difficulty) {
        case '1':
            cols = 30;
            rows = 15;
            minesCount = 50;
            break;
        case '2':
            cols = 40;
            rows = 20;
            minesCount = 100;
            break;
    }

    cellSize = 600 / rows;
    w = cols * cellSize;
    h = rows * cellSize;
};

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
    //load user mode from html form
    load();

    let cnv = createCanvas(w, h);
    cnv.parent("canvas");

    win = false;
    isGameOver = false;
    gameStarted = false;

    field = [];
    createField();

    //limit frame rate to increase performance
    frameRate(30);

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
                return false;
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
    return false;
};

mouseReleased = () => {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            field[i][j].highlighted = false;
        }
    }

    return false;
};

keyPressed = () => {
    if (keyCode === 82) {
        setup();
    }

    return false;
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