export function urlValidator(strURL) {
    if (typeof strURL !== "string") {
        return false;
    }
    try {
        new URL(strURL);
        return true;
    } catch {
        return false
    }
}


export function validatorAPIBasicParameters(respObj) {
    if (typeof respObj !== "object") {
        return [false, {}];
    }
    if (respObj.hasOwnProperty('status') && respObj.hasOwnProperty('msg') && respObj.hasOwnProperty('data')) {
        return [true, respObj];
    }
    return [false, {}];
}

export function validatorNameValidVariable(name) {
    const regExpr = /^\w+$/;
    console.log("validating var name");
    if (regExpr.test(name) && name.length > 3 && (Array(name.length).fill("_").join("") !== name)) {
        return true;
    }
    return false;
}