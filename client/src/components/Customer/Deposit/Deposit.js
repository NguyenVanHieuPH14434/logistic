import "./Deposit.scss";
import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { Row, Col, Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "./Deposit.scss";
import { NumericFormat } from "react-number-format";

function Deposit() {
    const [list, setList] = useState([
        {
            id: "",
            img: "https://anhgaixinh.biz/wp-content/uploads/2022/01/gai-xinh-mac-vay-xep-ly-ngan-9.jpg",
            attribute: "",
            price: "",
            amount: 0,
            note: "",
            totalPrice: 0,
        },
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
        newList = {
            id: "",
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



    const changeInp = (i, e) => {
        const val = [...list];
        val[i][e.target.name] = e.target.value;
        val[i]["totalPrice"] = val[i]["price"].replace(/,/g, "") * val[i]["amount"];
        setList(val);
    };
    return (
        <>
            <div className="groceries">
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
                                <td className="pt-5"> {i + 1} </td>
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
                                    <select style={{width: '100%'}}>
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
                        <Button variant="warning" className="end-btn">
                            Tạo Đơn Hàng
                        </Button>
                    </div>
                    <div
                        style={{
                            width: "360px",
                            height: "100%",
                            backgroundColor: "#f9f9f9",
                        }}
                        className="border border-danger p-2"
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
                </div>
            </div>

            
            <Modal show={show} onHide={handleClose} animation={false} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title className="title-modal">Thêm Sản Phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Row>
                                <Form.Label style={{ margin: "1% 0" }}>Tên Sản Phẩm</Form.Label>
                                <Form.Control
                                    type="text"
                                    style={{ width: "93.5%", marginLeft: "3%" }}
                                    placeholder="Nhập Tên Sản Phẩm"
                                />
                            </Row>
                            <Row>
                                <Form.Label style={{ margin: "1% 0" }}>
                                    Link Sản Phẩm
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    style={{ width: "93.5%", marginLeft: "3%" }}
                                    placeholder="Nhập Link Sản Phẩm"
                                />
                            </Row>
                            <Row>
                                <Form.Label style={{ margin: "1% 0" }}>Ảnh Sản Phẩm</Form.Label>
                                <Form.Control
                                    type="file"
                                    style={{ width: "93.5%", marginLeft: "3%" }}
                                />
                            </Row>
                            <Row>
                                <Form.Label style={{ margin: "1% 0" }}>Ghi Chú</Form.Label>
                                <Form.Control
                                    type="text"
                                    style={{ width: "93.5%", marginLeft: "3%" }}
                                    placeholder="Nhập Ghi Chú"
                                />
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <Form.Label style={{ margin: "1% 0" }}>Màu Sắc</Form.Label>
                                <Form.Control
                                    type="text"
                                    style={{ width: "93.5%", marginLeft: "3%" }}
                                    placeholder="Nhập Màu"
                                />
                            </Row>
                            <Row>
                                <Form.Label style={{ margin: "1% 0" }}>Kích Thước</Form.Label>
                                <Form.Control
                                    type="text"
                                    style={{ width: "93.5%", marginLeft: "3%" }}
                                    placeholder="Nhập Kích Thước"
                                />
                            </Row>
                            <Row>
                                <Form.Label style={{ margin: "1% 0" }}>Số Lượng</Form.Label>
                                <Form.Control
                                    type="number"
                                    style={{ width: "93.5%", marginLeft: "3%" }}
                                    placeholder="0"
                                />
                            </Row>
                            <Row>
                                <Form.Label style={{ margin: "1% 0" }}>Giá</Form.Label>
                                <Form.Control
                                    type="text"
                                    style={{ width: "93.5%", marginLeft: "3%" }}
                                    placeholder="Nhập Giá"
                                />
                            </Row>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success">XÁC NHẬN</Button>
                    <Button variant="danger" onClick={handleClose}>
                        HỦY
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Deposit;