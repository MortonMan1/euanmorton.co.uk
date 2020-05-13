import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { cookieService } from './CookieService';
import { handleResponse } from './HandleResponse';
import { BehaviorSubject } from 'rxjs';
import AuthService from './AuthService'


const FetchService = {
    getData,
    postData
};

export default FetchService;

function getData(url) {

    var authdata = AuthService.currentUserValue;

    const httpHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${authdata.token}`
    };

    const requestOptions = {
        method: 'GET',
        headers: new Headers(httpHeaders),
        // headers: { 'Content-Type': 'application/json' },
        //body: JSON.stringify({ username, password }),
        //Authorization: `Bearer ${authdata1}`
    };
    fetch(url, requestOptions)
        .then(handleResponse)
        .then(responce => {
            return responce;
        });
}

function postData(url, data) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( data )
    };
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(responce => {
            return responce;
        });
}