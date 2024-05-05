let headers = {
    'Accept': '*/*',
    'Content-Type': 'application/json'
};

const baseurl = 'https://195.133.196.67:8081/chat_api/v1';

export function setToken(token) {
    headers = {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    };
}


export async function postRequest(url, body) {
    return mapJson(await fetch(baseurl + url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
        rejectUnauthorized: false,
        requestCert: true,
        agent: false
    }));
}

export async function getRequest(url) {
    return mapJson(await fetch(baseurl + url, {
        method: 'GET',
        headers: headers,
        rejectUnauthorized: false,
        requestCert: true,
        agent: false
    }));
}

export async function putRequest(url, body) {
    return mapJson(await fetch(baseurl + url, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body),
        rejectUnauthorized: false,
        requestCert: true,
        agent: false
    }));
}

async function mapJson(response) {
    return await response.json();
}

