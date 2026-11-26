import React from 'react';

const isUserLoggedIn = () => {
    return sessionStorage.getItem('session_token');
}
export default isUserLoggedIn;