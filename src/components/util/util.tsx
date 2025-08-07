import React from 'react';

const isUserLoggedIn = () => {
    return sessionStorage.getItem('userLoggedIn');
}
export default isUserLoggedIn;