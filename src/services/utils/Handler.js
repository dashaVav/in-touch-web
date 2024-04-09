// const https = require('https');
// const fs = require('fs');

// import * as https from "https";
// import * as fs from 'fs';


export class Handler {
    _headers = {
        'Accept': '*/*',
        'Content-Type': 'application/json'
    };


    constructor() {
        // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        // this._options = {
        //     cert: fs.readFileSync(
        //         "..\\..\\resources\\intouch-certificate.crt",
        //         `utf-8`,
        //     ),
        //     key: null,
        //     passphrase: '<cerf>',
        //     rejectUnauthorized: false,
        //     keepAlive: false
        // };
        //
        // this._sslConfiguredAgent = new https.Agent(this._options);
    }

    async postRequest(url, body) {
        return fetch(url, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(body),
            // agent: this._sslConfiguredAgent,
        })
    }
}