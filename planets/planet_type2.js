export function createPlanet_type2() {
    return {
        name: 'planet_type2',
        color: 'red',
        size: 30,
        speed: 1,
        x: 0,
        y: 0,
        moons: [
            {
                size: 10,
                distance: 40,
                angle: 0,
                speed: 0.05,
            },
            {
                size: 15,
                distance: 60,
                angle: Math.PI,
                speed: 0.03,
            }
        ],
        
        updatePosition: function() {
            this.x -= this.speed;
            this.moons.forEach(moon => {
                moon.angle += moon.speed;
            });
        },
        
        draw: function(ctx) {
            // Draw planet
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
            ctx.fill();

            // Draw moons
            this.moons.forEach(moon => {
                const moonX = this.x + Math.cos(moon.angle) * moon.distance;
                const moonY = this.y + Math.sin(moon.angle) * moon.distance;

                ctx.fillStyle = 'blue';
                ctx.beginPath();
                ctx.arc(moonX, moonY, moon.size / 2, 0, Math.PI * 2);
                ctx.fill();
            });
        }
    };
}
