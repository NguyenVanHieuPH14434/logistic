import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useLocation } from "react-router-dom";
import { deltailOrder } from "../../../../api/orderApi";
import { deltailDeposit } from "../../../../api/depositApi";
import { NumericFormat } from "react-number-format";
import "./orderDeposit.scss";
import LOGO from "../../../../assets/public/img/logo_login.png";
import { DocTienBangChu, numberWithCommas } from "../../../../lib/shipFee";
import "../listDeposit.scss";

export default function OrderDeposit() {
  const location = useLocation();
  const [list, setList] = useState(location.state ? location.state.data : "");
  const [order, setOrder] = useState(location.state ? location.state.data : "");
  let newDate = new Date();
  let date =
    newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();
  let month =
    newDate.getMonth() + 1 < 10
      ? "0" + (newDate.getMonth() + 1)
      : newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const total = location.state ? location.state.total : "";

  const handleOnCLickDownload = (e) => {
    window.print();
  };

  console.log(">>>>> order", order);

  return (
    <div className="order_deposit">
      <div className="d-flex justify-content-between">
        <img style={{ width: "240px", height: "60px" }} src={LOGO} alt="" />
        <div className="company_information">
          <h4>HiExpress trực thuộc Công Ty TNHH Công Nghệ PHARMACY Việt Nam</h4>
          <div className="d-flex">
            <i className="fa-solid fa-location-dot mt-1"></i>
            <p style={{ margin: "0" }} className="ms-1">
              Địa chỉ văn phòng: Tòa nhà N09b2, khu đô thị mới Dịch Vọng, quận
              Cầu Giấy, TP Hà Nội
            </p>
          </div>
          <p style={{ margin: "0" }}>Hotline: 098.8176.899</p>
          <p style={{ margin: "0" }}>Email: support@logistic.vn</p>
        </div>
      </div>
      <h1 className="mt-5">THANH TOÁN ĐƠN KÝ GỬI</h1>
      <p style={{ margin: "0" }}>
        Tên khách hàng: {location.state.order.full_name}
      </p>
      <div
        className="location"
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <i className="fa-solid me-2 fa-location-dot"></i>
        <span>Địa chỉ nhận hàng: {location.state.order.address}</span>
      </div>
      <p style={{ margin: "0" }}>Số điện thoại: {location.state.order.phone}</p>
      <p style={{ margin: "0" }}>
        Tổng tiền thanh toán: {formatNumber(location.state.order.total)} đ
      </p>
      {order.map((or, i) => {
        return (
          <>
            <span>Tên nhóm hàng: {location.state.order.type_title} </span> <br/>
            <span>Mã nhóm hàng: {location.state.order.type_code} </span> <br/>
          </>
        );
      })}
      <br />
      <Table className="text-white" striped bordered hover size="lg">
        <thead style={{ backgroundColor: "#8610e6" }}>
          <tr>
            <th style={{ width: "5%" }}>STT</th>
            <th>Ảnh Sản Phẩm</th>
            <th>Thông tin hàng hóa</th>
            <th>Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          {list &&
            list.map((li, i) => (
              <tr key={i}>
                <td className="stt">
                  {" "}
                  <span>{i + 1}</span>
                </td>
                <td style={{ width: "15%" }}>
                  <div>
                    {li.fileImage
                      ? li.fileImage.map((preview) => {
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
                        })
                      : li.image.map((preview) => {
                          return (
                            <img
                              style={{
                                width: "96px",
                                height: "64px",
                                marginTop: "24px",
                              }}
                              alt=""
                              src={`http://localhost:9000/${preview}`}
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
                    <label className="text-start me-2 mt-2 w-25">MVĐ: </label>
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
                    <label className="text-start me-2 mt-2 w-25">Tên: </label>
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
                    <label className="text-start me-2 mt-2 w-25">SL: </label>
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
                    <label className="text-start me-2 mt-2 w-25">Kg/m3: </label>
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
                    <label className="text-start me-2 mt-2 w-25">Giá: </label>
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
                    <label className="text-start me-2 mt-2 w-25">
                      Phụ phí:{" "}
                    </label>
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

      <div className="footter">
        <h6 className="mt-5">
          Cộng thành tiền (Viết bằng chữ): &nbsp;
          {DocTienBangChu(total)}
        </h6>
        <div className="text-end mt-5 me-4">
          Ngày.........tháng.........năm 20.........
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
