'use strict'

let apiUrl
const apiUrls = {
  production: 'https://afternoon-hamlet-91716.herokuapp.com',
  // production: 'https://git.heroku.com/afternoon-hamlet-91716.git',
  development: 'http://localhost:4741'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

module.exports = {
  apiUrl
}
