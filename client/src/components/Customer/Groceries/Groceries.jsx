/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useState } from "react";
import Table from "react-bootstrap/Table";
import { Row, Col, Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import image from "../../../assets/public/img/default-thumbnail.jpg";
import "./Groceries.scss";
import { NumericFormat } from "react-number-format";
import { createOrder, uploadFiles } from "../../../api/orderApi";
import { AppContext } from "../../../contexts/AppContextProvider";
import { Link, useNavigate } from "react-router-dom";
import OrderGroceries from "./orderGroceries/orderGroceries";

function Groceries() {
  const navigate = useNavigate()
  const {state:{user}} = useContext(AppContext);
  const [list, setList] = useState([
    {
      product_image: "",
      fileImage: "",
      product_link: "",
      product_name: "",
      attribute: "",
      product_price: 0,
      quantity: 0,
      note: "",
      total_price: 0,
    },
  ]);
  const checkValidate = (items,order) => {
    //create
  if(order.full_name !==''&& order.phone !==''&&order.address !==''){
    let checkEmptyItems= items.every((n)=>{
      return (
        n.product_image !== '' &&
        n.fileImage !== '' &&
        n.product_link &&
        n.product_name !== '' &&
        n.attribute !== '' &&
        n.product_price !== '' &&
        n.quantity > 0 &&
        n.total_price > 0
      )
    })
      if(checkEmptyItems === true){
        handleSave()
      }
      else {
        return alert(`please check input product !!!`);
      }
    }
    else {
      return alert(`please check input information !!!`);
    }
  };
  const [show, setShow] = useState(false);
  // Danh sách các sản phẩm
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Nút thêm sản phẩm
  const handleOnIncrease = (i, e) => {
    const increase = [...list];
    increase[i]["quantity"] = parseInt(increase[i]["quantity"]) + 1;
    increase[i]["total_price"] =
      increase[i]["quantity"] * increase[i]["product_price"].replace(/,/g, "");
    setList(increase);
  };

  // Nút bớt sản phẩm
  const handleOnReduced = (i) => {
    const count = [...list];
    if (count[i]["quantity"] <= 0) {
      count[i]["quantity"] = 0;
      count[i]["total_price"] =
        count[i]["quantity"] * count[i]["product_price"].replace(/,/g, "");
    } else {
      count[i]["quantity"] = count[i]["quantity"] - 1;
      count[i]["total_price"] =
        count[i]["quantity"] * count[i]["product_price"].replace(/,/g, "");
    }
    setList(count);
  };

  const handleOnClickAddMore = (e) => {
    let newList = [...list];
    newList = {
      product_image: "",
      fileImage: "",
      product_link: "",
      product_name: "",
      attribute: "",
      product_price: 0,
      quantity: 0,
      note: "",
      total_price: 0,
    };
    setList([...list, newList]);
  };

  //In ra tổng tiền

  var total = 0;
  var orderCost = 0;
  var totalOrderCost = 0;
  for (var li of list) {
    total += li.total_price;
    if (total <= 2000000) {
      orderCost = total * (3 / 100);
    } else if (total <= 20000000) {
      orderCost = (2.5 / 100) * total;
    } else if (total <= 100000000) {
      orderCost = total * (2 / 100);
    } else if (total > 100000000) {
      orderCost = total * (1 / 100);
    }
    totalOrderCost = total + orderCost;
  }
  const [lists,setLists]=useState([])

  // thay đổi giá trị form sản phẩm
  const changeInp = (i, e) => {
    const val = [...list];
    val[i][e.target.name] = e.target.value;
    if (val[i]["quantity"]) {
      val[i]["total_price"] =
        val[i]["product_price"].replace(/,/g, "") * val[i]["quantity"];
    }
    setList(val);
   
   
  };

  // thông tin khách hàng
  const [order, setOrder] = useState({
    full_name:'',
    phone:'',
    address:''
  });
  console.log(order);
  // thay đổi giá trị thông tin khách hàng
  const changeInpOrder = (e) => {
    const valOrder = { ...order };
    valOrder[e.target.name] = e.target.value;
    valOrder["user_id"] = user._id;
    valOrder["type"] = "order";
    valOrder["total"] = totalOrderCost;
    setOrder(valOrder);
  };

  // preview image
  const [previewImage, setPreviewImage] = useState(null);

  // file ảnh
  const [files, setFiles] = useState([]);

  // thêm file ảnh
  const changFile = (i, e) => {
    const file = [...files];
    file[i] = e.target.files;
    setFiles(file);

    // change originalName file
    const val = [...list];
    val[i][e.target.name] = e.target.files[0].name;
    val[i]['fileImage'] = URL.createObjectURL(e.target.files[0]);
    setList(val);
  };
  console.log("pre", previewImage);
    
  // tạo đơn
  const handleSave = async () => {
    const dataImage = new FormData();
    for (let index = 0; index < files.length; index++) {
      for (let i = 0; i < files[index].length; i++) {
        const element = files[index][i];
        dataImage.append("product_image", element);
      }
    }
    const data1 = {
      order: order,
      orderItem: list,
    };

    const res = await createOrder(data1)
    await uploadFiles(dataImage);
    setList([{
      product_image: "",
      fileImage: "",
      product_link: "",
      product_name: "",
      attribute: "",
      product_price: 0,
      quantity: 0,
      note: "",
      total_price: 0,
    }])
    setOrder({
      address_TQ:'',
      full_name:"",
      phone:"",
      address:""
    })
    alert('Tạo đơn thành công!');
    navigate('/app/orderGroceries', {state:{data:list}});
  };
  const saveData =()=>{
    checkValidate(list,order)
  }
  console.log("item", list);
  console.log("items", lists);
  const DeleteList = (i) => {
    const newList = [...list];
    newList.splice(i, 1);
    setList(newList);
  };

  return (
    <>
      <div className="imgs"></div>
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
            {list.map((li, i) => (
              <tr key={i}>
                <td className="pt-5">
                  {" "}
                  {i + 1} <br />
                  <span style={{ cursor: "pointer" }}>
                    <i
                      onClick={() => DeleteList(i)}
                      className="fa-solid fa-circle-xmark"
                    ></i>
                  </span>
                </td>
                <td>
                  <img
                    style={{
                      width: "96px",
                      height: "64px",
                      marginTop: "24px",
                    }}
                    src={li.fileImage !== '' ? li.fileImage : image}
                  />
                  <label
                    className="mt-1"
                    id="label-upload"
                  >
                  <input
                    type="file"
                    multiple style={{display:"none"}}
                    name="product_image"
                    onChange={(e) => {
                      changFile(i, e);
                    }}
                  />
                     Upload...
                  </label>
                </td>
                <td>
                  <input
                    className="w-100"
                    type="text"
                    name="product_name"
                    value={li.product_name ? li.product_name : ""}
                    onChange={(e) => changeInp(i, e)}
                    placeholder="Tên sản phẩm"
                  />
                  <textarea
                    className="mt-2 attribute w-100"
                    type="text"
                    name="attribute"
                    value={li.attribute?li.attribute:''}
                    onChange={(e) => changeInp(i, e)}
                    placeholder="Màu sắc, size, kích thước"
                  ></textarea>
                  <input
                    className="w-100"
                    type="text"
                    name="product_link"
                    value={li.product_link ? li.product_link : ""}
                    onChange={(e) => changeInp(i, e)}
                    placeholder="Link sản phẩm"
                  />
                </td>
                <td className="pt-5">
                  {" "}
                  {/* <input
                      type="text"
                      name="price"
                      value={li.price}
                      onChange={(e) => changeInp(i, e)}
                    /> */}
                  <NumericFormat
                    style={{
                      border: "none",
                      backgroundColor: "none",
                      width: "100%",
                    }}
                    type="text"
                    name="product_price"
                    value={li.product_price ? li.product_price : ""}
                    // value={li.price}
                    onChange={(e) => changeInp(i, e)}
                    thousandSeparator=","
                  />
                </td>
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
                      value={li.quantity}
                      name="quantity"
                      onChange={(e) => changeInp(i, e)}
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
                    name="note"
                    id=""
                    cols="30"
                    rows="10"
                    value={li.note?li.note:''}
                    onChange={(e) => changeInp(i, e)}
                    placeholder="Ghi chú sản phẩm..."
                  ></textarea>{" "}
                </td>
                {/* <td className="pt-5"> {li.totalPrice} </td> */}
                <td className="pt-5">
                  <p className="">
                    <NumericFormat
                      disabled={true}
                      style={{
                        border: "none",
                        backgroundColor: "none",
                        width: "100%",
                      }}
                      value={li.total_price}
                      thousandSeparator=","
                    />{" "}
                  </p>
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
              <select name="address_TQ" id="" className="p-1"  value={order?.address_TQ} onChange={(e)=> changeInpOrder(e)}>
                <option value="" className="text-center">
                  --Lựa chọn kho--
                </option>
                <option value="Quảng Châu">Quảng Châu</option>
                <option value="Đông Hưng">Đông Hưng</option>
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
                    name="full_name"
                    value={order?.full_name}
                    onChange={(e) => changeInpOrder(e)}
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
                    name="phone"
                    value={order?.phone}
                    onChange={(e) => changeInpOrder(e)}
                    placeholder="Nhập Số Điện Thoại"
                  />
                  {/* <Form.Control
                      className="customer-field"
                      type="hidden"
                      name="type"
                      onChange={(e) => changeInpOrder(e)}
                      placeholder="Nhập Số Điện Thoại"
                    />
                    <Form.Control
                      className="customer-field"
                      type="hidden"
                      name="phone"
                      onChange={(e) => changeInpOrder(e)}
                      placeholder="Nhập Số Điện Thoại"
                    /> */}
                </Row>
                <Row>
                  <Form.Label className="customer-title">Địa chỉ</Form.Label>
                  <Form.Select
                    className="customer-field"
                    name="address"
                    value={order?.address}
                    onChange={(e) => changeInpOrder(e)}
                  >
                    <option>Vui Lòng Chọn Địa Chỉ</option>
                    <option value="hanoi">Ha Noi</option>
                    <option value="haiphong">Hai Phong</option>
                  </Form.Select>
                </Row>
              </Container>
            </div>
            <Button
              variant="warning"
              type="submit"
              onClick={saveData}
              className="end-btn"
              // as={Link} to="/app/orderGroceries"
            >
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
    </>
  );
}

export default Groceries;
