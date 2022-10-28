import React from 'react';
import { Outlet } from 'react-router-dom';


function RouterAuth() {

    return (
      <div className="App">
            <Outlet/>
      </div>
    );
  }
  
  export default RouterAuth;