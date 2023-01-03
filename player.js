class Player{
    constructor(size_x, size_y){
        this.x = 100;
        this.y = 0;
        this.size_x = size_x;
        this.size_y = size_y;
        this.speed = 0;
        this.isJump = false;
        this.state = 0;
    }

    draw(){
        if(this.state === 1 && this.y > settings.jumpHeight){
            this.speed_y = 0
            this.state = 2
        }
        if(this.state === 2 && this.y == 0){
            this.speed_y = 0
            this.state = 0
            this.isJump = false
        }
        switch(this.state){
            case 0: break;
            case 1: this.speed = 10; break;
            case 2: this.speed -= deltaTime/100 * settings.gravity; break;
        }
        this.y += this.speed
        if(this.y < 0){
            this.y = 0
        }
        fill(0 + color_change);
        rect(this.x, settings.canvasHeight - settings.floorHeight - this.size_y - this.y, this.size_x, this.size_y)
    }

    jump(){
        if(this.state === 0){
            this.isJump = true;
            this.state = 1
        }
    }

    fall(){
        if(this.state === 1){
            this.state = 2;
        }
    }
}