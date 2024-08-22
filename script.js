import { createPlanet_type0 } from './planet_type0.js';
import { createPlanet_type1 } from './planet_type1.js';
import { createPlanet_type2 } from './planet_type2.js';
import { createPlanet_type3 } from './planet_type3.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Create the planets
const planets = [
    createPlanet_type0(),
    createPlanet_type1(),
    createPlanet_type2(),
    createPlanet_type3()
];

// Position planets in a row
planets.forEach((planet, index) => {
    planet.x = 100 + index * 150;  // Space them out
    planet.y = canvas.height / 2;  // Center vertically
});

// Main draw loop
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    planets.forEach(planet => {
        planet.draw(ctx);  // Draw each planet
    });

    requestAnimationFrame(draw);  // Loop the draw function
}

draw();  // Start drawing
