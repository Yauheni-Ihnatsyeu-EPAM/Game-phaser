class Item extends AbstactItem {
    constructor(opts) {
        super(opts);
        this.frameNum = opts.itemType;
        this.animationLength = opts.animationLength || 15;

    }
}