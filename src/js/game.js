const { Player } = require('./player');
const { Eventers } = require('./eventers');
const { Missile } = require('./missile');

class Game {
    eventBus = null

    player = null

    eventers = {
        
    }

    missiles = {

    }

    eventHandlers = {
        playerFired: (event) => {
            this.createMisile(event.detail.position)
        }
    }

    constructor(canvasDimensions, eventBus) {
        this.eventBus = eventBus

        this.player = new Player(canvasDimensions, eventBus)

        this.eventers = new Eventers(canvasDimensions, eventBus)

        this.eventBus.on('PlayerFired', this.eventHandlers.playerFired)

        this.eventBus.on('MissileDestroyed', (event) => {
            this.missiles[event.detail.id].destructor()
            delete this.missiles[event.detail.id]
        })
    }

    createMisile(PlayerPosition) {
        let missile = new Missile(PlayerPosition, Player.dimensions, this.eventBus)
        this.missiles[missile.id] = missile
    }
}

module.exports = {
    Game
}