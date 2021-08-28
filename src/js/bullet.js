class Bullet {
    static dimensions = {
        width: 3,
        height: 8
    }

    static moveOffset = 10

    eventBus = null

    id = ''

    position = {
        top: 0,
        left: 0
    }

    eventHandlers = {
        tick: (event) => {
            this.move()
        }
    }

    constructor(playerPosition, playerDimensions, eventBus) {
        this.eventBus = eventBus

        this.id = 'bullet-' + Math.random().toString(36).substring(10)

        this.position = this.calculateInitialPosition(playerPosition, playerDimensions)

        this.eventBus.on('tick', this.eventHandlers.tick)
        
        this.eventBus.emit('BulletFired', {
            id: this.id,
            dimensions: Bullet.dimensions,
            position: this.position
        })
    }

    destructor() {
        this.eventBus.off('tick', this.eventHandlers.tick)
    }

    calculateInitialPosition(playerPosition, playerDimensions) {
        return {
            top: playerPosition.top - Bullet.dimensions.height,
            left: playerPosition.left + (playerDimensions.width / 2)
        }
    }

    move() {
        let moveTo = this.position.top - Bullet.moveOffset

        if (moveTo > 0) {
            this.position.top = moveTo

            this.eventBus.emit('BulletMoved', {
                id: this.id,
                position: this.position
            })
        } else {
            this.eventBus.emit('BulletDestroyed', {
                id: this.id,
            })
        }
    }
}

module.exports = {
    Bullet
}