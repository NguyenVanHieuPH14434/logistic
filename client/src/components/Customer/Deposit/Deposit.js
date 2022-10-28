import "./Deposit.scss";
import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { Row, Col, Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Routes, Route, Navigate, Link, useParams, useSearchParams } from 'react-router-dom';

import { NumericFormat } from "react-number-format";
import RouterAuth from "../../../RouterAuth";
import RouterDasboard from "../../../RouterDasboard";
import Order from "./orderDeposit/orderDeposit";
import Dasboard from "../../Dasboard";
import { Confirm, toastifyError } from "../../../lib/toastify";
import { haiPhongAreaFeeOfficicalkg, haiPhongAreaFeeOfficicalM3, haNoiAreaFeeOfficicalkg, haNoiAreaFeeOfficicalM3, haNoiAreaFeePacketKg, haNoiAreaFeePacketM3, HCMAreaFeeOfficicalkg, HCMAreaFeeOfficicalM3, HCMAreaFeePacketKg, HCMAreaFeePacketM3 } from "../../../lib/shipFee";

function Deposit() {
    const [list, setList] = useState([
        {
            id: '1',
            img: "https://anhgaixinh.biz/wp-content/uploads/2022/01/gai-xinh-mac-vay-xep-ly-ngan-9.jpg",
            attribute: "",
            price: "",
            amount: 0,
            note: "",
            totalPrice: 0,
        }

    ]);

    // Danh sách các sản phẩm
    // Nút thêm sản phẩm
    const handleOnIncrease = (i, e) => {
        const increase = [...list];
        increase[i]["amount"] = parseInt(increase[i]["amount"]) + 1;
        increase[i]["totalPrice"] = increase[i]["amount"] * increase[i]["price"].replace(/,/g, "");
        setList(increase);
    };

    // Nút bớt sản phẩm
    const handleOnReduced = (i) => {
        const count = [...list];
        if (count[i]["amount"] <= 0) {
            count[i]["amount"] = 0;
            count[i]["totalPrice"] = count[i]["amount"] * count[i]["price"].replace(/,/g, "");
        } else {
            count[i]["amount"] = count[i]["amount"] - 1;
            count[i]["totalPrice"] = count[i]["amount"] * count[i]["price"].replace(/,/g, "");
        }
        setList(count);
    };

    const handleOnClickAddMore = (e) => {
        let newList = [...list];
        const newId = newList.length + 1
        newList = {
            id: newId,
            img: "https://anhgaixinh.biz/wp-content/uploads/2022/01/gai-xinh-mac-vay-xep-ly-ngan-10.jpg",
            attribute: "",
            price: "",
            amount: 0,
            note: "",
            totalPrice: 0,
        };
        setList([...list, newList]);
    };

    //In ra tổng tiền

    var total = 0;
    var totalOrderCost = 0;
    var orderCost = 0;
    for (var li of list) {
        total += li.totalPrice;
        if (total <= 2000000) {
            orderCost = total * (3 / 100);
        }
        else if (total <= 20000000) {
            orderCost = ((2.5) / 100) * total;
        }
        else if (total <= 100000000) {
            orderCost = total * (2 / 100);
        }
        else if (total > 100000000) {
            orderCost = total * (1 / 100);
        }
        totalOrderCost = total + orderCost;
    }


    // Thông tin khách hàng
    const [order, setOrder] = useState()

    // thay đổi giá trị thông tin khách hàng
    const changeInpOrder = (e) => {
        const valOrder = { ...order };
        valOrder[e.target.name] = e.target.value;
        valOrder["user_id"] = "1";
        valOrder["type"] = "order";
        setOrder(valOrder);
    };

    const DeleteList = (i) => {
        const newList = [...list]
        newList.splice(i, 1)
        setList(newList)
    }

    const subMit = (i) => {
        Confirm('Delete!', 'Bạn có muốn xóa không?', DeleteList, i)
    }

    const [show, setShow] = useState(false);

    const handleClose = (e) => setShow(false);
    const handleShow = (e) => setShow(true);


    // Tính giá ship 
    const handleOnClickRadio = (e) => {
        setTypeShip(e.target.value)
      if (e.target.value === 'tronGoi') {
            let newArea = location
            newArea.pop()
            return setArea(newArea)
        }else {
          return setArea(location)
        }
    }

    const location = [{ value: 'Hà Nội', label: 'Hà Nội' }, { value: 'TP.HCM', label: 'TP.HCM' }, { value: 'Hải Phòng', label: 'Hải Phòng' }];
    const [area, setArea] = useState([])
    const [typeShip, setTypeShip] = useState('')
    const [kg, setKg] = useState([])
    const [m3, setM3] = useState([])
    const [fee, setFee] = useState()
    const [disM3, setDisM3] = useState(false);
    const [disKg, setDisKg] = useState(false);
    
    const handleOnChangeArea = (e) => {
        const state = e.target.value + '&&' + typeShip;
        if(!typeShip) return toastifyError('Vui lòng chọn loại phí vận chuyển trước!');
        
        switch (state) {
            case 'TP.HCM&&tronGoi':
                setKg(HCMAreaFeePacketKg) 
                setM3(HCMAreaFeePacketM3)
                return;
            case 'Hà Nội&&tronGoi':
                setKg(haNoiAreaFeePacketKg) 
                setM3(haNoiAreaFeePacketM3)
                return;
            case 'Hà Nội&&chinhNgach':
                setKg(haNoiAreaFeeOfficicalkg) 
                setM3(haNoiAreaFeeOfficicalM3)
                return;
            case 'TP.HCM&&chinhNgach':
                setKg(HCMAreaFeeOfficicalkg) 
                setM3(HCMAreaFeeOfficicalM3)
                return;
            case 'Hải Phòng&&chinhNgach':
                setKg(haiPhongAreaFeeOfficicalkg) 
                setM3(haiPhongAreaFeeOfficicalM3)
                return;
                default:
                    return;
                }
            }

        const changeFee = (e) => {
            let text = '';
            const name = e.target.name;
            const val = e.target.value;
            if(name && val !== 'default'){
                text = name;
            }else {
                text = name + '&&' + val
            }
          switch (text) {
            case 'kg':
                return setDisM3(true);
                case 'm3':
                return setDisKg(true);
            case 'kg&&default':
                 setDisM3(false);
                 setDisKg(false);
                 return 
                 case 'm3&&default':
                     setDisKg(false);
                     setDisM3(false);
                return;
            default:
                break;
          }
            setFee(e.target.value);
        }

        console.log('feeee', fee);
        

    return (
        <>
            <div className="deposit">
                <p className="title">Tạo đơn ký gửi</p>
                <Table striped bordered hover size="lg">
                    <thead>
                        <tr>
                            <th style={{ width: '5%' }}>STT</th>
                            <th>Ảnh Sản Phẩm</th>
                            <th>Thông tin hàng hóa</th>
                            <th>Thông Tin Số Hàng Hóa</th>
                            <th>Ghi chú</th>
                            <th style={{ width: '5%' }}>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((li, i) => (
                            <tr key={i}>
                                <td className="pt-5"> {i + 1} <br />
                                </td>
                                <td style={{ width: '100px' }} className="td_img">
                                    <img
                                        style={{ width: "140px", display: 'flex', alignItems: 'center' }}
                                        src={li.img}
                                    />
                                </td>
                                <td>
                                    <input
                                        className="w-100 form-control"
                                        type="text"
                                        placeholder="Mã vận đơn (*)"
                                        name="maVanDon"
                                        onChange={(e) => changeInpOrder(e)}

                                    />
                                    <input
                                        className="w-100 form-control"
                                        type="text"
                                        placeholder="Tên sản phẩm (*)"
                                        name="nameSanPham"
                                        onChange={(e) => changeInpOrder(e)}

                                    />
                                    <input
                                        className="w-100 form-control"
                                        type="text"
                                        placeholder="Số kiện hàng (*)"
                                        name="soKienHang"
                                        onChange={(e) => changeInpOrder(e)}

                                    />
                                    <input
                                        className="w-100 form-control"
                                        type="text"
                                        placeholder="hãng vận chuyển (*)"
                                        onChange={(e) => changeInpOrder(e)}

                                    />
                                </td>
                                <td className="">
                                    <input
                                        className="w-100 form-control"
                                        type="text"
                                        value="Trung Quốc - Việt Nam"
                                    />
                                    <select className="select_Menu form-control" style={{ width: '100%' }}>
                                        <option value="">Chọn danh mục</option>
                                        <option value="">Saab</option>
                                        <option value="">Mercedes</option>
                                        <option value="">Audi</option>
                                    </select>
                                    <input
                                        className="w-100 form-control"
                                        type="text"
                                        value="Số lượng sản phẩm"
                                    />
                                    <input
                                        className="w-100 form-control"
                                        type="text"
                                        value="Giá trị hàng hóa"
                                    />
                                </td>
                                <td style={{ width: '220px' }}>
                                    {" "}
                                    <textarea
                                        className="ghi_chu form-control"
                                        name=""
                                        id=""
                                        cols="30"
                                        rows="10"
                                        placeholder="Ghi chú sản phẩm..."
                                    ></textarea>{" "}
                                </td>
                                <td>
                                    <span style={{ cursor: 'pointer' }} onClick={() => subMit(i)}><i style={{ fontSize: '30px', marginTop: '50%', transform: 'transLateX(-50%)', color: 'red' }} className="fa-solid fa-circle-xmark"></i></span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <div className="container d-flex justify-content-between mt-4">
                    <div className="form_custom">
                        <div className="addMore">
                            <button
                                style={{ backgroundColor: "#8610e8", border: "none" }}
                                className="py-2 px-1 rounded text-white form-control"
                                onClick={(e) => handleOnClickAddMore(e)}
                            >
                                + Thêm sản sản phẩm
                            </button>
                        </div>
                        <div className="d-flex flex-column w-100">
                            <label htmlFor="" className="">
                                <h5>Địa chỉ kho Trung Quốc</h5>
                            </label>
                            <select name="" id="" className="p-1 form-control">
                                <option value="" className="text-center">
                                    --Lựa chọn kho--
                                </option>
                                <option value="quangChau">Quảng Châu</option>
                                <option value="dongHung">Đông Hưng</option>
                            </select>
                        </div>
                        <div className="form">
                            <p className="title-label">Thông Tin Khách Hàng</p>
                            <Container className="customer-form">
                                <Row>
                                    <Form.Label className="customer-title">Họ Tên</Form.Label>
                                    <Form.Control
                                        className="customer-field"
                                        type="text"
                                        placeholder="Nhập Họ Tên"
                                    />
                                </Row>
                                <Row>
                                    <Form.Label className="customer-title">
                                        Số Điện Thoại
                                    </Form.Label>
                                    <Form.Control
                                        className="customer-field"
                                        type="text"
                                        placeholder="Nhập Số Điện Thoại"
                                    />
                                </Row>
                                <Row>
                                    <Form.Label className="customer-title">Địa chỉ</Form.Label>
                                    <Form.Select className="customer-field">
                                        <option>Vui Lòng Chọn Địa Chỉ</option>
                                    </Form.Select>
                                </Row>
                            </Container>
                        </div>
                        <div
                            style={{
                                width: "360px",
                                marginTop: '25px',
                                backgroundColor: "#f9f9f9",
                            }}
                            className="border border-secondary p-2"
                        >
                            <div className="d-flex justify-content-between">
                                <p>Tổng tiền đặt hàng: </p>
                                <p className="">
                                    {" "}
                                    <NumericFormat
                                        disabled={true}
                                        style={{
                                            border: "none",
                                            textAlign: "right",
                                            backgroundColor: "#f9f9f9",
                                            width: "100px",
                                        }}
                                        value={total}
                                        thousandSeparator=","
                                    />{" "}
                                    đ
                                </p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <div className="d-flex">
                                    <p>Phí đặt hàng</p>
                                    <span
                                        style={{
                                            fontSize: "16px",
                                            paddingTop: "6px",
                                            color: "#005e91",
                                        }}
                                        className="material-symbols-outlined mx-1"
                                    >
                                        help
                                    </span>
                                    :
                                </div>
                                <p className="">
                                    {" "}
                                    <NumericFormat
                                        disabled={true}
                                        style={{
                                            border: "none",
                                            textAlign: "right",
                                            backgroundColor: "#f9f9f9",
                                            width: "100px",
                                        }}
                                        value={orderCost}
                                        thousandSeparator=","
                                    />{" "}
                                    đ
                                </p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p className="">Tổng tiền/chưa có phí ship TQ: </p>
                                <p className="">
                                    {" "}
                                    <NumericFormat
                                        disabled={true}
                                        style={{
                                            border: "none",
                                            textAlign: "right",
                                            backgroundColor: "#f9f9f9",
                                            width: "100px",
                                        }}
                                        value={totalOrderCost}
                                        thousandSeparator=","
                                    />{" "}
                                    đ
                                </p>
                            </div>
                        </div>
                        <Button variant="warning" className="end-btn mt-3" as={Link} to="/app/orderDeposit">
                            Tạo Đơn Ký gửi
                        </Button>
                    </div>

                    {/* Tổng hợp các loại phí */}

                    <div className="container ms-4">
                        <h1>Phí vận chuyển quốc tế</h1>
                        <div className="mt-5">
                            <div class="official">
                                <div className="">
                                    <input name="ship" value="tronGoi" onClick={(e) => handleOnClickRadio(e)} type="radio" />
                                    <label className="ps-2 fs-5 fw-bold">Phí vận chuyển trọn gói</label>
                                    <br />
                                    <input name="ship" value="chinhNgach" className="mt-2" onClick={(e) => handleOnClickRadio(e)} type="radio" />
                                    <label className="ps-2 fs-5 fw-bold">Phí vận chuyển chính ngạch</label>
                                </div>
                                <p>Tổng phí nhập khẩu = Phí dịch vụ + Phí vận chuyển + Thuế nhập khẩu (nếu có) + Thuế VAT</p>
                                <select name="kg" disabled={disKg} onChange={(e)=> changeFee(e)} className="form-control d-inline mx-1" style={{ width: '150px', textAlign: 'center', padding: '4px' }}>
                                    <option value="default" selected>Trọng lượng(kg)</option>
                                    {kg?kg.map((itk, index)=>{
                                        return (
                                            <option value={itk.value}>{itk.label}</option>
                                        )
                                    }):[]}
                                </select>
                                <select name="m3" disabled={disM3} onChange={(e)=> changeFee(e)} className="form-control d-inline mx-1" style={{ width: '150px', textAlign: 'center', padding: '4px' }}>
                                    <option value="default" selected>Khối lượng (tính/m3)</option>
                                    {m3?m3.map((itm, index)=>{
                                        return (
                                            <option value={itm.value}>{itm.label}</option>
                                        )
                                    }):[]}
                                </select>
                                <select onChange={(e) => handleOnChangeArea(e)} onClick={(e)=>handleOnChangeArea(e)}  className="form-control d-inline mx-1" style={{ width: '150px', textAlign: 'center', padding: '4px' }}>
                                    <option value="" selected> Khu vực</option>
                                    {area.map((item, i) => (
                                        <option value={item.value} > {item.label} </option>
                                    ))}
                                </select>
                            </div>
                            <div className="VAT text-danger" style={{ backgroundColor: '#fff1f0', marginTop: "20px" }}>
                                <p><span style={{ fontWeight: 'bold' }}>Thuế nhập khẩu (Nếu có)</span> = % thuế x Giá trị hàng hóa <br />
                                    <span style={{ fontWeight: 'bold' }}>Thuế VAT</span> = 10% x Giá trị hàng hóa</p>
                            </div>
                        </div>
                        {/* <div className="mt-5 mb-3">
                            <h5>PHÍ KIỂM ĐẾM SẢN PHẨM</h5>
                            <select className="form-control d-inline mx-1" style={{ width: '150px', textAlign: 'center', padding: '4px' }}>
                                <option value="" selected>Số lượng</option>
                                <option value="">501-10000 sản phẩm</option>
                                <option value="">101-500 sản phẩm</option>
                                <option value="">11-100 sản phẩm</option>
                                <option value="">3-10 sản phẩm</option>
                                <option value="">1-2 sản phẩm</option>
                            </select>
                        </div> */}
                        <div className="mt-5 mb-3">
                            <span className="d-flex">
                                <h5>PHÍ ĐÓNG GỖ</h5>
                                <input className="mb-2 ms-2" type="checkbox" />
                            </span>
                            <span className="d-flex">
                                <h5>PHÍ BẢO HIỂM</h5>
                                <input className="mb-2 ms-2" type="checkbox" />
                            </span>
                        </div>
                        <div className="express border border-danger mt-3">
                            <div className=" d-flex mt-3">
                                <p className="ps-2">Vận chuyển</p>
                                <div>
                                    <span className="ms-3">
                                        <input type="radio" />
                                        <label className="ps-1" htmlFor="">Nhanh</label>
                                    </span>
                                    <span className="ms-3">
                                        <input type="radio" />
                                        <label className="ps-1" htmlFor="">Thường</label>
                                    </span>
                                </div>
                            </div>
                            <div className=" d-flex justify-content-evenly">
                                <p className="ps-2">Yêu cầu khác</p>
                                <div className="d-flex flex-column">
                                    <span className="ms-3">
                                        <input type="checkbox" disabled />
                                        <label className="ps-1" htmlFor="">Kiểm hàng</label>
                                    </span>
                                    <br />
                                    <span className="ms-3">
                                        <input type="checkbox" />
                                        <label className="ps-1" htmlFor=""> Khai thuế 100% hàng có hóa đơn GTGT</label>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Deposit;