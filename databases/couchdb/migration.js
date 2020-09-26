require('dotenv').config({ path: '../../.env' })
const axios = require('axios')
const productViews = require('./views/product')

async function productViewsMigration() {
    const productViewsUrl = 'http://' + process.env.COUCHDB_USER + ':' + process.env.COUCHDB_PASSWORD + '@' +
        process.env.COUCHDB_HOST + ':' + process.env.COUCHDB_PORT +
        '/product/' + productViews.product._id

    await axios.get(productViewsUrl)
        .then(response => {
            console.log(response.status, response.data)
            productViews.product._rev = response.data._rev

            axios.put(productViewsUrl, productViews.product)
                .then(response => console.log(response.status, response.data))
                .catch(error => console.log(error.response.status, error.response.data))
        })
        .catch(error => {
            console.log(error.response.status, error.response.data)

            if (error.response.status === 404) {
                axios.put(productViewsUrl, productViews.product)
                    .then(response => console.log(response.status, response.data))
                    .catch(error => console.log(error.response.status, error.response.data))
            }
        })
}

productViewsMigration()
