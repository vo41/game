function createPlanet_type0() {
    return {
        name: 'planet_type0',
        color: 'red',
        size: 30,
        speed: 0, // No movement
        x: 0,
        y: 0,
        updatePosition: function() {
            // No movement
        },
        draw: function(ctx) {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
            ctx.fill();
        }
    };
}
