const { Evader } = require('./evader.js');

class Evaders {
    static count = 36

    static itemsInRow = 6

    static separation = {
        top: 20,
        left: 20
    }

    eventBus = null

    evaders = {

    }

    constructor(eventBus) {
        this.eventBus = eventBus

        let initialPosition = this.calculateInitialPosition()

        let evaderPosition = {
            top: initialPosition.top,
            left: initialPosition.left
        }
        for (let i = 1; i <= Evaders.count; i++) {
            let evader = new Evader(evaderPosition, this.eventBus)

            // if we need to move to the next row
            if (i > 0 && i % Evaders.itemsInRow == 0) {
                evaderPosition.top = evaderPosition.top + Evader.dimensions.height + Evaders.separation.top
                evaderPosition.left = initialPosition.left
            } else {
                evaderPosition.left = evaderPosition.left + Evader.dimensions.width + Evaders.separation.left
            }

            this.evaders[evader.id] = evader
        }

        this.eventBus.on('EvaderDestroyed', (event) => {
            this.evaders[event.detail.id].destructor()
            delete this.evaders[event.detail.id]
        })
    }

    calculateInitialPosition() {
        let canvasDimensions = document.getElementById('canvas').getBoundingClientRect()

        let top = Evaders.separation.top

        let evadersWidth = (Evaders.count / Evaders.itemsInRow) * Evader.dimensions.width
        let evadersSpacingWidth = ((Evaders.count / Evaders.itemsInRow) - 1) * Evaders.separation.left
        let left = (
            canvasDimensions.width - 
            (
                evadersWidth + 
                evadersSpacingWidth
            )
        ) / 2
        
        return {
            top: top,
            left: left
        }
    }
}

module.exports = {
    Evaders
}