class Player {
    static dimensions = {
        width: 100,
        height: 30
    }

    static moveOffset = 25

    canvasDimensions = null

    eventBus = null

    position = {
        left: 0,
        top: 0
    }

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

    constructor(canvasDimensions, eventBus) {
        this.canvasDimensions = canvasDimensions
        this.eventBus = eventBus
        
        this.position = this.initializePosition(this.canvasDimensions)

        this.eventBus.on('Input:ArrowLeft', this.eventHandlers.moveLeft)
        this.eventBus.on('Input:ArrowRight', this.eventHandlers.moveRight)
        this.eventBus.on('Input:Space', this.eventHandlers.fire)

        this.eventBus.emit('PlayerCreated', {
            dimensions: Player.dimensions,
            position: this.position
        })
    }

    initializePosition(canvasDimensions) {
        return {
            top: canvasDimensions.height - Player.dimensions.height - 20, // 20px away from bottom
            left: (canvasDimensions.width - Player.dimensions.width) / 2 // horizontal center of screen
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

        if (playerRight <= this.canvasDimensions.right) {
            this.position.left = moveTo
        }

        this.eventBus.emit('PlayerMoved', {
            position: this.position
        })
    }

    fire() {
        this.eventBus.emit('PlayerFired', {
            position: this.position
        })
    }
}

module.exports = {
    Player
}