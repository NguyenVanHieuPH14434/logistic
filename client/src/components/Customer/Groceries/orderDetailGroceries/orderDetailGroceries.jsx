import React, { useEffect, useState } from "react";
import "./OrderDetailGroceries.scss";
import Table from "react-bootstrap/Table";
import { useLocation } from "react-router-dom";
import { deltailOrder, listOrder } from "../../../../api/orderApi";
import { NumericFormat } from "react-number-format";
import { numberWithCommas } from "../../../../lib/shipFee";
export default function OrderDetailGroceries() {
  const location = useLocation();
  const [list, setList] = useState({});
  const [item, setItem] = useState([]);
  const getDetail = async () => {
    const res = await deltailOrder(location.state.id);
    return res;
  };
  useEffect(() => {
    getDetail().then((res) => {
      setList(res.data.data);
      setItem(res.data.data.orderItem);
    });
  }, []);

  return (
    <div className="OrderDetailGroceries">
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
        </div>
      </div>
      <Table style={{ backgroundColor: "white" }} bordered hover size="lg">
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
          {item.map((li, i) => {
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
                    src={`http://localhost:9000/${li.product_image}`}
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
                      value={numberWithCommas(li.phuPhi)}
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
                  <p className="">{numberWithCommas(li.total_price)}</p>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
            <tr>
              <th colSpan="5">Tổng tiền thanh toán</th>
              <th colSpan="2">{list.total?numberWithCommas(list.total):0} Vnđ</th>
            </tr>
          </tfoot>
      </Table>
    </div>
  );
}
