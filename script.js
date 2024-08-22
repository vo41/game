import { createPlanet_type0 } from './planet_type0.js';
import { createPlanet_type1 } from './planet_type1.js';
import { createPlanet_type2 } from './planet_type2.js';
import { createPlanet_type3 } from './planet_type3.js';

// Example usage
const planets = [
    createPlanet_type0(),
    createPlanet_type1(),
    createPlanet_type2(),
    createPlanet_type3()
];

// Update and draw planets in your game loop
planets.forEach(planet => {
    planet.updatePosition();
    planet.draw(ctx);
});
