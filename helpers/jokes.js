const axios = require('axios')

function jokes() {
    return axios.get('https://official-joke-api.appspot.com/random_joke')
}

// dadJokes()

// let aha = dadJokes()

// console.log(aha, 'ahahaha')

module.exports = jokes