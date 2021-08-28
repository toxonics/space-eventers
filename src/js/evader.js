class Evader {
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
        bulletMoved: (event) => {
            this.checkBullet(event.detail)
        }
    }

    constructor(position, eventBus) {
        this.eventBus = eventBus

        this.id = 'evader-' + Math.random().toString(36).substring(10)

        this.position = {
            top: position.top,
            left: position.left
        }

        this.eventBus.emit('EvaderCreated', {
            id: this.id,
            dimensions: Evader.dimensions,
            position: this.position
        })

        this.eventBus.on('BulletMoved', this.eventHandlers.bulletMoved)
    }

    destructor() {
        this.eventBus.off('BulletMoved', this.eventHandlers.bulletMoved)
    }

    checkBullet(bullet) {
        if (
            (this.position.top + Evader.dimensions.height) >= bullet.position.top && 
            this.position.left <= bullet.position.left &&
            (this.position.left + Evader.dimensions.width) > bullet.position.left
        ) {
            this.eventBus.emit('BulletDestroyed', {
                id: bullet.id,
            })
            this.eventBus.emit('EvaderDestroyed', {
                id: this.id,
            })
        }
    }
}

module.exports = {
    Evader
}