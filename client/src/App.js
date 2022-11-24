import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Groceries from "./components/Customer/Groceries/Groceries.jsx";
import Deposit from "./components/Customer/Deposit/Deposit";
import './App.scss';
import Login from './components/athur/login/Login';
import Register from './components/athur/register/register';
import RouterDasboard from './RouterDasboard';
import Dasboard from './components/Dasboard';
import RouterAuth from './RouterAuth';
import ListGroceries from './components/Customer/Groceries/listGroceries';
import ListDeposit from './components/Customer/Deposit/listDeposit';
import User from './components/user/user';
import ChangePass from './components/user/changePass';
import Order from './components/Customer/Deposit/orderDeposit/orderDeposit';
import OrderGroceries from './components/Customer/Groceries/orderGroceries/orderGroceries';
import OrderDeposit from './components/Customer/Deposit/orderDeposit/orderDeposit';
import OrderDetailGroceries from './components/Customer/Groceries/orderDetailGroceries/orderDetailGroceries';
import OrderDetailDeposit from './components/Customer/Deposit/orderDetailDeposit/orderDetailDeposit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Express from './components/user/express/express';
import AddMember from './components/user/addMember/addMember.jsx';
import EditDeposit from './components/Customer/Deposit/EditDeposit/EditDeposit.js';
import EditGroceries from './components/Customer/Groceries/EditGroceries/EditGroceries.js';
import MenuHome from './components/user/menuHome.jsx';
import UserInfo from './components/user/userInfo/userInfo.jsx';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<RouterAuth className="right" />}>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route index element={<Navigate to={'/login'} />}></Route>
          <Route path="menuHome" element={<MenuHome className="right" />}></Route>
        </Route>
        <Route path="/app" element={<RouterDasboard className="right" />}>
          <Route path="groceries" element={<Groceries className="right" />}></Route>
          <Route path="updateGroceries" element={<EditGroceries className="right" />}></Route>
          <Route path="deposit" element={<Deposit className="right" />}></Route>
          <Route path="updateDeposit" element={<EditDeposit className="right" />}></Route>
          <Route path="listGroceries" element={<ListGroceries className="right" />}></Route>
          <Route path="listDeposit" element={<ListDeposit className="right" />}></Route>
          <Route path="home" element={<User className="right" />}></Route>
          <Route path="changePass" element={<ChangePass className="right" />}></Route>
          <Route path="addMember" element={<AddMember className="right" />}></Route>
          <Route path="orderGroceries" element={<OrderGroceries className="right" />}></Route>
          <Route path="orderDeposit" element={<OrderDeposit className="right" />}></Route>
          <Route path="orderDetailGroceries" element={<OrderDetailGroceries className="right" />}></Route>
          <Route path="orderDetailDeposit" element={<OrderDetailDeposit className="right" />}></Route>
          <Route path="userInfo" element={<UserInfo className="right" />}></Route>
          <Route path="express" element={<Express className="right" />}></Route>
          <Route index element={<Dasboard className="right" />}></Route>
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </div>
  );
}

export default App;
