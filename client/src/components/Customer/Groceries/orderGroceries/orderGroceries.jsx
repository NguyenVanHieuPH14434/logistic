import React from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import "./orderGroceries.scss";
import { useLocation } from "react-router-dom";
import LOGO from "../../../../assets/public/img/logo_login.png";

export default function OrderGroceries() {
  const location = useLocation();
  const [orderCode, setOrderCode] = useState("#6969696969");
  const [orderDate, setOrderDate] = useState("25/10/2099");
  const [orderSeller, setOrderSeller] = useState("Meo");
  const [list2, setList2] = useState(location.state ? location.state.data : "");
  const [order2, setOrder2] = useState(
    location.state ? location.state.order : ""
  );
  console.log("order2", order2);

  return (
    <div className="order_groceries">
      <div className="d-flex justify-content-between">
        <img src={LOGO} alt="" />
        <div className="company_information">
          <h3>Công ty TNHH 1 con Mèo</h3>
          <div className="d-flex">
            <i className="fa-solid fa-location-dot mt-1"></i>
            <p className="ms-1">
              Địa chỉ: Tầng 22, Tòa nhà NB902, P.Thành Thái, Q.Cầu Giấy, HN
            </p>
          </div>
          <p>ĐT Hotline: 0333 333 333</p>
          <p>Website: meomeo@meow.com</p>
        </div>
      </div>
      <h1>THANH TOÁN ĐƠN HÀNG</h1>
      <h2>THÔNG TIN ĐƠN HÀNG - DÀNH CHO NGƯỜI MUA</h2>
      <div className="order_information d-flex">
        <div className="order_label ms-5">
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
        {list2.map((li, i) => (
          <div className="order_label ms-5" key={i}>
            <p>
              Tên sản phẩm:
              <span className="order_code"> {li.product_name}</span>{" "}
            </p>
          </div>
        ))}
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
            {list2 &&
              list2.map((li, i) => (
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
                      src={
                        li.fileImage ? URL.createObjectURL(li.fileImage) : ""
                      }
                    />
                  </td>
                  <td>
                    <input
                      disabled
                      className="w-100 form-control"
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
                    <input
                      disabled
                      className="w-100 form-control mt-2"
                      type="text"
                      name="product_link"
                      value={li.product_link ? li.product_link : ""}
                      placeholder="Link sản phẩm"
                    />
                  </td>
                  <td className="pt-5">
                    {" "}
                    <NumericFormat
                      disabled
                      style={{
                        border: "none",
                        backgroundColor: "white"
                     
                      }}
                      type="text"
                      name="product_price"
                      value={li.product_price ? li.product_price : ""}
                      thousandSeparator=","
                    />
                  </td>
                  <td className="soLuong">
                    <div className="d-flex soLuong">
                      <input
                        disabled
                        className="value border border-none w-50 px-3 text-center"
                        type="text"
                        value={li.quantity ? li.quantity : ""}
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
                  <td className="pt-5">
                    <p className="">
                      <NumericFormat
                        disabled={true}
                        style={{
                          border: "none",
                          backgroundColor: "none",
                          width: "100%",
                        }}
                        value={li.total_price ? li.total_price : ""}
                        thousandSeparator=","
                      />{" "}
                    </p>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>

      <h6 className="mt-5">
        Cộng thành tiền (Viết bằng chữ):
        ................................................................................................................................................................................................................................................
      </h6>

      <div className="text-end mt-5 me-4">
        Ngày.........tháng.........năm 20.........
      </div>

      <div className="d-flex justify-content-between mt-5 pb-5">
        <div className="text-center ms-5">
          <h4>Người mua hàng</h4>
          <p>(Ký, ghi rõ họ tên)</p>
        </div>
        <div className="text-center me-5">
          <h4>Người bán hàng</h4>
          <p>(Ký, ghi rõ họ tên)</p>
        </div>
      </div>
    </div>
  );
}
