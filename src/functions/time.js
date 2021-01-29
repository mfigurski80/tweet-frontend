export function toTimestamp(time) {
    return Math.floor(time.getTime() / 1000)
}

export function toTime(timestamp) {
    return new Date(timestamp * 1000)
}
