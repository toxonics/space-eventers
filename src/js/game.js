const { Player } = require('./player');
const { Eventers } = require('./eventers');

class Game {
    player = null

    eventers = {
        
    }

    constructor(eventBus) {
        this.player = new Player(eventBus)

        this.eventers = new Eventers(eventBus)
    }
}

module.exports = {
    Game
}