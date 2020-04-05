const axios = require('axios')

function jokes() {
    return axios.get('https://official-joke-api.appspot.com/random_joke')
        .then(res => {
            console.log(res.data)
        })
}

// dadJokes()

// let aha = dadJokes()

// console.log(aha, 'ahahaha')
console.log(jokes())

module.exports = jokes