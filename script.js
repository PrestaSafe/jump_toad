const character = document.getElementById('character');

let isJumping = false;
let isMovingLeft = false;
let isMovingRight = false;
let position = 0;  // La position initiale du personnage.

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && !isJumping) {
        jump();
    }
    if (event.code === 'ArrowLeft' && !isMovingLeft) {
        moveLeft();
    }
    if (event.code === 'ArrowRight' && !isMovingRight) {
        moveRight();
    }
});

document.addEventListener('keyup', function(event) {
    if (event.code === 'ArrowLeft') {
        isMovingLeft = false;
    }
    if (event.code === 'ArrowRight') {
        isMovingRight = false;
    }
});

function moveLeft() {
    checkCollision();
    isMovingLeft = true;
    let moveInterval = setInterval(function() {
        if (!isMovingLeft) {
            clearInterval(moveInterval);
        } else {
            position -= 5;
            character.style.left = position + 'px';
        }
    }, 20);
}

function moveRight() {
    checkCollision();
    isMovingRight = true;
    let moveInterval = setInterval(function() {
        if (!isMovingRight) {
            clearInterval(moveInterval);
        } else {
            position += 5;
            character.style.left = position + 'px';
        }
    }, 20);
}



function jump() {
    isJumping = true;
    character.classList.add('jumping');  // Ajoute la classe CSS 'jumping' au personnage

    let jumpHeight = 0;
    let jumpCount = 0;
    playSound();
    let upInterval = setInterval(function() {
        if (jumpCount >= 20) {
            clearInterval(upInterval);
            // Descendre
            let downInterval = setInterval(function() {
                if (jumpCount <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                    character.classList.remove('jumping');  // Retire la classe CSS 'jumping' du personnage
                } else {
                    jumpHeight -= 5;
                    character.style.bottom = jumpHeight + 'px';
                    jumpCount--;
                }
            }, 20);
        } else {
            jumpHeight += 5;
            character.style.bottom = jumpHeight + 'px';
            jumpCount++;
        }
    }, 20);

}

// ... (Le reste du code reste inchangé) ...

const sound = document.getElementById('sound');

function playSound() {
    sound.currentTime = 0;  // Remet le son au début
    sound.muted = false;    // Désactive le mode muet
    sound.play();
}

// ... (Le reste du code reste inchangé) ...



// ... (Le reste du code reste inchangé) ...

let lives = 2;
const livesElement = document.getElementById('lives');

function loseLife() {
    if (lives > 0) {
        lives--;
        const hearts = document.querySelectorAll('.life');
        hearts[lives].style.opacity = '0.3';  // "Grise" le coeur pour indiquer la perte d'une vie.
    }
    if (lives <= 0) {
        // Faites quelque chose lorsque le joueur perd toutes ses vies, par exemple :
        alert('Vous avez perdu !');
        // Réinitialiser le jeu ou rediriger vers une autre page, etc.
    }
}

// ... (Le reste du code reste inchangé) ...
const obstacles = document.querySelectorAll('.obstacle');

// Collision function
function checkCollision() {
    const characterRect = character.getBoundingClientRect();

    obstacles.forEach(obstacle => {
        const obstacleRect = obstacle.getBoundingClientRect();

        if (characterRect.left < obstacleRect.right &&
            characterRect.right > obstacleRect.left &&
            characterRect.top < obstacleRect.bottom &&
            characterRect.bottom > obstacleRect.top) {
                loseLife();
        }
    })
}

// ... (Le reste du code reste inchangé) ...

let isMovingUp = false;
let isMovingDown = false;
let verticalPosition = 0;  // La position verticale initiale du personnage.

document.addEventListener('keydown', function(event) {
    // ... (Le reste du code reste inchangé) ...
    
    if (event.code === 'ArrowUp' && !isMovingUp) {
        moveUp();
    }
    if (event.code === 'ArrowDown' && !isMovingDown) {
        moveDown();
    }
});

document.addEventListener('keyup', function(event) {
    // ... (Le reste du code reste inchangé) ...
    
    if (event.code === 'ArrowUp') {
        isMovingUp = false;
    }
    if (event.code === 'ArrowDown') {
        isMovingDown = false;
    }
});

function moveUp() {
    isMovingUp = true;
    let moveInterval = setInterval(function() {
        if (!isMovingUp) {
            clearInterval(moveInterval);
        } else {
            verticalPosition += 5;
            character.style.bottom = verticalPosition + 'px';
            checkCollision();
        }
    }, 20);
}

function moveDown() {
    isMovingDown = true;
    let moveInterval = setInterval(function() {
        if (!isMovingDown) {
            clearInterval(moveInterval);
        } else {
            verticalPosition -= 5;
            character.style.bottom = verticalPosition + 'px';
            checkCollision();
        }
    }, 20);
}

// ... (Le reste du code reste inchangé) ...
// ... (Le reste du code reste inchangé) ...

const game = document.querySelector('.game');
const gameRect = game.getBoundingClientRect();
const obstacleSize = 30;  // Taille de l'obstacle définie dans le CSS

// Cette fonction déplace l'obstacle à une position aléatoire à l'intérieur de .game
function moveObstacleRandomly() {
    obstacles.forEach(obstacle => {
        const randomX = Math.random() * (gameRect.width - obstacleSize);
        const randomY = Math.random() * (gameRect.height - obstacleSize);

        obstacle.style.left = randomX + 'px';
        obstacle.style.bottom = randomY + 'px';
    });
}

// Appeler moveObstacleRandomly toutes les 2 secondes
setInterval(moveObstacleRandomly, 150);

// ... (Le reste du code reste inchangé) ...
