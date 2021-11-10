process.env.NODE_ENV = process.env.NODE_ENV || 'production'
process.env.REACT_APP_CLIENT_ID = process.env.REACT_APP_CLIENT_ID
process.env.REACT_APP_CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET
process.env.REACT_APP_REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI
process.env.REACT_APP_PROXY_URL = process.env.REACT_APP_PROXY_URL

const environment = require('./environment')

module.exports = environment.toWebpackConfig()
