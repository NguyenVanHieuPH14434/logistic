import React, { useState } from "react";
import { Calendar } from "react-calendar";
import "./listDeposit.scss";
import nav_exchange_rate_logo from "../../../assets/public/img/nav_exchange_groceris.png";

export default function ListDeposit() {
  const allMonthValues = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // State for text above calander
  const [calendarText, setCalendarText] = useState("");

  const [show, setShow] = useState(false);

  const [color, setColor] = useState("red");

  // Function to update selected date and calander text
  const handleDateChange = (value) => {
    setCalendarText(`${value.toDateString()}`);
  };

  // Function to handle selected Year change
  const handleYearChange = (value) => {
    const yearValue = value.getFullYear();
    setCalendarText(`${yearValue} Year  is selected`);
  };

  // Function to handle selected Month change
  const handleMonthChange = (value) => {
    const monthValue = allMonthValues[value.getMonth()];
    const yearValue = value.getFullYear();
    const date = value.getDate();
    console.log(date, monthValue ,yearValue);
    setCalendarText(`${monthValue} Month  is selected`);
  };

console.log('..', calendarText);


  const handleOnClickCalendarIcon = () => {
    setShow(!show);
    setColor("#fff");
  };
  return (
    <div className="listDeposit">
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
      <ul className="menu_deposit">
        <li>
          Chờ xử lý <span>0</span>
        </li>
        <li>
          Đã xử lý <span>0</span>
        </li>
        <li>
          Đã hoàn thành <span>0</span>
        </li>
      </ul>
      <hr />

      <div className="container calender">
        <div className="select_status">
          <select>
            <option value="" selected>
              Chọn trạng thái
            </option>
            <option value="">Chờ báo giá</option>
            <option value="">Chờ đặt cọc</option>
            <option value="">Đã đặt cọc</option>
            <option value="">Đã đặt hàng</option>
            <option value="">Đã hoàn thành</option>
            <option value="">Cần xác nhận lại</option>
            <option value="">Đã hủy</option>
          </select>
        </div>

        <div className="select_headQuarters">
          <select>
            <option value="" selected>
              Chọn kho nhận
            </option>
            <option value="">Hà Nội</option>
            <option value="">Hà Nội</option>
            <option value="">Hà Nội</option>
            <option value="">Hà Nội</option>
            <option value="">Hải Phòng</option>
            <option value="">Hồ Chí Minh</option>
            <option value="">Quảng Châu</option>
          </select>
        </div>

        <div className="code_orders">
          <input type="text" placeholder="Mã đơn hàng" />
        </div>
        <div className="calendar_from">
          <input
            name="calendar_from"
            value={calendarText}
            type="date"
            placeholder="Từ ngày"
          />
          <i
            style={{ color: { color } }}
            onClick={() => handleOnClickCalendarIcon()}
            class="fa-solid fa-calendar-days"
          ></i>
          {show && (
            <Calendar
              // onClickMonth={handleMonthChange}
              // onClickYear={handleYearChange}
              onChange={handleDateChange}
            />
          )}
        </div>
        <div className="calendar_to">
          <input
            name="calendar_to"
            value={calendarText}
            type="text"
            placeholder="Đến ngày"
          />
          <i
            style={{ color: { color } }}
            onClick={() => handleOnClickCalendarIcon()}
            class="fa-solid fa-calendar-days"
          ></i>
          {show && (
            <Calendar
              // onClickMonth={handleMonthChange}
              // onClickYear={handleYearChange}
              onChange={handleDateChange}
            />
          )}
        </div>
        <div className="search_icon">
          <i class="fa-solid fa-magnifying-glass"></i>
          <p>Tìm kiếm</p>
        </div>
      </div>
    </div>
  );
}
