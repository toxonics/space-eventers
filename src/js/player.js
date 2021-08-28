const { Bullet } = require('./bullet');

class Player {
    static dimensions = {
        width: 100,
        height: 30
    }

    static moveOffset = 25

    eventBus = null

    position = {
        left: 0,
        top: 0
    }

    bullets = {}

    eventHandlers = {
        moveLeft: (event) => {
            this.moveLeft()
        },
        moveRight: (event) => {
            this.moveRight()
        },
        fire: (event) => {
            this.fire()
        }
    }

    constructor(eventBus) {
        this.eventBus = eventBus
        
        this.position = this.calculateInitialPosition()

        this.eventBus.on('Input:ArrowLeft', this.eventHandlers.moveLeft)
        this.eventBus.on('Input:ArrowRight', this.eventHandlers.moveRight)
        this.eventBus.on('Input:Space', this.eventHandlers.fire)

        this.eventBus.on('BulletDestroyed', (event) => {
            this.bullets[event.detail.id].destructor()
            delete this.bullets[event.detail.id]
        })

        this.eventBus.emit('PlayerCreated', {
            dimensions: Player.dimensions,
            position: this.position
        })
    }

    calculateInitialPosition() {
        let canvasDimensions = document.getElementById('canvas').getBoundingClientRect()
        
        return {
            top: canvasDimensions.height - Player.dimensions.height - 20,
            left: (canvasDimensions.width - Player.dimensions.width) / 2
        }
    }

    moveLeft() {
        let moveTo = this.position.left - Player.moveOffset

        if (moveTo > 0) {
            this.position.left = moveTo
        }

        this.eventBus.emit('PlayerMoved', {
            position: this.position
        })
    }

    moveRight() {
        let moveTo = this.position.left + Player.moveOffset
        let playerRight = moveTo + Player.dimensions.width

        if (playerRight <= document.getElementById('canvas').offsetWidth) {
            this.position.left = moveTo
        }

        this.eventBus.emit('PlayerMoved', {
            position: this.position
        })
    }

    fire() {
        let bullet = new Bullet(this.position, Player.dimensions, this.eventBus)
        this.bullets[bullet.id] = bullet
    }
}

module.exports = {
    Player
}