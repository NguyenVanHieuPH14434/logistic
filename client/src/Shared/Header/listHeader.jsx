import React, { useState } from "react";
import nav_exchange_rate_logo from "../../../src/assets/public/img/nav_exchange_groceris.png";

export default function ListHeader() {
    const [rate, setRate] = useState('3,650')
  return (
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
          <h2 className="text-danger">{rate}đ</h2>
        </span>
      </div>
    </div>
  );
}
