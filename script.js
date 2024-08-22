// Initialize canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Create instances of each planet type
const planetType0 = createPlanet_type0();
planetType0.x = 100;
planetType0.y = 200;

const planetType1 = createPlanet_type1();
planetType1.x = 300;
planetType1.y = 200;

const planetType2 = createPlanet_type2();
planetType2.x = 500;
planetType2.y = 200;

const planetType3 = createPlanet_type3();
planetType3.x = 700;
planetType3.y = 200;

// Update and draw the planets
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    planetType0.draw(ctx);
    planetType1.updatePosition();
    planetType1.draw(ctx);
    planetType2.updatePosition();
    planetType2.draw(ctx);
    planetType3.updatePosition();
    planetType3.draw(ctx);
    
    requestAnimationFrame(update);
}

// Start the update loop
update();
