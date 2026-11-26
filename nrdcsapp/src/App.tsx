import React, { useEffect, useState } from "react"; 
import { doPost } from "./services/api-bkp";
import "./scss/App.scss";
import AppHeader from "./components/layout/header/Header";
import SideNav from "./components/layout/sidenav/SideNav";
import Dashboard from "./components/views/dashboard/Dashboard";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/routing/AppRoutes";
import isUserLoggedIn from "./components/util/util";

//REDUX IMPORTS
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ToasterComponent from "./components/common/Toaster/Toaster";

/* export const store = configureStore({
  reducer:{

  }
}) */
const App = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(isUserLoggedIn());
  useEffect(() => {
     
  }, [userLoggedIn]);

  return (
    <Provider store={store}>
    <BrowserRouter>
    {
      userLoggedIn &&
      <>
        {/* <SideNav></SideNav> */}
        <AppHeader></AppHeader>
      </>
    } 
      <AppRouter />
      </BrowserRouter>
      </Provider>
   );
};

export default App;