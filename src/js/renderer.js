class Renderer {
    canvas = null

    player = null

    constructor(eventBus) {
        this.eventBus = eventBus

        this.createCanvas()

        this.eventBus.on('PlayerCreated', (event) => {
            this.createPlayer(event)
        })

        this.eventBus.on('PlayerMoved', (event) => {
            this.movePlayer(event)
        })

        this.eventBus.on('MissileFired', (event) => {
            this.createMissile(event)
        })

        this.eventBus.on('MissileMoved', (event) => {
            this.moveMissile(event)
        })

        this.eventBus.on('MissileDestroyed', (event) => {
            this.destroyMissile(event)
        })

        this.eventBus.on('EventerCreated', (event) => {
            this.createEventer(event)
        })

        this.eventBus.on('EventerDestroyed', (event) => {
            this.destroyEventer(event)
        })
    }

    createCanvas() {
        this.canvas = document.createElement('div')
        this.canvas.id = 'canvas'
        this.canvas.style.width = window.innerWidth + 'px'
        this.canvas.style.height = window.innerHeight + 'px'

        let [body] = document.getElementsByTagName('body')
        body.appendChild(this.canvas)
    }

    createPlayer(event) {
        this.player = document.createElement('div')
        this.player.id = 'player'
        this.player.style.width = event.detail.dimensions.width + 'px'
        this.player.style.height = event.detail.dimensions.height + 'px'
        this.player.style.top = event.detail.position.top + 'px'
        this.player.style.left = event.detail.position.left + 'px'

        this.canvas.append(this.player)
    }

    movePlayer(event) {
        this.player.style.left = event.detail.position.left + 'px'
    }

    createMissile(event) {
        let missile = document.createElement('div')
        missile.id = event.detail.id
        missile.className = 'missile'
        missile.style.width = event.detail.dimensions.width + 'px'
        missile.style.height = event.detail.dimensions.height + 'px'
        missile.style.top = event.detail.position.top + 'px'
        missile.style.left = event.detail.position.left + 'px'

        this.canvas.append(missile)
    }

    moveMissile(event) {
        let missile = document.getElementById(event.detail.id)

        if (missile) {
            missile  .style.top = event.detail.position.top + 'px'
        }
    }

    destroyMissile(event) {
        let missile = document.getElementById(event.detail.id)

        if (missile) {
            this.canvas.removeChild(missile)
        }
    }

    createEventer(event) {
        let eventer = document.createElement('div')
        eventer.id = event.detail.id
        eventer.className = 'eventer'
        eventer.style.width = event.detail.dimensions.width + 'px'
        eventer.style.height = event.detail.dimensions.height + 'px'
        eventer.style.top = event.detail.position.top + 'px'
        eventer.style.left = event.detail.position.left + 'px'

        this.canvas.append(eventer)
    }

    destroyEventer(event) {
        let eventer = document.getElementById(event.detail.id)

        if (eventer) {
            this.canvas.removeChild(eventer)
        }
    }
}

module.exports = {
    Renderer
}