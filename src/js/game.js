const { Player } = require('./player');
const { Evaders } = require('./evaders');

class Game {
    player = null

    evaders = null

    constructor(eventBus) {
        this.player = new Player(eventBus)

        this.evaders = new Evaders(eventBus)

        // tick tock
        setInterval(() => {
            eventBus.emit('tick')
        }, 50);
    }
}

module.exports = {
    Game
}