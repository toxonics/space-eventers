const { generateRandomId } = require('./util');

class Eventer {
    static dimensions = {
        width: 100,
        height: 30
    }

    static moveOffset = 25

    eventBus = null

    id = ''

    position = {
        top: 0,
        left: 0
    }

    eventHandlers = {
        missileMoved: (event) => {
            this.checkMissileCollision(event.detail)
        }
    }

    constructor(position, eventBus) {
        this.eventBus = eventBus

        this.id = generateRandomId('eventer')

        this.position = {
            top: position.top,
            left: position.left
        }

        this.eventBus.emit('EventerCreated', {
            id: this.id,
            dimensions: Eventer.dimensions,
            position: this.position
        })

        this.eventBus.on('MissileMoved', this.eventHandlers.missileMoved)
    }

    destructor() {
        this.eventBus.off('MissileMoved', this.eventHandlers.missileMoved)
    }

    checkMissileCollision(missile) {
        if (
            (this.position.top + Eventer.dimensions.height) >= missile.position.top && 
            this.position.left <= missile.position.left &&
            (this.position.left + Eventer.dimensions.width) > missile.position.left
        ) {
            this.eventBus.emit('MissileDestroyed', {
                id: missile.id,
            })
            this.eventBus.emit('EventerDestroyed', {
                id: this.id,
            })
        }
    }
}

module.exports = {
    Eventer
}