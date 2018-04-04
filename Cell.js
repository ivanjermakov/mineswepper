class Cell {
    constructor(i, j) {
        this.i = i;
        this.j = j;

        //0..8 - amount of mines around
        //-1 - mine;
        this.value = 0;
        this.isHidden = true;
        this.checked = false;
        this.neighbours = [];
    }

    setNeighbours() {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i !== 0 || j !== 0) {
                    if (this.i + i >= 0 && this.i + i < cols &&
                        this.j + j >= 0 && this.j + j < rows) {
                        this.neighbours.push(field[this.i + i][this.j + j]);
                    } else {
                        this.neighbours.push(new Cell());
                    }
                }
            }
        }
    }

    showEmptyNeighbours() {
        this.isHidden = false;
        for (let neighbour of this.neighbours) {
            if (neighbour.isHidden && neighbour.value === 0 && neighbour.neighbours.length > 0) {
                neighbour.showEmptyNeighbours();
            }
            neighbour.isHidden = false;
        }
    };

    showAdditionalValues() {
        for (let neighbour of this.neighbours) {
            if (neighbour.value !== -1) {
                neighbour.isHidden = false;
            }
        }
    }

    calculateValues() {
        //bombs value is constant and = -1
        if (this.value === -1) return;
        for (let neighbour of this.neighbours) {
            //if its a bomb
            if (neighbour.value === -1) {
                this.value++;
            }
        }
    }

    draw() {
        rectMode(CENTER);
        noStroke();

        if (!this.isHidden) {
            fill(70);
            rect(this.i * cellSize + cellSize / 2, this.j * cellSize + cellSize / 2, cellSize - 1, cellSize - 1, 1);

            if (this.value === 0) return;
            if (this.value === -1) {
                if (win) {
                    fill(80, 255, 100);
                    ellipse(this.i * cellSize + cellSize / 2, this.j * cellSize + cellSize / 2, cellSize / 2, cellSize / 2);
                } else {
                    fill(255, 80, 100);
                    ellipse(this.i * cellSize + cellSize / 2, this.j * cellSize + cellSize / 2, cellSize / 2, cellSize / 2);
                }
            } else {
                push();
                translate(0, 10);
                textAlign(CENTER);
                textSize(30);
                textFont('Calibri');
                fill(255);
                text(this.value, this.i * cellSize + cellSize / 2, this.j * cellSize + cellSize / 2);
                pop();
            }
        } else {
            fill(255);
            rect(this.i * cellSize + cellSize / 2, this.j * cellSize + cellSize / 2, cellSize - 1, cellSize - 1, 1);
            if (this.checked) {
                fill(255, 80, 100);
                rect(this.i * cellSize + cellSize / 2, this.j * cellSize + cellSize / 2, cellSize / 8, 0.7 * cellSize, 1);
            }
        }
    }

    leftClick() {
        if (this.checked) return;
        if (this.value === 0 && this.isHidden) {
            this.showEmptyNeighbours();
        }
        //TODO: think about it
        // if (this.value !== -1 && !this.isHidden) {
        //     this.showAdditionalValues();
        // }
        if (this.value === -1) {
            gameOver();
        }
        if (this.value !== -1) {
            if (this.value === 0) {
                this.showEmptyNeighbours();
            } else {
                this.isHidden = false;
            }
        }
    }

    rightClick() {
        if (this.isHidden) {
            this.checked = !this.checked;
        }
    }

}