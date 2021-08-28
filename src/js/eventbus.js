class EventBus {
    bus = null

    constructor(description) {
        let [body] = document.getElementsByTagName('body')
        this.bus = body.appendChild(new Comment(description))
    }

    on(event, handler) {
        this.bus.addEventListener(event, handler)
    }

    off(event, handler) {
        this.bus.removeEventListener(event, handler)
    }

    emit(name, payload) {
        this.bus.dispatchEvent(
            new CustomEvent(name, {
                detail: payload
            })
        )
    }
}

module.exports = {
    EventBus
}