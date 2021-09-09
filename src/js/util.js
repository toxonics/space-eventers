function generateRandomId(prefix) {
    let id = '';

    if (prefix) {
        id += prefix + '-'
    }

    id += Math.random().toString(36).substring(2)

    return id
}

module.exports = {
    generateRandomId
}