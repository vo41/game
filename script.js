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

// Planet Types
function createPlanet_type0() {
    return {
        name: 'planet_type0',
        color: 'red',
        size: 30,
        speed: 1,
        x: 0,
        y: 0,
        moons: [],
        updatePosition: function() {
            this.x -= this.speed;
        },
        draw: function(ctx) {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
            ctx.fill();
        }
    };
}

function createPlanet_type1() {
    return {
        name: 'planet_type1',
        color: 'blue',
        size: 40,
        speed: 1,
        x: 0,
        y: 0,
        moons: [{ size: 5, orbitRadius: 20, angle: 0, orbitSpeed: 0.02 }],
        updatePosition: function() {
            this.x -= this.speed;
            this.moons.forEach(moon => {
                moon.angle += moon.orbitSpeed;
                moon.x = this.x + Math.cos(moon.angle) * moon.orbitRadius;
                moon.y = this.y + Math.sin(moon.angle) * moon.orbitRadius;
            });
        },
        draw: function(ctx) {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
            ctx.fill();
            this.moons.forEach(moon => {
                ctx.fillStyle = 'grey';
                ctx.beginPath();
                ctx.arc(moon.x, moon.y, moon.size / 2, 0, Math.PI * 2);
                ctx.fill();
            });
        }
    };
}

function createPlanet_type2() {
    return {
        name: 'planet_type2',
        color: 'green',
        size: 50,
        speed: 1,
        x: 0,
        y: 0,
        moons: [
            { size: 5, orbitRadius: 20, angle: 0, orbitSpeed: 0.03 },
            { size: 10, orbitRadius: 30, angle: Math.PI / 4, orbitSpeed: -0.01 }
        ],
        updatePosition: function() {
            this.x -= this.speed;
            this.moons.forEach(moon => {
                moon.angle += moon.orbitSpeed;
                moon.x = this.x + Math.cos(moon.angle) * moon.orbitRadius;
                moon.y = this.y + Math.sin(moon.angle) * moon.orbitRadius;
            });
        },
        draw: function(ctx) {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
            ctx.fill();
            this.moons.forEach(moon => {
                ctx.fillStyle = 'grey';
                ctx.beginPath();
                ctx.arc(moon.x, moon.y, moon.size / 2, 0, Math.PI * 2);
                ctx.fill();
            });
        }
    };
}

function createPlanet_type3() {
    return {
        name: 'planet_type3',
        color: 'purple',
        size: 60,
        speed: 1,
        x: 0,
        y: 0,
        moons: [
            { size: 5, orbitRadius: 20, angle: 0, orbitSpeed: 0.02 },
            { size: 10, orbitRadius: 30, angle: Math.PI / 4, orbitSpeed: -0.01 },
            { size: 15, orbitRadius: 50, angle: Math.PI / 2, orbitSpeed: 0.03 }
        ],
        updatePosition: function() {
            this.x -= this.speed;
            this.moons.forEach(moon => {
                moon.angle += moon.orbitSpeed;
                moon.x = this.x + Math.cos(moon.angle) * moon.orbitRadius;
                moon.y = this.y + Math.sin(moon.angle) * moon.orbitRadius;
            });
        },
        draw: function(ctx) {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
            ctx.fill();
            this.moons.forEach(moon => {
                ctx.fillStyle = 'grey';
                ctx.beginPath();
                ctx.arc(moon.x, moon.y, moon.size / 2, 0, Math.PI * 2);
                ctx.fill();
            });
        }
    };
}

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
