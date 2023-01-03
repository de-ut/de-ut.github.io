class Wall{
    constructor(size_x, size_y){
        this.x = settings.canvasWidth + 50;
        this.y = 0;
        this.size_x = size_x;
        this.size_y = size_y;
    }

    draw(speed){
        this.x -= deltaTime/100 * speed
        fill(0 + color_change)
        rect(this.x, settings.canvasHeight - settings.floorHeight - this.size_y - this.y, this.size_x, this.size_y)
    }
}