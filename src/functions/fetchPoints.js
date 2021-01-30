import { toTimestamp } from './time';

const apiBase = 'http://sentiment.mikolaj.space/graphql'

async function graphQuery(text) {
    return fetch(`${apiBase}?query=${text}`)
        .then(resp => resp.json())
        .then(d => {
            if (!d.errors) return d;
            throw d.errors[0];
        })
        .then(d => d.data)
}

export async function fetchTweets(atTimestamp) {
    return graphQuery(`query {
        tweets(at:${atTimestamp}) {
            id,
            text,
            username,
            sentiment,
            confidence,
            createdAt,
            link,
        }
    }`)
        .then(t => t.tweets);
    // .then(p => { p.time += 3600; return p })
}

export async function fetchPoints(toDate, n, scale = 1) {
    const to = toTimestamp(toDate);
    const from = to - 3600 * (n + 1) * scale

    return graphQuery(`query {
        points(from:${from},to:${to}) {
            time,
            total,
            negative,
            positive,
        }
    }`)
        .then(d => d.points)
    // .then(points => points.map(p => { p.time += 3600; return p }));
    // .then(points => points.map(p => { p.time = toTime(p.Time); return p }))
}