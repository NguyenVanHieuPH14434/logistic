import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { Row, Col, Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import image from "./images/image-20200921082601-1.jpeg";
import "./Groceries.scss";

function Groceries() {


  const [list, setList] = useState([
    {
      id: '',
      img: "https://anhgaixinh.biz/wp-content/uploads/2022/01/gai-xinh-mac-vay-xep-ly-ngan-9.jpg",
      attribute: "",
      price: 0,
      amount: 0,
      note: "",
      totalPrice: 0,
    }
  ]);
  const [show, setShow] = useState(false);


  // Danh sách các sản phẩm
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleOnIncrease = (i, e) => {
    const increase = [...list];
    increase[i]['amount'] = parseInt(increase[i]['amount']) + 1;
    increase[i]['totalPrice'] = increase[i]['amount'] * increase[i]['price'];
    setList(increase)
  };
  const handleOnReduced = (i) => {
    const count = [...list];
    if(count[i]['amount'] <=0){
       count[i]['amount'] = 0;
       count[i]['totalPrice'] = count[i]['amount'] * count[i]['price'];
    }else {
      count[i]['amount'] = count[i]['amount'] - 1; 
      count[i]['totalPrice'] = count[i]['amount'] * count[i]['price'];
    }
    setList(count);    
  };

  const handleOnClickAddMore = (e) => {
    let newList = [...list];
    const newId = newList.length + 1;
    newList = {
      id:  '',
      img: "https://anhgaixinh.biz/wp-content/uploads/2022/01/gai-xinh-mac-vay-xep-ly-ngan-10.jpg",
      attribute: "",
      price: 0,
      amount: 0,
      note: "",
      totalPrice: 0,
    };
    setList([...list, newList]);
  };

  const changeInp =(i, e)=>{
    const val = [...list];
    val[i][e.target.name]=e.target.value;
    val[i]['totalPrice']=val[i]['price'] * val[i]['amount'];
    setList(val);
  }

  
  return (
    <>
      <div className="groceries">
        <p className="title">Tạo đơn hàng</p>
        <Table striped bordered hover size="lg">
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
            {/* <tr>
              <td className="pt-5">1</td>
              <td>
                <img src={image} alt="knife" className="image mt-4"></img>
              </td>
              <td>
                <input
                  className="w-100"
                  type="text"
                  placeholder="Tên sản phẩm"
                />
                <textarea
                  className="mt-2 attribute w-100"
                  type="text"
                  placeholder="Màu sắc, size, kích thước"
                ></textarea>
                <input
                  className="w-100"
                  type="text"
                  placeholder="Link sản phẩm"
                />
              </td>
              <td className="pt-5"> {price} </td>
              <td className="soLuong">
                <div className="d-flex soLuong">
                  <div
                    className="tru border border-dark px-3"
                    onClick={(e) => handleOnReduced(e)}
                  >
                    {" "}
                    -{" "}
                  </div>
                  <input
                    className="value border w-50 border-dark px-3 text-center"
                    type="text"
                    value={count}
                    onChange={(e) => handleOnChangeAmount(e)}
                  />
                  <div
                    className="cong border border-dark px-3"
                    onClick={(e) => handleOnIncrease(e)}
                  >
                    {" "}
                    +{" "}
                  </div>
                </div>
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
              <td className="pt-5"> {totalPrice} </td>
            </tr> */}
            {list.map((li, i) => (
              <tr key={i}>
                <td className="pt-5"> {i+1} </td>
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
                    placeholder="Tên sản phẩm"
                  />
                  <textarea
                    className="mt-2 attribute w-100"
                    type="text"
                    placeholder="Màu sắc, size, kích thước"
                  ></textarea>
                  <input
                    className="w-100"
                    type="text"
                    placeholder="Link sản phẩm"
                  />
                </td>
                <td className="pt-5"> <input type="text" name="price" onChange={(e)=>changeInp(i, e)} /></td>
                <td className="soLuong">
                  <div className="d-flex soLuong">
                    <div
                      className="border border-dark px-3"
                      onClick={(e) => handleOnReduced(i)}
                    >
                      {" "}
                      -{" "}
                    </div>
                    <input
                      className="value border w-50 border-dark px-3 text-center"
                      type="text"
                      value={li.amount}
                      name="amount" onChange={(e)=>changeInp(i, e)}
                    />
                    <div
                      className="cong border border-dark px-3"
                      onClick={(e) => handleOnIncrease(i, e)}
                    >
                      {" "}
                      +{" "}
                    </div>
                  </div>
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
                <td className="pt-5"> {li.price * li.amount} </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="addMore">
          <button onClick={(e) => handleOnClickAddMore(e)}>
            Thêm sản sản phẩm
          </button>
        </div>
        <div className="d-flex flex-column w-50">
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
        <Button variant="warning" className="end-btn">
          Tạo Đơn Hàng
        </Button>
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

export default Groceries;
