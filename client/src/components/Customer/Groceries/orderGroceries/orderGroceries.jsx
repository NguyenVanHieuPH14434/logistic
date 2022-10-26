import React from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import "./orderGroceries.scss";
import { useLocation } from "react-router-dom";

export default function OrderGroceries() {
  const location = useLocation();
  const [orderCode, setOrderCode] = useState("#6969696969");
  const [orderDate, setOrderDate] = useState("25/10/2099");
  const [orderSeller, setOrderSeller] = useState("Meo");
  const [list2, setList2] = useState(location.state?location.state.data:'');

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
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {list2&&list2.map((li, i) => (
              <tr key={i}>
                <td className="pt-5">
                  {" "}
                  {i + 1} <br />
                  <span style={{ cursor: "pointer" }}>
                    <i className="fa-solid fa-circle-xmark"></i>
                  </span>
                </td>
                <td>
                  <img
                    style={{
                      width: "96px",
                      height: "64px",
                      marginTop: "24px",
                    }}
                    src={li.fileImage?li.fileImage:''}
                  />
                </td>
                <td>
                  <input
                    className="w-100"
                    type="text"
                    name="product_name"
                    value={li.product_name ? li.product_name : ""}
                    placeholder="Tên sản phẩm"
                  />
                  <textarea
                    className="mt-2 attribute w-100"
                    type="text"
                    name="attribute"
                    value={li.attribute ? li.attribute : ""}
                    placeholder="Màu sắc, size, kích thước"
                  ></textarea>
                  <input
                    className="w-100"
                    type="text"
                    name="product_link"
                    value={li.product_link ? li.product_link : ""}
                    placeholder="Link sản phẩm"
                  />
                </td>
                <td className="pt-5">
                  {" "}
                  {/* <input
                      type="text"
                      name="price"
                      value={li.price}
                      onChange={(e) => changeInp(i, e)}
                    /> */}
                  <NumericFormat
                    style={{
                      border: "none",
                      backgroundColor: "none",
                      width: "100%",
                    }}
                    type="text"
                    name="product_price"
                    value={li.product_price ? li.product_price : ""}
                    // value={li.price}
                    thousandSeparator=","
                  />
                </td>
                <td className="soLuong">
                  <div className="d-flex soLuong">
                    <input
                      className="value border w-50 border-dark px-3 text-center"
                      type="text"
                      value={li.quantity ? li.quantity:""}
                      name="quantity"
                    />
                  </div>
                </td>
                <td>
                  {" "}
                  <textarea
                    className="ghi_chu"
                    name="note"
                    id=""
                    cols="30"
                    rows="10"
                    value={li.note ? li.note : ""}
                    placeholder="Ghi chú sản phẩm..."
                  ></textarea>{" "}
                </td>
                {/* <td className="pt-5"> {li.totalPrice} </td> */}
                <td className="pt-5">
                  <p className="">
                    <NumericFormat
                      disabled={true}
                      style={{
                        border: "none",
                        backgroundColor: "none",
                        width: "100%",
                      }}
                      value={li.total_price ? li.total_price :""}
                      thousandSeparator=","
                    />{" "}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
