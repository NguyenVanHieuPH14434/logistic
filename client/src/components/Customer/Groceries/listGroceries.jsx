/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import "./listGroceries.scss";
import nav_exchange_rate_logo from "../../../assets/public/img/nav_exchange_groceris.png";

import "react-calendar/dist/Calendar.css";
import { AppContext } from "../../../contexts/AppContextProvider";
import { listAllOrder, listOrderByUser, updaterOrder } from "../../../api/orderApi";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import {  renderStatus, Status } from "../../../lib/shipFee";
import { toastifySuccess } from "../../../lib/toastify";
export default function ListGroceries() {
  const {
    state: { user },
  } = useContext(AppContext);
  const [lists, setLists] = useState([]);
  const [listt, setListt] = useState([]);
  const [search, setSearch] = useState({
    idProduct: "",
    headQuarters: "",
    status: "",
  });

  const getALlOrder = async() => {
    if(user.role !== 'user'){
      await listAllOrder().then((response)=> {
        setListt(response.data.data);
        setLists(response.data.data);
      });
    }else {
      await listOrderByUser(user._id).then((response)=> {
        setListt(response.data.data);
        setLists(response.data.data);
      });
    }

  }

  const [changeStatus, setChangeStatus] = useState({
    _id:'',
    status: "",
  });
 
  const changeInp = async(_id, e) => {
    const val = {...changeStatus}
    val['_id'] = _id;
    val[e.target.name] = e.target.value;
   setChangeStatus(val)
  }

  useEffect(()=>{
    if(changeStatus.status && changeStatus._id){
      const res = updaterOrder(changeStatus._id, changeStatus);
      getALlOrder();
      toastifySuccess("Cập nhật trạng thái đơn hàng thành công!");
    }
    getALlOrder();
  },[changeStatus.status, changeStatus._id])

  console.log(search);
  const [inputCalendar, setInputCalendar] = useState({
    calendar_from: "",
    calendar_to: "",
  });
  console.log(inputCalendar);
  //phan trang
  const [pageNumber, setPageNumber] = useState(0);
  const productPerPage = 10;
  const pagesVisited = pageNumber * productPerPage;
  const pageCount = Math.ceil(listt ? listt.length / productPerPage : []);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  //find
  const searchProduct = useMemo(() => {
    setListt(
      lists &&
        lists.filter((el) => {
          let dateFrom = new Date(inputCalendar.calendar_from).getTime();
          let dateTo = new Date(inputCalendar.calendar_to).getTime();
          let timeProduct = new Date(el.ctime.split("/").reverse().join("-")).getTime()
          if (inputCalendar.calendar_from && !inputCalendar.calendar_to&&search) {
            return dateFrom===timeProduct&&el._id.toLowerCase().includes(search.idProduct.toLowerCase())
          }
          if((inputCalendar.calendar_from && inputCalendar.calendar_to)||(inputCalendar.calendar_from && inputCalendar.calendar_to && search)){
          console.log([dateFrom,timeProduct,dateTo]);
          return (
            timeProduct >= dateFrom && dateTo >= timeProduct&&el._id.toLowerCase().includes(search.idProduct.toLowerCase())
          );
          }
          if (search) {
            return el._id
              .toLowerCase()
              .includes(search.idProduct.toLowerCase());
          }
        })
    );
  }, [inputCalendar, search]);
  const getValue = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setSearch({ ...search, [name]: value });
  };
  
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
  ];
  const handleOnChangeInputCalendar = (e) => {
    const { name, value } = e.target;
    setInputCalendar((prev) => {
      return { ...prev, [name]: value };
    });
  };


  
  
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
         Chưa thanh toán <span>0</span>
        </li>
        <li>
          Đã thanh toán <span>0</span>
        </li>
        <li>
          Đã xác nhận <span>0</span>
        </li>
        <li>
          Đã giao hàng thành công <span>0</span>
        </li>
      </ul>
      <hr />

      <div className="container calender">
        <div className="calendar_from">
          <span>Form: </span>
          <input
            name="calendar_from"
            type="date"
            onChange={(e) => handleOnChangeInputCalendar(e)}
            placeholder="Từ ngày"
          />
        </div>
        <div className="calendar_to">
          <span>To: </span>
          <input
            name="calendar_to"
            type="date"
            onChange={(e) => handleOnChangeInputCalendar(e)}
            placeholder="Đến ngày"
          />
        </div>
        <div className="code_orders">
          <input
            type="text"
            placeholder="Mã đơn hàng"
            name="idProduct"
            onChange={getValue}
          />
        </div>
        <div className="select_headQuarters">
          <select name="headQuarters" onChange={getValue}>
            <option value="" selected>
              Lựa chọn trụ sở
            </option>
            <option value="Hà Nội">Hà Nội</option>
            <option value="Hải Phòng">Hải Phòng</option>
            <option value="Hồ Chí Minh">Hồ Chí Minh</option>
            <option value="Quảng Châu">Quảng Châu</option>
          </select>
        </div>
        <div className="select_status">
          <select name="status" onChange={getValue}>
            <option value="" selected>
              Chọn trạng thái
            </option>
            <option value="Chờ báo giá">Chưa thanh toán</option>
            <option value="Chờ đặt cọc">Đã thanh toán</option>
            <option value="Đã đặt cọc">Đã xác nhận</option>
            <option value="Đã đặt hàng">Đã giao hàng thành công</option>
          </select>
        </div>
        {/* <button onClick={searchProduct} style={{border:'none',borderRadius:'3px'}} className="search_icon">
          <i className="fa-solid fa-magnifying-glass"></i>
          <p>Tìm kiếm</p>
        </button> */}
      </div>
      <div className="listOrder mx-4">
        <table className="table table-bordered mt-5 text-center">
          <thead style={{ background: "rgb(148, 112, 212)", color: "white" }}>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">ID</th>
              <th scope="col">Tên đầy đủ</th>
              <th scope="col">Số Điện Thoại</th>
              <th scope="col">Địa chỉ</th>
              <th scope="col">Trạng thái</th>
              <th scope="col">Đơn Hàng</th>
            </tr>
          </thead>
          {/* {listt.length > 0 ? */}
          <tbody>
            {listt &&
              listt
                .map((li, i) => {
                  return (
                    <tr key={i + 1}>
                      <td> {i + 1} </td>
                      <th scope="row"> {li._id} </th>
                      <td> {li.full_name} </td>
                      <td> {li.phone} </td>
                      <td> {li.address} </td>
                      <td className="w-25"> 
                        {user && user.role !=='user'?(
                        <select name="status" className="form-control" onChange={(e)=>changeInp(li._id, e)} value={li.status}>
                      {Status.map((ite)=>{
                      return(
                        <option value={ite.value}>{ite.label}</option>
                      )
                    })}
                      </select>):(renderStatus(li.status))}
                      </td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() =>
                            navi("/app/orderDetailGroceries", {
                              state: { id: li._id },
                            })
                          }
                        >
                          Chi tiết đơn
                        </button>
                        {user.role == 'admin' || user.role == 'manager'?(<button
                          className="btn btn-danger"
                          onClick={() =>
                            navi("/app/updateGroceries", {
                              state: { id: li._id },
                            })
                          }
                        >
                          Sửa
                        </button>):''}
                      </td>
                    </tr>
                  );
                })
                .slice(pagesVisited, pagesVisited + productPerPage)}
          </tbody>
        </table>
        {searchProduct}
        <div className="d-flex justify-content-center">
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
            //forcePage={currentPage - 1}
          />
        </div>
      </div>
    </div>
  );
}
