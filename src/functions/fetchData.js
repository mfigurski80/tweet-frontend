import { v4 as uuidv4 } from 'uuid';

// Utility functions

const apiBase = 'http://sentiment.mikolaj.space/graphql'

async function graphQuery(text) {
    return fetch(`${apiBase}?identity=${getIdentityToken()}&query=${text}`)
        .then(resp => resp.json())
        .then(d => {
            if (!d.errors) return d;
            throw d.errors[0];
        })
        .then(d => d.data)
}

var identityToken = null

function getIdentityToken() {
    if (!identityToken) {
        identityToken = window.localStorage.getItem('identityToken')
    }
    if (!identityToken) {
        identityToken = uuidv4()
        window.localStorage.setItem('identityToken', identityToken)
    }
    return identityToken;
}

// Actual, exported fetch functions

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
        .then(t => t.tweets)
        .catch(e => console.error('Failed to load tweets', e))
    // .then(p => { p.time += 3600; return p })
}

export async function fetchPoints(to, n, scale = 1) {
    const from = to - 3600 * (n + 1) * scale

    return graphQuery(`query {
        points(from:${from},to:${to}) {
            time,
            total,
            retweets,
            negative,
            positive,
        }
    }`)
        .then(d => d.points)
        .catch(e => console.error('Failed to load points: ', e))
    // .then(points => points.map(p => { p.time += 3600; return p }));
    // .then(points => points.map(p => { p.time = toTime(p.Time); return p }))
}


// exported mutation functions

export async function addSubscription(email) {
    return graphQuery(`mutation {
        subscription(
            email: "${email}",
            identity: "${getIdentityToken()}"
        ) {
            email,
            identity
        }
    }`)
        .catch(e => {
            console.error(e)
            throw e
        });
}