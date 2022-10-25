import React from "react";
import { useState } from "react";
import "./orderGroceries.scss";

export default function OrderGroceries() {
  const [orderCode, setOrderCode] = useState("#6969696969");
  const [orderDate, setOrderDate] = useState("25/10/2099");
  const [orderSeller, setOrderSeller] = useState("Meo");
  return (
    <div className="order_groceries">
        <h1>THANH TOÁN ĐƠN HÀNG</h1>
      <p>Xin chào Nguyễn Anh D Thiện</p>
      <p>
        Đơn hàng <span className="order_code"> {orderCode} </span> của bạn đã
        được đặt thành công trong ngày <span> {orderDate} </span>
      </p>
      <div className="location">
        <i class="fa-solid fa-location-dot"></i>
        <p>Địa chỉ nhận hàng</p>
      </div>
      <h3>THÔNG TIN ĐƠN HÀNG - DÀNH CHO NGƯỜI MUA</h3>
      <div className="order_information d-flex">
        <div className="order_label">
          <p>
            Mã đơn hàng:<span className="order_code"> {orderCode} </span>{" "}
          </p>
          <p>Ngày đặt hàng: {orderDate} </p>
          <p>Người bán: {orderSeller} </p>
        </div>
      </div>
    </div>
  );
}
