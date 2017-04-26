'use latest'

const Express = require('express');
const Webtask = require('webtask-tools');
const app = Express();
const request = require('request');

app.use(require('body-parser').json());

const CELERY_URL = 'https://api.trycelery.com/v2';

// POST
app.post('/calculate-shipping', function (req, res) {
    const url = `${CELERY_URL}/orders/serialize`;
    const headers = {
        'Authorization': req.webtaskContext.secrets.celeryApiKey,
        'content-type': 'application/json'
    };

    const requestOptions = {
        url,
        method: 'POST',
        headers,
        body: JSON.stringify(req.body)
    };
    return request(requestOptions, (error, response, body) => {
        if (error) { console.error(error) }
        const data = JSON.parse(body)
        return res.status(data.meta.code).json(data.data);
    })

});

// GET
app.get('/products/:productId', function (req, res) {
    const productId = req.params.productId;
    if (!productId) {
        return res.status(400).send('Product ID required');
    }
    const url = `${CELERY_URL}/products/${productId}`;
    const headers = { 'Authorization': req.webtaskContext.secrets.celeryApiKey }
    const requestOptions = {
        url,
        headers
    };
    return request(requestOptions, (error, response, body) => {
        return res.status(200).json(JSON.parse(body));
    })
});

module.exports = Webtask.fromExpress(app);