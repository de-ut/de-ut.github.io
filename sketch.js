player = new Player(settings.playerWidth, settings.playerHeight)
walls = new Queue(5)

speed = settings.initSpeed

let score = 0
highscore = localStorage.getItem('mygameHighscore');
if (!highscore) {
    highscore = 0
}

let color_change = 0
night = false

distance = 0
tickerNext = 0

gameOver = false

function setup() {
    createCanvas(settings.canvasWidth, settings.canvasHeight);
}

function draw() {
    if (gameOver) {
        return
    }

    //color changing
    if (score >= 1000 && score % 1000 > 0 && score % 1000 < 200) {
        night = true
    } else {
        night = false
    }
    if (night && color_change != 240) {
        color_change += 10
    }
    if (!night && color_change != 0) {
        color_change -= 10
    }

    background(240 - color_change);
    document.getElementsByTagName('html')[0].style.backgroundColor = `rgb(${240 - color_change}, ${240 - color_change}, ${240 - color_change})`

    fill(0 + color_change)
    rect(0, settings.canvasHeight - settings.floorHeight, settings.canvasWidth, 2)


    if (walls.size != 0 && (walls.peek().x + walls.peek().size_x < 0)) {
        walls.pop()
    }

    distance += deltaTime / 100 * speed
    score = Math.round(distance / 25)

    if (distance > tickerNext) {
        walls.push(new Wall(settings.wallWidth, settings.wallHeight))
        tickerNext = distance + (500 + Math.random() * 1000)
    }

    speed += deltaTime / 1000

    for (let i = walls.head; i != walls.tail; i = (i + 1) % walls.cap) {
        walls.arr[i].draw(speed)
        if (player.y < walls.arr[i].size_y &&
            (player.x + player.size_x > walls.arr[i].x && player.x < walls.arr[i].x + walls.arr[i].size_x)) {
            fill(0 + color_change)
            textAlign(CENTER, CENTER);
            textSize(24);
            text(`GAME OVER\nSPACE TO AGAIN`, (settings.canvasWidth - 500) / 2, (settings.canvasHeight - 200) / 2, 500, 200)
            gameOver = true
            if (score > highscore) {
                highscore = score
                localStorage.setItem('mygameHighscore', score)
            }
        }
    }

    player.draw()

    fill(0 + color_change)
    textAlign(LEFT, TOP);
    textSize(16);
    text(`SCORE: ${score}\nHIGH: ${highscore}`, 20, 20);
}

function keyPressed() {
    if (gameOver) {
        player = new Player(settings.playerWidth, settings.playerHeight)
        walls = new Queue(5)

        speed = settings.initSpeed
        distance = 0
        score = 0
        tickerNext = 0

        gameOver = false

        color_change = 0
        return
    }

    if (keyCode == 32 || keyCode == 38) {
        console.log("SPACE PRESSED")
        player.jump()
    }
}

function touchStarted() {
    if (gameOver) {
        player = new Player(settings.playerWidth, settings.playerHeight)
        walls = new Queue(5)

        speed = settings.initSpeed
        distance = 0
        score = 0
        tickerNext = 0

        gameOver = false

        color_change = 0
        return
    }
    player.jump()
}

function keyReleased() {
    if (keyCode == 32 || keyCode == 38) {
        player.fall()
        console.log("SPACE RELEASED")
    }
}

function touchEnded() {
    player.fall()
}
