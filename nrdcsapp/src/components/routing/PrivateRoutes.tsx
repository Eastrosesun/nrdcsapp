import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import isUserLoggedIn from '../util/util';

const PrivateRoutes = () => {
    let auth = isUserLoggedIn();
    return (
        auth ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes;