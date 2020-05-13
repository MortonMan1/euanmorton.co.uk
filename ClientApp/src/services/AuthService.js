import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { cookieService } from './CookieService';
import { handleResponse } from './HandleResponse';
import { BehaviorSubject } from 'rxjs';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

const AuthService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value }
};

export default AuthService;

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    return fetch('/api/authentication/login', requestOptions)
        .then(handleResponse)
        .then(userstring => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(userstring));
            currentUserSubject.next(userstring);
            cookieService.setCookie("JWT", userstring, 2);
            return userstring;
        });
}

function logout() {
    console.log("av logged out m8");
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
    window.location.reload(true);
}

/*const Auth = {
    isAuthenticated: false,
    authenticate(cb) {
        Auth.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        Auth.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};*/


/*function Admin(props) {
    return <div>Admin Page</div>;
}*/

//export default Auth;