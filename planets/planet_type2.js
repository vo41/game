function createPlanet_type2() {
    return {
        name: 'planet_type2',
        color: 'green',
        size: 40,
        speed: 1,
        x: 0,
        y: 0,
        moons: [
            { x: 0, y: 0, size: 15, orbitRadius: 50, angle: 0, orbitSpeed: 0.01 },
            { x: 0, y: 0, size: 15, orbitRadius: 80, angle: Math.PI / 3, orbitSpeed: 0.02 }
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
                ctx.fillStyle = 'lightgreen';
                ctx.beginPath();
                ctx.arc(moon.x, moon.y, moon.size / 2, 0, Math.PI * 2);
                ctx.fill();
            });
        }
    };
}
