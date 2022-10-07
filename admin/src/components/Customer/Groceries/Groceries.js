import React, { useState } from "react";
import Table from 'react-bootstrap/Table';
import { Row, Col, Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import image from "./images/image-20200921082601-1.jpeg";
import "./Groceries.scss";

function Groceries() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className="groceries">
                <p className="title">Mua Hàng Hộ</p>
                <div className="align-btn">
                    <Button className="start-btn" onClick={handleShow}>+ Thêm Sản Phẩm</Button>
                </div>
                <Table striped bordered hover size="lg">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên Sản Phẩm</th>
                            <th>Link Sản Phẩm</th>
                            <th>Ảnh Sản Phẩm</th>
                            <th>Màu Sắc</th>
                            <th>Kích Thước</th>
                            <th>Số Lượng</th>
                            <th>Giá</th>
                            <th>Thành Tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Dao gọt hoa quả</td>
                            <td>https://www.google.com/?hl=vi</td>
                            <td><img src={image} alt="knife" className="image"></img></td>
                            <td>Xanh Lá</td>
                            <td>18 cm</td>
                            <td>2</td>
                            <td>11.92 tệ</td>
                            <td>23.84 tệ</td>
                        </tr>
                    </tbody>
                </Table>
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
                                    <Form.Label className="customer-title">Số Điện Thoại</Form.Label>
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
                <Button variant="warning" className="end-btn">Tạo Đơn Hàng</Button>
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
                                <Form.Label style={{ margin: "1% 0" }}>Link Sản Phẩm</Form.Label>
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
                    <Button variant="success">
                        XÁC NHẬN
                    </Button>
                    <Button variant="danger" onClick={handleClose}>
                        HỦY
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Groceries;