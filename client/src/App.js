import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from "./Shared/Header/Header";
import Menu from "./Shared/Menu/Menu";
import Groceries from "./components/Customer/Groceries/Groceries";
import Deposit from "./components/Customer/Deposit/Deposit";
import './App.scss';
import Login from './components/athur/login/Login';
import Register from './components/athur/register/register';

function App() {
  return (
    <div className="App">
      <Login />
      {/* <Register /> */}
      {/* <Header />
      <div className='row-container'>
        <Menu className="left" />
        <Routes>
          <Route path="/" element={<Groceries className="right"/>}></Route>
          <Route path="/groceries" element={<Groceries className="right"/>}></Route>
          <Route path="/deposit" element={<Deposit className="right"/>}></Route>
        </Routes>
      </div> */}
    </div>
  );
}

export default App;
