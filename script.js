// Set up canvas and context with HD/Retina scaling
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
const canvasWidth = 750;
const canvasHeight = 500;

// Apply device pixel ratio for HD/Retina scaling
const dpr = window.devicePixelRatio || 1;
canvas.width = canvasWidth * dpr;
canvas.height = canvasHeight * dpr;
ctx.scale(dpr, dpr);

// Load ship image
const shipImage = new Image();
shipImage.src = 'images/ship.png';
const shipWidth = 50;
const shipHeight = 50;
let shipX = canvasWidth / 2 - shipWidth / 2;
let shipY = canvasHeight - shipHeight - 10;
const shipSpeed = 5;

// Load sound
const moveSound = new Audio('sounds/move.mp3');
let soundPlaying = false;

// Initialize score
let score = 0;

// Array of planet creation functions
const planetCreationFunctions = [
    createPlanet_type0,
    createPlanet_type1,
    createPlanet_type2,
    createPlanet_type3
];

const planets = [];
const maxPlanets = 20; // Maximum number of planets on the screen at one time

// Function to generate random planets
function generatePlanets() {
    if (planets.length < maxPlanets) {
        // Random number of planets to generate
        const numPlanets = Math.floor(Math.random() * 5) + 1;  // 1 to 5 planets

        for (let i = 0; i < numPlanets; i++) {
            const createPlanet = planetCreationFunctions[Math.floor(Math.random() * planetCreationFunctions.length)];
            let planet;
            let attempts = 0;
            const maxAttempts = 100; // Maximum attempts to avoid overlap

            do {
                planet = createPlanet();
                planet.x = canvasWidth + planet.size;  // Start off-screen to the right
                planet.y = Math.random() * (canvasHeight - planet.size);  // Random vertical position
                attempts++;
            } while (isOverlapping(planet) && attempts < maxAttempts);

            if (!isOverlapping(planet)) {
                planet.speed = planetSpeed;
                planets.push(planet);
            }
        }
    }
}

// Check if the new planet overlaps with existing planets
function isOverlapping(newPlanet) {
    for (const planet of planets) {
        const distance = Math.hypot(planet.x - newPlanet.x, planet.y - newPlanet.y);
        if (distance < (planet.size + newPlanet.size) / 2) {
            return true; // Overlapping
        }
        // Check moons
        for (const moon of planet.moons || []) {
            const moonDistance = Math.hypot(moon.x - newPlanet.x, moon.y - newPlanet.y);
            if (moonDistance < (moon.size + newPlanet.size) / 2) {
                return true; // Overlapping with moon
            }
        }
    }
    return false; // No overlap
}

// Update planet positions
function updatePlanets() {
    planets.forEach((planet, index) => {
        planet.x -= planet.speed;  // Move the planet to the left
        planet.updatePosition();   // Update position for moons if any
        if (planet.x < -planet.size) {
            planets.splice(index, 1); // Remove off-screen planets
        }
    });
}

// Draw planet
function drawPlanet(planet) {
    planet.draw(ctx);
}

// Draw ship
function drawShip() {
    ctx.drawImage(shipImage, shipX, shipY, shipWidth, shipHeight);
}

// Check for collision between ship and any planet/moon
function checkCollisions() {
    for (const planet of planets) {
        const dx = shipX + shipWidth / 2 - planet.x;
        const dy = shipY + shipHeight / 2 - planet.y;
        const distance = Math.hypot(dx, dy);

        if (distance < planet.size / 2) {
            return true; // Collision with planet
        }

        for (const moon of planet.moons || []) {
            const moonDx = shipX + shipWidth / 2 - moon.x;
            const moonDy = shipY + shipHeight / 2 - moon.y;
            const moonDistance = Math.hypot(moonDx, moonDy);

            if (moonDistance < moon.size / 2) {
                return true; // Collision with moon
            }
        }
    }
    return false;
}

// Update game visuals
function update() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight); // Clear the canvas
    generatePlanets();
    updatePlanets();
    drawShip();
    planets.forEach(drawPlanet);

    if (checkCollisions()) {
        alert('Game Over! Your Score: ' + score);
        document.location.reload(); // Reload the page to restart the game
    }
}

// Event listeners for ship movement and sound
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            shipY -= shipSpeed;
            break;
        case 'ArrowDown':
            shipY += shipSpeed;
            break;
        case 'ArrowLeft':
            shipX -= shipSpeed;
            break;
        case 'ArrowRight':
            shipX += shipSpeed;
            break;
    }
    // Prevent the ship from going off-screen
    shipX = Math.max(0, Math.min(canvasWidth - shipWidth, shipX));
    shipY = Math.max(0, Math.min(canvasHeight - shipHeight, shipY));
    
    // Play sound if any arrow key is pressed
    if (!soundPlaying) {
        moveSound.loop = true;
        moveSound.play();
        soundPlaying = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        moveSound.pause();
        moveSound.currentTime = 0;
        soundPlaying = false;
    }
});

// Update score
function updateScore() {
    scoreElement.textContent = 'Score: ' + score;
}

// Main game loop
function gameLoop() {
    update();
    updateScore(); // Update score display
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
