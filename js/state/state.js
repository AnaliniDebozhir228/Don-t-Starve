function helloState() {
    console.log("📊 Game State ready");
}

// Начальное состояние игры
window.GameState = {
    isRunning: false,
    score: 0,
    level: 1,
    
    init: function() {
        this.isRunning = true;
        console.log("🎯 State initialized");
        return this;
    },
    
    getState: function() {
        return {
            running: this.isRunning,
            score: this.score,
            level: this.level
        };
    },
    
    updateScore: function(points) {
        this.score += points;
        console.log(`📈 Score updated: ${this.score}`);
    }
};

helloState();

// Убедиться, что в методе movePlayer есть эта логика:
movePlayer: function(delta, speed = 180) {
    if(!this.gameActive || this.player.targetX === null) return;
    
    let dx = this.player.targetX - this.player.x;
    let dy = this.player.targetY - this.player.y;
    let dist = Math.hypot(dx, dy);
    
    if(dist < 5) {
        this.player.targetX = null;  // <-- остановка при достижении цели
        return;
    }
    
    let move = speed * delta;
    this.player.x += (dx / dist) * move;
    this.player.y += (dy / dist) * move;
    // ...
}
