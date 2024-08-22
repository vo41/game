import { createPlanet_type0 } from './planet_type0.js';
import { createPlanet_type1 } from './planet_type1.js';
import { createPlanet_type2 } from './planet_type2.js';
import { createPlanet_type3 } from './planet_type3.js';

// Set up canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size (750x500)
canvas.width = 750;
canvas.height = 500;

// Create instances of each planet type
const planets = [
    createPlanet_type0(),
    createPlanet_type1(),
    createPlanet_type2(),
    createPlanet_type3()
];

// Position them in a row
planets.forEach((planet, index) => {
    planet.x = 150 + index * 150; // Space them out horizontally
    planet.y = canvas.height / 2; // Center them vertically
});

// Game loop to draw the planets
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    // Draw all planets
    planets.forEach(planet => {
        planet.draw(ctx);
    });

    requestAnimationFrame(draw); // Continue the loop
}

// Start the visualization
draw();
