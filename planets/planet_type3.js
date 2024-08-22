function createPlanet_type3() {
    return {
        name: 'planet_type3',
        color: 'purple',
        size: 60,
        speed: 0, // No movement
        x: 0,
        y: 0,
        moons: [
            { x: 0, y: 0, size: 5, orbitRadius: 40, angle: 0, orbitSpeed: 0.01 },
            { x: 0, y: 0, size: 10, orbitRadius: 55, angle: Math.PI / 4, orbitSpeed: 0.02 },
            { x: 0, y: 0, size: 15, orbitRadius: 70, angle: Math.PI / 2, orbitSpeed: 0.03 }
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
                ctx.fillStyle = 'lightpurple';
                ctx.beginPath();
                ctx.arc(moon.x, moon.y, moon.size / 2, 0, Math.PI * 2);
                ctx.fill();
            });
        }
    };
}
