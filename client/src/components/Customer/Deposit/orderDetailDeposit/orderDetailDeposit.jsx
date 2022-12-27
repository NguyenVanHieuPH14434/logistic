import "./OrderDetailDeposit.scss";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useLocation } from "react-router-dom";
import { deltailOrder } from "../../../../api/orderApi";
import { deltailDeposit } from "../../../../api/depositApi";
import "../listDeposit.scss";
import { NumericFormat } from "react-number-format";

export default function OrderDetailDeposit() {
  const location = useLocation();
  console.log("ss", location.state.id);
  const [list, setList] = useState({});
  const [item, setItem] = useState([]);
  const getDetail = async () => {
    const res = await deltailDeposit(location.state.id);
    return res;
  };
  useEffect(() => {
    getDetail().then((res) => {
      setList(res.data.data);
      setItem(res.data.data.depositItem);
    });
  }, []);
  console.log("list", list);
  console.log("item", item);

  return (
    <div className="OrderDetailGroceries ">
      <h3 className="mt-3 text-center">
        THÔNG TIN ĐƠN HÀNG - DÀNH CHO NGƯỜI MUA
      </h3>
      <p>Xin chào: {list.full_name}!</p>
      <p>
        Đơn hàng <span className="order_code"></span> của bạn đã được đặt thành
        công trong ngày <span> {list.ctime} </span>
      </p>
      <div
        className="location mb-3"
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <i className="fa-solid me-2 fa-location-dot"></i>
        <span>Địa chỉ nhận hàng: {list.address}</span>
      </div>

      <div className="order_information d-flex">
        <div className="order_label">
          <p>
            Mã đơn hàng:<span className="order_code"> {list._id} </span>{" "}
          </p>
          <p>Ngày đặt hàng: {list.ctime} </p>
          <p>Tên nhóm hàng: {list.type_title}</p>
          <p>Mã nhóm hàng: {list.type_code}</p>
        </div>
      </div>
      <Table striped bordered hover size="lg">
        <thead className="thead_orderDetailDeposit">
          <tr>
            <th style={{ width: "5%" }}>STT</th>
            <th>Ảnh Sản Phẩm</th>
            <th>Thông tin hàng hóa</th>
            <th>Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          {item.map((li, i) => (
            <tr className="orderDetailDeposit_tr" key={i}>
              <td>
                {" "}
                <span>{i + 1}</span>
              </td>
              <td style={{ width: "15%" }}>
                <div>
                  {li.image.map((preview) => {
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
      <h3>
        <button
          className="noPrint btn btn-primary"
          onClick={(e) => window.print()}
        >
          Print
        </button>
      </h3>
    </div>
  );
}
