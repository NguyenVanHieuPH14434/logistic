import React from "react";
import "./userInfo.scss";
import nav_exchange_rate_logo from "../../../assets/public/img/nav_exchange_groceris.png";
import { useContext } from "react";
import { AppContext } from "../../../contexts/AppContextProvider";

export default function UserInfo() {
  const {
    state: {user},
  } = useContext(AppContext)
  return (
    <div className="userInfo">
      <div className="nav_container">
        <div className="nav_left">
          <h4>HOTLINE</h4>
          <h2 className="text-danger">1900 6825</h2>
        </div>
        <div className="nav_search">
          <input
            type="text"
            placeholder="Hello world, Chiều nay bạn muốn tìm gì?"
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <div className="nav_exchange">
          <img src={nav_exchange_rate_logo} alt="" />
          <span>
            <p>Tỉ giá</p>
            <h2 className="text-danger">3,650đ</h2>
          </span>
        </div>
      </div>

      <div className="userForm text-center">
        <h1 className=" mt-3">Thông tin cá nhân</h1>
        <form action="">
          <div className="name mt-5">
            <h4>Họ và tên: {user.fullname} </h4>
          </div>
          <div className="phone">
            <h4>Số điện thoại: {user.phone} </h4>
          </div>
        </form>
      </div>
    </div>
  );
}
