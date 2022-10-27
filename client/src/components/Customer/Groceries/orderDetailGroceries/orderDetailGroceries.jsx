/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import "./OrderDetailGroceries.scss";
import Table from "react-bootstrap/Table";
import { useLocation } from "react-router-dom";
import { deltailOrder } from "../../../../api/orderApi";

export default function OrderDetailGroceries() {
  const location = useLocation();
  console.log("ss", location.state.id);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log("list", list);
  console.log("item", item);

  return (
    <div className="OrderDetailGroceries">
      <h1>Order Detail Groceries</h1>
      <div>Mã đơn hàng:</div>
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
                <td>
                  <img
                    style={{
                      width: "96px",
                      height: "64px",
                      marginTop: "24px",
                    }}
                    src={`http://localhost:9000/${li.product_image}`}
                  />
                </td>
                <td>
                  <input
                    className="w-100 form-control"
                    type="text"
                    name="product_name"
                    value={li.product_name ? li.product_name : ""}
                    disabled
                    placeholder="Tên sản phẩm"
                  />
                  <textarea
                    className="mt-2 attribute w-100 form-control"
                    type="text"
                    name="attribute"
                    value={li.attribute ? li.attribute : ""}
                    disabled
                    placeholder="Màu sắc, size, kích thước"
                  ></textarea>
                  <input
                    className="w-100 form-control mt-2"
                    type="text"
                    name="product_link"
                    value={li.product_link ? li.product_link : ""}
                    disabled
                    placeholder="Link sản phẩm"
                  />
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
                  <p className="">{li.total_price}</p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
