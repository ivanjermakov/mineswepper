class Cell {
    constructor(i, j, cellSize, cols, rows) {
        this.i = i;
        this.j = j;
        this.cellSize = cellSize;
        this.cols = cols;
        this.rows = rows;

        //0 - amount of mines around, -1 - mine;
        this.value = 0;
        this.isHidden = false;
        this.neighbours = [];
    }

    draw() {
        rectMode(CENTER);
        // stroke(200);
        noStroke();
        fill(255);
        rect(this.i * this.cellSize + this.cellSize / 2, this.j * this.cellSize + this.cellSize / 2,
            this.cellSize - 1, this.cellSize - 1);

        if (!this.isHidden) {
            textAlign(CENTER);
            textSize(30);
            textFont('Calibri');
            push();
            translate(0, 10);
            fill(0);
            text(this.value, this.i * this.cellSize + this.cellSize / 2, this.j * this.cellSize + this.cellSize / 2);
            pop();
        }
    }
}