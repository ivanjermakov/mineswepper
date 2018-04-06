class Stopwatch {
    start() {
        this.stopped = false;
        this.start = new Date();
    }

    update() {
        if (!this.stopped) {
            this.current = new Date();
        }
    }

    stop() {
        this.stopped = true;
    }

    getSeconds() {
        this.update();
        return floor((this.current - this.start) / 1000);
    }
}