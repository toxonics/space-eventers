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

        this.eventBus.on('BulletFired', (event) => {
            this.createBullet(event)
        })

        this.eventBus.on('BulletMoved', (event) => {
            this.moveBullet(event)
        })

        this.eventBus.on('BulletDestroyed', (event) => {
            this.destroyBullet(event)
        })

        this.eventBus.on('EvaderCreated', (event) => {
            this.createEvader(event)
        })

        this.eventBus.on('EvaderDestroyed', (event) => {
            this.destroyEvader(event)
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

    createBullet(event) {
        let bullet = document.createElement('div')
        bullet.id = event.detail.id
        bullet.className = 'bullet'
        bullet.style.width = event.detail.dimensions.width + 'px'
        bullet.style.height = event.detail.dimensions.height + 'px'
        bullet.style.top = event.detail.position.top + 'px'
        bullet.style.left = event.detail.position.left + 'px'

        this.canvas.append(bullet)
    }

    moveBullet(event) {
        let bullet = document.getElementById(event.detail.id)

        if (bullet) {
            bullet  .style.top = event.detail.position.top + 'px'
        }
    }

    destroyBullet(event) {
        let bullet = document.getElementById(event.detail.id)

        if (bullet) {
            this.canvas.removeChild(bullet)
        }
    }

    createEvader(event) {
        let evader = document.createElement('div')
        evader.id = event.detail.id
        evader.className = 'evader'
        evader.style.width = event.detail.dimensions.width + 'px'
        evader.style.height = event.detail.dimensions.height + 'px'
        evader.style.top = event.detail.position.top + 'px'
        evader.style.left = event.detail.position.left + 'px'

        this.canvas.append(evader)
    }

    destroyEvader(event) {
        let evader = document.getElementById(event.detail.id)

        if (evader) {
            this.canvas.removeChild(evader)
        }
    }
}

module.exports = {
    Renderer
}