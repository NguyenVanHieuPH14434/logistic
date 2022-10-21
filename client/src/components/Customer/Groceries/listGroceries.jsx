import React from "react";
import "./listGroceries.scss";
import nav_exchange_rate_logo from "../../../assets/public/img/nav_exchange_groceris.png";

export default function ListGroceries() {
  return (
    <div className="listGroceries">
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
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <div className="nav_exchange">
          <img src={nav_exchange_rate_logo} alt="" />
          <span>
            <p>Tỉ giá</p>
            <h2 className="text-danger">3,600đ</h2>
          </span>
        </div>
      </div>

      <hr />
      <ul className="menu_groceries">
        <li>Chờ báo giá <span>0</span></li>
        <li>Chờ đặt cọc <span>0</span></li>
        <li>Đã đặt hàng <span>0</span></li>
        <li>Đã hoàn thành <span>0</span></li>
        <li>Cần xác nhận lại <span>0</span></li>
        <li>Đã hủy <span>0</span></li>
      </ul>
      <hr />
    </div>
  );
}
