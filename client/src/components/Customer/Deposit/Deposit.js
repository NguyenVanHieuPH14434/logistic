import "./Deposit.scss";
import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { Row, Col, Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import { NumericFormat } from "react-number-format";

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
    const [show, setShow] = useState(false);

    // Danh sách các sản phẩm
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

    return (
        <>
            <div className="deposit">
                <p className="title">Tạo đơn ký gửi</p>
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
                                <td className="pt-5"> {i + 1} <br />
                                    <span style={{ cursor: 'pointer' }} onClick={() => DeleteList(i)}><i className="fa-solid fa-circle-xmark"></i></span>
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
                                        onChange={(e) => changeInpOrder(e)}

                                    />
                                    <input
                                        className="w-100"
                                        type="text"
                                        placeholder="Tên sản phẩm (*)"
                                        name="nameSanPham"
                                        onChange={(e) => changeInpOrder(e)}

                                    />
                                    <input
                                        className="w-100"
                                        type="text"
                                        placeholder="Số kiện hàng (*)"
                                        name="soKienHang"
                                        onChange={(e) => changeInpOrder(e)}

                                    />
                                    <input
                                        className="w-100"
                                        type="text"
                                        placeholder="hãng vận chuyển (*)"
                                        onChange={(e) => changeInpOrder(e)}

                                    />
                                </td>
                                <td className="">
                                    <input
                                        className="w-100"
                                        type="text"
                                        value="Trung Quốc - Việt Nam"
                                    />
                                    <select style={{ width: '100%' }}>
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

                <div className="container d-flex justify-content-between mt-4">
                    <div className="form_custom">
                        <div className="addMore">
                            <button
                                style={{ backgroundColor: "#8610e8", border: "none" }}
                                className="py-2 px-1 rounded text-white"
                                onClick={(e) => handleOnClickAddMore(e)}
                            >
                                + Thêm sản sản phẩm
                            </button>
                        </div>
                        <div className="d-flex flex-column w-100">
                            <label htmlFor="" className="">
                                <h5>Địa chỉ kho Trung Quốc</h5>
                            </label>
                            <select name="" id="" className="p-1">
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
                        <Button variant="warning" className="end-btn mt-3">
                            Tạo Đơn Hàng
                        </Button>
                    </div>

                    {/* Tổng hợp các loại phí */}

                    <div className="container ms-4">
                        <h1>Phí vận chuyển quốc tế</h1>

                        {/* Phí vận chuyển trọn gói */}
                        <div className="mt-5 ">
                            <h5>Phí vận chuyển trọn gói</h5>
                            <select style={{ width: '150px', textAlign: 'center', padding: '4px' }}>
                                <option value="" selected> Trọng lượng</option>
                                <option value="">&gt; 500kg</option>
                                <option value="">200 &#8594;500kg</option>
                                <option value="">100 &#8594;200kg</option>
                                <option value="">30 &#8594;100kg</option>
                                <option value="">10 &#8594;30kg</option>
                                <option value="">0 &#8594;10kg</option>
                            </select>
                            <select style={{ width: '150px', textAlign: 'center', padding: '4px' }}>
                                <option value="" selected>Khối lượng (tính/m3)</option>
                                <option value="">&gt;20m3</option>
                                <option value="">10m3 &#8594;20m3</option>
                                <option value="">5m3 &#8594;10m3</option>
                                <option value="">&lt;5m3</option>
                            </select>
                            <select style={{ width: '150px', textAlign: 'center', padding: '4px' }}>
                                <option value="" selected> Khu vực</option>
                                <option value="">Hà Nội</option>
                                <option value="">TP.HCM</option>
                            </select>
                        </div>
                        <div className="mt-5">
                            <h5>Phí vận chuyển chính ngạch</h5>
                            <p>Tổng phí nhập khẩu = Phí dịch vụ + Phí vận chuyển + Thuế nhập khẩu (nếu có) + Thuế VAT</p>
                            <select style={{ width: '150px', textAlign: 'center', padding: '4px' }}>
                                <option value="" selected>Trọng lượng(kg)</option>
                                <option value="">&gt; 500kg</option>
                                <option value="">&gt;200 &#8594;500kg</option>
                                <option value="">&gt;100 &#8594;200kg</option>
                                <option value="">&gt;30 &#8594;100kg</option>
                                <option value="">&lt; 30kg</option>
                            </select>
                            <select style={{ width: '150px', textAlign: 'center', padding: '4px' }}>
                                <option value="" selected>Khối lượng (tính/m3)</option>
                                <option value="">&gt;20m3</option>
                                <option value="">&gt;10m3 &#8594;20m3</option>
                                <option value="">&gt;5m3 &#8594;10m3</option>
                                <option value="">&lt;5m3</option>
                            </select>
                            <select style={{ width: '150px', textAlign: 'center', padding: '4px' }}>
                                <option value="" selected> Khu vực</option>
                                <option value="">Hà Nội</option>
                                <option value="">TP.HCM</option>
                            </select>
                            <div className="VAT text-danger" style={{ backgroundColor: '#fff1f0', marginTop: "20px" }}>
                                <p><span style={{ fontWeight: 'bold' }}>Thuế nhập khẩu (Nếu có)</span> = % thuế x Giá trị hàng hóa <br />
                                    <span style={{ fontWeight: 'bold' }}>Thuế VAT</span> = 10% x Giá trị hàng hóa</p>
                            </div>
                        </div>
                        <div className="mt-5 mb-3">
                            <h5>PHÍ KIỂM ĐẾM SẢN PHẨM</h5>
                            <select style={{ width: '150px', textAlign: 'center', padding: '4px' }}>
                                <option value="" selected>Số lượng</option>
                                <option value="">501-10000 sản phẩm</option>
                                <option value="">101-500 sản phẩm</option>
                                <option value="">11-100 sản phẩm</option>
                                <option value="">3-10 sản phẩm</option>
                                <option value="">1-2 sản phẩm</option>
                            </select>
                        </div>
                        <h1>Bảng giá dịch vụ mua hàng</h1>
                        {/* <table class="table">
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
                                        <td className="pt-5">  <span onClick={(i) => DeleteList(i)}>X</span> {i + 1} </td>
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
                                            />
                                            <input
                                                className="w-100"
                                                type="text"
                                                placeholder="Tên sản phẩm (*)"
                                            />
                                            <input
                                                className="w-100"
                                                type="text"
                                                placeholder="Số kiện hàng (*)"
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
                                            <select style={{ width: '100%' }}>
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
                        </table> */}
                    </div>
                </div>



            </div>
        </>
    );
}

export default Deposit;