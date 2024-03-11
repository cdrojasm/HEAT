/* 
Name: requests for each search engine: SOLR, DRUID
Action: many functions that are widely used
*/

import axios from 'axios';

//=======================================
//==========SOLR=========================
//=======================================

const request = (url) => {
    return new Promise(resolve => {
        axios.get(url).then(response => {
            resolve(response.data)
        }).catch(function (err) {
            resolve(false)
        })

    });
};

export async function exists(url) {
    const result = await request(url);
    return result;
};

export async function fetchData(url) {
    const response = await request(url);
    return response.response;
};

export async function getLastM(url) {
    const response = await request(url);
    return response.index;
};

export async function fetchStats(url) {
    const response = await request(url);
    return response.stats;
};

export async function fetchFacets(url) {
    let urlencode = encodeURI(url);
    let result = urlencode.includes("+");
    let urlVF = (result == true) ? (urlencode.split("+")[0] + "%2B" + urlencode.split("+")[1]) : urlencode;
    const response = await request(urlVF);
    return response.facets;
};

export async function fetchDashboards(url) {
    const response = await request(url);
    return response.response;
};

export async function fetchCores(url) {
    const response = await request(url);
    return response.status;
};

export async function fetchFields(url) {
    const response = await request(url);
    return response.fields;
};

export async function fetch(url) {
    const response = await request(url);
    return response;
};

export async function forFetch(urlArray) {
    const responseArray = []
    for (let i = 0; i < urlArray.length; i++) {
        try {
            responseArray.push(await request(urlArray[i]))
        } catch {
            continue
        }
    }
    return responseArray;
};

export async function fetchAllResults(url) {
    const response = await request(url + "&rows=0");
    let nFound = Math.min(response.response.numFound, 1000000);
    let newUrl = (url + "&rows=" + nFound);
    const fullResponse = await request(newUrl);
    return fullResponse.response;
};

export async function checkAuth(url, data) {
    const response = await requestCheckAuth(url, data);
    return response;
};

export async function checkLevelAccess(url, data) {
    const response = await requestPOSTJSON(url, data);
    return response;
};

export async function viewObj(url, data) {
    const response = await requestPOSTJSON(url, data);
    return response;
};

export async function saveObj(url, data) {
    const response = await requestPOSTJSON(url, data);
    return response;
};

export async function editObj(url, data) {
    const response = await requestPOSTJSON(url, data);
    return response;
};

export async function delObj(url, data) {
    const response = await requestPOSTJSON(url, data);
    return response;
};

export async function doGet(url) {
    const response = await request(url);
    return response;
};

export async function save(url, data) {
    const response = await requestPOST(url, data);
    return response;
};

export async function deleteId(url, data) {
    const response = await requestPOST(url, data);
    return response;
};

export async function genericPOSTFunction(url, data, headers = {}) {
    const response = await requestPOST(url, data, headers);
    return response;
};

const requestPOST = (url, data, headers = {}) => {
    return new Promise(resolve => {
        axios.post(url, { data }, {
            headers: { 'Access-Control-Allow-Origin': '*', ...headers }
        }).then(response => {
            resolve(response)
        });
    });
};

const requestCheckAuth = (url, data) => {
    let authFormData = new FormData();
    authFormData.append('username', data.username);
    authFormData.append('password', data.password);
    return new Promise(resolve => {
        axios.post(url, authFormData, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(response => {
            resolve(response)
        });
    });
};

const requestPOSTJSON = (url, data) => {
    return new Promise(resolve => {
        axios.post(url, data).then(response => {
            resolve(response)
        }).catch(function (err) {
            resolve(false)
        });
    });
};

export async function genericRequestFunction(url, data, headers = {}, method = "GET") {
    let response;
    if (method === "GET") {
        response = await request(url);
    } else if (method === "DELETE"){
        response = await requestDELETEJson(url, {data}, {headers: { 'Access-Control-Allow-Origin': '*', ...headers }});
    }
    return response
};

const requestDELETEJson = (url, data, headers = {}) => {
    return new Promise(resolve => {
        axios.delete(url, data, {headers}).then(response => {
            resolve(response.data)
        }).catch(function (err) {
            resolve(false)
        });
    });
};

//=======================================
//==========DRUID========================
//=======================================

export async function sendDruidRequest(url, data) {
    const response = await requestPOSTDruid(url, data);
    return response.data;
}

const requestPOSTDruid = (url, data) => {
    return new Promise(resolve => {
        axios.post(url, data, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/json"
            }
        }).then(response => {
            resolve(response)
        });
    });
};
