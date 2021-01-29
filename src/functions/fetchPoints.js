import { toTimestamp } from './time';

const apiBase = 'http://sentiment.mikolaj.space/graphql'

export default async function fetchPoints(toDate, n, scale = 1) {
    const to = toTimestamp(toDate);
    const from = to - 3600 * (n + 1) * scale

    return fetch(`${apiBase}?query=query{
        points(from:${from},to:${to}) {
            time,
            total,
            negative,
            positive,
            tweets {
                id,
                text,
                sentiment
            }
        }
    }`)
        .then(resp => resp.json())
        .then(d => d.data.points)
    // .then(points => points.map(p => { p.time = toTime(p.Time); return p }))
}