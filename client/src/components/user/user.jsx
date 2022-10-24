import React from "react";
import "./user.scss";
import nav_exchange_rate_logo from "../../../src/assets/public/img/nav_exchange_groceris.png";
import orderImg from "../../../src/assets/public/img/userImg/order.png";
import depositImg from "../../../src/assets/public/img/userImg/deposit.png";
import orderManagement from "../../../src/assets/public/img/userImg/order_management.png";
import parcelManagement from "../../../src/assets/public/img/userImg/parcel_management.png";
import delivery from "../../../src/assets/public/img/userImg/delivery.png";
import account from "../../../src/assets/public/img/userImg/account.png";
import complain from "../../../src/assets/public/img/userImg/complain.png";
import suppliers from "../../../src/assets/public/img/userImg/suppliers.png";
import personalInformation from "../../../src/assets/public/img/userImg/personal-information.png";
import settings from "../../../src/assets/public/img/userImg/settings.png";

export default function User() {
  return (
    <div className="user">
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

      {/* User */}
      <div className="user_content">
        <div className="create_order">
          <img src={orderImg} alt="" />
          <p>Tạo đơn hàng</p>
        </div>
        <div className="create_deposit">
          <img src={depositImg} alt="" />
          <p>Tạo đơn ký gửi</p>
        </div>
        <div className="order_management">
          <img src={orderManagement} alt="" />
          <p>Quản lý kiện hàng</p>
        </div>
        <div className="parcel_management">
          <img src={parcelManagement} alt="" />
          <p>Quản lý kiện hàng</p>
        </div>
        <div className="delivery">
          <img src={delivery} alt="" />
          <p>Giao hàng</p>
        </div>
        <div className="account">
          <img src={account} alt="" />
          <p>Tài khoản khách hàng</p>
        </div>
        <div className="complain">
          <img src={complain} alt="" />
          <p>Khiếu nại</p>
        </div>
        <div className="suppliers">
          <img src={suppliers} alt="" />
          <p>Nhà cung cấp</p>
        </div>
        <div className="personal_information">
          <img src={personalInformation} alt="" />
          <p>Thông tin cá nhân</p>
        </div>
        <div className="settings">
          <img src={settings} alt="" />
          <p>Cài đặt</p>
        </div>
      </div>
    </div>
  );
}
