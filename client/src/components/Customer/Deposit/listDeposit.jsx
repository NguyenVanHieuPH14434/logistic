import "./listDeposit.scss";
import nav_exchange_rate_logo from "../../../assets/public/img/nav_exchange_groceris.png";
import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import "react-calendar/dist/Calendar.css";
import { AppContext } from "../../../contexts/AppContextProvider";
import { listOrder } from "../../../api/orderApi";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { toast } from "react-toastify";
import { renderStatus } from "../../../lib/shipFee";

export default function ListDeposit() {
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
    let dateFrom = inputCalendar.calendar_from.split("-").reverse().join("/");
    let dateTo = inputCalendar.calendar_to.split("-").reverse().join("/");
    setListt(
      lists &&
        lists.filter((el) => {
          let toDate = ''
          if (dateFrom && !dateTo && search) {
            toDate = dateFrom
          }
          if (dateFrom && dateTo && search) {
            toDate = dateTo
          }
         if(dateFrom && search || dateFrom && dateTo && search){
          return (
            el.ctime >= dateFrom &&
            el.ctime <= toDate &&
            el._id.toLowerCase().includes(search.idProduct.toLowerCase())
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
  // const getListt = async () => {
  //   const res = await listOrder(user._id);
  //   setLists(res.data.data)
  //   return setListt(lists)
  // };
  async function fetchData() {
    let params = ''
    if(user.role==='admin'){
      params=`listAll/deposit`
    }
    else{
      params=`list/${user._id}?type=deposit`
    }
    let url = `http://localhost:9000/api/order/${params}`
    const response = await Axios.get(
      url
    );
    const info = response.data.data;
    console.log(info);
    setListt(info);
    setLists(info);
  }
  useEffect(() => {
    //getListt()
    fetchData();
  }, []);
  //find
  // const findProduct =()=>{
  //   let date = inputCalendar.calendar_from.split("-").reverse().join("/")
  //   return setListt(lists.filter(el=> el.ctime.includes(date)))
  // }
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
    // if(inputCalendar.calendar_from || inputCalendar.calendar_to!==''){
    //   if(inputCalendar.calendar_from >= inputCalendar.calendar_to){
    //     alert('vui lòng không để thời gian bắt đầu cao hơn thời gian kết thúc')
    //   }
    //   else{
    //     searchProduct()
    //   }
    // }
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
            <option value="Chờ báo giá">Chờ báo giá</option>
            <option value="Chờ đặt cọc">Chờ đặt cọc</option>
            <option value="Đã đặt cọc">Đã đặt cọc</option>
            <option value="Đã đặt hàng">Đã đặt hàng</option>
            <option value="Đã hoàn thành">Đã hoàn thành</option>
            <option value="">Cần xác nhận lại</option>
            <option value="">Đã hủy</option>
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
          {listt.length > 0 ?
          (<tbody>
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
                      <td> {renderStatus(li.status)} </td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() =>
                            navi("/app/orderDetailDeposit", {
                              state: { id: li._id },
                            })
                          }
                        >
                          Chi tiết đơn
                        </button>
                        {user.role == 'admin' || user.role == 'manager' ? (<button
                          className="btn btn-danger"
                          onClick={() =>
                            navi("/app/updateDeposit", {
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
          </tbody>):(<tbody><tr><th colSpan='7'>Đơn ký gửi trống!</th></tr></tbody>)}
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
