// import "./OrderDetailDeposit.scss";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useLocation } from "react-router-dom";
import { deltailOrder } from "../../../../api/orderApi";
import { deltailDeposit } from "../../../../api/depositApi";
import { NumericFormat } from "react-number-format";
import "./orderDeposit.scss";

export default function OrderDeposit() {
  const location = useLocation();
  console.log("ss", location.state.id);
  const [list, setList] = useState(location.state?location.state.data:'');
  let newDate = new Date()
  let date = newDate.getDate() < 10 ?'0'+newDate.getDate():newDate.getDate();
  let month = (newDate.getMonth() + 1) < 10 ? '0'+(newDate.getMonth() + 1):newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  function formatNumber (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

  return (
    
      <div className="OrderDetailGroceries">
           <h1>THANH TOÁN ĐƠN HÀNG</h1>
      <p>Xin chào: {location.state.order.full_name}!</p>
      <p>
        Đơn hàng <span className="order_code"></span> của bạn đã được đặt thành
        công ngày <span>{date+'-'+month+'-'+year}</span>
      </p>
      <div
        className="location mb-3"
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <i className="fa-solid me-2 fa-location-dot"></i>
        <span>Địa chỉ nhận hàng: {location.state.order.address}</span>
      </div>
        <p >Số điện thoại: {location.state.order.phone}</p>
        <p >Tổng tiền thanh toán: {formatNumber(location.state.order.total)} đ</p>
        <br />
          <Table striped bordered hover size="lg">
              <thead>
                  <tr>
                      <th style={{ width: "5%" }}>STT</th>
                      <th>Ảnh Sản Phẩm</th>
                      {/* <th>Tên thuộc tính</th> */}
                      <th>Thông tin hàng hóa</th>
                      <th>Ghi chú</th>
                  </tr>
              </thead>
              <tbody>
                  {list&&list.map((li, i) => (
                      <tr key={i}>
                          <td>
                              {" "}
                              <span>{i + 1}</span>
                          </td>
                          {/* <td  className="td_img col-1"> */}
                          <td style={{ width: "15%" }}>
                              <div>
                                  {li.fileImage.map((preview) => {
                                      return (
                                          <img
                                              style={{
                                                  width: "96px",
                                                  height: "64px",
                                                  marginTop: "24px",
                                              }}
                                              alt=""
                                              src={preview}
                                          />
                                      );
                                  })}
                              </div>
                          </td>
                          <td className="td_productInformation " style={{ width: "50%" }}>
                              <div
                                  style={{ padding: "0 10px" }}
                                  className="d-flex justify-content-between"
                              >
                                  <label className="text-start me-2 mt-2 w-25">
                                      Mã vận đơn:{" "}
                                  </label>
                                  <input
                                      disabled
                                      className="w-100 mt-1 form-control"
                                      type="text"
                                      placeholder="Mã vận đơn (*)"
                                      name="maVanDon"
                                      value={li.maVanDon}
                                  />
                              </div>
                              <div
                                  style={{ padding: "0 10px" }}
                                  className="d-flex justify-content-between"
                              >
                                  <label className="text-start me-2 mt-2 w-25">
                                      Tên sản phẩm:{" "}
                                  </label>
                                  <input
                                      className="w-100 mt-1 form-control"
                                      type="text"
                                      placeholder="Tên sản phẩm (*)"
                                      name="nameSanPham"
                                      value={li.nameSanPham}
                                      disabled
                                  />
                              </div>

                              <div
                                  style={{ padding: "0 10px" }}
                                  className="d-flex justify-content-between"
                              >
                                  <label className="text-start me-2 mt-2 w-25">
                                      Số kiện hàng:{" "}
                                  </label>
                                  <input
                                      className="w-100 mt-1 form-control"
                                      type="text"
                                      placeholder="Số kiện hàng"
                                      name="soKien"
                                      value={li.soKien}
                                      disabled
                                  />
                              </div>

                              <div
                                  style={{ padding: "0 10px" }}
                                  className="d-flex justify-content-between"
                              >
                                  <label className="text-start me-2 mt-2 w-25">
                                      Số cân, số khối:{" "}
                                  </label>
                                  <input
                                      className="w-100 mt-1 form-control"
                                      type="text"
                                      name="kgM3"
                                      placeholder="Số cân, số khối"
                                      value={li.kgM3}
                                      disabled
                                  />
                              </div>

                              <div
                                  style={{ padding: "0 10px" }}
                                  className="d-flex justify-content-between"
                              >
                                  <label className="text-start me-2 mt-2 w-25">Đơn giá: </label>
                                  <NumericFormat
                                      className="w-100 mt-1 form-control"
                                      type="text"
                                      name="donGia"
                                      placeholder="Đơn giá"
                                      value={li.donGia}
                                      thousandSeparator=","
                                      disabled
                                  />
                              </div>

                              <div
                                  style={{ padding: "0 10px" }}
                                  className="d-flex justify-content-between"
                              >
                                  <label className="text-start me-2 mt-2 w-25">Phụ phí: </label>
                                  <NumericFormat
                                      className="w-100 mt-1 form-control"
                                      type="text"
                                      name="phuPhi"
                                      placeholder="Phụ phí"
                                      value={li.phuPhi}
                                      thousandSeparator=","
                                      disabled
                                  />
                              </div>
                              <div
                                  style={{ padding: "0 10px" }}
                                  className="d-flex justify-content-between"
                              >
                                  <label className="text-start me-2 mt-2 w-25" htmlFor="">
                                      Tổng tiền:{" "}
                                  </label>
                                  <NumericFormat
                                      className="w-100 text-center mx-auto form-control mt-1"
                                      type="text"
                                      disabled
                                      style={{ background: "#EDA82D" }}
                                      value={li.tongTien}
                                      placeholder="Tổng tiền thanh toán"
                                      thousandSeparator=","
                                  ></NumericFormat>
                              </div>
                          </td>

                          <td style={{ width: "35%", padding: "10px 15px" }}>
                              {" "}
                              <textarea
                                  className="form-control"
                                  disabled
                                  name="note"
                                  id=""
                                  cols="30"
                                  rows="10"
                                  value={li.note}
                                  placeholder="Ghi chú sản phẩm..."
                              ></textarea>{" "}
                          </td>
                      </tr>
                  ))}
              </tbody>
          </Table>
      </div>
  );
}
