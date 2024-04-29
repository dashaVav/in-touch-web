
export class Handler {
    _headers = {
        'Accept': '*/*',
        'Content-Type': 'application/json'
    };

    _baseurl = 'https://195.133.196.67:8081';

    token;

    setToken() {

        this._headers = {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.token
        }
    }

    constructor() {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
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
        return fetch(this._baseurl + url, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(body),
            rejectUnauthorized: false,
            requestCert: true,
            agent: false
            // agent: this._sslConfiguredAgent,
        })
    }

    async getRequest(url) {
        return fetch(this._baseurl + url, {
            method: 'GET',
            headers: this._headers
        })
    }

}