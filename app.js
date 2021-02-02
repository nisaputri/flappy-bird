document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')

    //create the object, which is the bird
    let birdLeft = 220         
    let birdBottom = 100
    let gravity = 2
    let isGameOver = false
    let gap = 430


    //create a start game function
    function startGame() {                      
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }
    let gameTimerId = setInterval(startGame, 20)


    // create a function named control for an Event
    function control(e) {
        if (e.keyCode === 32) {
            jump()
        }
    }


    function jump() {
        //if the bird is no more than 500
        if (birdBottom < 500) birdBottom += 50
        bird.style.bottom = birdBottom + 'px'
        //let the user inspect the gravity on the consule
        console.log(birdBottom) 
    }

    //if the user click any button on the Keyboard, the bird jumps
    document.addEventListener('keyup', control)



    function generateObstacle() {
        let obstacleLeft = 500
        let randomHeight = Math.random() * 60
        let obstacleBottom = randomHeight
        const obstacle = document.createElement('div')
        const topObstacle = document.createElement('div')
        if (!isGameOver) {
            obstacle.classList.add('obstacle')
            topObstacle.classList.add('topObstacle')
        }
        gameDisplay.appendChild(obstacle)
        gameDisplay.appendChild(topObstacle)
        obstacle.style.left = obstacleLeft + 'px'
        topObstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBottom + 'px'
        topObstacle.style.bottom = obstacleBottom + gap +'px'

        function moveObstacle() {
            obstacleLeft -=2
            obstacle.style.left = obstacleLeft +'px'
            topObstacle.style.left = obstacleLeft +'px'

            if (obstacleLeft === -60) {
                clearInterval(timerId)
                gameDisplay.removeChild(obstacle)
                gameDisplay.replaceChild(topObstacle)
            }
            if (
                obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 &&
                (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap - 200) ||
                birdBottom === 0 
                ) {
                gameOver()
                clearInterval(timerId)
            }

        }
        let timerId = setInterval(moveObstacle, 20)
        if (!isGameOver) setTimeout(generateObstacle, 3000) //3 seconds

    }
    generateObstacle()

    function gameOver() {
        clearInterval(gameTimerId)
        console.log('GAME OVER')
        isGameOver = true
        document.removeEventListener('keyup', control)

    }

} )