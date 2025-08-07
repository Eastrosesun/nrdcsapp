import React, { useEffect, useState } from "react"; 
import { doPost } from "./services/api-bkp";
import "./scss/App.scss";
import AppHeader from "./components/layout/header/Header";
import SideNav from "./components/layout/sidenav/SideNav";
import Dashboard from "./components/views/dashboard/Dashboard";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/routing/AppRoutes";
import isUserLoggedIn from "./components/util/util";

const App = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(isUserLoggedIn());
  useEffect(() => {
     
  }, [userLoggedIn]);

  /* const doCall = () => {
    doPost();
  } */
  return (
    <BrowserRouter>
    {
      userLoggedIn &&
      <>
        <AppHeader></AppHeader>
        {/* <SideNav></SideNav> */}
      </>
    } 
      <AppRouter />
      </BrowserRouter>
   );
};

export default App;