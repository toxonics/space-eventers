const { Eventer } = require('./eventer.js');

class Eventers {
    static count = 36

    static itemsInRow = 6

    static separation = {
        top: 20,
        left: 20
    }

    eventBus = null

    eventers = {

    }

    constructor(eventBus) {
        this.eventBus = eventBus

        let initialPosition = this.calculateInitialPosition()

        let eventerPosition = {
            top: initialPosition.top,
            left: initialPosition.left
        }
        for (let i = 1; i <= Eventers.count; i++) {
            let eventer = new Eventer(eventerPosition, this.eventBus)

            // if we need to move to the next row
            if (i > 0 && i % Eventers.itemsInRow == 0) {
                eventerPosition.top = eventerPosition.top + Eventer.dimensions.height + Eventers.separation.top
                eventerPosition.left = initialPosition.left
            } else {
                eventerPosition.left = eventerPosition.left + Eventer.dimensions.width + Eventers.separation.left
            }

            this.eventers[eventer.id] = eventer
        }

        this.eventBus.on('EventerDestroyed', (event) => {
            this.eventers[event.detail.id].destructor()
            delete this.eventers[event.detail.id]
        })
    }

    calculateInitialPosition() {
        let canvasDimensions = document.getElementById('canvas').getBoundingClientRect()

        let top = Eventers.separation.top

        let eventersWidth = (Eventers.count / Eventers.itemsInRow) * Eventer.dimensions.width
        let eventersSpacingWidth = ((Eventers.count / Eventers.itemsInRow) - 1) * Eventers.separation.left
        let left = (
            canvasDimensions.width - 
            (
                eventersWidth + 
                eventersSpacingWidth
            )
        ) / 2
        
        return {
            top: top,
            left: left
        }
    }
}

module.exports = {
    Eventers
}