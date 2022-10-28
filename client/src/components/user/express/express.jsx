import React, { useState } from "react";
import "./express.scss";
import nav_exchange_rate_logo from "../../../assets/public/img/nav_exchange_groceris.png";
import { Calendar } from "react-calendar";

export default function Express() {
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
    console.log(date, monthValue, yearValue);
    setCalendarText(`${monthValue} Month  is selected`);
  };

  console.log("..", calendarText);

  const handleOnClickCalendarIcon = () => {
    setShow(!show);
    setColor("#fff");
  };
  return (
    <div className="express">
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

      <div className="container calender">
        <div className="code_orders">
          <input type="text" placeholder="Mã vận đơn" />
        </div>
        <div className="code_orders">
          <input type="text" placeholder="Mã bưu điện" />
        </div>
        <div className="select_status">
          <select>
            <option value="" selected>
              Lựa chọn phương thức vận chuyển
            </option>
            <option value="">Hãng xe tải</option>
            <option value="">Viettel</option>
            <option value="">Giao hàng nhanh</option>
            <option value="">Giao hàng tiết kiệm</option>
            <option value="">Xe khách</option>
            <option value="">Chuyển phát khác</option>
            <option value="">Ship nội thành</option>
          </select>
        </div>

        <div className="select_payments">
          <select>
            <option value="" selected>
              Lựa chọn hình thức thanh toán
            </option>
            <option value="">Ví điện tử</option>
            <option value="">COD</option>
            <option value="">Chuyển khoản</option>
            <option value="">Tiền mặt</option>
          </select>
        </div>
        <div className="select_status">
          <select>
            <option value="" selected>
              Chọn trạng thái
            </option>
            <option value="">Chờ xử lý</option>
            <option value="">Đang xử lý</option>
            <option value="">Đã xử lý</option>
            <option value="">Đã hoàn thành</option>
            <option value="">Đã hủy</option>
          </select>
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
            className="fa-solid fa-calendar-days"
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
            className="fa-solid fa-calendar-days"
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
          <i className="fa-solid fa-magnifying-glass"></i>
          <p>Tìm kiếm</p>
        </div>
      </div>

      <table class="table">
        <thead style={{backgroundColor: '#0092d0'}}>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Ngày tạo</th>
            <th scope="col">Thông tin giao hàng</th>
            <th scope="col">Mã bưu điện</th>
            <th scope="col">Ghi chú</th>
            <th scope="col">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row"></th>
            <td></td>
            <td className="text-center text-danger fw-bold fs-4">Chưa có dữ liệu!</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          {/* <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colspan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
}
