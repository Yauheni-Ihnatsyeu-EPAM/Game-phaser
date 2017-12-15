class Chest extends AbstactItem {
    constructor(opts) {
        super(opts);
        this.frame = 6;
        this.animationLength = opts.animationLength;

    }
    openChest(chest) {
        this.frame = 7;
    }
    closeFrame() {
        this.frame = 6;
    }
}