// Set up canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Fixed canvas dimensions
const canvasWidth = 750;
const canvasHeight = 500;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

// Ship settings
const shipImage = new Image();
shipImage.src = 'images/ship.png';
const shipWidth = 50;
const shipHeight = 50;
let shipX = canvasWidth / 2 - shipWidth / 2;
let shipY = canvasHeight - shipHeight - 10;
const shipSpeed = 5;

// Sound settings
const moveSound = new Audio('sounds/move.mp3');
let soundPlaying = false;

// Array of planet creation functions
const planetCreationFunctions = [
    createPlanet_type0,
    createPlanet_type1,
    createPlanet_type2,
    createPlanet_type3
];

const planets = [];
const maxPlanets = 10;

// Generate random planets
function generatePlanets() {
    if (planets.length < maxPlanets) {
        const createPlanet = planetCreationFunctions[Math.floor(Math.random() * planetCreationFunctions.length)];
        const planet = createPlanet();
        planet.x = canvasWidth + planet.size;
        planet.y = Math.random() * (canvasHeight - planet.size);
        planets.push(planet);
    }
}

// Update planet positions
function updatePlanets() {
    planets.forEach((planet, index) => {
        planet.updatePosition();
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

// Update game visuals
function update() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight); // Clear the canvas
    generatePlanets();
    updatePlanets();
    drawShip();
    planets.forEach(drawPlanet);
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

// Main game loop
function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
