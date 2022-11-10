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
import { Link } from "react-router-dom";
import { Button, ButtonGroup } from "react-bootstrap";

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

      {/* User */}
      <div className="user_content">
        <div className="user_item create_order">
          <Link as={Link} to="/app/groceries">
            <img src={orderImg} alt="" />
          </Link>
          <p>Tạo đơn hàng</p>
        </div>
        <div className="user_item create_deposit">
          <Link as={Link} to="/app/deposit">
            <img src={depositImg} alt="" />
          </Link>
          <p>Tạo đơn ký gửi</p>
        </div>
        <div className="user_item order_management">
          <Link as={Link} to="/app/listGroceries">
            <img src={orderManagement} alt="" />
          </Link>
          <p>Quản lý đơn hàng</p>
        </div>
        <div className="user_item parcel_management">
          <Link as={Link} to="/app/listDeposit">
            <img src={parcelManagement} alt="" />
          </Link>
          <p>Quản lý đơn ký gửi</p>
        </div>
        <div className="user_item delivery">
          <Link as={Link} to="/app/express">
            <img src={delivery} alt="" />
          </Link>
          <p>Giao hàng</p>
        </div>
        <div className="user_item account">
          <img src={account} alt="" />
          <p>Tài khoản khách hàng</p>
        </div>
        <div className="user_item complain">
          <img src={complain} alt="" />
          <p>Khiếu nại</p>
        </div>
        <div className="user_item suppliers">
          <Link as={Link} to="/menuHome">
            <img src={suppliers} alt="" />
          </Link>

          {/* <img src={suppliers} alt="" /> */}
          <p>Nhà cung cấp</p>
        </div>
        <div className="user_item personal_information">
          <Link as={Link} to="/app/orderGroceries">
            <img src={personalInformation} alt="" />
          </Link>
          <p>Thông tin cá nhân</p>
        </div>
        <div className="user_item settings">
          <img src={settings} alt="" />
          <p>Cài đặt</p>
        </div>
      </div>
    </div>
  );
}
