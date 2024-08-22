const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Create the planets
const planets = [
    createPlanet_type0(),
    createPlanet_type1(),
    createPlanet_type2(), // Ensure these functions exist similarly
    createPlanet_type3()  // Ensure these functions exist similarly
];

// Position planets in a row
planets.forEach((planet, index) => {
    planet.x = 100 + index * 150;
    planet.y = canvas.height / 2;
});

// Main draw loop
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    planets.forEach(planet => {
        planet.updatePosition(); // Update the planet's position
        planet.draw(ctx);        // Draw each planet
    });

    requestAnimationFrame(draw);  // Loop the draw function
}

draw();  // Start drawing
