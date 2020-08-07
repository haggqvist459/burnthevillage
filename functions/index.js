const functions = require('firebase-functions');
const fetch = require("node-fetch");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors({ origin: true }));

//handle google cloudfunctions root
app.get("/", (req, res) => {

})

app.get('/helloWorld', cors(), (request, response, next) => {

    
    let API = 'https://api.clashofclans.com/v1/clans/'
    let appendix = "%23";
    let clanTag = '92UY2UCR';

    let targetUrl = API + appendix + clanTag;
    console.log("target url is: " + targetUrl);

    async function data() {

        const data = await fetch(targetUrl, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                authorization: 'Bearer ' + localToken
            },
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                response.send(data);
            })
    }

    try {
        data();
    } catch (error) {
        console.log(error);
    }
});


app.get('/clanData', cors(), (request, response, next) => {

    let API = 'https://api.clashofclans.com/v1/clans/'
    let appendix = "%23";
    let clanTag = request.headers.clan

    let targetUrl = API + appendix + clanTag;
    console.log("target url is: " + targetUrl);

    async function data() {

        await fetch(targetUrl, {
            method: "GET",
            headers: {
                Authorization: 'Bearer ' + token
            },
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                response.send(data);
            })
    }

    try {
        data();
    } catch (error) {
        console.log(error);
    }

});


// app.get('/timestamp-cached', (request, response) => {
//     response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
//     response.send(`${Date.now()}`);
// });

exports.app = functions.https.onRequest(app);



