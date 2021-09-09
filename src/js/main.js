const { EventBus } = require('./eventbus');
const { Game } = require('./game');
const { Renderer } = require('./renderer');

window.onload = () => {
    let eventBus = new EventBus('event-bus')
    let commandBus = new EventBus('command-bus')

    window.renderer = new Renderer(eventBus)
    window.game = new Game(eventBus)

    // controls
    window.onkeydown = (e) => {
        eventBus.emit('Input:' + e.code)
    }

    // tick tock
    setInterval(() => {
        eventBus.emit('tick')
    }, 50);
}
