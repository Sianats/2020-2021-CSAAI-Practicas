class Crono {

    constructor(display) {
        this.display = display;
        this.cent = 0, 
        this.seg = 0,  
        this.min = 0,  
        this.timer = 0;  
    }

    tic() {
        this.cent += 1;

        if (this.cent == 100) {
        this.seg += 1;
        this.cent = 0;
        }

        if (this.seg == 60) {
        this.min = 1;
        this.seg = 0;
        }

        this.display.innerHTML = this.min + ":" + this.seg + ":" + this.cent
    }

    start() {
        if (!this.timer) {
            this.timer = setInterval( () => {
                this.tic();
            });
        }
    }

    stop() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    reset() {
        this.cent = 0;
        this.seg = 0;
        this.min = 0;

        this.display.innerHTML = "0:0:0";
    }
}
