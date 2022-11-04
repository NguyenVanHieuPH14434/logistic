import React from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import "./orderGroceries.scss";
import { useLocation } from "react-router-dom";

export default function OrderGroceries() {
  const location = useLocation();
  
  const [list2, setList2] = useState(location.state?location.state.data:'');

  return (
    <div className="order_groceries">
      <h1>THANH TOÁN ĐƠN HÀNG</h1>
      <p>Xin chào: {location.state.order.full_name}!</p>
      <p>
        Đơn hàng <span className="order_code"></span> của bạn đã được đặt thành
        công 
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
        <p >Số tiền cọc: {location.state.order.datCoc} đ</p>
        <p >Tổng tiền thanh toán: <span><NumericFormat
                      disabled={true}
                      style={{
                        border: "none",
                        backgroundColor: "white",
                      }}
                     
                      value={location.state.order.total}
                      thousandSeparator=","
                    /></span>đ</p><br />
      <Table style={{ backgroundColor: "white" }} bordered hover size="lg">
        <thead style={{ backgroundColor: "#8610e8", color:'white'}}>
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
          {list2&&list2.map((li, i) => {
            return (
              <tr key={i}>
                <td className="pt-5">
                  {" "}
                  {i + 1} <br />
                </td>
                <td style={{ maxWidth: "150px" }}>
                  <img
                    style={{
                      width: "96px",
                      height: "64px",
                      marginTop: "24px",
                    }}
                    src={li.fileImage?URL.createObjectURL(li.fileImage):''}
                  />
                </td>
                <td className="" sytle={{ with: "35%" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <label htmlFor="">Tên SP:</label>
                    <input
                      disabled
                      className="w-75 form-control"
                      type="text"
                      name="product_name"
                      value={li.product_name ? li.product_name : ""}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <label htmlFor="">Màu sắc, size:</label>
                    <textarea
                      disabled
                      className="mt-2 attribute w-75 form-control"
                      type="text"
                      name="attribute"
                      value={li.attribute ? li.attribute : ""}
                    ></textarea>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <label htmlFor="">Link SP:</label>
                    <input
                      disabled
                      className="w-75 form-control mt-2"
                      type="text"
                      name="product_link"
                      value={li.product_link ? li.product_link : ""}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <label htmlFor="">Giá SP:</label>
                    <NumericFormat
                      disabled
                      className="w-75 form-control mt-2"
                      type="text"
                      name="product_price"
                      value={li.product_price ? li.product_price : ""}
                      // value={li.price}
                      thousandSeparator=","
                      min="1"
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <label htmlFor="">Mã vận đơn:</label>
                    <input
                      disabled
                      className="w-75 form-control mt-2"
                      type="text"
                      placeholder="Mã vận đơn (*)"
                      name="maVanDon"
                      value={li.maVanDon}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <label htmlFor="">Số kiện hàng:</label>
                    <input
                      disabled
                      className="w-75 form-control mt-2"
                      type="text"
                      placeholder="Số kiện hàng"
                      name="soKien"
                      value={li.soKien}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <label htmlFor="">Số cân, số khối:</label>
                    <input
                      disabled
                      className="w-75 form-control mt-2"
                      type="text"
                      name="kgM3"
                      value={li.kgM3}
                      placeholder="Số cân, số khối"
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <label htmlFor="">gia vận chuyển:</label>
                    <input
                      disabled
                      className="w-75 form-control mt-2"
                      type="text"
                      name="donGia"
                      value={li.donGia}
                      placeholder="Cước vận chuyển"
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <label htmlFor="">Phụ phí:</label>
                    <input
                      disabled
                      className="w-75 form-control mt-2"
                      type="text"
                      name="phuPhi"
                      value={li.phuPhi}
                      placeholder="Phụ phí"
                    />
                  </div>
                </td>
                <td className="pt-5">
                  {li.product_price ? li.product_price : ""}
                </td>
                <td className="soLuong">
                  <div className="d-flex soLuong">{li.quantity}</div>
                </td>
                <td>
                  {" "}
                  <div className="d-flex soLuong">{li.note ? li.note : ""}</div>
                </td>
                <td className="pt-5">
                  <p className=""><NumericFormat
                      disabled={true}
                      style={{
                        border: "none",
                        backgroundColor: "white"
                     
                      }}
                     
                      value={li.total_price} 
                      thousandSeparator=","
                    /></p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
