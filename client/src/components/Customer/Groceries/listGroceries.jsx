import React, { useContext, useEffect, useState } from "react";
import "./listGroceries.scss";
import nav_exchange_rate_logo from "../../../assets/public/img/nav_exchange_groceris.png";
// import { Calendar } from "@natscale/react-calendar";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { AppContext } from "../../../contexts/AppContextProvider";
import { listOrder } from "../../../api/orderApi";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ListGroceries() {
  const {
    state: { user },
  } = useContext(AppContext);

  // Array to store month string values
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
  // State for date selected by user
  const [selectedDate, setSelectedDate] = useState();

  // State for text above calander
  const [calendarText, setCalendarText] = useState("");

  const [show, setShow] = useState(false);

  const [color, setColor] = useState("red");

  const [inputCalendar, setInputCalendar] = useState({
    calendar_from: "",
    calendar_to: "",
  });

  // Function to update selected date and calander text
  const handleDateChange = (value) => {
    setSelectedDate(value);
    setCalendarText(`${value.toDateString()}`);
    setInputCalendar(`${value.toDateString()}`);
  };

  // Function to handle selected Year change
  const handleYearChange = (value) => {
    const yearValue = value.getFullYear();
    setCalendarText(`${yearValue} Year  is selected`);
    setInputCalendar(`${yearValue} Year  is selected`);
  };

  // Function to handle selected Month change
  const handleMonthChange = (value) => {
    const monthValue = allMonthValues[value.getMonth()];
    setCalendarText(`${monthValue} Month  is selected`);
    setInputCalendar(`${monthValue} Month  is selected`);
  };

  const handleOnClickCalendarIcon = () => {
    setShow(!show);
    setColor("#fff");
  };

  const handleOnChangeInputCalendar = (e) => {
    const { name, value } = e.target;
    setInputCalendar((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const [listt, setListt] = useState([]);

  const getListt = async () => {
    const res = await listOrder(user._id);
    return res;
  };

  useEffect(() => {
    getListt().then((re) => {
      setListt(re.data.data);
    });
  }, []);

  console.log("list", listt);

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
          <i className="fa-solid fa-magnifying-glass"></i>
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
        <li>
          Chờ báo giá <span>0</span>
        </li>
        <li>
          Chờ đặt cọc <span>0</span>
        </li>
        <li>
          Đã đặt hàng <span>0</span>
        </li>
        <li>
          Đã hoàn thành <span>0</span>
        </li>
        <li>
          Cần xác nhận lại <span>0</span>
        </li>
        <li>
          Đã hủy <span>0</span>
        </li>
      </ul>
      <hr />

      <div className="container calender">
        <div className="calendar_from">
          <input
            name="calendar_from"
            type="text"
            onChange={(e) => handleOnChangeInputCalendar(e)}
            placeholder="Từ ngày"
          />
          <i
            style={{ color: { color } }}
            onClick={() => handleOnClickCalendarIcon()}
            className="fa-solid fa-calendar-days"
          ></i>
          {show && (
            <Calendar
              onClickMonth={handleMonthChange}
              onClickYear={handleYearChange}
              onChange={handleDateChange}
              value={selectedDate}
            />
          )}
        </div>
        <div className="calendar_to">
          <input
            name="calendar_to"
            type="text"
            onChange={(e) => handleOnChangeInputCalendar(e)}
            placeholder="Đến ngày"
          />
          <i
            style={{ color: { color } }}
            onClick={() => handleOnClickCalendarIcon()}
            className="fa-solid fa-calendar-days"
          ></i>
          {show && (
            <Calendar
              onClickMonth={handleMonthChange}
              onClickYear={handleYearChange}
              onChange={handleDateChange}
              value={selectedDate}
            />
          )}
        </div>
        <div className="code_orders">
          <input type="text" placeholder="Mã đơn hàng" />
        </div>
        <div className="select_headQuarters">
          <select>
            <option value="" selected>
              Lựa chọn trụ sở
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
        <div className="search_icon">
          <i className="fa-solid fa-magnifying-glass"></i>
          <p>Tìm kiếm</p>
        </div>
      </div>

      <div className="listOrder">
        <table className="table text-center">
          <thead>
            <tr>
              <th scope="col">Mã đơn hàng</th>
              <th scope="col">Tên Khách hàng</th>
              <th scope="col">Số Điện Thoại</th>
              <th scope="col">Địa chỉ</th>
              <th scope="col">Trạng thái</th>
              <th scope="col">Đơn Hàng</th>
            </tr>
          </thead>
          <tbody>
            {listt
              ? listt.map((li, i) => {
                  return (
                    <tr>
                      <th scope="row"> {li._id} </th>
                      <td> {li.full_name} </td>
                      <td> {li.phone} </td>
                      <td> {li.address} </td>
                      <td> {li.status} </td>
                      <td>
                        {" "}
                        {/* <Link to={`/app/orderDetailGroceries`, {state:{id:li._id}}}> Chi tiết đơn hàng </Link>   */}
                      </td>
                    </tr>
                  );
                })
              : []}
          </tbody>
        </table>
      </div>
    </div>
  );
}
