// Set up canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Canvas settings
const canvasWidth = 750;
const canvasHeight = 500;

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

// Planet settings
const planetTypes = [
    { name: 'planet_type0', color: 'red', size: 30 },
    { name: 'planet_type1', color: 'blue', size: 40, moons: [{ size: 5, orbitRadius: 20 }] },
    { name: 'planet_type2', color: 'green', size: 50, moons: [{ size: 5, orbitRadius: 20 }, { size: 10, orbitRadius: 30 }] },
    { name: 'planet_type3', color: 'purple', size: 60, moons: [{ size: 5, orbitRadius: 20 }, { size: 10, orbitRadius: 30 }, { size: 15, orbitRadius: 40 }] }
];
const planets = [];
const maxPlanets = 10;

// Generate random planets
function generatePlanets() {
    if (planets.length < maxPlanets) {
        const planetType = planetTypes[Math.floor(Math.random() * planetTypes.length)];
        const size = planetType.size;
        const x = canvasWidth + size;
        const y = Math.random() * (canvasHeight - size);
        planets.push({
            ...planetType,
            x: x,
            y: y,
            speed: 1
        });
    }
}

// Update planet positions
function updatePlanets() {
    planets.forEach((planet, index) => {
        planet.x -= planet.speed;
        if (planet.x < -planet.size) {
            planets.splice(index, 1); // Remove off-screen planets
        }
    });
}

// Draw planet
function drawPlanet(planet) {
    ctx.fillStyle = planet.color;
    ctx.beginPath();
    ctx.arc(planet.x, planet.y, planet.size / 2, 0, Math.PI * 2);
    ctx.fill();
    
    if (planet.moons) {
        planet.moons.forEach(moon => {
            moon.angle = (moon.angle || 0) + moon.orbitSpeed;
            const moonX = planet.x + Math.cos(moon.angle) * moon.orbitRadius;
            const moonY = planet.y + Math.sin(moon.angle) * moon.orbitRadius;
            ctx.fillStyle = 'grey';
            ctx.beginPath();
            ctx.arc(moonX, moonY, moon.size / 2, 0, Math.PI * 2);
            ctx.fill();
        });
    }
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
