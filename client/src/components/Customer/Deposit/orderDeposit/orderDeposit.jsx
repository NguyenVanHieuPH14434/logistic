import React, { useState } from "react";
import { Table } from "react-bootstrap";
import "./orderDeposit.scss";

export default function OrderDeposit() {
  const [orderCode, setOrderCode] = useState("#6969696969");
  const [orderDate, setOrderDate] = useState("25/10/2099");
  const [orderSeller, setOrderSeller] = useState("Meo");

  const [list, setList] = useState([
    {
      id: "1",
      img: "https://anhgaixinh.biz/wp-content/uploads/2022/01/gai-xinh-mac-vay-xep-ly-ngan-9.jpg",
      attribute: "",
      price: "",
      amount: 0,
      note: "",
      totalPrice: 0,
    },
  ]);

  return (
    <div className="order_deposit">
      <h1>THANH TOÁN ĐƠN KÝ GỬI</h1>
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
              <th>Thông tin hàng hóa</th>
              <th>Thông Tin Số Hàng Hóa</th>
              <th>Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            {list.map((li, i) => (
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
                    style={{ width: "96px", height: "64px", marginTop: "24px" }}
                    src={li.img}
                  />
                </td>
                <td>
                  <input
                    className="w-100"
                    type="text"
                    placeholder="Mã vận đơn (*)"
                    name="maVanDon"
                  />
                  <input
                    className="w-100"
                    type="text"
                    placeholder="Tên sản phẩm (*)"
                    name="nameSanPham"
                  />
                  <input
                    className="w-100"
                    type="text"
                    placeholder="Số kiện hàng (*)"
                    name="soKienHang"
                  />
                  <input
                    className="w-100"
                    type="text"
                    placeholder="hãng vận chuyển (*)"
                  />
                </td>
                <td className="">
                  <input
                    className="w-100"
                    type="text"
                    value="Trung Quốc - Việt Nam"
                  />
                  <select style={{ width: "100%" }}>
                    <option value="">Chọn danh mục</option>
                    <option value="">Saab</option>
                    <option value="">Mercedes</option>
                    <option value="">Audi</option>
                  </select>
                  <input
                    className="w-100"
                    type="text"
                    value="Số lượng sản phẩm"
                  />
                  <input
                    className="w-100"
                    type="text"
                    value="Giá trị hàng hóa"
                  />
                </td>
                <td>
                  {" "}
                  <textarea
                    className="ghi_chu"
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="Ghi chú sản phẩm..."
                  ></textarea>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
