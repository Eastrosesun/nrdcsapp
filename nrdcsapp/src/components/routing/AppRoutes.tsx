import React from 'react';
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from './PrivateRoutes';
import WithLogin from '../views/login/Login';
import WithDashboard from '../views/dashboard/Dashboard';
import WithCreateForm from '../views/createform/CreateForm';
import WithInsurance from '../views/insurance/Insurance';
import UIComponents from '../views/uicomponents/UIComponents';

const AppRouter = () => {
    /* const viewsItem = Views.map((item)=>{
        return <Route key={item.title} path={`/${item.path}`} element={item.element}></Route>
    }) */
    return (
        <Routes>
            <Route element={<PrivateRoutes />}>
                <Route path="/dashboard" element={<WithDashboard />} />
                <Route path="/createform" element={<WithCreateForm />} />
                <Route path="/insurance" element={<WithInsurance />} />
                <Route path="/components" element={<UIComponents />} />
            </Route>
            <Route path="/login" element={<WithLogin />} />
            <Route path="/" element={<WithLogin />} />
            <Route path="/logout" element={<WithLogin />} />
        </Routes>
    )
}

export default AppRouter;