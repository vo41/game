export function createPlanet_type1() {
    return {
        name: 'planet_type1',
        color: 'red',
        size: 30,
        speed: 1,
        x: 0,
        y: 0,
        moon: {
            size: 10,
            distance: 40,
            angle: 0,
            speed: 0.05,
        },
        
        updatePosition: function() {
            this.x -= this.speed;
            this.moon.angle += this.moon.speed;
        },
        
        draw: function(ctx) {
            // Draw planet
                        ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
            ctx.fill();

            // Calculate moon position
            const moonX = this.x + Math.cos(this.moon.angle) * this.moon.distance;
            const moonY = this.y + Math.sin(this.moon.angle) * this.moon.distance;

            // Draw moon
            ctx.fillStyle = 'blue';
            ctx.beginPath();
            ctx.arc(moonX, moonY, this.moon.size / 2, 0, Math.PI * 2);
            ctx.fill();
        }
    };
}
