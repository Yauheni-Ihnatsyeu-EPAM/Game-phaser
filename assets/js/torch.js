class Torch extends AbstactItem {
    constructor(opts) {
        super(opts);
        this.frameNum = 0;
        this.frame = 12;
        this.lastResult = 0;
        this.animationLength = opts.animationLength || 15;

    }
    update() {
        if (this.frameNum === this.animationLength) {
            this.frameNum = 0;
            this.frame = this.randomWithProbability();
        }
        this.frameNum++;
    }
    randomWithProbability() {
        var notRandomNumbers = [13, 12, 14];
        var idx = Math.floor(Math.random() * notRandomNumbers.length);
        if (this.lastResult === notRandomNumbers[idx])
            this.randomWithProbability();
        this.lastResult = notRandomNumbers[idx];
        return notRandomNumbers[idx];
    }
}