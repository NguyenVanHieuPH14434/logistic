import React from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';
import Groceries from "./components/Customer/Groceries/Groceries";
import Deposit from "./components/Customer/Deposit/Deposit";
import './App.scss';
import Login from './components/athur/login/Login';
import Register from './components/athur/register/register';
import RouterDasboard from './RouterDasboard';
import Dasboard from './components/Dasboard';
import RouterAuth from './RouterAuth';
import ListGroceries from './components/Customer/Groceries/listGroceries';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<RouterAuth className="right"/>}>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route index element={<Navigate to={'/login'} />}></Route>
          </Route>
          <Route path="/app" element={<RouterDasboard className="right"/>}>
            <Route path="groceries" element={<Groceries className="right"/>}></Route>
            <Route path="deposit" element={<Deposit className="right"/>}></Route>
            <Route path="listGroceries" element={<ListGroceries className="right"/>}></Route>
            <Route index element={<Dasboard className="right"/>}></Route>
          </Route>
        </Routes>
    </div>
  );
}

export default App;
