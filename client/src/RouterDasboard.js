import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from "./Shared/Header/Header";
import Menu from "./Shared/Menu/Menu";
import './App.scss';


function RouterDasboard() {
    return (
      <div className="App">
        <Header />
         <div className='row-container'>
        <Menu className="left" />
        <Outlet />
         </div>
      </div>
    );
  }
  
  export default RouterDasboard;