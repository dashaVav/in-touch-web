export function byUserName(user, request) {
    let isRequested = true;
    const realName = user.realName.toLowerCase();
    const surname = user.surname.toLowerCase();
    const login = user.username.toLowerCase();
    if (request.includes(" ")) {
        const splitRequest = new Set(request.split(" "));
        console.log(splitRequest)
        if (splitRequest.size > 2) {
            isRequested = false;
        }
        splitRequest.forEach(req => {
            if (!(realName.startsWith(req) || surname.startsWith(req))) {
                console.log(realName.startsWith(req), surname.startsWith(req))
                isRequested = false;
            }
        });
    } else {
        isRequested = login.startsWith(request) || realName.startsWith(request) || surname.startsWith(request);
    }

    return isRequested;
}

export function processingSearchString(request) {
    return request.toLowerCase().trim();
}