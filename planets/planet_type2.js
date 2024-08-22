function createPlanet_type2() {
    return {
        name: 'planet_type2',
        color: 'red',
        size: 50,
        speed: 0, // No movement
        x: 0,
        y: 0,
        moons: [
            { x: 0, y: 0, size: 5, orbitRadius: 35, angle: 0, orbitSpeed: 0.01 },
            { x: 0, y: 0, size: 10, orbitRadius: 50, angle: Math.PI / 3, orbitSpeed: -0.02 }
        ],
        updatePosition: function() {
            // Update moon positions
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
            // Draw moons
            this.moons.forEach(moon => {
                ctx.fillStyle = 'lightgrey';
                ctx.beginPath();
                ctx.arc(moon.x, moon.y, moon.size / 2, 0, Math.PI * 2);
                ctx.fill();
            });
        }
    };
}
