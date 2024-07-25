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
        .catch(e => {
            console.error('Failed to load tweets', e);
            // return fake data
            return [
              {
                id: 1,
                text: 'This is a fake tweet',
                username: 'FakeUser',
                sentiment: 'positive',
                confidence: 80.8,
                createdAt: new Date(2021, 6, 1, 12, 0, 0),
                link: 'https://twitter.com',
              },
              {
                id: 2,
                text: 'This is another fake tweet',
                username: 'FakeUser2',
                sentiment: 'negative',
                confidence: 89.2,
                createdAt: new Date(2021, 6, 1, 12, 0, 0),
                link: 'https://twitter.com',
              },
            ];
        })
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
        .catch(e => {
            console.error('Failed to load points: ', e);
            // return fake data
            const pattern = [2,3,4,5,3,2];
            return Array.from({ length: n }, (_, i) => {
              const baseline = pattern[i % pattern.length];
              const ret = {
                time: from + i * 3600 * scale,
                retweets: Math.round((baseline + Math.random()) * 500),
                negative: Math.round((baseline + Math.random()) * 1000),
                positive: Math.round((baseline + Math.random()) * 900),
              }
              ret.total = ret.retweets + ret.negative + ret.positive;
              return ret;
            })
        })
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
