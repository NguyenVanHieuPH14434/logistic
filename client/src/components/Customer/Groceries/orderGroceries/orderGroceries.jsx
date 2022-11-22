import React from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import "./orderGroceries.scss";
import { useLocation } from "react-router-dom";
import LOGO from "../../../../assets/public/img/logo_login.png";
import { DocTienBangChu, numberWithCommas } from "../../../../lib/shipFee";

export default function OrderGroceries() {
  const location = useLocation();
  const [orderCode, setOrderCode] = useState("#6969696969");
  const [orderDate, setOrderDate] = useState("25/10/2099");
  const [orderSeller, setOrderSeller] = useState("Meo");
  const [list2, setList2] = useState(location.state ? location.state.data : "");
  const [order2, setOrder2] = useState(
    location.state ? location.state.order : ""
  );

  // const [date, setDate] = useState('')

  // const handleOnChangeDate = (e) =>{
  //   setDate(new Date().toLocaleString())
  // }
  const total = location.state ? location.state.total : "";
  console.log("order2", order2);

  const [show, setShow] = useState("d-block");

  const handleOnCLickDownload = () => {
    // setShow('d-block')
    window.print();
    // setShow('d-none')
    // html2canvas(document.body).then(fuction(canvas){
    //   const a = document.createElement('a');
    //   a.href = canvas.toDataURL()
    // })
  };
  const a = DocTienBangChu(total);

  console.log(a);
  return (
    <div className="order_groceries">
      <div className={`d-flex justify-content-between ${show}`}>
        <img className="ps-5" src={LOGO} alt="" />
        <div className="company_information ms-5">
          <h5>
          HiExpress trực thuộc Công Ty TNHH Công Nghệ PHARMACY Việt Nam
          </h5>
          <div className="d-flex">
            <i className="fa-solid fa-location-dot mt-1"></i>
            <p className="ms-1">
              Địa chỉ văn phòng: Tòa nhà N09b2, khu đô thị mới Dịch Vọng, quận
              Cầu Giấy, TP Hà Nội
            </p>
          </div>
          <p>Hotline: 098.8176.899</p>
          <p>Email: support@logistic.vn</p>
        </div>
      </div>
      <h1 className="mt-5">THANH TOÁN ĐƠN HÀNG</h1>
      <div className="order_information d-flex">
        <div className="order_label mb-3">
          <p>
            Tên khách hàng:
            <span className="order_code"> {order2.full_name} </span>{" "}
          </p>
          <p>
            Số điện thoại:<span className="order_code"> {order2.phone} </span>{" "}
          </p>
          <p>
            Địa chỉ:<span className="order_code"> {order2.address} </span>{" "}
          </p>
        </div>
      </div>
      <div className="product_information">
        <Table striped bordered hover size="lg">
          <thead>
            <tr>
              <th>STT</th>
              <th>Ảnh Sản Phẩm</th>
              <th>Thuộc tính</th>
              <th>Đơn giá</th>
              <th>Số lượng</th>
              <th>Ghi chú</th>
              <th style={{width: "10px",}}>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {list2 &&
              list2.map((li, i) => (
                <tr key={i}>
                  <td className="pt-5">
                    {" "}
                    {i + 1} <br />
                  </td>
                  <td>
                    <img
                      style={{
                        width: "96px",
                        height: "64px",
                        marginTop: "24px",
                      }}
                      src={
                        li.fileImage ? URL.createObjectURL(li.fileImage) : `http://localhost:9000/${li.product_image}`
                      }
                    />
                  </td>
                  <td className="attribute">
                    <textarea
                      disabled
                      className="name_attribute w-100 form-control"
                      type="text"
                      name="product_name"
                      value={li.product_name ? li.product_name : ""}
                      placeholder="Tên sản phẩm"
                    />
                    <textarea
                      disabled
                      className="mt-2 attribute w-100 form-control"
                      type="text"
                      name="attribute"
                      value={li.attribute ? li.attribute : ""}
                      placeholder="Màu sắc, size, kích thước"
                    ></textarea>
                    <textarea
                    style={{height: 'auto'}}
                      disabled
                      className="w-100 form-control mt-2"
                      type="text"
                      name="product_link"
                      value={li.product_link ? li.product_link : ""}
                      placeholder="Link sản phẩm"
                    />
                  </td>
                  <td className="pt-5 donGia">
                    {" "}
                    <NumericFormat
                      disabled
                      style={{
                        // width: '100%',
                        width: '160px',
                        border: "none",
                        backgroundColor: "none",
                      }}
                      type="text"
                      name="product_price"
                      value={li.product_price ? li.product_price : ""}
                      thousandSeparator=","
                    />
                  </td>
                  <td className="soLuong">
                    <div className="d-flex soLuong">
                   {li.quantity ? li.quantity : ""}
                     
                    </div>
                  </td>
                  <td>
                    {" "}
                    <textarea
                      disabled
                      className="ghi_chu"
                      name="note"
                      id=""
                      cols="30"
                      rows="10"
                      value={li.note ? li.note : ""}
                      placeholder="Ghi chú sản phẩm..."
                    ></textarea>{" "}
                  </td>
                  <td className="pt-5" style={{width: "100px",}}>
                    <p className="">
                      <NumericFormat
                        disabled={true}
                        style={{
                          border: "none",
                          backgroundColor: "none",
                          
                        }}
                        value={li.total_price ? li.total_price : ""}
                        thousandSeparator=","
                      />{" "}
                    </p>
                  </td>
                </tr>
              ))}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan="5">Tổng tiền thanh toán</th>
              <th colSpan="2">{numberWithCommas(total)}</th>
            </tr>
          </tfoot>
        </Table>
      </div>

      <div className="footter">
        <h6 className="mt-5">
          Cộng thành tiền (Viết bằng chữ): &nbsp;
          {DocTienBangChu(total)}
        </h6>
        <div className="text-end mt-5 me-4">
          Ngày.........tháng.........năm 20.........
          {/* {date} */}
        </div>
        <div className="sign d-flex justify-content-between mt-5 pb-5">
          <div className="orderCustomer text-center ms-5">
            <h4>Người mua hàng</h4>
            <p>(Ký, ghi rõ họ tên)</p>
          </div>
          <div className="groceriesCustomer text-center me-5">
            <h4>Người bán hàng</h4>
            <p>(Ký, ghi rõ họ tên)</p>
          </div>
        </div>
        <div className="capture text-end">
          <button
            onClick={(e) => handleOnCLickDownload(e)}
            style={{ border: "none", background: "#9470d4" }}
            className="p-2 text-white"
          >
            Dowload
          </button>
        </div>
      </div>
    </div>
  );
}
