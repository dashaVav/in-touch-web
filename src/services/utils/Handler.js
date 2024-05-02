
export class Handler {
    _headers = {
        'Accept': '*/*',
        'Content-Type': 'application/json'
    };

    _baseurl = 'https://195.133.196.67:8081/chat_api/v1';

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
    }

    async postRequest(url, body) {
        return fetch(this._baseurl + url, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(body),
            rejectUnauthorized: false,
            requestCert: true,
            agent: false
        })
    }

    async getRequest(url) {
        return fetch(this._baseurl + url, {
            method: 'GET',
            headers: this._headers,
            rejectUnauthorized: false,
            requestCert: true,
            agent: false
        })
    }

    async putRequest(url, body) {
        return fetch(this._baseurl + url, {
            method:'PUT',
            headers:this._headers,
            body: JSON.stringify(body),
            rejectUnauthorized: false,
            requestCert: true,
            agent: false
        })
    }

}