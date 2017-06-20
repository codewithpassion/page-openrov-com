'use latest'

const Express = require('express');
const Webtask = require('webtask-tools');
const app = Express();
const request = require('request');

app.use(require('body-parser').json());

const MAILCHIMP_URL = 'https://us5.api.mailchimp.com/3.0/lists/b08ea12b9c/members/';

// post
app.post('/abbandoned-card', function (req, res) {
    const url = `${MAILCHIMP_URL}`;
    const headers = {
        'Authorization': 'Basic ' + new Buffer('User:68e0a0e1363a0e7aa5fceee0cbbcc691-us5').toString('base64'),
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

        console.log(response);

        return res.status(response.statusCode).json(body);
    })

});

module.exports = Webtask.fromExpress(app);