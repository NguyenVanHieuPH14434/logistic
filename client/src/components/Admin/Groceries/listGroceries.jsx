/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState,useMemo } from "react";
import "./listGroceries.scss";
import nav_exchange_rate_logo from "../../../assets/public/img/nav_exchange_groceris.png";
// import { Calendar } from "@natscale/react-calendar";
import "react-calendar/dist/Calendar.css";
import { AppContext } from "../../../contexts/AppContextProvider";
import { listOrder } from "../../../api/orderApi";
import ReactPaginate from 'react-paginate';
import { useNavigate } from "react-router-dom";
import  Axios  from 'axios';

export default function ListGroceries() {
  const {
    state: { user },
  } = useContext(AppContext);
  const [lists, setLists] = useState([]);
  const [listt, setListt] = useState();
  console.log(lists)
  console.log(listt)
  const [inputCalendar, setInputCalendar] = useState({
    calendar_from: "",
    calendar_to: "",
  });
  console.log(inputCalendar)
  //find
  const searchProduct = useMemo(()=>{
    let date = inputCalendar.calendar_from.split("-").reverse().join("/")
    return setListt(lists.filter(el=> el.ctime.includes(date)))
  },[inputCalendar,lists])
  // const getListt = async () => {
  //   const res = await listOrder(user._id);
  //   setLists(res.data.data)
  //   return setListt(lists)
  // };
  useEffect(() => {
    //getListt()
    Axios.get(`http://localhost:9000/api/order/list/${user._id}`)
    .then((res)=>{
      setListt(()=>setLists(res.data.data));
    })
  }, []);
const navi = useNavigate();
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
  ]
  //phan trang
    const [pageNumber, setPageNumber] = useState(0);
    const productPerPage = 10;
    const pagesVisited = pageNumber * productPerPage;
    const pageCount = Math.ceil(listt? listt.length / productPerPage:[]);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

  
  const handleOnChangeInputCalendar = (e) => {
    const { name, value } = e.target;
    setInputCalendar((prev) => {
      return { ...prev, [name]: value };
    });
  };
const renderStatus =(status)=>{
  switch (status) {
    case 0:
      return 'Chờ xác nhận';
    case 1:
      return 'Đã xác nhận';
    case 2:
        return 'Đang vận chuyển về kho Trung Quốc'
    default:
      return 'Chờ xác nhận';
  }
}
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
            <h2 className="text-danger">3,650đ</h2>
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
      {searchProduct}
      <div className="container calender">
        <div className="calendar_from">
          <input
            name="calendar_from"
            type="date"
            onChange={(e) => handleOnChangeInputCalendar(e)}
            placeholder="Từ ngày"
          />
        </div>
        <div className="calendar_to">
          <input
            name="calendar_to"
            type="date"
            onChange={(e) => handleOnChangeInputCalendar(e)}
            placeholder="Đến ngày"
          />
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
      <div className="listOrder mx-4">
        <table className="table table-bordered mt-5 text-center" >
          <thead style={{background:'rgb(148, 112, 212)', color:'white'}}>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Mã dơn hàng</th>
              <th scope="col">Tên đầy đủ</th>
              <th scope="col">Số Điện Thoại</th>
              <th scope="col">Địa chỉ</th>
              <th scope="col">Trạng thái</th>
              <th scope="col">Đơn Hàng</th>
            </tr>
          </thead>
          <tbody>
            {listt?listt.map((li, i) => {
              return (
                <tr key={i+1}>
                  <td> {i+1} </td>
                  <th scope="row"> {li._id} </th>
                  <td> {li.full_name} </td>
                  <td> {li.phone} </td>
                  <td> {li.address} </td>
                  <td> {renderStatus(li.status)} </td>
                  <td>  
                    <button className="btn btn-primary" onClick={()=>navi("/app/orderDetailGroceries", {state:{id:li._id}})}>Chi tiết đơn</button> 
                    </td>
                </tr>
              );
            }).slice(pagesVisited, pagesVisited + productPerPage):[]}
          </tbody>
        </table>
        <div className='d-flex justify-content-center'>
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={changePage}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    // forcePage={currentPage - 1}
                />
            </div>
      </div>
    </div>
  );
}