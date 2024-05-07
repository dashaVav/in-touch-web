let headers = {
    'Accept': '*/*',
    'Content-Type': 'application/json'
};

let fileHeaders;

const baseurl = 'https://195.133.196.67:8081/chat_api/v1';

export const baseUrlForFiles = 'http://195.133.196.67:8881/chat_api/v1/download/';

export function setToken(token) {
    headers = {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    };

    fileHeaders = {
        'Accept': '*/*',
        'Authorization': 'Bearer ' + token
    }
}


export async function postRequest(url, body, attachment) {
    const fullUrl = new URL(baseurl + url);
    if (attachment !== undefined) {
        fullUrl.searchParams.append('attachment', attachment);
    }

    return mapJson(await fetch(fullUrl.toString(), {
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

export async function postResourceRequest(url, body) {
    return await fetch(baseurl + url, {
        method: 'POST',
        headers: fileHeaders,
        body: body,
        rejectUnauthorized: false,
        requestCert: true,
        agent: false
    });
}

async function mapJson(response) {
    return await response.json();
}

