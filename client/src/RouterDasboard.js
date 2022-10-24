import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Header from "./Shared/Header/Header";
import Menu from "./Shared/Menu/Menu";
import './App.scss';
import {Navigate} from 'react-router-dom'
import { AppContext } from './contexts/AppContextProvider';


function RouterDasboard() {
  const {state:{isAuthenticated}} = useContext(AppContext);
  if(isAuthenticated)
    return (
      <div className="App">
        <Header />
         <div className='row-container'>
        <Menu className="left" />
        <Outlet />
         </div>
      </div>
    );
    return (
      <div className="App">
       <Navigate to='/login' />
      </div>
    );
  }
  
  export default RouterDasboard;