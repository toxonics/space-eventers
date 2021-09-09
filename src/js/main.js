const { MessageBus } = require('./messagebus');
const { Game } = require('./game');
const { Renderer } = require('./renderer');

window.onload = () => {
    let eventBus = new MessageBus('events')
    let commandBus = new MessageBus('commands')

    window.renderer = new Renderer(eventBus)
    window.game = new Game(window.renderer.canvasDimensions(), eventBus)

    // controls
    window.onkeydown = (e) => {
        eventBus.emit('Input:' + e.code)
    }

    // tick tock
    setInterval(() => {
        eventBus.emit('tick')
    }, 50);
}
