/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Row, Col, Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "./Groceries.scss";
import { NumericFormat } from "react-number-format";
import { createOrder, uploadFiles } from "../../../api/orderApi";
import { AppContext } from "../../../contexts/AppContextProvider";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css"; //
import { Confirm, toastifyError, toastifySuccess, toastifyWarning } from "../../../lib/toastify";
import { typeMon } from "../../../lib/shipFee";

function Groceries() {
  const navigate = useNavigate();
  const {
    state: { user },
  } = useContext(AppContext);

  const [list, setList] = useState([
    {
      product_image: "",
      fileImage: "",
      product_link: "",
      product_name: "",
      attribute: "",
      product_price: 0,
      quantity: 1,
      typeMoney: 1,
      maVanDon: '',
      soKien:'',
      kgM3:0,
      donGia:0,
      phuPhi:0,
      note: "",
      total_price: 0,
    },
  ]);

 
  const setTotalPriceALL = (val, i) =>{
    if (val[i]["quantity"] && val[i]["product_price"] && val[i]["typeMoney"] || val[i]["kgM3"] || val[i]["donGia"] || val[i]["phuPhi"]) {
    let kgm3 = val[i]["kgM3"]?val[i]["kgM3"]:0
    let dongia = val[i]["donGia"]?val[i]["donGia"]:0
    let phuphi = val[i]["phuPhi"]?val[i]["phuPhi"]:0
    val[i]["total_price"] =
        (val[i]["product_price"].replace(/,/g, "") *
        parseFloat(val[i]["typeMoney"]) *
    val[i]["quantity"]) + (parseFloat(kgm3) * parseFloat(dongia)) + parseFloat(phuphi);
    }
  }
  


  const checkValidate = (items, order) => {
    //create
    if (order.full_name !== "" &&  order.phone !== "" && order.address !== "") {
      let checkEmptyItems = items.every((n) => {
        return (
          // n.product_image !== "" &&
          // n.fileImage !== "" &&
          n.product_link &&
          n.product_name !== "" &&
          n.attribute !== "" &&
          n.product_price !== "" &&
          n.quantity > 0 &&
          n.total_price > 0
        );
      });
      if (checkEmptyItems === true) {
        if(isVietnamesePhoneNumber(order.phone) === false){
        return toastifyError('Số điện thoại không đúng định dạng!');
        }else{
          handleSave();
        }
      } else {
        return toastifyError(`Vui lòng nhập đầy đủ các trường có dấu (*)!`);
      }
    } else {
      return toastifyError(`Vui lòng nhập đầy đủ thông tin khách hàng!`);
    }
  };

  // Nút thêm sản phẩm
  const handleOnIncrease = (i, e) => {
    const increase = [...list];
    increase[i]["quantity"] = parseInt(increase[i]["quantity"]) + 1;
    setTotalPriceALL(increase, i)
    setList(increase);
  };

  // Nút bớt sản phẩm
  const handleOnReduced = (i) => {
    const count = [...list];
      count[i]["quantity"] = count[i]["quantity"] - 1;
      if (count[i]["quantity"] <= 0) {
        count[i]["quantity"] = 1;
      }
      setTotalPriceALL(count, i)
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
      quantity: 1,
      typeMoney: 1,
      maVanDon: '',
      soKien:'',
      kgM3:0,
      donGia:0,
      phuPhi:0,
      note: "",
      total_price: 0,
    };
    setList([...list, newList]);
  };

    // thông tin khách hàng
    const [order, setOrder] = useState({
      full_name: "",
      phone: "",
      address: "",
      datCoc: 0,
      total: 0
    });
    console.log(order);

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
    let tienCoc = 0;
    if(order.datCoc){
     tienCoc = (order.datCoc?order.datCoc:0).replace(/,/g, "")
    }
    totalOrderCost = total + orderCost - tienCoc;
  }

  // thay đổi giá trị form sản phẩm
  const changeInp = (i, e) => {
    const val = [...list];
    val[i][e.target.name] = e.target.value;
    if (val[i]["product_price"] < 0) {
      toastifyWarning('Đơn giá phải lớn hơn 0!')
      val[i]["product_price"] = "";
    }
      setTotalPriceALL(val, i)
    setList(val);
  };


  // thay đổi giá trị thông tin khách hàng
  const changeInpOrder = (e) => {
    const valOrder = { ...order };
    valOrder[e.target.name] = e.target.value;
    valOrder["user_id"] = user._id;
    valOrder["type"] = "order";
    valOrder["total"] = totalOrderCost;
    if(valOrder["phone"] !== '' && isRegexNumber(valOrder["phone"]) == false){
      valOrder["phone"] = "";
      setOrder(valOrder);
      return toastifyWarning('Số điện thoại phải là ký tự số!')
    } 
    setOrder(valOrder);
  };

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
    val[i]["fileImage"] = e.target.files[0];
    setList(val);
  };

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

    const res = await createOrder(data1);
    await uploadFiles(dataImage);
    setList([
      {
        product_image: "",
        fileImage: "",
        product_link: "",
        product_name: "",
        attribute: "",
        product_price: 0,
        quantity: 1,
        note: "",
        maVanDon: '',
        soKien:'',
        kgM3:0,
        donGia:0,
        phuPhi:0,
        total_price: 0,
      },
    ]);
    setOrder({
      address_TQ: "",
      full_name: "",
      phone: "",
      address: "",
    });
    toastifySuccess("Tạo đơn hàng thành công!");
    setTimeout(() => {
      navigate("/app/orderGroceries", { state: { data: list, order: order, total: total }});
    }, 1000);
  };
  // submit tạo đơn hàng
  const saveData = () => {
    checkValidate(list, order);
  };
  console.log("item", list);

  //
  const DeleteList = (i) => {
    const newList = [...list];
    newList.splice(i, 1);
    setList(newList);
    toastifyError("Đã xóa!");
  };

  // xóa cột sản phẩm
  const submit = (i) => {
    Confirm("Delete", "Bạn có chắc chắn muốn xóa không?", DeleteList, i);
  };

  const isVietnamesePhoneNumber = (number) => {
    return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(number);
  }

  const isRegexNumber = (number) => {
    return /[0-9]\b/.test(number);
  }

  return (
    <>
      <div className="imgs"></div>
      <div className="groceries">
        <p className="title">Tạo đơn hàng</p>
        <Table style={{ backgroundColor: "#f5f5f5" }} bordered size="lg">
          <thead>
            <tr>
              <th>STT</th>
              <th>Ảnh Sản Phẩm</th>
              <th>Thuộc tính</th>
              <th>Số lượng</th>
              <th>Ghi chú</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {list.map((li, i) => (
              <tr key={i}>
                <td style={{ paddingTop: "80px" }} className="stt">
                  {" "}
                  {i + 1} <br />
                </td>
                <td sytle={{with:'10%'}} className=" pt-2">
                  <img
                    style={{
                      width: "96px",
                      height: "64px",
                      marginTop: "24px",
                    }}
                    src={
                      li.fileImage !== ""
                        ? URL.createObjectURL(li.fileImage)
                        : '../../default-thumbnail.jpg'
                    }
                  />
                  <br></br>
                  <label className="mt-1" id="label-upload">
                    <input
                      type="file"
                      multiple
                      style={{ display: "none", position: 'relative', top: '0' }}
                      name="product_image"
                      onChange={(e) => {
                        changFile(i, e);
                      }}
                    />
                    Upload...
                  </label>
                </td>
                <td className="" sytle={{with:'35%'}}>
                  <input
                    className="w-100 form-control"
                    type="text"
                    name="product_name"
                    value={li.product_name ? li.product_name : ""}
                    onChange={(e) => changeInp(i, e)}
                    placeholder="Tên sản phẩm (*)"
                  />
                  <textarea
                    className="mt-2 attribute w-100 form-control"
                    type="text"
                    name="attribute"
                    value={li.attribute ? li.attribute : ""}
                    onChange={(e) => changeInp(i, e)}
                    placeholder="Màu sắc, size, kích thước"
                  ></textarea>
                  <input
                    className="w-100 form-control mt-2"
                    type="text"
                    name="product_link"
                    value={li.product_link ? li.product_link : ""}
                    onChange={(e) => changeInp(i, e)}
                    placeholder="Link sản phẩm (*)"
                  />
                  <select name="typeMoney" onChange={(e)=>changeInp(i, e)} id="" className="form-control mt-2">
                    <option value="">Chọn loại tiền (*)</option>
                    {typeMon && typeMon.map((item)=>{
                      return(
                        <option value={item.value}>{item.label}</option>
                      )
                    })}
                  </select>
                  <NumericFormat
                    placeholder="Giá sản phẩm (*)"
                    style={{
                      border: "none",
                      backgroundColor: "none",
                      width: "100%",
                    }}
                    className=" form-control mt-2"
                    type="text"
                    name="product_price"
                    value={li.product_price ? li.product_price : ""}
                    // value={li.price}
                    onChange={(e) => changeInp(i, e)}
                    thousandSeparator=","
                    min="1"
                  />
                  {/* <input
                    className="w-100 form-control mt-2"
                    type="text"
                    placeholder="Mã vận đơn"
                    name="maVanDon"
                    onChange={(e) => changeInp(i, e)}
                  />

                  <input
                    className="w-100 form-control mt-2"
                    type="text"
                    placeholder="Số kiện hàng"
                    name="soKien"
                    onChange={(e) => changeInp(i, e)}
                  />
                  <NumericFormat
                    className="w-100 form-control mt-2"
                    type="text"
                    name="kgM3"
                    placeholder="Số cân, số khối"
                    onChange={(e) => changeInp(i, e)}
                  />
                  <NumericFormat
                    className="w-100 form-control mt-2"
                    type="text"
                    name="donGia"
                    placeholder="Cước vận chuyển"
                    onChange={(e) => changeInp(i, e)}
                  />
                  <NumericFormat
                    className="w-100 form-control mt-2"
                    type="text"
                    name="phuPhi"
                    placeholder="Phụ phí"
                    onChange={(e) => changeInp(i, e)}
                  /> */}
                </td>

                <td style={{paddingTop: '50px', paddingRight:'40px', width:'10%'}}  className="soLuong">
                  <div className="d-flex soLuong">
                    <div
                      className="border px-3 d-flex justify-content-center border-dark w-25 form-control"
                      onClick={(e) => handleOnReduced(i)}
                    >
                      {" "}
                      -{" "}
                    </div>
                    <input
                      className="value border w-50 border-dark px-3 text-center form-control"
                      type="text"
                      name="quantity"
                      value={li.quantity == 0 ? 1:li.quantity}
                      min='1'
                      onChange={(e) => changeInp(i, e)}
                    />
                    <div
                      className="cong px-3 d-flex justify-content-center border w-25 border-dark form-control"
                      onClick={(e) => handleOnIncrease(i, e)}
                    >
                      {" "}
                      +{" "}
                    </div>
                  </div>
                </td>
                <td className="" sytle={{with:'30%'}}>
                  {" "}
                  <textarea
                    className="ghi_chu form-control"
                    name="note"
                    id=""
                    cols="30"
                    rows="10"
                    value={li.note ? li.note : ""}
                    onChange={(e) => changeInp(i, e)}
                    placeholder="Ghi chú sản phẩm..."
                  ></textarea>{" "}
                </td>
                <td style={{paddingTop: '80px', width:'12%'}}>
                  <p className="">
                    <NumericFormat
                      disabled={true}
                      style={{
                        border: "none",
                        backgroundColor: "#f5f5f5",
                        width: "100%",
                        textAlign: "center",
                      }}
                      value={li.total_price}
                      thousandSeparator=","
                    />{" "}
                  </p>
                  <span style={{ cursor: "pointer" }}>
                    <button
                      style={{ border: "none" }}
                      onClick={(e) => submit(e)}
                    >
                      {" "}
                      {list.length > 1 && (
                        <i
                          onClick={() => submit(i)}
                          className="fa-solid fa-circle-xmark icon_delete_list"
                        ></i>
                      )}
                    </button>
                  </span>
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
              <select
                name="address_TQ"
                id=""
                className="p-1 form-control"
                value={order?.address_TQ}
                onChange={(e) => changeInpOrder(e)}
              >
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
                </Row>
                <Row>
                  <Form.Label className="customer-title">
                      Tiền đặt cọc
                  </Form.Label>
                    <NumericFormat
                     className="form-control customer-field"
                    name="datCoc"
                    onChange={(e) => changeInpOrder(e)}
                    thousandSeparator=","
                    placeholder="Tiền đặt cọc"
                  />{" "}
                </Row>
                {/*  */}
                <Row>
                  <Form.Label className="customer-title">Địa chỉ</Form.Label>
                  <Form.Select
                    className="customer-field"
                    name="address"
                    value={order?.address}
                    onChange={(e) => changeInpOrder(e)}
                  >
                    <option>Vui Lòng Chọn Địa Chỉ</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Hải Phòng">Hải Phòng</option>
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
          <div>
            <div
              style={{
                width: "360px",
                height: "165px",
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
                <div className="d-flex">
                  <p>Tổng tiền đặt cọc:</p>
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
                    value={order.datCoc?order.datCoc:0}
                    thousandSeparator=","
                  />{" "}
                  đ
                </p>
              </div>
              <div className="d-flex justify-content-between">
                <p className="">Tổng tiền: </p>
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
            <div className="express border border-danger mt-3">
              <div className=" d-flex mt-3">
                <p className="ps-2">Vận chuyển</p>
                <div>
                  <span className="ms-3">
                    <input type="radio" />
                    <label className="ps-1" htmlFor="">
                      Nhanh
                    </label>
                  </span>
                  <span className="ms-3">
                    <input type="radio" />
                    <label className="ps-1" htmlFor="">
                      Thường
                    </label>
                  </span>
                </div>
              </div>
              <div className=" d-flex justify-content-evenly">
                <p className="ps-2">Yêu cầu khác</p>
                <div className="d-flex flex-column">
                  <span className="ms-3">
                    <input type="checkbox" disabled />
                    <label className="ps-1" htmlFor="">
                      Kiểm hàng
                    </label>
                  </span>
                  <br />
                  <span className="ms-3">
                    <input type="checkbox" />
                    <label className="ps-1" htmlFor="">
                      {" "}
                      Khai thuế 100% hàng có hóa đơn GTGT
                    </label>
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

export default Groceries;
