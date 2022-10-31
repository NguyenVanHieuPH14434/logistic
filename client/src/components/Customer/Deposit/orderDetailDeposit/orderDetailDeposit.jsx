import './OrderDetailDeposit.scss'
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useLocation } from "react-router-dom";
import { deltailOrder } from "../../../../api/orderApi";
import { deltailDeposit } from '../../../../api/depositApi';
import { NumericFormat } from 'react-number-format';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log("list", list);
  console.log("item", item);

  return (
    <div className="OrderDetailGroceries">
      <h1>Order Detail Deposit</h1>
      <div>Mã đơn hàng:</div>
      <Table striped bordered hover size="lg">
                    <thead>
                        <tr>
                            <th style={{ width: '5%' }}>STT</th>
                            <th>Ảnh Sản Phẩm</th>
                            {/* <th>Tên thuộc tính</th> */}
                            <th>Thông tin hàng hóa</th>
                            <th>Ghi chú</th>
                        </tr>
                    </thead>
                    <tbody>
                        {item.map((li, i) => (
                            <tr key={i}>
                                <td > <span>{i + 1}</span></td>
                                <td  className="td_img col-2">
                            
                       <div>
                       {li.image.map((preview)=>{
                                return (
                                  <img
                                  style={{
                                    width: "96px",
                                    height: "64px",
                                    marginTop: "24px",
                                  }}
                                  src={`http://localhost:9000/${preview}`}
                                />
                            )})} 
                       </div>
                        </td>
                                <td className="td_productInformation col-6" > 
                                    <div style={{padding: '0 10px'}} className="d-flex justify-content-between"><label className="text-end me-2 mt-2 w-50">Mã vận đơn: </label>
                                        <input
                                        disabled
                                            className="w-100 mt-1 form-control"
                                            type="text"
                                            placeholder="Mã vận đơn (*)"
                                            name="maVanDon"
                                          value={li.maVanDon}

                                        />
                                    </div>
                                    <div style={{padding: '0 10px'}} className="d-flex justify-content-between"><label className="text-end me-2 mt-2 w-50">Tên sản phẩm: </label>
                                        <input
                                            className="w-100 mt-1 form-control"
                                            type="text"
                                            placeholder="Tên sản phẩm (*)"
                                            name="nameSanPham"
                                            value={li.nameSanPham}
                                            disabled
                                        />
                                    </div>

                                    <div style={{padding: '0 10px'}} className="d-flex justify-content-between"><label className="text-end me-2 mt-2 w-50">Số kiện hàng: </label>
                                        <input
                                            className="w-100 mt-1 form-control"
                                            type="text"
                                            placeholder="Số kiện hàng"
                                            name="soKien"
                                            value={li.soKien}
                                            disabled

                                        />
                                    </div>

                                    <div style={{padding: '0 10px'}} className="d-flex justify-content-between"><label className="text-end me-2 mt-2 w-50">Số cân, số khối: </label>
                                        <input
                                            className="w-100 mt-1 form-control"
                                            type="text"
                                            name="kgM3"
                                            placeholder="Số cân, số khối"
                                            value={li.kgM3}
                                            disabled
                                        />
                                    </div>

                                    <div style={{padding: '0 10px'}} className="d-flex justify-content-between"><label className="text-end me-2 mt-2 w-50">Đơn giá: </label>
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

                                    <div style={{padding: '0 10px'}} className="d-flex justify-content-between"><label className="text-end me-2 mt-2 w-50">Phụ phí: </label>
                                        <NumericFormat
                                            className="w-100 mt-1 form-control"
                                            type="text"
                                            name="phuPhi"
                                            placeholder="Phụ phí"
                                            value={li.phuPhi}
                                            thousandSeparator=","
                                            disabled
                                        />
                                    </div >
                                   <div style={{padding: '0 10px'}} className="d-flex justify-content-between">
                                   <label  className="text-end me-2 mt-2 w-50"  htmlFor="">Tổng tiền: </label>
                                    <NumericFormat
                                        className="w-100 text-center mx-auto form-control mt-1"
                                        type="text"
                                        disabled
                                        style={{ background: '#EDA82D' }}
                                        value={li.tongTien}
                                        placeholder="Tổng tiền thanh toán"
                                        thousandSeparator=","
                                    ></NumericFormat>
                                   </div>
                                </td>

                                <td className="col-3">
                                    {" "}
                                    <textarea
                                        className="ghi_chu form-control"
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


