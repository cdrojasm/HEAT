/* 
Name: creangelAuthAPI
Action: endpoints for service related to authentication
*/

import axios from 'axios'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const BASE_URL_API = process.env.NEXT_PUBLIC_AUTHENTICATION_BASE_API_URL;
const GENERIC_ERROR_MSG = "some error happens during request";
const GENERIC_FORM_HEADERS = {
    "Content-Type": "multipart/form-data"
};
const GENERIC_CORS_HEADER = {
    "Access-Control-Allow-Origin": "*",
};

export const URL_API_ROUTE_DICT = {
    
};

function handleError(resolve, error, errorMsg = GENERIC_ERROR_MSG) {
    try {
        let json_object = { ...error.response.data };
        if (json_object.hasOwnProperty("status") && json_object.hasOwnProperty("msg") && json_object.hasOwnProperty("data")) {
            resolve(json_object)
        } else {
            resolve({ "msg": errorMsg, "status": "err", "data": {} });
        }
    } catch {
        resolve({ "msg": errorMsg, "status": "err", "data": {} });
    }
}

async function getRequestGeneric(url, headers = {}) {

    const response = await new Promise(resolve => {
        axios.get(url, {
            "headers": {
                ...headers
            }
        }).then(response => {
            resolve(response["data"]);
        }).catch(
            function (error) {
                handleError(resolve, error);
            }
        )
    })
    return response;
}

async function postRequestGeneric(url, dataPost, headers = {}) {
    const response = await new Promise(resolve => {
        axios.post(url, dataPost, { headers }).
            then(response => {
                resolve(response["data"]);
            }).catch(
                function (error) {
                    handleError(resolve, error)
                }
            )
    })
    return response;
}

async function putRequestGeneric(url, dataPost, headers = {}) {
    const response = await new Promise(resolve => {
        axios.put(url, dataPost, { ...headers }).
            then(response => {
                resolve(response["data"]);
            }).catch(
                function (error) {
                    handleError(resolve, error)
                }
            )
    })
    return response;
}

async function uploadFileFormRequestGeneric(url, form, headers = { ...GENERIC_FORM_HEADERS }) {
    const response = await new Promise(resolve => {
        axios.post(url, form, {
            "headers": { ...headers }
        }).then(response => {
            resolve(response["data"]);
        }).catch(
            function (error) {
                handleError(resolve, error)
            }
        )
    })
    return response;
}

async function deleteRequestGeneric(url, data, headers = {}) {
    const response = await new Promise(resolve => {
        axios.delete(url, {
            data,
            headers
        }).then(response => {
            resolve(response["data"]);
        }).catch(
            function (error) {
                handleError(resolve, error)
            }
        )
    })
    return response;
}

//=====Authentication

export async function getUserLogin(data) {
    return await postRequestGeneric(URL_API_ROUTE_DICT["userLogin"], data)
}

export async function getUserRefresh(header) {
    return await getRequestGeneric(URL_API_ROUTE_DICT["userRefresh"], header)
}

export async function getUserLogout(header) {
    return await getRequestGeneric(URL_API_ROUTE_DICT["userLogout"], header)
}
