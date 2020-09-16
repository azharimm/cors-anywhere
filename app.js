var unirest = require('unirest');
var random_useragent = require('random-useragent');
const isUrl = require("is-valid-http-url");
const express = require('express');

const app = express();

app.get('/', (req, res, next) => {
    res.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        "content-type": "text/plain"
    });

    if (req.url.split("/?api_url=")[1] == undefined == false && isUrl(req.url.split("/?api_url=")[1]) == true && req.method === "GET") {
        unirest('GET', req.url.split("/?api_url=")[1])
            .headers({
                'user-agent': random_useragent.getRandom()
            })
            .end(function (resku) {
                res.end(resku.raw_body);
            });
    } else {
        res.end("Oops! Something went wrong!, Example: https://cors-anywhere.azharimm.tk/?api_url=https://www.maskoding.com")
    };
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App running on port: ${PORT}`))